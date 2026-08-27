import type { AffixScriptId } from "./affix-scripts-data"
import type { FocusScriptId } from "./focus-scripts-data"
import type { GrimoireId } from "./grimoires-data"
import type { ScribedSkillId } from "./scribed-skills-data"
import type { SignatureScriptId } from "./signature-scripts-data"

export interface ScribedSkill {
  skillId: ScribedSkillId
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
