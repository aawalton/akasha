import type { Domain } from "../../domains/domain.page-type.ts"

export const utilsFs = {
  id: "01a05c4c-9440-7c8e-bb95-ba621d52090a",
  pageTypeSlug: "domain",
  slug: "utils-fs",
  definition: "how a file lands whole and how a path spelled from home is spelled in full",
  parts: [
    "module/atomic-write",
    "module/expand-tilde",
    "module/file-size",
    "module/missing",
    "module/read-stdin-or-file",
    "module/text-on-disk",
  ],
} as const satisfies Domain
