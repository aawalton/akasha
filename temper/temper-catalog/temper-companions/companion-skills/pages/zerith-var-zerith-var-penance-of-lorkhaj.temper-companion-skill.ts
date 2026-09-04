import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarPenanceOfLorkhaj = {
  id: "019e6484-38b2-734c-a763-1fecdd14d69f",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-penance-of-lorkhaj",
  key: "zerith-var-penance-of-lorkhaj",
  title: "Penance of Lorkhaj",
  icon: "/esoui/art/icons/ability_companion_zerith_renderflesh.dds",
  description:
    "Your Companion sacrifices their own power to repair damaged flesh, healing themselves or an ally in front of them for $1 Health but applying Minor Defile to themselves for 4 seconds, reducing their healing received and damage shield strength by 6%.",
  companionId: "zerith-var",
  abilityId: 213160,
  skillLineId: "companion-zerith-var-remedy-of-atonement",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
