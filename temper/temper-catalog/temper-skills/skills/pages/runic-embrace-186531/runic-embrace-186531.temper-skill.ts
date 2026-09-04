import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runicEmbrace186531 = {
  id: "019e6f53-a699-7a7e-b5a5-9160ded614d0",
  pageTypeSlug: "temper-skill",
  slug: "runic-embrace-186531",
  title: "Runic Embrace",
  key: "runic-embrace-186531",
  baseName: "Runic Jolt",
  description:
    '"Craft a rune that deals |cffffff4038|r Magic Damage and heals you for |cffffff2145|r Health, scaling off your Max Health.\\n\\nYou apply Minor Maim and Minor Lifesteal for |cffffff15|r seconds, reducing enemy damage done by |cffffff5|r%, and healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.\\n\\nThe rune taunts for |cffffff15|r seconds if it would not cause taunt immunity, and generates Crux. While slotted, damage taken is reduced by |cffffff2|r% per active Crux."',
  icon: "/esoui/art/icons/ability_arcanist_007_b.dds",
  esoSkillId: 186531,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
