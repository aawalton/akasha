export function buildDateLine(build: {
  readonly createdAt: number | null
  readonly updatedAt: number
}): string {
  if (build.updatedAt > 0 && build.updatedAt !== build.createdAt) {
    return `Updated ${new Date(build.updatedAt).toLocaleDateString()}`
  }
  if (build.createdAt === null) return ""
  return `Created ${new Date(build.createdAt).toLocaleDateString()}`
}
