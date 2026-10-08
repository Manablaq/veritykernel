# VerityKernel v1 — Architecture Freeze

VerityKernel is a reusable, standalone GenLayer judgment primitive.

A policy creator registers an immutable bounded rubric. A case submitter freezes
bounded evidence against one policy. GenLayer validators independently evaluate
the same frozen evidence against the same frozen criteria. The contract computes
the application verdict deterministically.

## v1 exclusions

- arbitrary web access
- EVM/token interaction
- cross-contract calls
- messages
- randomness
- admin/owner roles
- policy mutation
- case deletion
- verdict override
- authoritative free-form AI reasoning

## Policy grammar

A policy has 1-8 criteria. Each criterion contains `text` and an expected value
of `YES` or `NO`. The evaluator may output `YES`, `NO`, or `UNKNOWN`.

## Case lifecycle

`OPEN -> RESOLVED`

Resolved verdicts: `PASS`, `FAIL`, `INCONCLUSIVE`.

Evidence is written once when the case is opened. Resolution accepts no
replacement evidence.

## Consensus

The leader returns only the decision vector. Validators independently execute
the same evaluator. The custom validator accepts only an exactly matching
`Y/N/U` vector. Reasoning is neither requested nor authoritative.

## Deterministic verdict

- any known criterion mismatch -> FAIL
- otherwise any UNKNOWN -> INCONCLUSIVE
- otherwise -> PASS

## Replay

`submitter_address | client_nonce` is single-use.

## Revisions

A revision is a new case linked to a resolved parent. The parent must have the
same submitter and policy. Existing cases never mutate.

## Resolution sponsorship

Any account may pay to resolve an OPEN case because the resolver cannot change
the frozen policy, evidence, submitter, nonce, or parent linkage.

## Application bounds

- title: 80 chars
- criteria: 8
- criterion: 320 chars
- policy JSON: 4096 chars
- evidence: 4096 chars
- nonce: 64 chars
- one LLM call per resolution
- zero web requests/messages/cross-contract calls
