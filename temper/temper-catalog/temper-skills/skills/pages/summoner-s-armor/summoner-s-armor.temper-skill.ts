import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonerSArmor = {
  id: "019e6f53-a7ef-79cc-9b2c-47348d17530e",
  pageTypeSlug: "temper-skill",
  slug: "summoner-s-armor",
  title: "Summoner's Armor",
  key: "summoner-s-armor",
  baseName: "Bone Armor",
  description:
    '"Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for |cffffff30|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r and |cffffff2974|r.\\n\\nWhile active, reduce the cost of Blastbones, Skeletal Mage, and Spirit Mender by |cffffff15|r%.\\n\\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_008_b.dds",
  esoSkillId: 118244,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
