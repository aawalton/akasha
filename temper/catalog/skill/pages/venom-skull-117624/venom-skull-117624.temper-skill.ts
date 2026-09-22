import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const venomSkull117624 = {
  id: "019e6f53-a9bd-724b-9afd-7edc988996f7",
  type: "page-type/temper-skill",
  slug: "venom-skull-117624",
  title: "Venom Skull",
  key: "venom-skull-117624",
  baseName: "Flame Skull",
  description:
    '"Lob an explosive skull at an enemy, dealing |cffffff7509|r Poison Damage.\\n\\nEvery third cast of this ability deals |cffffff50|r% increased damage and creates a corpse near the enemy, up to once every |cffffff3|r seconds.\\n\\nWhile slotted, casting any Necromancer ability while you are in combat will count towards the third cast."',
  icon: "/esoui/art/icons/ability_necromancer_001_a.dds",
  esoSkillId: 117624,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
