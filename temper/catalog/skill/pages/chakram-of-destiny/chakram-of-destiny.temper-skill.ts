import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chakramOfDestiny = {
  id: "019e6245-a619-765a-b402-4b4becff383f",
  type: "page-type/temper-skill",
  slug: "chakram-of-destiny",
  title: "Chakram of Destiny",
  key: "chakram-of-destiny",
  baseName: "Chakram Shields",
  description:
    "Carve the Fate Crone's runes to create spinning mystical discs and generate Crux. Discs surround you or up to 4 allies in front of you, granting a shield that absorbs 3160 damage for 6 seconds. \n\nRecasting on a target already shielded grants a new shield that is 30% stronger.\n\nDiscs prefer your reticle target, or low-Health targets without shields.",
  icon: "/esoui/art/icons/ability_arcanist_015_a.dds",
  esoSkillId: 40186207,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 199,
  createdAt: "2026-05-26T03:13:12.217Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.255659 MaxStat - 0.0002063 MaxPower + 0.28433 (Ultimate, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
