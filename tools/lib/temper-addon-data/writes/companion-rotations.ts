import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperRotationBreakdownRow } from "../generators/temper-rotation-breakdown-row.ts"
import { TEMPER_COMPANIONS_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesCompanionRotations(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_COMPANIONS_OUTPUT_DIR,
      "temper-rotation-breakdown-row.generated.ts",
      generateTemperRotationBreakdownRow(p.rotationBreakdownRowPages.rows)
    ),
  ]
}
