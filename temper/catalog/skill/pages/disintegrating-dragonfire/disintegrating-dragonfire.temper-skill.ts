import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const disintegratingDragonfire = {
  id: "019e6245-a659-76d8-85de-0915d28c4549",
  type: "page-type/temper-skill",
  slug: "disintegrating-dragonfire",
  title: "Disintegrating Dragonfire",
  key: "disintegrating-dragonfire",
  baseName: "Dragonfire Breath",
  description:
    "Exhale a blast of draconic fire in front of you, dealing 7148 Flame Damage, applying the Burning status effect, and an additional 10630 Flame Damage over 10 seconds to enemies in your path.\n\nThe initial hit liquifies the armor of your enemies, applying Major Breach to enemies for the duration, reducing Physical and Spell Resistance by 5948.",
  icon: "/esoui/art/icons/ability_dragonknight_004_a.dds",
  esoSkillId: 20944,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 371,
  createdAt: "2026-05-26T03:13:12.281Z",
  updatedAt: "2026-10-21T04:08:18.668Z",
  equations: [
    "<<1>> = 0.080002334 MaxStat + 0.84002451 MaxPower (Ultimate, RankMod(1), Dmg, Flame, AOE, Direct, Melee)",
    "<<2>> = Burning (Constant)",
    "<<3>> = 0.026656398 MaxStat + 0.27989217 MaxPower (Ultimate, Dmg, Flame, SingleTarget, DOT, 8s duration, 2s tick)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Major Breach (Constant)",
    "<<6>> = 5948 (Constant)",
  ],
} as const satisfies TemperSkill
