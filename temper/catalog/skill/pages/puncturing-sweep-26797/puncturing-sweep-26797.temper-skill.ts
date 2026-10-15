import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const puncturingSweep26797 = {
  id: "019e6f53-a564-7604-bc31-0edd67e9b314",
  type: "page-type/temper-skill",
  slug: "puncturing-sweep-26797",
  title: "Puncturing Sweep",
  key: "puncturing-sweep-26797",
  baseName: "Puncturing Strikes",
  description:
    "Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals |cffffff3378|r Magic Damage per strike and reduces enemy Movement Speed by |cffffff40|r% for |cffffff0.5|r seconds.\n\nYou heal for |cffffff26|r% of the damage done with this ability.",
  icon: "/esoui/art/icons/ability_templar_reckless_attacks.dds",
  esoSkillId: 26797,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 945,
  createdAt: "2026-05-28T16:03:33.348Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.039598 MaxStat + 0.415783 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 40% (Constant)",
    "<<3>> = 0.5 seconds (Constant)",
    "<<4>> = 25% (Constant)",
  ],
} as const satisfies TemperSkill
