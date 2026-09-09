import type { Domain } from "../../domains/domain.page-type.ts"

export const utilsRun = {
  id: "01a05d20-8005-763f-8c3e-b80bd06da1d2",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-run",
  definition: "a process this one starts and what it says",
  parts: ["module/running", "module/spawn-ceiling", "module/run-relaying", "module/run-serving"],
} as const satisfies Domain
