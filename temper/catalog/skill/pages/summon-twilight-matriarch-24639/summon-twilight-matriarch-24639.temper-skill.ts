import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonTwilightMatriarch24639 = {
  id: "019e6f53-a7e1-7053-a85d-2c3cee90c576",
  type: "page-type/temper-skill",
  slug: "summon-twilight-matriarch-24639",
  title: "Summon Twilight Matriarch",
  key: "summon-twilight-matriarch-24639",
  baseName: "Summon Winged Twilight",
  description:
    "Call on Azura to send a twilight matriarch to fight at your side. The twilight matriarch's zap deals |cffffff1211|r Shock Damage and its kick deals |cffffff1211|r Shock Damage.\n\nOnce summoned, you can activate the twilight matriarch's special ability for |cffffff4728|r Magicka, causing it to heal |cffffff2|r friendly targets for |cffffff11321|r and itself for |cffffff5660|r.\n\nThe twilight matriarch remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_storm_prey.dds",
  esoSkillId: 24639,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1292,
  createdAt: "2026-05-28T16:03:33.985Z",
  updatedAt: "2026-10-21T06:23:05.681Z",
  equations: [
    "<<1>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 4590 (Constant)",
    "<<6>> = 2 (Constant)",
    "<<4>> = 0.16004638 MaxStat + 1.680487 MaxPower (Ultimate, RankMod(1), Heal, SingleTarget, Direct)",
    "<<5>> = 0.080019615 MaxStat + 0.84020596 MaxPower (Ultimate, RankMod(1), Heal, SingleTarget, Direct)",
  ],
  variants: [{ esoSkillId: 77369 }],
} as const satisfies TemperSkill
