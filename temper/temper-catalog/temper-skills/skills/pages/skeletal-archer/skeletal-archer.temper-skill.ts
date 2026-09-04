import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const skeletalArcher = {
  id: "019e6245-a734-7a61-9189-de56b3b13702",
  pageTypeSlug: "temper-skill",
  slug: "skeletal-archer",
  title: "Skeletal Archer",
  key: "skeletal-archer",
  baseName: "Skeletal Mage",
  description:
    '"Unearth a skeletal archer from the dirt to fight by your side for 20 seconds, while granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%. The archer attacks the closest enemy every 2 seconds, dealing 463 Physical Damage.\\n\\nEach time the archer deals damage, it deals 15% more damage than the previous attack.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_003_a.dds",
  esoSkillId: 40118680,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
