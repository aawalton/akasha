import type { TemperSignatureScript } from "akasha/temper/catalog/temper-skill/temper-signature-scripts/temper-signature-script.page-type.types.ts"

export const huntersSnare = {
  id: "019e46b5-7e17-787b-94be-90ec9a26117e",
  type: "temper-signature-script",
  slug: "hunters-snare",
  title: "Hunter's Snare",
  key: "hunters-snare",
  icon: "/esoui/art/icons/scribing_secondary_snare.dds",
  itemId: 204573,
  uespId: 25,
  slotType: "signature-slot",
} as const satisfies TemperSignatureScript
