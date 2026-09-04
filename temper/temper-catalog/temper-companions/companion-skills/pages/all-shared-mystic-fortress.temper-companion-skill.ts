import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedMysticFortress = {
  id: "019e668d-c559-7ab3-b9b8-563364fdc928",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-mystic-fortress",
  key: "shared-mystic-fortress",
  title: "Mystic Fortress",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_001.dds",
  description:
    "Your Companion calls on their staff's strength to protect themselves or the lowest health ally around them, granting a damage shield that absorbs $1 damage over $$1 seconds.",
  companionId: "all",
  abilityId: 153685,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
