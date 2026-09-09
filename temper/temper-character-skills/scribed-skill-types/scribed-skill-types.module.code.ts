import type { AffixScriptId } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import type { FocusScriptId } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SignatureScriptId } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"
import type { ScribedSkillId } from "../scribed-skills/scribed-skills.module.code.ts"
import type { GrimoireId } from "../scribing-grimoires/scribing-grimoires.module.code.ts"

export interface ScribedSkill {
  skillId: ScribedSkillId
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
