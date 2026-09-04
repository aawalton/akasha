import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceMagelight = {
  id: "019e6f53-a937-794e-9e08-fb201c0d3a74",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-magelight",
  title: "Vengeance Magelight",
  key: "vengeance-magelight",
  baseName: "Vengeance Magelight",
  description:
    '"Summon a mote of magelight, dealing |cffffff11760|r Magic Damage to up to 3 stealthed and invisible enemies around you. Exposed enemies cannot return to stealth or invisibility for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_002.dds",
  esoSkillId: 246489,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-mages-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-mages-guild",
} as const satisfies TemperSkill
