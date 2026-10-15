import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crystalWeapon46331 = {
  id: "019e6f53-a04c-7b6d-a308-894f759a73ca",
  type: "page-type/temper-skill",
  slug: "crystal-weapon-46331",
  title: "Crystal Weapon",
  key: "crystal-weapon-46331",
  baseName: "Crystal Shard",
  description:
    "Encase your weapon in dark crystals for |cffffff6|r seconds, causing your next two Light or Heavy Attacks to deal additional damage and reduce the target's Armor by |cffffff1000|r for |cffffff5|r seconds. The first hit deals |cffffff7269|r Physical Damage and the second deals |cffffff2907|r Physical Damage.\n\n After casting, your next non-Ultimate ability used within |cffffff3|r seconds costs |cffffff10|r% less.",
  icon: "/esoui/art/icons/ability_sorcerer_crystalweapon.dds",
  esoSkillId: 46331,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 277,
  createdAt: "2026-05-28T16:03:32.044Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 3 (Constant)",
    "<<3>> = 700 (Constant)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 0.0929455 MaxStat + 0.976197 MaxPower - 0.668374 (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<6>> = 0.0371741 MaxStat + 0.390414 MaxPower - 0.56231 (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 0.999999)",
    "<<7>> = 3 seconds (Constant)",
    "<<8>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
