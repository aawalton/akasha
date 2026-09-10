import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperPlayerProfile = {
  id: "01a06354-4b4a-7d43-a987-292baabd8135",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-player-profile",
  definition: "the handle and platform settings one player is known by",
  parts: ["module/use-player"],
} as const satisfies Domain
