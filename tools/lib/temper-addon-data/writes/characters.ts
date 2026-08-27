import type { AddonDataPages } from "../addon-data-pages.ts"
import { generateTemperClass } from "../generators/classes.ts"
import { generateTemperAlliance } from "../generators/temper-alliance.ts"
import { generateTemperCharacterRole } from "../generators/temper-character-role.ts"
import { generateTemperCurse } from "../generators/temper-curse.ts"
import { generateTemperRace } from "../generators/temper-race.ts"
import { generateTemperTargetArmor } from "../generators/temper-target-armor.ts"
import { generateTemperVampireStage } from "../generators/temper-vampire-stage.ts"
import {
  TEMPER_CHARACTER_OUTPUT_DIR,
  TEMPER_CLASSES_OUTPUT_DIR,
  TEMPER_RACES_OUTPUT_DIR,
} from "../output-dirs.ts"

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
    w(TEMPER_CLASSES_OUTPUT_DIR, "classes.generated.ts", generateTemperClass(p.classPages.rows)),
    w(TEMPER_RACES_OUTPUT_DIR, "temper-race.generated.ts", generateTemperRace(p.racePages.rows)),
  ]
}
