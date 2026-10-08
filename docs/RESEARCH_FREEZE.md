# Studio Next Research Freeze — 2026-10-05

## Network
- canonical RPC: `https://studio-dev.genlayer.com/api`
- chain ID: `61997`
- Studio Next may be a browser alias for Studio Dev
- preview state/availability is not durable

## Frozen RC family
- Studio `v0.123.0-rc.7`
- CLI `v0.40.0-rc.3`
- genlayer-js `v2.0.0-rc.1`
- genlayer-py `v0.19.0-rc.2`
- genlayer-test `v0.30.0rc2`
- genvm-linter `v0.11.1rc2`
- runner line `# v0.3.0`
- GenVM Manager bundle `v0.6.0-rc5`
- py-genlayer `5jycge4q8k23462jtb0b9fyey1s9qz928sz2nbrd9mg4sxqg2qng`

Do not mix this with stable Studionet packages or chain ID 61999.

## Checked references
- docs.genlayer.com/developers/networks
- docs.genlayer.com/developers/consensus-v06-migration
- docs.genlayer.com/developers/intelligent-contracts/testing
- docs.genlayer.com/developers/intelligent-contracts/features/non-determinism
- docs.genlayer.com/developers/intelligent-contracts/features/calling-llms
- docs.genlayer.com/developers/intelligent-contracts/features/storage
- docs.genlayer.com/developers/intelligent-contracts/features/error-handling
- GenLayer Studio rc.7 release
- current Studio v0.3.0 example contracts
- matching package releases

A successful outer EVM receipt is never sufficient certification evidence.

## Runner provenance correction — 2026-10-07

The original scaffold accidentally copied the `py-genlayer` pin from the later
Studio `main` branch. The released Studio `v0.123.0-rc.7` tag resolves to commit
`a0300c398528f743465c4e060c80877ced3873c5` / tested tree
`7150e217a417af59fd1d1852f5f9573edad4ae9e`.

That release's own v0.3.0 example contracts pin:

`py-genlayer:5jycge4q8k23462jtb0b9fyey1s9qz928sz2nbrd9mg4sxqg2qng`

The same release notes state that Studio rc.7 uses GenVM Manager
`v0.6.0-rc5`. Verification is explicitly pinned to that GenVM bundle.
