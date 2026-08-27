
const HOLE = /\{([a-z0-9-]+)\}/g

const SEPARATORS = /[^A-Za-z0-9]+/

export const SETTLED_BY_ROW: ReadonlySet<string> = new Set([
  "userId",
  "pageTypeId",
  "pageTypeSlug",
  "seq",
  "createdAt",
  "updatedAt",
  "deletedAt",
])

export function camelizeKey(key: string): string {
  const parts = key.split(SEPARATORS).filter((one) => one.length > 0)
  const [first, ...rest] = parts
  if (first === undefined) return ""
  const head = first.charAt(0).toLowerCase() + first.slice(1)
  return head + rest.map((one) => one.charAt(0).toUpperCase() + one.slice(1)).join("")
}

export function holesIn(template: string): readonly string[] {
  const found: string[] = []
  for (const [, key] of template.matchAll(HOLE)) {
    if (key !== undefined) found.push(key)
  }
  return found
}

export function constantHolesIn(template: string): readonly string[] {
  return holesIn(template).filter((one) => SETTLED_BY_ROW.has(camelizeKey(one)))
}
