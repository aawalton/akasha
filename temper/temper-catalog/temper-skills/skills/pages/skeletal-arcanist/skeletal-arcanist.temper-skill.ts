import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const skeletalArcanist = {
  id: "019e6245-a733-78e7-9960-288212aa88bf",
  pageTypeSlug: "temper-skill",
  slug: "skeletal-arcanist",
  title: "Skeletal Arcanist",
  key: "skeletal-arcanist",
  baseName: "Skeletal Mage",
  description:
    '"Unearth a skeletal mage from the dirt to fight by your side for 20 seconds, while granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%. The mage attacks the closest enemy every 2 seconds, dealing 478 Shock Damage to them and all other enemies nearby.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_003_b.dds",
  esoSkillId: 40118726,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
