import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const bastionOfLight = {
  id: "01a15ea7-5fea-75cb-8cf0-9966b6ff1d34",
  type: "page-type/temper-class-mastery",
  slug: "bastion-of-light",
  title: "Bastion of Light",
  key: "bastion-of-light",
  description:
    "Light consecrates the ground on which you tread.\n\nSacred Ground is now applied while you are in your own Nova and Spear Shards, and while Radial Sweep and Solar Barrage are active. While Sacred Ground is active, you heal for 3361 Health every 1 second. If you are at full Health after being healed from this effect while in combat, you also gain 2 Ultimate.",
  esoSkillId: 263585,
  class: "temper-class/templar",
  hashPlace: 25,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
