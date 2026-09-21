import type { AffixScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import type { FocusScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SignatureScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"
import type { SkillLineId } from "akasha/temper/character-skill-line/modules/skill-lines/skill-lines.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"

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
