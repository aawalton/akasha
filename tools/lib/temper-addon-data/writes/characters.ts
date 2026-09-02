import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperAlliance } from "@akasha/temper-addon-generators/temper-alliance"
import { generateTemperCharacterRole } from "@akasha/temper-addon-generators/temper-character-role"
import { generateTemperCurse } from "@akasha/temper-addon-generators/temper-curse"
import { generateTemperTargetArmor } from "@akasha/temper-addon-generators/temper-target-armor"
import { generateTemperVampireStage } from "@akasha/temper-addon-generators/temper-vampire-stage"
import { TEMPER_CHARACTER_OUTPUT_DIR } from "../output-dirs.ts"

export function buildAddonDataWritesCharacters(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_CHARACTER_OUTPUT_DIR,
      "temper-alliance.generated.ts",
      generateTemperAlliance(p.alliancePages.rows)
    ),
    w(
      TEMPER_CHARACTER_OUTPUT_DIR,
      "temper-target-armor.generated.ts",
      generateTemperTargetArmor(p.targetArmorPages.rows)
    ),
    w(
      TEMPER_CHARACTER_OUTPUT_DIR,
      "temper-vampire-stage.generated.ts",
      generateTemperVampireStage(p.vampireStagePages.rows)
    ),
    w(
      TEMPER_CHARACTER_OUTPUT_DIR,
      "temper-curse.generated.ts",
      generateTemperCurse(p.cursePages.rows)
    ),
    w(
      TEMPER_CHARACTER_OUTPUT_DIR,
      "temper-character-role.generated.ts",
      generateTemperCharacterRole(p.characterRolePages.rows)
    ),
  ]
}
