# VerityKernel Local Certification — 2026-10-07

## Certified candidate

Contract SHA-256:

`48d19772440134a0eebe5511f6f6cacaffec977fe10bfd46594dc132f9f8c37d`

Direct Mode test SHA-256:

`e84cb2a8fda5eda73c9576d51e3385f439b0258cb1d85244c490e90f311521de`

Consensus API:

`gl.eq_principle.strict_eq`

The LLM output is validated and normalized to a bounded `Y`, `N`, or `U`
decision vector before strict equality is used.

## Local gates

The candidate passed:

- lint
- validation
- combined check
- strict typecheck
- schema generation
- 31 / 31 Direct Mode tests
- prompt-injection regression
- malformed LLM response rejection
- PASS / FAIL / INCONCLUSIVE paths
- replay protection
- immutable policy and evidence behavior
- revision constraints
- strict mock checks
- cloudpickle closure checks

## Direct Mode limitation

`genlayer-test==0.30.0rc2` does not faithfully emulate the rc.5
`spawn_sandbox` sub-VM result envelope used internally by
`gl.eq_principle.strict_eq`.

Direct Mode therefore verifies the exact normalized equality invariant by
rerunning the captured leader function with agreeing and disagreeing mocks.

This is not a substitute for real validator-sandbox certification.

## Pending Studio Dev certification

Still required:

- minimal Studio Dev deployment probe
- actual VerityKernel deployment
- real validator sandbox execution
- validator agreement
- validator disagreement
- successful GenLayer execution
- appeal/finality progression
- terminal FINALIZED status

No deployment or blockchain write was performed during local certification.
