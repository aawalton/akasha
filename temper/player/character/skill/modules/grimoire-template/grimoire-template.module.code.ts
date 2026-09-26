import type {
  AffixScriptId,
  FocusScriptId,
  SignatureScriptId,
} from "akasha/temper/catalog/skill/temper-script/modules/script-ids/script-ids.data-table.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import type { SkillLineId } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"

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
