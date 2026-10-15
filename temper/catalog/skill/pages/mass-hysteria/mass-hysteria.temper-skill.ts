import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const massHysteria = {
  id: "019e6245-a6c9-7ebc-8947-d498e132b2e4",
  type: "page-type/temper-skill",
  slug: "mass-hysteria",
  title: "Mass Hysteria",
  key: "mass-hysteria",
  baseName: "Aspect of Terror",
  description:
    "Summon a dark spirit to terrify all nearby enemies, causing them to cower in fear for 3 seconds and be afflicted with Major Cowardice for 10 seconds, reducing their Weapon and Spell Damage by 430.",
  icon: "/esoui/art/icons/ability_nightblade_016_a.dds",
  esoSkillId: 38075,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 804,
  createdAt: "2026-05-26T03:13:12.393Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = Major Cowardice (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 430 (Constant)",
  ],
} as const satisfies TemperSkill
