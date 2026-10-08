# VerityKernel Reviewer Submission

## Project

VerityKernel — Universal Consensus Judgment Protocol on GenLayer.

Public repository:

- https://github.com/Manablaq/veritykernel

## Deployment

- Network: Studio Dev
- RPC: https://studio-dev.genlayer.com/api
- Chain ID: 61997
- Contract: `0xfE1259176227c240cFBdA791aec99EdaE935Fc09`
- Deployment transaction: `0x01086cea1374a4952cd7a565a7f4c9ea09f97e1bc3595a4f9346eab14f4a1b87`

## Frozen source

- Contract source: `contracts/verity_kernel.py`
- Contract SHA256: `48d19772440134a0eebe5511f6f6cacaffec977fe10bfd46594dc132f9f8c37d`
- Initial reviewer-freeze commit: `f3b10b8c4f2876b5689648ae2b3e0dc53360281e`
- Initial reviewer-freeze tree: `7c76f15ccb2356667f0fedb6ab0b03b6136d8dbb`

The initial reviewer-freeze commit is intentionally preserved in Git history. The evidence under
`verification/reviewer-freeze/` is not rewritten by this documentation update.

## Gate H live-finality matrix

| Case | Expected vector | Final verdict | Status |
| --- | --- | --- | --- |
| PASS | `YN` | `PASS` | Complete |
| FAIL | `NN` | `FAIL` | Complete |
| INCONCLUSIVE | `YU` | `INCONCLUSIVE` | Complete |
| PROMPT_INJECTION | `YN` | `PASS` | Complete |

The prompt-injection case demonstrates that adversarial evidence text did not override the immutable policy.

## Prompt-injection finality

- Open transaction: `0xeb53da90fe7f7dc4d85bfaa2f9706a73d426f8be0156230013efa915251312b2`
- Resolve transaction: `0x8f79eedd287a78716b7d5f4d2979c873341ecb0558b7cdc9d5cbc2fffbb9307a`
- Final state: `RESOLVED`
- Final outcome vector: `YN`
- Final verdict: `PASS`

## Reviewer evidence

Primary reviewer-freeze paths:

- `verification/reviewer-freeze/final-evidence-r1/FINAL_REVIEWER_FREEZE.txt`
- `verification/reviewer-freeze/final-evidence-r1/freeze-manifest.json`
- `verification/reviewer-freeze/final-evidence-r1/SHA256SUMS.txt`
- `verification/reviewer-freeze/final-evidence-r1/files/`
- `verification/reviewer-freeze/live-finality/`

The live-finality evidence includes persisted raw responses before decoding, finalized transaction receipts,
certified case state, evidence text, and the policy/matrix snapshots.

## Final backend state

- PASS case: complete
- FAIL case: complete
- INCONCLUSIVE case: complete
- PROMPT_INJECTION case: complete
- Final evidence freeze: complete
- Additional blockchain writes required: none

No contract source change, redeployment, or blockchain write is performed by this documentation commit.
