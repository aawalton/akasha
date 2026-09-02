import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperDungeons } from "@akasha/temper-addon-generators/temper-dungeons"
import { TEMPER_DUNGEONS_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesDungeons(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_DUNGEONS_OUTPUT_DIR,
      "temper-dungeons.generated.ts",
      generateTemperDungeons(p.dungeonPages.rows, p.questGiverPages.rows)
    ),
  ]
}
