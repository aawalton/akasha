import type { AffixScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import type { FocusScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SignatureScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"
import type { ScribedSkillId } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import type { GrimoireId } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

export interface ScribedSkill {
  skillId: ScribedSkillId
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
