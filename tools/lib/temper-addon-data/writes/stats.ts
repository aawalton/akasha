import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperMetricTree } from "@akasha/temper-addon-generators/metric-tree"
import { TEMPER_STATS_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesStats(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_STATS_OUTPUT_DIR,
      "metric-tree.generated.ts",
      generateTemperMetricTree(p.metricTreePages.rows)
    ),
  ]
}
