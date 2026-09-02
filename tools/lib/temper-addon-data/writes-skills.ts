import { generateTemperCharacterSkillActivation } from "@akasha/temper-addon-generators/temper-character-skill-activation"
import { generateTemperGrimoire } from "@akasha/temper-addon-generators/temper-grimoire"
import { generateTemperScribedSkill } from "@akasha/temper-addon-generators/temper-scribed-skill"
import { generateTemperSkill } from "@akasha/temper-addon-generators/temper-skill"
import { generateTemperSkillPoint } from "@akasha/temper-addon-generators/temper-skill-point"
import {
  TEMPER_COMPLETION_OUTPUT_DIR,
  TEMPER_SKILLS_OUTPUT_DIR,
} from "./output-dirs.ts"
import type { AddonDataPages } from "./addon-data-pages"

export function buildAddonDataWritesSkills(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-character-skill-activation.generated.ts",
      generateTemperCharacterSkillActivation(p.characterSkillActivationPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-grimoire.generated.ts",
      generateTemperGrimoire(p.grimoirePages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-scribed-skill.generated.ts",
      generateTemperScribedSkill(p.scribedSkillPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-skill.generated.ts",
      generateTemperSkill(p.skillPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "temper-skill-point.generated.ts",
      generateTemperSkillPoint(p.skillPointPages.rows)
    ),
  ]
}
