import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const screamingCliffRacer = {
  id: "019e6245-a726-70ab-acb3-e8f2ba83dd18",
  type: "page-type/temper-skill",
  slug: "screaming-cliff-racer",
  title: "Screaming Cliff Racer",
  key: "screaming-cliff-racer",
  baseName: "Dive",
  description:
    "Command a cliff racer to dive bomb an enemy, dealing 2160 Magic Damage.\n\nIf you are more than 7 meters away from the target, you set them Off Balance for 7 seconds.\n\nAfter dealing damage you increase your Weapon and Spell Damage by 100 for 10 seconds, which quadruples after damaging Off Balance enemies.",
  icon: "/esoui/art/icons/ability_warden_013_a.dds",
  esoSkillId: 86006,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 1139,
  createdAt: "2026-05-26T03:13:12.486Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09603801 MaxStat + 1.008399105 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 7 seconds (Constant)",
    "<<3>> = 100 (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
