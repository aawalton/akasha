import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const pendingSync = {
  id: "01a06d85-7b22-7be6-8897-ac848f243c69",
  type: "page-type/boolean-property",
  slug: "pending-sync",
  propertySlug: "pending-sync",
  definition: "whether a task has changed since the watcher last carried it out to the game",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The watcher clears this property as soon as that watcher has written the task out.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T17:44:19.490Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies BooleanProperty
