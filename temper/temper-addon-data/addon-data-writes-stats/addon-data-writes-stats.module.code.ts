import { generateTemperMetricTree } from "@akasha/temper-addon-generators/metric-tree"
import { TEMPER_STATS_OUTPUT_DIR } from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import type { AddonDataPages } from "../addon-data-pages/addon-data-pages.module.code.ts"

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
