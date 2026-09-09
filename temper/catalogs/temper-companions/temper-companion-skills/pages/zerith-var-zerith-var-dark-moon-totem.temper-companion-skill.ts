import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarDarkMoonTotem = {
  id: "019e6484-38b1-7497-9570-c8c2b004c881",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-dark-moon-totem",
  key: "zerith-var-dark-moon-totem",
  title: "Dark Moon Totem",
  icon: "/esoui/art/icons/ability_companion_necromancer_bonetotem.dds",
  description:
    "Your Companion summons an effigy of bone harboring the souls of fallen Khajiit at the feet of an enemy for $$2 seconds and applies fear for $$1 seconds. After 2 seconds the totem grants Minor Protection to them and their allies, reducing their damage taken by 5% and begins fearing nearby enemies every 2 seconds, causing them to cower in place for $$1 seconds.",
  companionId: "zerith-var",
  abilityId: 213166,
  skillLineId: "companion-zerith-var-guardians-commitment",
  skillType: "active",
  validRoles: ["tank", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
