import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { getFromPartialRecord } from "@akasha/temper-formula-framework/record-parts"
import { TEMPER_GRIMOIRES } from "../generated/temper-grimoire.generated"
import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { getScribedSkillByGrimoireAndFocus } from "./scribed-skills-data"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"

export interface GrimoireTemplate {
  id: string
  name: string
  icon: string
  abilityIcon: string
  skillLineId: SkillLineId
  itemId: number
  uespId: number
  compatibleFocusScripts: readonly FocusScriptId[]
  compatibleSignatureScripts: readonly SignatureScriptId[]
  compatibleAffixScripts: readonly AffixScriptId[]
  signatureScripts: Partial<Record<SignatureScriptId, SignatureVariantTemplate>>
  affixScripts: Partial<Record<AffixScriptId, AffixVariantTemplate>>
}

export interface SignatureVariantTemplate {
  scriptId: SignatureScriptId
  description: string
  classId?: ClassId
}

export interface AffixVariantTemplate {
  scriptId: AffixScriptId
  description: string
}

export const grimoires = createDataFile<GrimoireTemplate>()(TEMPER_GRIMOIRES)

export type GrimoireId = (typeof grimoires.ids)[number]

export function getGrimoireCompatibleScripts(grimoireId: GrimoireId): {
  focus: readonly FocusScriptId[]
  signature: readonly SignatureScriptId[]
  affix: readonly AffixScriptId[]
} {
  const grimoire = grimoires.data[grimoireId]
  return {
    focus: grimoire.compatibleFocusScripts,
    signature: grimoire.compatibleSignatureScripts,
    affix: grimoire.compatibleAffixScripts,
  }
}

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
