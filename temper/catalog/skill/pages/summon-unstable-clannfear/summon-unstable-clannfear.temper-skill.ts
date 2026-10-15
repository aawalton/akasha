import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonUnstableClannfear = {
  id: "019e6245-a748-7d15-b460-9247db25c598",
  type: "page-type/temper-skill",
  slug: "summon-unstable-clannfear",
  title: "Summon Unstable Clannfear",
  key: "summon-unstable-clannfear",
  baseName: "Summon Unstable Familiar",
  description:
    "Command the powers of Oblivion to send a Daedric clannfear to fight at your side. The clannfear's headbutt deals 358 Physical Damage, while its tail spike hits nearby enemies for 358 Physical Damage after 1 second.  \n\nOnce summoned, you can activate the clannfear's special ability for 4320 Magicka, healing you for 5121 and the clannfear for 2560.\n\nThe clannfear remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_unstable_clannfear.dds",
  esoSkillId: 30657,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1295,
  createdAt: "2026-05-26T03:13:12.520Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.016006335 MaxStat + 0.168066001 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.016006335 MaxStat + 0.168066001 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, AOE, Direct, Melee, 0.8s cooldown, R2 = 1)",
    "<<3>> = 4320 (Constant)",
    "<<4>> = 0.320086 Health - 0.229239 (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 0.160046 Health - 0.751143 (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
