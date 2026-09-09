import type { Domain } from "../../domains/domain.page-type.ts"

export const temperCompanionsUi = {
  id: "01a06360-7480-7002-8dd6-aef232754744",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-companions-ui",
  definition: "the companion builds a player keeps, listed, edited and shared",
  parts: ["module/companion-quality-rules", "module/use-companions"],
} as const satisfies Domain
