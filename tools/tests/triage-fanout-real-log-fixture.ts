export const REAL_INTERLEAVED_FANOUT_LOG: readonly string[] = [
  "[run-typed-tests] unit: 258 test-bearing workspace(s), fan-out -P 12",
  "[run-workspace-tests] packages/alanwalton/daily-tracking-cli: running all 13 eligible test file(s)",
  "src/cardio-ingest.unit.test.ts:",
  "(pass) locationBatchSchema > rejects a batch over the cap [30.35ms]",
  "app/lib/location-capture.unit.test.ts:",
  "[run-workspace-tests] packages/alanwalton/elaine-points: running all 1 eligible test file(s)",
  "(pass) cardio-ingest exit status reports what the run DID > no relay file → exit 3, not 0 [34.17ms]",
  "(pass) cardio-ingest exit status reports what the run DID > unreachable macbook → exit 3, not 0 [0.42ms]",
  "src/delete.unit.test.ts:",
  "(fail) cardio-ingest exit status reports what the run DID > the two outcomes are distinguishable — the whole point [0.25ms]",
  "      at async <anonymous> (/ci-storage/checkouts/47134298efc5eaacbffdbd08be19badec8377e52/packages/alanwalton/daily-tracking-cli/src/cardio-ingest.unit.test.ts:60:25)",
  "(fail) cardio-ingest exit status reports what the run DID > a real relay file → exit 0 [0.67ms]",
  "      at async <anonymous> (/ci-storage/checkouts/47134298efc5eaacbffdbd08be19badec8377e52/packages/alanwalton/daily-tracking-cli/src/cardio-ingest.unit.test.ts:50:24)",
  "[run-workspace-tests] packages/alanwalton/email/resolver: running all 3 eligible test file(s)",
  "Ran 7 tests across 1 file. [71.00ms]",
  " 7 expect() calls",
  " 0 fail",
  " 7 pass",
  "src/switch.unit.test.ts:",
  "Ran 112 tests across 13 files. [682.00ms]",
  " 177 expect() calls",
  " 2 fail",
  " 110 pass",
  "(fail) cardio-ingest exit status reports what the run DID > the two outcomes are distinguishable — the whole point [0.25ms]",
  "(fail) cardio-ingest exit status reports what the run DID > a real relay file → exit 0 [0.67ms]",
  "2 tests failed:",
]

export const REAL_OWNER_FILE_HEADER = "src/cardio-ingest.unit.test.ts"

export const REAL_MISATTRIBUTED_FILES: readonly string[] = [
  "src/delete.unit.test.ts",
  "src/switch.unit.test.ts",
]

export const REAL_MISATTRIBUTED_WORKSPACES: readonly string[] = [
  "packages/alanwalton/elaine-points",
  "packages/alanwalton/email/resolver",
]
