import { generateTemperAffixScript } from "@akasha/temper-addon-generators/temper-affix-script"
import { generateTemperCharacterSkillActivation } from "@akasha/temper-addon-generators/temper-character-skill-activation"
import { generateTemperFocusScript } from "@akasha/temper-addon-generators/temper-focus-script"
import { generateTemperGrimoire } from "@akasha/temper-addon-generators/temper-grimoire"
import { generateTemperScribedSkill } from "@akasha/temper-addon-generators/temper-scribed-skill"
import { generateTemperSignatureScript } from "@akasha/temper-addon-generators/temper-signature-script"
import { generateTemperSkill } from "@akasha/temper-addon-generators/temper-skill"
import { generateTemperSkillBar } from "@akasha/temper-addon-generators/temper-skill-bars"
import { generateTemperSkillPoint } from "./generators/temper-skill-point.ts"
import { generateTemperSkillSlot } from "@akasha/temper-addon-generators/temper-skill-slot"
import { generateTemperSkillType } from "@akasha/temper-addon-generators/temper-skill-type"
import { generateTemperSpecialEffectType } from "@akasha/temper-addon-generators/temper-special-effect-type"
import { generateTemperStatusEffectType } from "@akasha/temper-addon-generators/temper-status-effect-type"
import { generateTemperTargetScope } from "@akasha/temper-addon-generators/temper-target-scope"
import { generateTemperTargetType } from "@akasha/temper-addon-generators/temper-target-type"
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
      "temper-affix-script.generated.ts",
      generateTemperAffixScript(p.affixScriptPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-character-skill-activation.generated.ts",
      generateTemperCharacterSkillActivation(p.characterSkillActivationPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-focus-script.generated.ts",
      generateTemperFocusScript(p.focusScriptPages.rows)
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
      "temper-signature-script.generated.ts",
      generateTemperSignatureScript(p.signatureScriptPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-skill.generated.ts",
      generateTemperSkill(p.skillPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-skill-bars.generated.ts",
      generateTemperSkillBar(p.skillBarPages.rows)
    ),
    w(
      TEMPER_COMPLETION_OUTPUT_DIR,
      "temper-skill-point.generated.ts",
      generateTemperSkillPoint(p.skillPointPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-skill-slot.generated.ts",
      generateTemperSkillSlot(p.skillSlotPages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-skill-type.generated.ts",
      generateTemperSkillType(p.skillTypePages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-special-effect-type.generated.ts",
      generateTemperSpecialEffectType(p.specialEffectTypePages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-status-effect-type.generated.ts",
      generateTemperStatusEffectType(p.statusEffectTypePages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-target-scope.generated.ts",
      generateTemperTargetScope(p.targetScopePages.rows)
    ),
    w(
      TEMPER_SKILLS_OUTPUT_DIR,
      "temper-target-type.generated.ts",
      generateTemperTargetType(p.targetTypePages.rows)
    ),
  ]
}
