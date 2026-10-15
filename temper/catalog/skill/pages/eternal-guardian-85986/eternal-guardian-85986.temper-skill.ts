import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const eternalGuardian85986 = {
  id: "019e6f53-a1a3-74e3-97c1-322a7dc71159",
  type: "page-type/temper-skill",
  slug: "eternal-guardian-85986",
  title: "Eternal Guardian",
  key: "eternal-guardian-85986",
  baseName: "Feral Guardian",
  description:
    "Rouse a grizzly to fight by your side. The grizzly swipes an enemy, dealing |cffffff2084|r Magic Damage, and sometimes swipes all enemies in front of it, dealing |cffffff8814|r Magic Damage and stunning them for |cffffff2|r seconds.\n\nOnce summoned you can activate Guardian's Wrath for |cffffff79|r Ultimate, causing the grizzly to maul an enemy for |cffffff11681|r Magic Damage. Deals |cffffff150|r% more damage to enemies below |cffffff25|r% Health.\n\n The grizzly respawns when killed, once per minute.",
  icon: "/esoui/art/icons/ability_warden_018_b.dds",
  esoSkillId: 85986,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 457,
  createdAt: "2026-05-28T16:03:32.387Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, 1.8s cooldown, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Guardian's Wrath (Constant)",
    "<<5>> = 75 (Constant)",
    "<<6>> = 0.14462 MaxStat + 1.51851 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.7s cooldown, R2 = 1)",
    "<<7>> = 150 (Constant)",
    "<<8>> = 25 (Constant)",
  ],
} as const satisfies TemperSkill
