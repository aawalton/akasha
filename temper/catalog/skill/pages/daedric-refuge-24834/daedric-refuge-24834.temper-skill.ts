import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const daedricRefuge24834 = {
  id: "019e6f53-a067-7a31-85ab-1607d8025483",
  type: "page-type/temper-skill",
  slug: "daedric-refuge-24834",
  title: "Daedric Refuge",
  key: "daedric-refuge-24834",
  baseName: "Daedric Mines",
  description:
    "Carefully form |cffffff5|r protective Daedric wards around you, which take |cffffff3|r seconds to arm and last for |cffffff15|r seconds.\n\nWhen a Daedric ward is triggered it grants you or the ally a damage shield that absorbs |cffffff8478|r damage for |cffffff6|r seconds. Targets can only be shielded by Daedric Refuge once every |cffffff2|r seconds and the shield is capped at |cffffff43|r% of the target's Max Health.",
  icon: "/esoui/art/icons/ability_sorcerer_daedric_minefield.dds",
  esoSkillId: 24834,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 297,
  createdAt: "2026-05-28T16:03:32.071Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 0.289763 MaxStat - 0.0002907 MaxPower + 0.150354 (Ultimate, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
