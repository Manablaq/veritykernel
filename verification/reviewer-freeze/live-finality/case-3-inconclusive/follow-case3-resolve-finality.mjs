import fs from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const env = process.env;

function stop(message) {
  throw new Error(`STOP: ${message}`);
}

for (const name of [
  "NODE_MODULES",
  "RPC",
  "ADDRESS",
  "ACCOUNT_EXPECTED",
  "TX_HASH_EXPECTED",
  "FINAL_RECEIPT",
  "POLICY_COUNT_RAW",
  "CASE_COUNT_RAW",
  "CASE1_RAW",
  "CASE2_RAW",
  "CASE3_RAW",
  "CASE3_EVIDENCE_RAW",
  "CASE1_CERT",
  "CASE2_CERT",
  "CASE3_EVIDENCE_CERT",
  "CASE3_CERT",
  "CASE3_EVIDENCE_FINAL",
]) {
  if (!env[name]) {
    stop(`missing ${name}`);
  }
}

const require = createRequire(import.meta.url);

const sdkEntry = require.resolve(
  "genlayer-js",
  {
    paths: [
      env.NODE_MODULES,
    ],
  },
);

const chainsEntry = require.resolve(
  "genlayer-js/chains",
  {
    paths: [
      env.NODE_MODULES,
    ],
  },
);

const sdk =
  await import(
    pathToFileURL(
      sdkEntry,
    ).href,
  );

const chains =
  await import(
    pathToFileURL(
      chainsEntry,
    ).href,
  );

if (
  typeof sdk.createClient !== "function" ||
  typeof sdk.isSuccessful !== "function"
) {
  stop(
    "required genlayer-js exports unavailable",
  );
}

if (
  !chains.studioDevnet ||
  Number(chains.studioDevnet.id) !== 61997
) {
  stop(
    "Studio Dev chain mismatch",
  );
}

function safeJson(
  value,
  pretty = false,
) {
  return JSON.stringify(
    value,
    (_key, item) =>
      typeof item === "bigint"
        ? item.toString()
        : item,
    pretty ? 2 : 0,
  );
}

/*
 * Read-only client: no signer/account supplied.
 */
const client =
  sdk.createClient({
    chain:
      chains.studioDevnet,
    endpoint:
      env.RPC,
  });

if (
  typeof client.initializeConsensusSmartContract
    === "function"
) {
  await client.initializeConsensusSmartContract();
}

console.log(
  `FOLLOW_EXISTING_RESOLVE_TRANSACTION=${env.TX_HASH_EXPECTED}`,
);

console.log(
  "TRANSACTION_RESUBMITTED=NO",
);

console.log(
  "BLOCKCHAIN_WRITE_PERFORMED=NO",
);

console.log(
  "WAIT_UNTIL_FINALIZED=YES",
);

let receipt;

try {
  receipt =
    await client.waitForTransactionReceipt({
      hash:
        env.TX_HASH_EXPECTED,
      waitUntil:
        "finalized",
      retries:
        180,
      interval:
        5000,
      fullTransaction:
        true,
    });
} catch (error) {
  console.error(
    "FINALIZED_RECEIPT_WAIT_FAILED=YES",
  );

  console.error(
    error instanceof Error
      ? error.stack ?? error.message
      : String(error),
  );

  process.exit(41);
}

/*
 * Persist full finalized receipt before interpretation.
 */
fs.writeFileSync(
  env.FINAL_RECEIPT,
  safeJson(
    receipt,
    true,
  ) + "\n",
);

console.log(
  "FINALIZED_RECEIPT_PRESERVED=YES",
);

console.log(
  `FINALIZED_STATUS=${receipt.statusName ?? receipt.status ?? ""}`,
);

console.log(
  `FINALIZED_EXECUTION=${receipt.txExecutionResultName ?? receipt.txExecutionResult ?? ""}`,
);

console.log(
  `FINALIZED_RESULT_NAME=${receipt.result_name ?? ""}`,
);

if (
  !sdk.isSuccessful(
    receipt,
  )
) {
  stop(
    "finalized case:3 resolve receipt unsuccessful",
  );
}

console.log(
  "FINALIZED_TRANSACTION_SUCCESS=PASS",
);

async function readRawCase(caseId) {
  const raw =
    await client.readContract({
      address:
        env.ADDRESS,
      functionName:
        "get_case",
      args:
        [
          caseId,
        ],
    });

  if (
    typeof raw !== "string"
  ) {
    stop(
      `get_case ${caseId} did not return string`,
    );
  }

  return raw;
}

/*
 * Persist every raw state response before decoding.
 */
const policyCount =
  await client.readContract({
    address:
      env.ADDRESS,
    functionName:
      "get_policy_count",
    args:
      [],
  });

fs.writeFileSync(
  env.POLICY_COUNT_RAW,
  String(
    policyCount,
  ) + "\n",
);

const caseCount =
  await client.readContract({
    address:
      env.ADDRESS,
    functionName:
      "get_case_count",
    args:
      [],
  });

fs.writeFileSync(
  env.CASE_COUNT_RAW,
  String(
    caseCount,
  ) + "\n",
);

const case1Raw =
  await readRawCase(
    "case:1",
  );

fs.writeFileSync(
  env.CASE1_RAW,
  case1Raw + "\n",
);

const case2Raw =
  await readRawCase(
    "case:2",
  );

fs.writeFileSync(
  env.CASE2_RAW,
  case2Raw + "\n",
);

const case3Raw =
  await readRawCase(
    "case:3",
  );

fs.writeFileSync(
  env.CASE3_RAW,
  case3Raw + "\n",
);

