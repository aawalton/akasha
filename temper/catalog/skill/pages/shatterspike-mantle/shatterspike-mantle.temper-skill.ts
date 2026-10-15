import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shatterspikeMantle = {
  id: "019e6245-a72e-7138-8d6b-a1218362076e",
  type: "page-type/temper-skill",
  slug: "shatterspike-mantle",
  title: "Shatterspike Mantle",
  key: "shatterspike-mantle",
  baseName: "Earthspike Mantle",
  description:
    "Envelop your body in molten spikes to increase your damage done by 100 and gain Major Resolve, increasing Physical and Spell Resistance by 5948 for 20 seconds.\n\nAs the armor forms you blast foes around you with shattered obsidian, causing them to take 17006 Flame Damage over 20 seconds. When this effect deals damage you gain a stack of Landslide, up to once every 10 seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_007_a.dds",
  esoSkillId: 20323,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 1164,
  createdAt: "2026-05-26T03:13:12.494Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 100 (Constant)",
    "<<2>> = Major Resolve (Constant)",
    "<<3>> = 5948 (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Flame, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<6>> = 20 seconds (Constant)",
    "<<7>> = Landslide (Constant)",
    "<<8>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
