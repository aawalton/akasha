import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsRun = {
  id: "01a05d20-8005-763f-8c3e-b80bd06da1d2",
  type: "domain",
  slug: "utils-run",
  definition: "a process this one starts and what it says",
  parts: ["module/running", "module/run-relaying", "module/run-serving", "module/spawn-ceiling"],
} as const satisfies Domain
