export const FILE_TYPES = [
  "catalog",
  "characters",
  "combat",
  "companions",
  "data-mining",
  "errors",
  "inventory",
  "sales",
] as const

export type FileType = (typeof FILE_TYPES)[number]
