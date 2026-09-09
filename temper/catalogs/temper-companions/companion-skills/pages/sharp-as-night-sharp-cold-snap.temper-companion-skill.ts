import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpColdSnap = {
  id: "019e6484-3894-7797-b1cc-dbeb0fbaa368",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-cold-snap",
  key: "sharp-cold-snap",
  title: "Cold Snap",
  icon: "/esoui/art/icons/ability_companion_warden_impalingshards.dds",
  description:
    "Your Companion encircles themselves with ice shards to skewer enemies in the area, immobilizing them for $$1 seconds and dealing $1 Frost Damage every 2 seconds for 8 seconds. Damage done is based on Your Companion's Max Health.",
  companionId: "sharp-as-night",
  abilityId: 186604,
  skillLineId: "companion-sharp-as-night-winters-bite",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
