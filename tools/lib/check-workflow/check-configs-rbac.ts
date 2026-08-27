import type { PopulationEntry, ScopedPopulation } from "../graph/queries/membership.ts"
import type { CheckConfig } from "./check-configs-types"

const CLUSTER_RBAC_MODULES: ScopedPopulation = {
  kind: "ts-file",
  under: "tools/lib/cluster-rbac",
}

const PROFILE_POPULATION: readonly PopulationEntry[] = ["namespace-role"]

export const RBAC_CHECKS: CheckConfig[] = [
  {
    name: "rbac-check",
    dispatchNodeTypes: [...PROFILE_POPULATION, CLUSTER_RBAC_MODULES],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-rbac-escalation.ts",
      "ts-file:instructions:tools/lib/cluster-rbac/rules.ts",
    ],
    script: "tools/commands/check-rbac-escalation.ts",
  },
  {
    name: "rbac-check-manifests",
    dispatchNodeTypes: ["workflow", "ts-file"],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-rbac-manifests.ts",
      "ts-file:instructions:tools/lib/cluster-rbac/applies.ts",
      "ts-file:instructions:tools/lib/cluster-rbac/kinds.ts",
    ],
    script: "tools/commands/check-rbac-manifests.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
  {
    name: "rbac-check-pipelines",
    dispatchNodeTypes: ["workflow", ...PROFILE_POPULATION, CLUSTER_RBAC_MODULES],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-rbac-pipelines.ts",
      "ts-file:instructions:tools/lib/cluster-rbac/kubectl.ts",
    ],
    script: "tools/commands/check-rbac-pipelines.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
  {
    name: "rbac-check-cluster-resource-names",
    dispatchNodeTypes: ["ts-file"],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-rbac-cluster-resource-names.ts",
      "ts-file:instructions:tools/lib/cluster-rbac/rules.ts",
    ],
    script: "tools/commands/check-rbac-cluster-resource-names.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
  {
    name: "rbac-check-cluster-grants",
    dispatchNodeTypes: ["ts-file"],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-rbac-cluster-grants.ts",
      "ts-file:instructions:tools/lib/cluster-rbac/kinds.ts",
    ],
    script: "tools/commands/check-rbac-cluster-grants.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
]
