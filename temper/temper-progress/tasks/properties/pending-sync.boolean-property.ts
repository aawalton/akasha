import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type PendingSync = boolean

export const pendingSync = {
  id: "01a06d85-7b22-7be6-8897-ac848f243c69",
  pageTypeSlug: "boolean-property",
  slug: "pending-sync",
  propertySlug: "pending-sync",
  definition: "whether a task has changed since the watcher last carried it out to the game",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The watcher clears this as soon as it has written the task out.",
    },
  ],
} as const satisfies BooleanProperty
