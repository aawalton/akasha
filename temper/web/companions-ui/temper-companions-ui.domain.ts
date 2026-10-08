import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCompanionsUi = {
  id: "01a06360-7480-7002-8dd6-aef232754744",
  type: "page-type/domain",
  slug: "temper-companions-ui",
  definition: "the companion builds a player keeps, listed, edited and shared",
  parts: ["module/companion-quality-rules", "module/use-companions"],
  createdAt: "2026-09-02T18:27:40.800Z",
  updatedAt: "2026-09-21T15:16:26.000Z",
} as const satisfies Domain
