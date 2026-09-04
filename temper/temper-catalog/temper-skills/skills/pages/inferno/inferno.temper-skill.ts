import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const inferno = {
  id: "019e6f53-a373-7abe-9260-8139aab72cb2",
  pageTypeSlug: "temper-skill",
  slug: "inferno",
  title: "Inferno",
  key: "inferno",
  baseName: "Inferno",
  description:
    '"Activate an aura of flames which launches a wave of flame around you every |cffffff5|r seconds, dealing |cffffff6400|r Flame Damage to enemies inside.\\n\\nWhile slotted on either bar, you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_dragonknight_002.dds",
  esoSkillId: 28967,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
