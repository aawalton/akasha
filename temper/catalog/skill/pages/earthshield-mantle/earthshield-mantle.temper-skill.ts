import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const earthshieldMantle = {
  id: "019e6245-a65d-7e0d-a1b7-7bfc181fbe2d",
  type: "page-type/temper-skill",
  slug: "earthshield-mantle",
  title: "Earthshield Mantle",
  key: "earthshield-mantle",
  baseName: "Earthspike Mantle",
  description:
    "Envelop your body in molten spikes to increase your damage done by 100 and gain Major Resolve, increasing Physical and Spell Resistance by 5948 for 20 seconds.\n\nPower drawn from the heart of a volcano forms a damage shield around you that absorbs up to 6611 damage for 6 seconds, scaling off your Max Health.",
  icon: "/esoui/art/icons/ability_dragonknight_007_b.dds",
  esoSkillId: 20328,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 391,
  createdAt: "2026-05-26T03:13:12.285Z",
  updatedAt: "2026-10-21T15:58:06.660Z",
  equations: [
    "<<1>> = 100 (Constant)",
    "<<2>> = Major Resolve (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 0.3099 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1, rank IV)",
    "<<6>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