const evidenceRaw =
  await client.readContract({
    address:
      env.ADDRESS,
    functionName:
      "get_case_evidence",
    args:
      [
        "case:3",
      ],
  });

if (
  typeof evidenceRaw !== "string"
) {
  stop(
    "get_case_evidence case:3 did not return string",
  );
}

fs.writeFileSync(
  env.CASE3_EVIDENCE_RAW,
  evidenceRaw + "\n",
);

console.log(
  `LIVE_POLICY_COUNT=${policyCount}`,
);

console.log(
  `LIVE_CASE_COUNT=${caseCount}`,
);

if (
  BigInt(
    String(
      policyCount,
    ),
  ) !== 1n
) {
  stop(
    "policy_count is not 1",
  );
}

if (
  BigInt(
    String(
      caseCount,
    ),
  ) !== 3n
) {
  stop(
    "case_count is not 3",
  );
}

/*
 * Decode only after raw persistence.
 */
const case1 =
  JSON.parse(
    case1Raw,
  );

const case2 =
  JSON.parse(
    case2Raw,
  );

const case3 =
  JSON.parse(
    case3Raw,
  );

const frozen1 =
  JSON.parse(
    fs.readFileSync(
      env.CASE1_CERT,
      "utf8",
    ),
  );

const frozen2 =
  JSON.parse(
    fs.readFileSync(
      env.CASE2_CERT,
      "utf8",
    ),
  );

const frozenEvidence =
  fs.readFileSync(
    env.CASE3_EVIDENCE_CERT,
    "utf8",
  ).replace(
    /\r?\n$/,
    "",
  );

if (
  safeJson(
    case1,
  ) !== safeJson(
    frozen1,
  )
) {
  stop(
    "case:1 changed during case:3 resolve lifecycle",
  );
}

if (
  safeJson(
    case2,
  ) !== safeJson(
    frozen2,
  )
) {
  stop(
    "case:2 changed during case:3 resolve lifecycle",
  );
}

const expectedEvidence =
  "Artifact alpha passed validation. No information about artifact beta is provided.";

if (
  frozenEvidence !== expectedEvidence ||
  evidenceRaw !== expectedEvidence
) {
  stop(
    "case:3 evidence mismatch",
  );
}

console.log(
  `CASE_3_STATUS=${String(case3.status ?? "")}`,
);

console.log(
  `CASE_3_POLICY_ID=${String(case3.policy_id ?? "")}`,
);

console.log(
  `CASE_3_CLIENT_NONCE=${String(case3.client_nonce ?? "")}`,
);

console.log(
  `CASE_3_SUBMITTER=${String(case3.submitter ?? "")}`,
);

console.log(
  `CASE_3_PARENT_CASE_ID=${String(case3.parent_case_id ?? "")}`,
);

console.log(
  `CASE_3_OUTCOME_VECTOR=${String(case3.outcome_vector ?? "")}`,
);

console.log(
  `CASE_3_VERDICT=${String(case3.verdict ?? "")}`,
);

console.log(
  `CASE_3_RESOLVED_BY=${String(case3.resolved_by ?? "")}`,
);

if (
  case3.case_id !== "case:3"
) {
  stop(
    "case:3 id mismatch",
  );
}

if (
  case3.policy_id !== "policy:1"
) {
  stop(
    "case:3 policy mismatch",
  );
}

if (
  case3.client_nonce
    !== "gate-h-inconclusive-v1"
) {
  stop(
    "case:3 client nonce mismatch",
  );
}

if (
  case3.parent_case_id !== ""
) {
  stop(
    "case:3 parent mismatch",
  );
}

if (
  String(
    case3.submitter ?? "",
  ).toLowerCase()
  !== env.ACCOUNT_EXPECTED.toLowerCase()
) {
  stop(
    "case:3 submitter mismatch",
  );
}

if (
  case3.status !== "RESOLVED"
) {
  stop(
    `case:3 expected RESOLVED, got ${String(case3.status)}`,
  );
}

if (
  case3.outcome_vector !== "YU"
) {
  stop(
    `case:3 expected outcome_vector YU, got ${String(case3.outcome_vector)}`,
  );
}

if (
  case3.verdict !== "INCONCLUSIVE"
) {
  stop(
    `case:3 expected verdict INCONCLUSIVE, got ${String(case3.verdict)}`,
  );
}

if (
  String(
    case3.resolved_by ?? "",
  ).toLowerCase()
  !== env.ACCOUNT_EXPECTED.toLowerCase()
) {
  stop(
    "case:3 resolved_by mismatch",
  );
}

/*
 * Freeze reviewer-facing canonical resolved state.
 */
fs.writeFileSync(
  env.CASE3_CERT,
  safeJson(
    case3,
    false,
  ) + "\n",
);

fs.writeFileSync(
  env.CASE3_EVIDENCE_FINAL,
  evidenceRaw + "\n",
);

console.log(
  "CASE_1_UNCHANGED=YES",
);

console.log(
  "CASE_2_UNCHANGED=YES",
);

console.log(
  "CASE_3_RESOLVED_STATE=PASS",
);

console.log(
  "CASE_3_OUTCOME_VECTOR_CERTIFIED=YU",
);

console.log(
  "CASE_3_VERDICT_CERTIFIED=INCONCLUSIVE",
);

console.log(
  "CASE_3_EVIDENCE_EXACT_MATCH=YES",
);

console.log(
  "RAW_CASE_RESPONSES_PRESERVED_BEFORE_DECODE=YES",
);

console.log(
  "RAW_EVIDENCE_RESPONSE_PRESERVED=YES",
);

console.log(
  "TRANSACTION_RESUBMITTED=NO",
);

console.log(
  "BLOCKCHAIN_WRITE_PERFORMED=NO",
);
