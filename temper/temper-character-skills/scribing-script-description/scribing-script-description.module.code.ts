import { getFromPartialRecord } from "@akasha/temper-formula-framework/record-parts"
import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import type {
  AffixVariantTemplate,
  SignatureVariantTemplate,
} from "../grimoire-template/grimoire-template.module.code.ts"
import { getScribedSkillByGrimoireAndFocus } from "../scribed-skills/scribed-skills.module.code.ts"
import { type GrimoireId, grimoires } from "../scribing-grimoires/scribing-grimoires.module.code.ts"

export function getCombinedScriptDescription(
  grimoireId: GrimoireId,
  focusScriptId: FocusScriptId,
  signatureScriptId?: SignatureScriptId,
  affixScriptId?: AffixScriptId
): string | null {
  const grimoire = grimoires.data[grimoireId]
  const skill = getScribedSkillByGrimoireAndFocus(grimoireId, focusScriptId)
  if (!skill) return null

  const parts: string[] = [skill.description]

  if (signatureScriptId != null) {
    const signatureVariant = getFromPartialRecord<SignatureVariantTemplate, SignatureScriptId>(
      grimoire.signatureScripts,
      signatureScriptId
    )
    if (!signatureVariant) return null
    parts.push(signatureVariant.description)
  }

  if (affixScriptId != null) {
    const affixVariant = getFromPartialRecord<AffixVariantTemplate, AffixScriptId>(
      grimoire.affixScripts,
      affixScriptId
    )
    if (!affixVariant) return null
    parts.push(affixVariant.description)
  }

  return parts.join("\n\n")
}
