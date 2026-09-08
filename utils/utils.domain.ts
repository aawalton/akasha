import type { Domain } from "../domains/domain.page-type.ts"

export const utils = {
  id: "01a0827a-166b-7a7c-9b60-e90209b46c46",
  pageTypeSlug: "domain",
  slug: "utils",
  definition: "the pieces every domain reaches for and no domain claims",
  partSlugs: [
    "workspace-package/utils-fs",
    "workspace-package/utils-narrow",
    "workspace-package/utils-process",
  ],
} as const satisfies Domain
