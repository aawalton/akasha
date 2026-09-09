import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const unstableCore = {
  id: "019e646c-c4e8-763f-9f7b-5e61f8c7b754",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "unstable-core",
  title: "Unstable Core",
  descriptionTemplate:
    "Envelop an enemy in a lightless sphere for 4 seconds, that harms them with growing intensity anytime they deal direct damage. Limited to one.\n\nTheir first attack reduces their Movement Speed by 30% for 4 seconds and deals $1 Magic Damage, their second attack immobilizes them for 3 seconds and deals $2 Magic Damage, and their third attack stuns them for 3 seconds and deals $3 Magic Damage. The effects can activate once every 1 second.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
