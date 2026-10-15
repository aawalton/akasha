import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pummelingGoliath118664 = {
  id: "019e6f53-a55d-7d50-b278-b5925572568b",
  type: "page-type/temper-skill",
  slug: "pummeling-goliath-118664",
  title: "Pummeling Goliath",
  key: "pummeling-goliath-118664",
  baseName: "Bone Goliath Transformation",
  description:
    "Become a destructive Pummeling Goliath, increasing your Max Health by |cffffff30000|r for |cffffff20|r seconds and immediately restoring |cffffff30000|r Health. \n\nWhile transformed, your damaging Light Attacks restore |cffffff402|r Health and your fully-charged Heavy Attacks restore |cffffff1005|r Health. This ability scales off your Max Health. \n\nYour Bash attacks can hit multiple targets in front of you and deal |cffffff6746|r Physical Damage.",
  icon: "/esoui/art/icons/ability_necromancer_012_a.dds",
  esoSkillId: 118664,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 941,
  createdAt: "2026-05-28T16:03:33.341Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Pummeling Goliath (Constant)",
    "<<2>> = 30000 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.02 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<6>> = 0.13773 MaxStat + 1.4462 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
