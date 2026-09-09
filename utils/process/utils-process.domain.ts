import type { Domain } from "../../domains/domain.page-type.ts"

export const utilsProcess = {
  id: "01a05c4f-6f2b-7cf2-8361-788954595f9a",
  pageTypeSlug: "domain",
  slug: "utils-process",
  definition: "a process another did not start, read from outside it and ended from outside it",
  parts: [
    "module/pid-signal",
    "module/port-holding",
    "module/proc-environ",
    "module/proc-reading",
    "module/process-ending",
    "module/libc-mapping",
  ],
} as const satisfies Domain
