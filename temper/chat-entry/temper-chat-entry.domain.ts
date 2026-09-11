import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperChatEntry = {
  id: "01a090b3-e1dd-7d60-8166-34e88a0496b5",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-chat-entry",
  definition: "the box a player types a line of chat into",
  parts: ["module/chat-entry-text"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The player sends what the box holds, and no add-on sends it for them.",
    },
  ],
} as const satisfies Domain
