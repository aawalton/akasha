import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsEarthenRootEnclave = {
  id: "01a06168-7249-700f-be5b-055961e2417d",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-earthen-root-enclave",
  title: "Earthen Root Enclave",
  category: "account",
  displayOrder: 11,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
