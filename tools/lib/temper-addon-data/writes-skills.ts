import { generateTemperSkillLineCategory } from "./generators/skill-line-categories.ts"
import { generateTemperAffixScript } from "./generators/temper-affix-script.ts"
import { generateTemperCharacterSkillActivation } from "./generators/temper-character-skill-activation.ts"
import { generateTemperFocusScript } from "./generators/temper-focus-script.ts"
import { generateTemperGrimoire } from "./generators/temper-grimoire.ts"
import { generateTemperScribedSkill } from "./generators/temper-scribed-skill.ts"
import { generateTemperSignatureScript } from "./generators/temper-signature-script.ts"
import { generateTemperSkill } from "./generators/temper-skill.ts"
import { generateTemperSkillBar } from "./generators/temper-skill-bars.ts"
import { generateTemperSkillLine } from "./generators/temper-skill-line.ts"
import { generateTemperSkillPoint } from "./generators/temper-skill-point.ts"
import { generateTemperSkillSlot } from "./generators/temper-skill-slot.ts"
import { generateTemperSkillType } from "./generators/temper-skill-type.ts"
import { generateTemperSpecialEffectType } from "./generators/temper-special-effect-type.ts"
import { generateTemperStatusEffectType } from "./generators/temper-status-effect-type.ts"
import { generateTemperTargetScope } from "./generators/temper-target-scope.ts"
import { generateTemperTargetType } from "./generators/temper-target-type.ts"
import {
  TEMPER_COMPLETION_OUTPUT_DIR,
  TEMPER_SKILL_LINES_OUTPUT_DIR,
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
      TEMPER_SKILL_LINES_OUTPUT_DIR,
      "temper-skill-line.generated.ts",
      generateTemperSkillLine(p.skillLinePages.rows)
    ),
    w(
      TEMPER_SKILL_LINES_OUTPUT_DIR,
      "temper-skill-line-category.generated.ts",
      generateTemperSkillLineCategory(p.skillLineCategoryPages.rows)
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
