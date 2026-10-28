import type { TemperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.types.ts"

export const scribedSoulBurstPull = {
  id: "019e6471-15cb-7739-bb78-95e8311f0e04",
  type: "page-type/temper-scribed-skill",
  slug: "scribed-soul-burst-pull",
  title: "Leashing Burst",
  key: "scribed-soul-burst-pull",
  baseName: "Soul Burst",
  description:
    "After 2 seconds, pull enemies within 8 meters to you. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoAbilityId: 217979,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  focusScriptId: "temper-focus-script/pull",
  grimoireId: "temper-grimoire/soul-burst",
  hashPlace: 1686,
  createdAt: "2026-05-26T13:19:53.291Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperScribedSkill
