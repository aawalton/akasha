export type SourceTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}
