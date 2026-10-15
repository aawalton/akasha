import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ferociousLeap32715 = {
  id: "019e6f53-a1f1-796c-b40b-1c908527d684",
  type: "page-type/temper-skill",
  slug: "ferocious-leap-32715",
  title: "Ferocious Leap",
  key: "ferocious-leap-32715",
  baseName: "Dragon Leap",
  description:
    "Launch yourself at an enemy, dealing |cffffff13129|r Flame Damage to all enemies in the area, knocking players back |cffffff4|r meters and stunning them for |cffffff2|r seconds. If the target is a monster they are instead knocked into the air and stunned for |cffffff3|r seconds.\n\nUpon activation you gain a damage shield that absorbs |cffffff24338|r damage for |cffffff10|r seconds. This portion of the ability scales with your Max Health.",
  icon: "/esoui/art/icons/ability_dragonknight_009_a.dds",
  esoSkillId: 32715,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 507,
  createdAt: "2026-05-28T16:03:32.465Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15891 MaxStat + 1.66855 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 4 meters (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 3 seconds (Constant)",
    "<<5>> = 1.0391 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 10s duration, R2 = 1)",
    "<<6>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
