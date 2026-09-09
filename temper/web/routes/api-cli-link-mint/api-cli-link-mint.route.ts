import type { Route } from "@akasha/code/route"

export const apiCliLinkMint = {
  id: "01a082a6-73d7-7e9c-9137-3a9700359e86",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-cli-link-mint",
  definition: "a session minted for the command line to sign in with",
  code: "ts",
  urlPath: "api/cli-link/mint",
} as const satisfies Route
