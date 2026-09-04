import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRestoringTether = {
  id: "019e6f53-a966-7c05-874a-5491103a7234",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-restoring-tether",
  title: "Vengeance Restoring Tether",
  key: "vengeance-restoring-tether",
  baseName: "Vengeance Restoring Tether",
  description:
    '"Siphon the last remnants of life from a corpse, healing for |cffffff13856|r Health to yourself or up to 3 allies around the corpse after |cffffff1|r second. Heals up to |cffffff100|r% more Health to targets under |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_necromancer_017.dds",
  esoSkillId: 238277,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
