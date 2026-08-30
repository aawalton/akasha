export const ALLOWLISTED_REPO_WIDE_TS_SCANNERS: ReadonlyMap<string, string> = new Map([
  ["typecheck", "tsc -b runs the project-references build over every TS file in the monorepo."],
  [
    "test-step-paths",
    "Validates per-workspace test-step coverage; the set of test files is over every *.test.ts[x] across the repo.",
  ],
  [
    "reverse-reachability-graph",
    "Produces the per-file reverse reachability artifact consumed by every generated test step; must rebuild whenever any TS source changes.",
  ],
  [
    "functional-type",
    "Validates the functionalType rank-monotonicity rule across every cross-package TS import in the monorepo.",
  ],

  [
    "prose-mechanism-restatement",
    "A doc comment transcribing a function's field set can be written into any source file by anyone, and that is where the population went: the markdown this was seeded on carried no restatement at all while twenty-six stood in comments across agents/, alanwalton/, infra/, shared/ and temper/. A path-scoped population would decide in advance which packages are allowed to keep a second carrier for a fact the type owns.",
  ],
  [
    "unused-deps",
    "Intentional: rereads every importer of every workspace package; tightening would risk stale dep accuracy (comment in source).",
  ],
  [
    "phantom-deps",
    "Walks every TS/TSX import in every workspace to detect phantom (undeclared) dependency usage.",
  ],
  [
    "start-script",
    "Per-record predicate over the ts-file population; only the `synth.ts` files the shared discovery globs match are evaluated for `bun run start` container commands, but those can land anywhere in the repo.",
  ],
  [
    "rbac-check-manifests",
    "Reads the content of every manifest a `pipeline-engine` step applies by running the `synth.ts` that emits it (#18631) — the applied files are gitignored `*.generated.yaml` written at CI time, so a synth source is where a change to what is applied arrives, and one can land in any package.",
  ],
  [
    "rbac-check-cluster-resource-names",
    "Runs every discovered `synth.ts` and judges the cluster-scoped RBAC names it emits, so a violation arrives in a synth source; the six discovery globs bottom out at `*/*/deploy/k8s/synth.ts`, so one can land in any package and no prefix selects fewer. The yaml population this replaced named the gitignored `*.generated.yaml`, which has no graph node, so the check woke on 0 of the 50 synth sources it reads (#18630).",
  ],
  [
    "rbac-check-cluster-grants",
    "Same population and same measurement as `rbac-check-cluster-resource-names` above: it runs every discovered `synth.ts` and classifies the kinds emitted, an unmodeled kind or a missing create+patch grant arriving in a synth source that can sit in any package.",
  ],
  [
    "syntax-bundle",
    "Coalesces the pure-AST scanners of SYNTAX_SCANNER_ENTRIES (../lib/scanner-registry) over the universal TS/TSX population — repo-wide by construction.",
  ],
  [
    "mock-module-surface",
    "Walks every `mock.module(...)` call in every `**/*.test.ts[x]` across the repo.",
  ],
  [
    "mock-module-leak",
    "Walks every `mock.module(...)` call and its co-resident sibling imports across every `**/*.test.ts[x]` in the repo.",
  ],
  [
    "k8s-node-selector",
    "Intentional: scans every TS/TSX file for forbidden `kubernetes.io/hostname` string literals (comment in source).",
  ],

  [
    "no-hardcoded-surface",
    "A `bg-surface-N` class string is worth catching wherever it is written, and it is as often written in a `.ts` module a component imports — a hook's toast defaults, a shared constants file — as in the component itself, so narrowing the population by extension would only decide in advance which half of the same act is allowed.",
  ],

  [
    "cli-json-contract-coupling",
    "Walks every `*.test.ts[x]` in the repo for `.strict()` contract schemas with no producer typecheck coupling, and the relative modules the CI-excluded ones import such a schema from; either the test or the module it hoisted the schema into can be written anywhere.",
  ],
  [
    "client-page-access-boundary",
    "Repo-wide walk of every TS/TSX file gated by a leading `use client` prefilter — app `app/` dirs and shared packages alike.",
  ],
  [
    "color-literals",
    "Scans every app source file for hand-rolled color literals across the TS/TSX/CSS populations.",
  ],
  [
    "generated-suffix",
    "Walks every TS/TSX file: a machine-provenance header block can be written in any source file, and the naming rule is about that header.",
  ],
  [
    "guarded-resolve",
    "A guard over a statically-resolvable tracked path can be written in any TS/TSX file, so any TS edit can introduce one; the run itself narrows to the change via `resolveChangeClosure`, but the tracked set it resolves against stays the whole `discoverRepoFiles` population.",
  ],
  [
    "porcelain-status-boundary",
    "Walks every tracked source file to confine `git status` machine-readable acquisition to one module.",
  ],
  [
    "properties-file-key-space",
    "AST walk over every TS/TSX string literal and the comment trivia beside it; a `--properties-file` key-space claim can be written in any command's help text, or in a comment over the field that carries the map.",
  ],
  [
    "instruction-references",
    "A citation of an instructions-repo document is prose, not an import, so it can be written into any TS file and nothing structural marks where one may appear. The sweep that founded this check took fifty-five references out of twenty-four files in four shapes — test names, runtime error messages, ast-unused pragma prose and fixtures — spread across agents/, alanwalton/, infra/ and shared/, so no prefix covers them short of the repository root, which selects no fewer files than the unscoped population.",
  ],
])
