import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spellOrb = {
  id: "019e6238-c316-7ca4-a446-558788acf1a4",
  type: "page-type/temper-skill",
  slug: "spell-orb",
  title: "Spell Orb",
  key: "spell-orb",
  baseName: "Spell Orb",
  description:
    "When you cast a Psijic Order ability while you are in combat, you generate a spell charge for 10 seconds. When you reach 5 spell charges, you launch a spell orb at the closest enemy to you dealing 1124 Magic Damage.\n\nThis effect scales off your highest offensive stats.",
  icon: "/esoui/art/icons/ability_psijic_009.dds",
  esoSkillId: 103878,
  isMorph: false,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1246,
  createdAt: "2026-05-26T02:59:07.670Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 0.0499489 MaxStat + 0.524968 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, R2 = 0.999999)",
  ],
} as const satisfies TemperSkill
