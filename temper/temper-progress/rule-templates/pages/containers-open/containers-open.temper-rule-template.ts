import type { TemperRuleTemplate } from "../../temper-rule-template.page-type.ts"

export const containersOpen = {
  id: "019e3104-2608-73dd-9d1c-a7890d444f99",
  pageTypeSlug: "temper-rule-template",
  slug: "containers-open",
  title: "Open containers",
  key: "containers-open",
  description:
    "Opens containers automatically. The Can Open filter skips containers on game cooldown or when transmute crystal storage is full. The Can Give Max Rewards filter skips containers during the 20-hour reward cooldown.",
  categoryId: "containers",
  displayOrder: 3,
  action: "open",
  active: false,
  goal: "use",
  conditions: "jsonl",
} as const satisfies TemperRuleTemplate
