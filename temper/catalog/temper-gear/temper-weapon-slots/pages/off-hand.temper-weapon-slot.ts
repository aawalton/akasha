import type { TemperWeaponSlot } from "akasha/temper/catalog/temper-gear/temper-weapon-slots/temper-weapon-slot.page-type.types.ts"

export const offHand = {
  id: "019e4caa-ef00-77d7-a5a0-f03b034f2845",
  pageTypeSlug: "temper-weapon-slot",
  type: "temper-weapon-slot",
  slug: "off-hand",
  title: "Off Hand",
  key: "off-hand",
  icon: "/resources/gearslot_offhand.png",
  displayOrder: 1,
} as const satisfies TemperWeaponSlot
