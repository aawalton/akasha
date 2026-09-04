import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const puncturingSweep26797 = {
  id: "019e6f53-a564-7604-bc31-0edd67e9b314",
  pageTypeSlug: "temper-skill",
  slug: "puncturing-sweep-26797",
  title: "Puncturing Sweep",
  key: "puncturing-sweep-26797",
  baseName: "Puncturing Strikes",
  description:
    '"Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals |cffffff3378|r Magic Damage per strike and reduces enemy Movement Speed by |cffffff40|r% for |cffffff0.5|r seconds.\\n\\nYou heal for |cffffff26|r% of the damage done with this ability."',
  icon: "/esoui/art/icons/ability_templar_reckless_attacks.dds",
  esoSkillId: 26797,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
