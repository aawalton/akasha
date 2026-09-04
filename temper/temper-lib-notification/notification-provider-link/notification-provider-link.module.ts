import type { Module } from "@akasha/code-system/module"

export const notificationProviderLink = {
  id: "01a0605a-0515-7dbe-bba3-edd17cf7cb35",
  pageTypeSlug: "module",
  slug: "notification-provider-link",
  definition: "the table a caller puts notifications into and the providers reading that table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One link table holds the notifications both panels read.",
    },
    {
      invariantKind: "departure",
      statement: "The keyboard provider is made only where the keyboard panel is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The gamepad provider is always made.",
    },
    {
      invariantKind: "departure",
      statement: "Asking for an update pushes both providers.",
    },
  ],
} as const satisfies Module
