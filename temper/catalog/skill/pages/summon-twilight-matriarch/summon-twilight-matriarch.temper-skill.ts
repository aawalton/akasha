import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonTwilightMatriarch = {
  id: "019e6245-a746-7a32-a85c-7df36b613e05",
  type: "page-type/temper-skill",
  slug: "summon-twilight-matriarch",
  title: "Summon Twilight Matriarch",
  key: "summon-twilight-matriarch",
  baseName: "Summon Winged Twilight",
  description:
    "Call on Azura to send a twilight matriarch to fight at your side. The twilight matriarch's zap deals 347 Shock Damage and its kick deals 347 Shock Damage.\n\nOnce summoned, you can activate the twilight matriarch's special ability for 4590 Magicka, causing it to heal 2 friendly targets for 3600 and itself for 1799.\n\nThe twilight matriarch remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_storm_prey.dds",
  esoSkillId: 30626,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1291,
  createdAt: "2026-05-26T03:13:12.518Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 4590 (Constant)",
    "<<4>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
