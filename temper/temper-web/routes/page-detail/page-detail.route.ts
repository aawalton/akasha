import type { Route } from "@akasha/code/route"

export const pageDetail = {
  id: "01a08297-9668-70a3-8a39-06a85b120863",
  pageTypeSlug: "route",
  type: "route",
  slug: "page-detail",
  definition: "one page of any page type, read on a screen of its own",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
} as const satisfies Route
