import type { PopulationEntry } from "../graph/queries/membership.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types"
import { VERIFICATION_SURFACE_CHECKS } from "./check-configs-verification-surface.ts"
import { PROSE_CARRIER_NODE_TYPES } from "./prose-mechanism-restatement.ts"

const TS_POPULATION: readonly PopulationEntry[] = ["ts-file", "tsx-file"]
const YAML_POPULATION: readonly PopulationEntry[] = ["yaml-file", "yml-file"]
const PACKAGE_POPULATION: readonly PopulationEntry[] = ["package"]

export const SOURCE_SCANNER_CHECKS: CheckConfig[] = [
  {
    name: "prose-mechanism-restatement",
    dispatchNodeTypes: [...PROSE_CARRIER_NODE_TYPES],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-prose-mechanism-restatement.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/prose-mechanism-restatement.ts",
      "ts-file:instructions:tools/lib/check-workflow/blank-comments.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/suppression-subject.ts",
      "json-file:code:infra/cluster-checks/src/lib/prose-mechanism-restatement.ratchet.json",
    ],
    script: "infra/cluster-checks/src/checks/check-prose-mechanism-restatement.ts",
  },
  {
    name: "generated-suffix",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-generated-suffix.cli.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-generated-suffix.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-generated-suffix.cli.ts",
  },
  {
    name: "porcelain-status-boundary",
    dispatchNodeTypes: [...TS_POPULATION, "sh-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-porcelain-status-boundary.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/porcelain-status-boundary.ts",
      "ts-file:instructions:infra/git-porcelain/src/parse-status.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-porcelain-status-boundary.ts",
  },
  {
    name: "dep-versions",
    dispatchNodeTypes: PACKAGE_POPULATION,
    dispatchNodes: ["json-file:code:package.json"],
    script: "infra/cluster-checks/src/checks/check-dep-versions.ts",
  },
  {
    name: "playwright-image-alignment",
    dispatchNodeTypes: [...PACKAGE_POPULATION, "json-file", "sh-file", "lock-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-playwright-image-alignment.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/playwright-image-alignment.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-playwright-image-alignment.ts",
  },
  {
    name: "unused-deps",
    dispatchNodeTypes: [
      ...TS_POPULATION,
      ...YAML_POPULATION,
      ...PACKAGE_POPULATION,
      "css-file",
      "sh-file",
      "dockerfile-file",
      "json-file",
      "lockfile-package",
      "lock-file",
    ],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-unused-deps.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-unused-deps-context.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-unused-deps-credit.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-unused-deps-types.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-unused-deps-usage.ts",
    ],
    backendOptions: {
      kubernetes: { resources: { requests: { cpu: "1500m" }, limits: { memory: "2Gi" } } },
    },
    script: "infra/cluster-checks/src/checks/check-unused-deps.ts",
    args: treeShaArgs,
  },
  {
    name: "tsconfig",
    alwaysRun: true,
    dispatchNodeTypes: [...PACKAGE_POPULATION, "json-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-tsconfig.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/check-tsconfig-allowlists.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/tsconfig-conventions.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/tsconfig-source-layout.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/tsconfig-import-graph.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/tsconfig-import-graph-rollup.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/tsconfig-rule-guidance.ts",
      "ts-file:instructions:tools/lib/check-workflow/functional-type.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tsconfig.ts",
    args: treeShaArgs,
  },
  {
    name: "phantom-deps",
    alwaysRun: true,
    dispatchNodeTypes: [...TS_POPULATION, ...PACKAGE_POPULATION],
    script: "infra/cluster-checks/src/checks/check-phantom-deps.ts",
    args: treeShaArgs,
  },
  {
    name: "verdict-emitter-chokepoint",
    dispatchNodeTypes: [{ kind: "ts-file", under: "infra/cluster-checks/src/checks" }],
    dispatchNodes: [
      "json-file:instructions:infra/cluster-checks/src/lib/verdict-emitter-chokepoint.config.json",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-verdict-emitter-chokepoint.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/verdict-emitter-chokepoint.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-verdict-emitter-chokepoint.ts",
  },
  {
    name: "client-page-access-boundary",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-client-page-access-boundary.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-client-page-access.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-client-page-access-boundary.ts",
  },
  {
    name: "properties-file-key-space",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-properties-file-key-space.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/properties-file-key-space.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-properties-file-key-space.ts",
  },
  ...VERIFICATION_SURFACE_CHECKS,
]
