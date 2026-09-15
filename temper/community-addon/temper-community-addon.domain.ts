import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCommunityAddon = {
  id: "01a06069-b78d-7c82-89e1-869e95dd5dc4",
  type: "page-type/domain",
  slug: "temper-community-addon",
  definition: "addons other people wrote, fetched from ESOUI and kept current",
  parts: [
    "module/addon-download",
    "module/addon-update-plan",
    "module/esoui-catalog",
    "module/install-named-addon",
    "module/installed-addons",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "ESOUI answers what addons there are and where each download sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder the deploy owns is never replaced by an upstream archive.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "An installed addon states its version in the manifest the game reads.",
    },
  ],
} as const satisfies Domain
