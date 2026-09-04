import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriWarpStrike = {
  id: "019e6484-3890-7e7f-a758-fe111e6bfedb",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-warp-strike",
  key: "mirri-warp-strike",
  title: "Warp Strike",
  icon: "/esoui/art/icons/ability_companion_nightblade_008.dds",
  description:
    "Your Companion flashes through the shadows and ambushes an enemy, dealing $1 Magic Damage.",
  companionId: "mirri",
  abilityId: 153853,
  skillLineId: "companion-mirri-deadly-assassin",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
