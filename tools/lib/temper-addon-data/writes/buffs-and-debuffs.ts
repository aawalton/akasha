import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperBuffMajor } from "../generators/temper-buff-major.ts"
import { generateTemperBuffMinor } from "../generators/temper-buff-minor.ts"
import { generateTemperBuffOther } from "../generators/temper-buff-other.ts"
import { generateTemperDebuffMajor } from "../generators/temper-debuff-major.ts"
import { generateTemperDebuffMinor } from "../generators/temper-debuff-minor.ts"
import { generateTemperDebuffOther } from "../generators/temper-debuff-other.ts"
import { TEMPER_SHARED_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesBuffsAndDebuffs(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_SHARED_OUTPUT_DIR,
      "temper-buff-major.generated.ts",
      generateTemperBuffMajor(p.buffMajorPages.rows)
    ),
    w(
      TEMPER_SHARED_OUTPUT_DIR,
      "temper-buff-minor.generated.ts",
      generateTemperBuffMinor(p.buffMinorPages.rows)
    ),
    w(
      TEMPER_SHARED_OUTPUT_DIR,
      "temper-buff-other.generated.ts",
      generateTemperBuffOther(p.buffOtherPages.rows)
    ),
    w(
      TEMPER_SHARED_OUTPUT_DIR,
      "temper-debuff-major.generated.ts",
      generateTemperDebuffMajor(p.debuffMajorPages.rows)
    ),
    w(
      TEMPER_SHARED_OUTPUT_DIR,
      "temper-debuff-minor.generated.ts",
      generateTemperDebuffMinor(p.debuffMinorPages.rows)
    ),
    w(
      TEMPER_SHARED_OUTPUT_DIR,
      "temper-debuff-other.generated.ts",
      generateTemperDebuffOther(p.debuffOtherPages.rows)
    ),
  ]
}
