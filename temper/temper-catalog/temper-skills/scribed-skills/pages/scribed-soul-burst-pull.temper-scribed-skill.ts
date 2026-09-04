import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstPull = {
  id: "019e6471-15cb-7739-bb78-95e8311f0e04",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-pull",
  title: "Leashing Burst",
  key: "scribed-soul-burst-pull",
  baseName: "Soul Burst",
  description:
    "After 2 seconds, pull enemies within 8 meters to you. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217979,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "pull",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
