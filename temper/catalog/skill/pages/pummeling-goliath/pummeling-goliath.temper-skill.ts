import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pummelingGoliath = {
  id: "019e6245-a6f4-7515-b359-2be7a3b4d02b",
  type: "page-type/temper-skill",
  slug: "pummeling-goliath",
  title: "Pummeling Goliath",
  key: "pummeling-goliath",
  baseName: "Bone Goliath Transformation",
  description:
    "Become a destructive Pummeling Goliath, increasing your Max Health by 30000 for 20 seconds and immediately restoring 30000 Health. \n\nWhile transformed, your damaging Light Attacks restore 319 Health and your fully-charged Heavy Attacks restore 800 Health. This ability scales off your Max Health. \n\nYour Bash attacks can hit multiple targets in front of you and deal 1799 Physical Damage.",
  icon: "/esoui/art/icons/ability_necromancer_012_a.dds",
  esoSkillId: 40118664,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 940,
  createdAt: "2026-05-26T03:13:12.436Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Pummeling Goliath (Constant)",
    "<<2>> = 30000 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.02 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<6>> = 0.14227509 MaxStat + 1.4939246 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
