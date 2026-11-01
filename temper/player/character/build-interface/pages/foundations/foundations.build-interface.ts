import type { BuildInterface } from "akasha/temper/player/character/build-interface/build-interface.page-type.types.ts"

export const foundations = {
  id: "01a1989f-3244-790b-befa-268808bcfbfd",
  type: "page-type/build-interface",
  slug: "foundations",
  title: "Foundations",
  description:
    "What every build buys: its racial, class, weapon and armor passives, the crafting, Legerdemain, Thieves Guild and Dark Brotherhood passives, every passive champion star, and the riding and gathering stars slotted.",
  passiveLines: [
    "temper-skill-line/craft-alchemy",
    "temper-skill-line/craft-blacksmithing",
    "temper-skill-line/craft-clothing",
    "temper-skill-line/craft-enchanting",
    "temper-skill-line/craft-jewelry-crafting",
    "temper-skill-line/craft-provisioning",
    "temper-skill-line/craft-woodworking",
    "temper-skill-line/world-legerdemain",
    "temper-skill-line/guild-thieves-guild",
    "temper-skill-line/guild-dark-brotherhood",
  ],
  passiveLineCategories: [
    "temper-skill-line-category/racial",
    "temper-skill-line-category/character-class",
    "temper-skill-line-category/weapon",
    "temper-skill-line-category/armor",
  ],
  leftOutPassives: [
    "temper-skill/metallurgy",
    "temper-skill/stitching",
    "temper-skill/carpentry",
    "temper-skill/lapidary-research",
    "temper-skill/snakeblood",
  ],
  interfacePassives: [
    { skill: "temper-skill/continuous-attack", rank: 1 },
    { skill: "temper-skill/intimidating-presence", rank: 1 },
    { skill: "temper-skill/persuasive-will", rank: 1 },
    { skill: "temper-skill/keen-eye-treasure-chests", rank: 2 },
  ],
  everyPassiveStar: true,
  slottedStars: [
    "temper-champion-star/master-gatherer",
    "temper-champion-star/steeds-blessing",
    "temper-champion-star/gifted-rider",
    "temper-champion-star/war-mount",
  ],
  createdAt: "2026-11-01T19:38:52.355Z",
  updatedAt: "2026-11-01T19:38:52.355Z",
} as const satisfies BuildInterface
