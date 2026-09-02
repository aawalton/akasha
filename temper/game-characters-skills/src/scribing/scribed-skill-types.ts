import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { GrimoireId } from "./grimoires-data"
import type { ScribedSkillId } from "./scribed-skills-data"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"

export interface ScribedSkill {
  skillId: ScribedSkillId
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  signatureScriptId: SignatureScriptId
  affixScriptId: AffixScriptId
}
