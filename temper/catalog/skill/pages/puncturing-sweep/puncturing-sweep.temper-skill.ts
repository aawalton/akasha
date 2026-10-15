import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const puncturingSweep = {
  id: "019e6245-a6f5-76e1-a6db-eabfb1cf9985",
  type: "page-type/temper-skill",
  slug: "puncturing-sweep",
  title: "Puncturing Sweep",
  key: "puncturing-sweep",
  baseName: "Puncturing Strikes",
  description:
    "Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals 919 Magic Damage per strike and reduces enemy Movement Speed by 40% for 0.5 seconds.\n\nYou heal for 25% of the damage done with this ability.",
  icon: "/esoui/art/icons/ability_templar_reckless_attacks.dds",
  esoSkillId: 27207,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 944,
  createdAt: "2026-05-26T03:13:12.437Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.040904734 MaxStat + 0.429503839 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 40% (Constant)",
    "<<3>> = 0.5 seconds (Constant)",
    "<<4>> = 25% (Constant)",
  ],
} as const satisfies TemperSkill
