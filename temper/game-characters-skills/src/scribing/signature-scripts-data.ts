import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SIGNATURE_SCRIPTS } from "../generated/temper-signature-script.generated"

export interface SignatureScriptTemplate {
  id: string
  name: string
  icon: string
  slotType: "signature-slot"
  itemId: number
  uespId: number
}

export const signatureScripts = createDataFile<SignatureScriptTemplate>()(TEMPER_SIGNATURE_SCRIPTS)

export type SignatureScriptId = (typeof signatureScripts.ids)[number]
