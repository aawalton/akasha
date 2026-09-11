import type { ScribedSkillId } from "akasha/temper/character-skills/scribed-skills/scribed-skills.module.code.ts"
import type { GrimoireId } from "akasha/temper/character-skills/scribing-grimoires/scribing-grimoires.module.code.ts"
import type { AffixScriptId } from "akasha/temper/skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import type { FocusScriptId } from "akasha/temper/skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SignatureScriptId } from "akasha/temper/skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"

export interface ScribedSkill {
  skillId: ScribedSkillId
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
