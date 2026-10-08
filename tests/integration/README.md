# Integration verification

Studio Dev deployment and live-finality certification are complete.

The certified live-network artifacts are preserved under:

- `verification/reviewer-freeze/live-finality/`
- `verification/reviewer-freeze/final-evidence-r1/`

The frozen Gate H matrix covers PASS, FAIL, INCONCLUSIVE, and PROMPT_INJECTION
paths with finalized state evidence. Raw responses were persisted before
decoding in the certified workflows.

This directory intentionally does not duplicate the frozen live evidence as a
second mutable integration harness.
