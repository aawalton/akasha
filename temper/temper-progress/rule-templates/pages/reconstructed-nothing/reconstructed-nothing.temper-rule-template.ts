import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const reconstructedNothing = {
  id: "019e3104-260d-7216-94db-9f9abfd643f3",
  pageTypeSlug: "temper-rule-template",
  slug: "reconstructed-nothing",
  title: "Protect reconstructed gear",
  key: "reconstructed-nothing",
  description:
    "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
  categoryId: "equipment",
  displayOrder: 8,
  action: "nothing",
  active: false,
  goal: "equip",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
