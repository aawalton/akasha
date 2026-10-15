import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRestoringTether = {
  id: "019e6f53-a966-7c05-874a-5491103a7234",
  type: "page-type/temper-skill",
  slug: "vengeance-restoring-tether",
  title: "Vengeance Restoring Tether",
  key: "vengeance-restoring-tether",
  baseName: "Vengeance Restoring Tether",
  description:
    "Siphon the last remnants of life from a corpse, healing for |cffffff13856|r Health to yourself or up to 3 allies around the corpse after |cffffff1|r second. Heals up to |cffffff100|r% more Health to targets under |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_necromancer_017.dds",
  esoSkillId: 238277,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1536,
  createdAt: "2026-05-28T16:03:34.374Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 13584 (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 100 (Constant)",
    "<<5>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
