import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelPenetratingStrikes = {
  id: "019e6484-3876-7084-9250-0cf2b301a826",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-penetrating-strikes",
  key: "isobel-penetrating-strikes",
  title: "Penetrating Strikes",
  icon: "/esoui/art/icons/ability_companion_templar_trained_attacker.dds",
  description:
    "Your Companion attacks three times with a magic spear, dealing $1 Magic Damage to all enemies in front of them with each strike. After their assault, Your Companion grants themselves and nearby allies a boon that increases the damage of their next Light or Heavy Attack by 50%.",
  companionId: "isobel",
  abilityId: 163458,
  skillLineId: "companion-isobel-blazing-might",
  skillType: "active",
  validRoles: ["dps", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
