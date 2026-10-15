import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const triFocus30948 = {
  id: "019e6f53-a862-75ad-98c8-31d2ea672d1b",
  type: "page-type/temper-skill",
  slug: "tri-focus-30948",
  title: "Tri Focus",
  key: "tri-focus-30948",
  baseName: "Tri Focus",
  description:
    "Fully-charged Inferno Staff Heavy Attacks deal an additional |cffffff7370|r Flame Damage over |cffffff20|r seconds.\n\nFully-charged Lightning Staff Heavy Attacks damage nearby enemies for |cffffff50|r% of the damage done.\n\nFully-charged Ice Staff Heavy Attacks grant you a damage shield that absorbs |cffffff3741|r damage. This effect scales off your Max Health.\n\nWhile an Ice Staff is equipped, blocking costs Magicka instead of Stamina.",
  icon: "/esoui/art/icons/ability_weapon_001.dds",
  esoSkillId: 30948,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/passive",
  hashPlace: 1366,
  createdAt: "2026-05-28T16:03:34.114Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.00993331 MaxStat + 0.105701 MaxPower - 1.66006 (Ultimate, ratio = 10.64, Dmg, Flame, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999981)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 0.165 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
  ],
} as const satisfies TemperSkill
