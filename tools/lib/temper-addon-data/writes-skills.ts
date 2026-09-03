import type { AddonDataPages } from "@akasha/temper-addon-data/addon-data-pages"
import { rendered } from "@akasha/temper-addon-data/failing-alone"
import { generateTemperCharacterSkillActivation } from "@akasha/temper-addon-generators/temper-character-skill-activation"
import { generateTemperGrimoire } from "@akasha/temper-addon-generators/temper-grimoire"
import { generateTemperScribedSkill } from "@akasha/temper-addon-generators/temper-scribed-skill"
import { generateTemperSkill } from "@akasha/temper-addon-generators/temper-skill"
import { TEMPER_SKILLS_OUTPUT_DIR } from "./output-dirs.ts"

export function buildAddonDataWritesSkills(
  p: AddonDataPages,
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-character-skill-activation.generated.ts", () =>
      generateTemperCharacterSkillActivation(p.characterSkillActivationPages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-grimoire.generated.ts", () =>
      generateTemperGrimoire(p.grimoirePages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-scribed-skill.generated.ts", () =>
      generateTemperScribedSkill(p.scribedSkillPages.rows)
    ),
    rendered(w, TEMPER_SKILLS_OUTPUT_DIR, "temper-skill.generated.ts", () =>
      generateTemperSkill(p.skillPages.rows)
    ),
  ]
}
