import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const flawlessDawnbreaker40161 = {
  id: "019e6f53-a20c-72a1-97f6-e2b30b30309c",
  type: "page-type/temper-skill",
  slug: "flawless-dawnbreaker-40161",
  title: "Flawless Dawnbreaker",
  key: "flawless-dawnbreaker-40161",
  baseName: "Dawnbreaker",
  description:
    '"Arm yourself with Meridia\'s sacred sword and dispense her retribution, dealing |cffffff10668|r Physical Damage to enemies in front of you and an additional |cffffff11427|r Physical Damage over |cffffff6|r seconds.\\n\\nAfter activating, your Weapon and Spell Damage is increased by |cffffff300|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_005_a.dds",
  esoSkillId: 40161,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 10,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill
