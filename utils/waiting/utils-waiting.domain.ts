import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsWaiting = {
  id: "01a08e0b-52e5-7552-bf24-7f06021af9e2",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-waiting",
  definition: "the wait a caller takes before trying again",
  parts: ["module/thread-pause"],
} as const satisfies Domain
