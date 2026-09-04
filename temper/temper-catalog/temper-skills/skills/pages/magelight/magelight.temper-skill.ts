import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magelight = {
  id: "019e6f53-a42f-718e-8bd3-4b74ed3fb458",
  pageTypeSlug: "temper-skill",
  slug: "magelight",
  title: "Magelight",
  key: "magelight",
  baseName: "Magelight",
  description:
    '"Summon a mote of magelight, revealing stealthed and invisible enemies around you for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_mageguild_002.dds",
  esoSkillId: 30920,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
