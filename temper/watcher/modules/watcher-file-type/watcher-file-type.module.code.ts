export const FILE_TYPES = [
  "catalog",
  "characters",
  "companions",
  "data-mining",
  "errors",
  "inventory",
  "sales",
] as const

export type FileType = (typeof FILE_TYPES)[number]
