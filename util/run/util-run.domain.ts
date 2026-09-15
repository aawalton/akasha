import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const utilRun = {
  id: "01a05d20-8005-763f-8c3e-b80bd06da1d2",
  type: "page-type/domain",
  slug: "util-run",
  definition: "a process this one starts and what it says",
  parts: ["module/run-relaying", "module/run-serving", "module/running"],
} as const satisfies Domain
