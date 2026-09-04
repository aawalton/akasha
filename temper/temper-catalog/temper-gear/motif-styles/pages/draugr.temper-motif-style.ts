import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const draugr = {
  id: "019e5a46-c3d7-7385-b3ff-c30448a6742a",
  pageTypeSlug: "temper-motif-style",
  slug: "draugr",
  title: "Draugr",
  collectionIndex: 23,
  sourceDescription: "FG/MG/Undaunted dailies (base game)",
  dropSources: ["mages-guild-daily", "fighters-guild-daily", "undaunted-delve-dailies"],
} as const satisfies TemperMotifStyle
