import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const feralGuardian = {
  id: "019e6f53-a1ea-79d4-b95e-f171d06ac391",
  type: "page-type/temper-skill",
  slug: "feral-guardian",
  title: "Feral Guardian",
  key: "feral-guardian",
  baseName: "Feral Guardian",
  description:
    "Rouse a grizzly to fight by your side. The grizzly swipes at an enemy, dealing |cffffff2017|r Magic Damage, and sometimes swipes all enemies in front of it, dealing |cffffff8533|r Magic Damage and stunning them for |cffffff2|r seconds.\n\nOnce summoned you can activate Guardian's Wrath for |cffffff79|r Ultimate, causing the grizzly to maul an enemy for |cffffff11308|r Magic Damage. Deals |cffffff100|r% more damage to enemies below |cffffff25|r% Health.",
  icon: "/esoui/art/icons/ability_warden_018.dds",
  esoSkillId: 85982,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 505,
  createdAt: "2026-05-28T16:03:32.458Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, 1.8s cooldown, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Guardian's Wrath (Constant)",
    "<<5>> = 75 (Constant)",
    "<<6>> = 0.14 MaxStat + 1.47 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.7s cooldown, R2 = 1)",
    "<<7>> = 100 (Constant)",
    "<<8>> = 25 (Constant)",
  ],
} as const satisfies TemperSkill
