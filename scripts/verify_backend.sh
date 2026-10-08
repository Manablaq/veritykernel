#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p artifacts

export GENVM_REPO="genlayerlabs/genvm-manager"
export GENVM_VERSION="v0.6.0-rc5"
export GENVM_ALLOW_PRERELEASE="1"

PY="$ROOT/.venv/bin/python"
GENVM_LINT="$ROOT/.venv/bin/genvm-lint"
export PATH="$ROOT/.venv/bin:$PATH"

test -x "$PY" || {
  echo "STOP: project virtualenv Python not found: $PY" >&2
  exit 1
}

test -x "$GENVM_LINT" || {
  echo "STOP: project virtualenv genvm-lint not found: $GENVM_LINT" >&2
  exit 1
}

"$PY" - <<'PY'
import importlib.metadata
import sys

expected = {
    "genlayer-py": "0.19.0rc2",
    "genlayer-test": "0.30.0rc2",
    "genvm-linter": "0.11.1rc2",
    "pytest": "8.4.2",
    "pyright": "1.1.414",
    "cloudpickle": "3.1.2",
}

print(f"PYTHON={sys.executable}")
print(f"PYTHON_VERSION={sys.version.split()[0]}")
for package, wanted in expected.items():
    actual = importlib.metadata.version(package)
    print(f"{package}={actual}")
    if actual != wanted:
        raise SystemExit(
            f"STOP: package drift for {package}: {actual} != {wanted}"
        )
PY

"$PY" -m py_compile contracts/verity_kernel.py
"$PY" -m py_compile tests/direct/test_verity_kernel.py

"$GENVM_LINT" lint contracts/verity_kernel.py
"$GENVM_LINT" validate contracts/verity_kernel.py
"$GENVM_LINT" check contracts/verity_kernel.py
"$GENVM_LINT" typecheck contracts/verity_kernel.py --strict
"$PY" -m pytest tests/direct -v \
  -W 'error:.*not picklable.*:RuntimeWarning' \
  -W 'error:.*LLM mock never matched.*:RuntimeWarning'

mkdir -p artifacts

"$GENVM_LINT" schema contracts/verity_kernel.py --output artifacts/verity_kernel.schema.json

SOURCE_SHA="$(shasum -a 256 contracts/verity_kernel.py | awk '{print $1}')"
SCHEMA_SHA="$(shasum -a 256 artifacts/verity_kernel.schema.json | awk '{print $1}')"

echo
echo "VERITY_KERNEL_BACKEND_LOCAL_GATE=PASS"
echo "SOURCE_SHA256=$SOURCE_SHA"
echo "SCHEMA_SHA256=$SCHEMA_SHA"
echo "GENVM_VERSION=$GENVM_VERSION"
echo "PY_GENLAYER=5jycge4q8k23462jtb0b9fyey1s9qz928sz2nbrd9mg4sxqg2qng"
echo "DEPLOYMENT_PERFORMED=NO"
echo "BLOCKCHAIN_WRITE_PERFORMED=NO"
echo "NEXT=Run the separate Studio Dev minimal deployment probe before freezing a VerityKernel deployment candidate."
