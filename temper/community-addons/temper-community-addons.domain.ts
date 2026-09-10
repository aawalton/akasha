import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperCommunityAddons = {
  id: "01a06069-b78d-7c82-89e1-869e95dd5dc4",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-community-addons",
  definition: "addons other people wrote, fetched from ESOUI and kept current",
  parts: [
    "module/addon-update-plan",
    "module/esoui-catalog",
    "module/installed-addons",
    "module/addon-download",
    "module/install-named-addon",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "ESOUI answers what addons there are and where each download sits.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the deploy owns is never replaced by an upstream archive.",
    },

    {
      invariantKind: "departure",
      statement: "An installed addon states its version in the manifest the game reads.",
    },
  ],
} as const satisfies Domain
