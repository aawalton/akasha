import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedBitingTrap = {
  id: "019e6688-86ef-7413-98b6-627022a4ae10",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-biting-trap",
  key: "shared-biting-trap",
  title: "Biting Trap",
  icon: "/esoui/art/icons/ability_companion_fightersguild_004.dds",
  description:
    "Your Companion sets a sharpened blade trap in front of them, which takes 1.5 seconds to arm and lasts for $$1 seconds. When an enemy triggers the trap, they are immobilized for $$2 seconds. If the enemy is an Undead, Daedra, or Werewolf they take $1 Physical Damage.",
  companionId: "all",
  abilityId: 157747,
  skillLineId: "guild-fighters",
  skillType: "active",
  validRoles: ["dps"],
  tags: ["trap", "arm-time-1.5s", "trap-duration-6.5s", "target-self"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
