export function buildVersionCreatedAt(row: Readonly<Record<string, unknown>>): string | null {
  return typeof row.createdAt === "string" ? row.createdAt : null
}

function since(version: { createdAt: string | null }): number {
  return version.createdAt === null ? Number.NEGATIVE_INFINITY : Date.parse(version.createdAt)
}

export function newestCreatedFirst(
  a: { createdAt: string | null },
  b: { createdAt: string | null }
): number {
  const left = since(a)
  const right = since(b)
  if (left === right) return 0
  return right > left ? 1 : -1
}
