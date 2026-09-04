import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantMagelight40483 = {
  id: "019e6f53-a586-7cfc-a255-b20d475d5377",
  pageTypeSlug: "temper-skill",
  slug: "radiant-magelight-40483",
  title: "Radiant Magelight",
  key: "radiant-magelight-40483",
  baseName: "Magelight",
  description:
    '"Summon a mote of magelight, revealing stealthed and invisible enemies around you for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by |cffffff2629|r. You also prevent the stun from stealth attacks for you and nearby allies."',
  icon: "/esoui/art/icons/ability_mageguild_002_a.dds",
  esoSkillId: 40483,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
