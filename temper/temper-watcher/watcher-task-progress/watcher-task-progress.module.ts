import type { Module } from "@akasha/code/module"

export const watcherTaskProgress = {
  id: "01a08255-32ee-74c3-ad48-3a0fad80e432",
  pageTypeSlug: "module",
  slug: "watcher-task-progress",
  definition: "what each character has done of a task, recomputed from completion",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The totals a task states are the totals of its lines added up.",
    },
    {
      invariantKind: "departure",
      statement: "A task naming no completion card is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A task the index does not name is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The id a character's line already had is kept rather than minted again.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming a character no line named before is given an id as it lands.",
    },
    {
      invariantKind: "departure",
      statement: "A line that will not parse is passed over rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are ordered as the reading ordered them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
