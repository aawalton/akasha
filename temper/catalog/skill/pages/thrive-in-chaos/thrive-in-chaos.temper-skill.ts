import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const thriveInChaos = {
  id: "019e6226-0119-79f0-abb9-d482c8099882",
  type: "page-type/temper-skill",
  slug: "thrive-in-chaos",
  title: "Thrive in Chaos",
  key: "thrive-in-chaos",
  baseName: "Lacerate",
  description:
    "Slash enemies in front of you, causing them to bleed for 6965 Bleed Damage over 8 seconds and healing you for 50% of the damage done.\n\nEach enemy hit increases your damage done by 6% for 15 seconds. This effect can stack up to 6 times.\n\nEach tick applies the Hemorrhaging status effect.",
  icon: "/esoui/art/icons/ability_dualwield_006_b.dds",
  esoSkillId: 86410,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1343,
  createdAt: "2026-05-26T02:38:38.361Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0620436 MaxStat + 0.650882 MaxPower - 2.37418 (Ultimate, ratio = 10.49, Dmg, Bleed, SingleTarget, DOT, 8s duration, 2s tick, R2 = 1)",
    "<<2>> = 8 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = 6 (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = Hemorrhaging (Constant)",
  ],
} as const satisfies TemperSkill
