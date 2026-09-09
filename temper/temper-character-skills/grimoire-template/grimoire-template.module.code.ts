import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { AffixScriptId } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import type { FocusScriptId } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SignatureScriptId } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"
import type { SkillLineId } from "../../skill-lines/skill-lines/skill-lines.module.code.ts"

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
