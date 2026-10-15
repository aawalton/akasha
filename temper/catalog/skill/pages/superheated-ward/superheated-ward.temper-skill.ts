import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const superheatedWard = {
  id: "019e6f53-a7f5-7c52-8126-9f39761b6afe",
  type: "page-type/temper-skill",
  slug: "superheated-ward",
  title: "Superheated Ward",
  key: "superheated-ward",
  baseName: "Superheated Ward",
  description:
    "Roil the air around you or an ally, granting a damage shield that absorbs up to |cffffff9859|r for |cffffff6|r seconds.\n\nThis ability scales off the higher of your Max Magicka or Stamina and is capped at |cffffff50|r% of the target's Max Health.",
  icon: "/esoui/art/icons/ability_dragonknight_013.dds",
  esoSkillId: 29032,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 1305,
  createdAt: "2026-05-28T16:03:34.005Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.399974 MaxStat - 0.0001535 MaxPower + 0.486176 (Ultimate, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
