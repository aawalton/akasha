import type { TemperSignatureScript } from "akasha/temper/catalog/temper-skill/temper-signature-scripts/temper-signature-script.page-type.types.ts"

export const noSignatureScript = {
  id: "019e46b5-7e11-7dd2-9c07-3031b4b7eb69",
  type: "temper-signature-script",
  slug: "no-signature-script",
  title: "No Signature Script",
  key: "no-signature-script",
  itemId: 0,
  uespId: 0,
  slotType: "signature-slot",
} as const satisfies TemperSignatureScript
