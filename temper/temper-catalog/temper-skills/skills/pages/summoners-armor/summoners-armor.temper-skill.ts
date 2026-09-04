import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonersArmor = {
  id: "019e6245-a74a-7ea6-bcfa-3ce58e8a4d58",
  pageTypeSlug: "temper-skill",
  slug: "summoners-armor",
  title: "Summoner's Armor",
  key: "summoners-armor",
  baseName: "Bone Armor",
  description:
    '"Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for 30 seconds, increasing your Physical Resistance and Spell Resistance by 5948 and 2974.\\n\\nWhile active, reduce the cost of Blastbones, Skeletal Mage, and Spirit Mender by 15%.\\n\\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every 10 seconds."',
  icon: "/esoui/art/icons/ability_necromancer_008_b.dds",
  esoSkillId: 40118244,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
