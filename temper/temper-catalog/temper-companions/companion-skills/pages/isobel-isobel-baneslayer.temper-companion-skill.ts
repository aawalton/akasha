import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelBaneslayer = {
  id: "019e6484-386a-748d-bf08-f1ce6e4a560d",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-baneslayer",
  key: "isobel-baneslayer",
  title: "Baneslayer",
  icon: "/esoui/art/icons/ability_companion_templar_baneslayer.dds",
  description:
    "Your Companion channels their energy and conjures a weapon made of sunlight before striking downward, dealing $1 Magic Damage to all enemies in front of them. Enemies damaged by Baneslayer have particles remaining on them for $$2 seconds that detonate for $2 Magic Damage when a player deals damage to them.",
  companionId: "isobel",
  abilityId: 163763,
  skillLineId: "companion-isobel",
  skillType: "ultimate",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
