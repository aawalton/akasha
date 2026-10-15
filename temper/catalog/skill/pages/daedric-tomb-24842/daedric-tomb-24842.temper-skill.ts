import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const daedricTomb24842 = {
  id: "019e6f53-a06a-777c-b8df-1196f63600b3",
  type: "page-type/temper-skill",
  slug: "daedric-tomb-24842",
  title: "Daedric Tomb",
  key: "daedric-tomb-24842",
  baseName: "Daedric Mines",
  description:
    "Surprise your foes by placing |cffffff3|r volatile Daedric mines at a target location, which arm instantly and last for |cffffff15|r seconds.\n\nWhen a mine is triggered it explodes, dealing |cffffff9385|r Magic Damage and immobilizing the enemy for |cffffff2|r seconds. Enemies can only be damaged by your mines once every |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_daedric_tomb.dds",
  esoSkillId: 24842,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 299,
  createdAt: "2026-05-28T16:03:32.074Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 0.116249 MaxStat + 1.22015 MaxPower - 1.171 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
