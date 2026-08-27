import type { PopulationEntry } from "../graph/queries/membership.ts"
import type { CheckConfig } from "./check-configs-types.ts"

const TS_POPULATION: readonly PopulationEntry[] = ["ts-file", "tsx-file"]

export const GRAPH_ARTIFACT_CHECKS: CheckConfig[] = [
  {
    name: "reverse-reachability-graph",
    rendersVerdict: false,
    dispatchNodeTypes: [...TS_POPULATION, "json-file", "sql-file"],
    dispatchNodes: [
      "ts-file:instructions:tools/lib/ci-test-fanout/compute-reverse-reachability.ts",
    ],
    backendOptions: {
      kubernetes: {
        resources: { requests: { memory: "2Gi" }, limits: { memory: "4Gi" } },
      },
    },
    commands: (ci) => [
      `mkdir -p /ci-storage/reverse-reachability && OUT=/ci-storage/reverse-reachability/${ci.inputsHash}.json && if [ -f "$OUT" ]; then echo "[reverse-reachability] cache hit: $OUT"; exit 0; fi && cd ${ci.workspace} && bun "$INSTRUCTIONS_ROOT/tools/lib/ci-test-fanout/compute-reverse-reachability.ts" --output "$OUT" --inputs-hash ${ci.inputsHash} --tree-sha ${ci.treeSha}`,
    ],
  },
]
