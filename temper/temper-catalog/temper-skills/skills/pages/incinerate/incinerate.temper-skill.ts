import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const incinerate = {
  id: "019e6f53-a36e-70b8-9e63-7645b4ed7e1c",
  pageTypeSlug: "temper-skill",
  slug: "incinerate",
  title: "Incinerate",
  key: "incinerate",
  baseName: "Inferno",
  description:
    '"Activate an aura of flames which launches a wave of flames every |cffffff5|r seconds, dealing |cffffff7272|r Flame Damage to enemies inside.\\n\\nEach hit has a |cffffff15|r% chance of applying Burning.\\n\\nWhile slotted on either bar, you gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_dragonknight_002_a.dds",
  esoSkillId: 32853,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
