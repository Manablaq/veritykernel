# VerityKernel Backend Release Gates

A. Research freeze — exact network, RC family and runner pinned.

B. Architecture freeze — single contract, policy grammar, state machine,
replay, verdict algorithm and threat model frozen.

C. Static verification — lint, validate, check, strict typecheck, schema,
source SHA256 and schema SHA256.

D. Direct deterministic tests — IDs, storage, validation, replay, revisions,
lifecycle, bounds and forbidden-surface scan.

E. Direct nondeterministic/adversarial tests — PASS/FAIL/INCONCLUSIVE,
malformed model output, prompt injection, validator agreement/disagreement.
Strict mocks and pickling checks are mandatory. Direct Mode validates the normalized strict-equality invariant; real validator sandbox execution must still be certified on Studio Dev.

F. Studio Dev minimal deployment probe — same v0.3.0 runner and RC family.
Do not bypass fee/config failures with undocumented transaction construction.

G. VerityKernel deployment — one frozen candidate, record tx identity before
polling, no blind resend, require consensus success and FINISHED_WITH_RETURN.

H. Full multi-validator behavioral matrix — never leader-only for certification.

I. Finality — irreversible reviewer claims require FINALIZED.

J. Final freeze — remove protocol upgrader authority, freeze git/source/schema/
address/tx/toolchain/raw evidence and create reviewer handoff. Frontend starts
after backend freeze.
