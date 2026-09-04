import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const innerLight = {
  id: "019e6238-c2cd-75da-9306-fafd7f700536",
  pageTypeSlug: "temper-skill",
  slug: "inner-light",
  title: "Inner Light",
  key: "inner-light",
  baseName: "Magelight",
  description:
    '"Summon a mote of magelight, revealing stealthed and invisible enemies around you for 5 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by 2629 and your Max Magicka is increased by 5%."',
  icon: "/esoui/art/icons/ability_mageguild_002_b.dds",
  esoSkillId: 42430,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
  effects: "jsonl",
} as const satisfies TemperSkill
