import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonTwilightTormentor = {
  id: "019e6245-a747-7c23-bb51-e360c609a940",
  type: "page-type/temper-skill",
  slug: "summon-twilight-tormentor",
  title: "Summon Twilight Tormentor",
  key: "summon-twilight-tormentor",
  baseName: "Summon Winged Twilight",
  description:
    "Call on Azura to send a twilight tormentor to fight at your side. The twilight tormentor's zap deals 478 Shock Damage and its kick deals 478 Shock Damage.\n\nOnce summoned, you can activate the twilight tormentor's special ability for 2700 Magicka, causing it to deal 60% more damage to enemies above 50% Health for 20 seconds.\n\nThe twilight tormentor remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_matriarch.dds",
  esoSkillId: 30598,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1293,
  createdAt: "2026-05-26T03:13:12.519Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 2700 (Constant)",
    "<<4>> = 60% (Constant)",
    "<<5>> = 50% (Constant)",
    "<<6>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
