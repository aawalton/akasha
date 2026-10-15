import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const eternalGuardian = {
  id: "019e6245-a673-7c2f-8bb7-b99c38ef16ac",
  type: "page-type/temper-skill",
  slug: "eternal-guardian",
  title: "Eternal Guardian",
  key: "eternal-guardian",
  baseName: "Feral Guardian",
  description:
    "Rouse a grizzly to fight by your side. The grizzly swipes an enemy, dealing 599 Magic Damage, and sometimes swipes all enemies in front of it, dealing 2399 Magic Damage and stunning them for 2 seconds.\n\nOnce summoned you can activate Guardian's Wrath for 75 Ultimate, causing the grizzly to maul an enemy for 3360 Magic Damage. Deals 150% more damage to enemies below 25% Health.\n\n The grizzly respawns when killed, once per minute.",
  icon: "/esoui/art/icons/ability_warden_018_b.dds",
  esoSkillId: 85989,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 456,
  createdAt: "2026-05-26T03:13:12.307Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.026677225 MaxStat + 0.280111379 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, 1.8s cooldown, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Guardian's Wrath (Constant)",
    "<<5>> = 75 (Constant)",
    "<<6>> = 0.14939246 MaxStat + 1.56862083 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, Melee, 0.7s cooldown, R2 = 1)",
    "<<7>> = 150 (Constant)",
    "<<8>> = 25 (Constant)",
  ],
} as const satisfies TemperSkill
