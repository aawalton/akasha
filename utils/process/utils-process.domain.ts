import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsProcess = {
  id: "01a05c4f-6f2b-7cf2-8361-788954595f9a",
  type: "domain",
  slug: "utils-process",
  definition: "a process another did not start, read from outside it and ended from outside it",
  parts: [
    "module/libc-mapping",
    "module/pid-signal",
    "module/port-holding",
    "module/proc-environ",
    "module/proc-reading",
    "module/process-ending",
  ],
} as const satisfies Domain
