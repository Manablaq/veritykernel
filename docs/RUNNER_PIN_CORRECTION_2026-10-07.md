# Runner Pin Correction — 2026-10-07

The first verification run passed AST lint but semantic validation stopped
because the original scaffold used a `py-genlayer` pin from a later Studio
`main` checkout instead of the released Studio `v0.123.0-rc.7` tree.

Correct release provenance:

- Studio release commit: `a0300c398528f743465c4e060c80877ced3873c5`
- Studio tested tree: `7150e217a417af59fd1d1852f5f9573edad4ae9e`
- GenVM Manager: `v0.6.0-rc5`
- runner: `py-genlayer:5jycge4q8k23462jtb0b9fyey1s9qz928sz2nbrd9mg4sxqg2qng`

No contract logic or test expectation changed in this correction.
