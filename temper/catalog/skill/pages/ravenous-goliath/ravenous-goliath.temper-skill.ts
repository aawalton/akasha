import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ravenousGoliath = {
  id: "019e6245-a6fd-7db3-a1dd-6ab6f8333f54",
  type: "page-type/temper-skill",
  slug: "ravenous-goliath",
  title: "Ravenous Goliath",
  key: "ravenous-goliath",
  baseName: "Bone Goliath Transformation",
  description:
    "Become a horrific Ravenous Goliath, increasing your Max Health by 30000 for 20 seconds and immediately restoring 30000 Health. \n\nWhile transformed, your damaging Light Attacks restore 319 Health and your fully-charged Heavy Attacks restore 800 Health. You deal 826 Magic Damage to nearby enemies every second and heal for that amount. These abilities scale off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_012_b.dds",
  esoSkillId: 40118279,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 985,
  createdAt: "2026-05-26T03:13:12.445Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Ravenous Goliath (Constant)",
    "<<2>> = 30000 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.02 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<6>> = 0.05165 Health (Health, RankMod(1.033), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
  ],
} as const satisfies TemperSkill
