import type { TemperInventoryRule } from "../../temper-inventory-rule.page-type.ts"

export const ruleContainersOpen = {
  id: "01a0728b-10d1-7698-84e8-76571fa43054",
  pageTypeSlug: "temper-inventory-rule",
  slug: "rule-containers-open",
  title: "Open containers",
  description:
    "Opens containers automatically. The Can Open filter skips containers on game cooldown or when transmute crystal storage is full. The Can Give Max Rewards filter skips containers during the 20-hour reward cooldown.",
  goal: "use",
  conditions: "jsonl",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  categoryId: "containers",
  displayOrder: 11,
  action: "open",
  active: true,
  updatedAt: "2026-05-04T16:04:31.132Z",
  locked: true,
  fromTemplate: "containers-open",
} as const satisfies TemperInventoryRule
