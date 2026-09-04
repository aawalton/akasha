import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedOnGuard = {
  id: "019e668d-c557-7728-ab3a-ab5815a71312",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-on-guard",
  key: "shared-on-guard",
  title: "On Guard",
  icon: "/esoui/art/icons/ability_companion_1handed_004.dds",
  description:
    "Your Companion bolsters their defenses, granting a damage shield that absorbs up to 25% of their Max Health for $$1 seconds.",
  companionId: "all",
  abilityId: 155328,
  skillLineId: "weapon-one-hand-shield",
  skillType: "active",
  validRoles: ["tank"],
  tags: ["max-health-shield-25pct"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
