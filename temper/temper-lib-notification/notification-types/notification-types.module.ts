import type { Module } from "@akasha/code-system/module"

export const notificationTypes = {
  id: "01a0605a-0517-72bd-a7a6-c5f4d281833c",
  pageTypeSlug: "module",
  slug: "notification-types",
  definition: "the shape of a notification row and of the providers carrying rows to a panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row carries whatever else the caller puts on the row.",
    },
    {
      invariantKind: "departure",
      statement: "A row names a keyboard callback and a gamepad callback apart.",
    },
    {
      invariantKind: "departure",
      statement: "The only call the library offers a caller makes a link table.",
    },
  ],
} as const satisfies Module
