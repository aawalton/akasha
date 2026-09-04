import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mysticSiphon = {
  id: "019e6245-a6d5-7eb0-a171-5fdef3a8feb5",
  pageTypeSlug: "temper-skill",
  slug: "mystic-siphon",
  title: "Mystic Siphon",
  key: "mystic-siphon",
  baseName: "Shocking Siphon",
  description:
    '"Violently drain the last spark of life from a corpse, dealing 6180 Shock Damage over 20 seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.\\n\\nWhile siphoning the corpse you gain 150 Health, Magicka, and Stamina Recovery.\\n\\nWhile slotted, your damage done is increased by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_005_a.dds",
  esoSkillId: 40118008,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
  effects: "jsonl",
} as const satisfies TemperSkill
