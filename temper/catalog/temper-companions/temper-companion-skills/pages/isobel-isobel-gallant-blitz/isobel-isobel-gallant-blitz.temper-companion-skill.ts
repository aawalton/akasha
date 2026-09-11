import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const isobelIsobelGallantBlitz = {
  id: "019e6484-3872-7a18-a4ac-c005928549a5",
  type: "temper-companion-skill",
  slug: "isobel-isobel-gallant-blitz",
  key: "isobel-gallant-blitz",
  title: "Gallant Blitz",
  icon: "/esoui/art/icons/ability_companion_templar_focused_charge.dds",
  description:
    "Your Companion charges toward their enemy with a vibrant spear that bursts in a flash of light, setting all enemies in the area Off Balance for $$1 seconds.",
  companionId: "isobel",
  abilityId: 163590,
  skillLineId: "companion-isobel-brilliant-shield",
  skillType: "active",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
