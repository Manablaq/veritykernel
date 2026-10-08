# VerityKernel

Universal consensus judgment primitive for GenLayer Studio Next.

## Status
Backend v1 local static + Direct Mode candidate certified. **Not deployed. Studio Dev validator-sandbox certification remains pending.**

## Core flow
1. Register immutable decision criteria.
2. Open a case with immutable bounded evidence.
3. Validators independently return `YES` / `NO` / `UNKNOWN` per criterion.
4. Contract computes `PASS` / `FAIL` / `INCONCLUSIVE` deterministically.

The LLM never directly controls the final verdict.

## Target
- Studio Dev / Studio Next preview
- `https://studio-dev.genlayer.com/api`
- chain ID `61997`
- Studio `v0.123.0-rc.7`
- GenVM Manager `v0.6.0-rc5`
- runner `v0.3.0`

## v1 safety scope
One contract. No web. No EVM. No tokens. No cross-contract calls. No messages.
No randomness. No owner/admin. No policy mutation. No verdict override.

## Setup
```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install --pre -r requirements.txt
npm install -g genlayer@0.40.0-rc.3
```

## Verify
```bash
./scripts/verify_backend.sh
```

Deployment automation is intentionally withheld until the static + Direct Mode
gates pass and a separate minimal Studio Dev fee-path deployment probe succeeds.
