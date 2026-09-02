import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperBuffMajor } from "@akasha/temper-addon-generators/temper-buff-major"
import { generateTemperBuffMinor } from "@akasha/temper-addon-generators/temper-buff-minor"
import { generateTemperBuffOther } from "@akasha/temper-addon-generators/temper-buff-other"
import { generateTemperDebuffMajor } from "@akasha/temper-addon-generators/temper-debuff-major"
import { generateTemperDebuffMinor } from "@akasha/temper-addon-generators/temper-debuff-minor"
import { generateTemperDebuffOther } from "@akasha/temper-addon-generators/temper-debuff-other"
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
