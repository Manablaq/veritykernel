# Verifier Virtualenv Correction — 2026-10-07

The rc.7 runner provenance correction succeeded, then verification stopped
before semantic work because `scripts/verify_backend.sh` invoked the bare
`python` executable. The patch had been launched from a shell where the project
virtualenv was not active, so `python` was not present on `PATH`.

This is an invocation bug, not a contract, runner, linter, or consensus failure.

The verifier now resolves tools directly from the project virtualenv:

- `.venv/bin/python`
- `.venv/bin/genvm-lint`
- `python -m pytest`

It also rechecks the exact pinned package versions before any lint, validation,
schema, or Direct Mode test runs.

No contract source, storage layout, prompt, validator logic, verdict algorithm,
or test expectation changed.
