# VerityKernel v1 — Threat Model

| Threat | Control |
|---|---|
| Evidence substitution | Evidence stored once; resolve has no evidence argument |
| Policy rewrite | No edit/delete methods |
| Admin override | No owner/admin/verdict setter |
| Replay | Per-submitter nonce consumed once |
| Prompt injection | Policy/evidence explicitly marked untrusted and JSON-quoted |
| Hallucination | UNKNOWN is first-class; outside knowledge forbidden |
| Free-form disagreement | No reasoning is stored or compared |
| Malformed model output | Exact key/count/enum checks; no state update on failure |
| Leader manipulation | Validator independently recomputes vector |
| Ambiguity | Disagreement can block consensus; agreed UNKNOWN is INCONCLUSIVE |
| Known failure hidden by unknown | Known mismatch dominates UNKNOWN |
| Cross-contract bug | No cross-contract calls |
| EVM/ghost mismatch | No EVM/token dependency |
| Redirect/web provenance | No web access |
| Duplicate accepted message | No messages |
| Randomness manipulation | No randomness |
| Secret leakage | No secret field; evidence is public |
| Resource exhaustion | Explicit bounds; max 8 criteria |
| Case rewrite | One-way OPEN -> RESOLVED |
| Revision rewrite | New linked case; old case retained |
| Studio reset | Environment risk documented; state not treated as durable |
| Protocol/runtime bug | Pin exact RC family; cannot be eliminated by app code |
