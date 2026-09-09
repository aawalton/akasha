import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const mail = {
  id: "01a071f0-4c85-74f6-8a4a-351d6d18d9d2",
  pageTypeSlug: "temper-item-action",
  slug: "mail",
  title: "Mail",
  description: "Mails the item to the recipient the rule names.",
} as const satisfies TemperItemAction
