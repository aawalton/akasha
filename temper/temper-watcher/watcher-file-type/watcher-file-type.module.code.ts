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

export function isFileType(value: string): value is FileType {
  return (FILE_TYPES as readonly string[]).includes(value)
}
