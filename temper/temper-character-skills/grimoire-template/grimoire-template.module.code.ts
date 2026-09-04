import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

export interface SignatureVariantTemplate {
  scriptId: SignatureScriptId
  description: string
  classId?: ClassId
}

export interface AffixVariantTemplate {
  scriptId: AffixScriptId
  description: string
}

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
