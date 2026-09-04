import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const detonatingSiphon = {
  id: "019e6245-a652-7c31-8c2f-031fe3e58169",
  pageTypeSlug: "temper-skill",
  slug: "detonating-siphon",
  title: "Detonating Siphon",
  key: "detonating-siphon",
  baseName: "Shocking Siphon",
  description:
    '"Violently drain the last spark of life from a corpse, dealing 6180 Disease Damage over 20 seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.\\n\\nWhen the siphon ends the corpse explodes, dealing an additional 1799 Disease Damage to all enemies nearby.\\n\\nWhile slotted, your damage done is increased by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_005_b.dds",
  esoSkillId: 40118763,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
  effects: "jsonl",
} as const satisfies TemperSkill
