const STAR = "*"

const TRAILING = "/*"

export interface WorkspacesChange {
  readonly workspaces: readonly string[]
  readonly changed: boolean
}

export function globParts(entry: string): { readonly prefix: string; readonly depth: number } {
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(TRAILING)) {
    prefix = prefix.slice(0, -TRAILING.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes(STAR)) {
    throw new Error(
      `\`${entry}\` is a workspaces entry this reads no meaning from — only trailing \`/*\` segments are understood, so whether it covers a path cannot be answered`
    )
  }
  return { prefix, depth }
}

export function globCovers(entry: string, relPath: string): boolean {
  if (!entry.includes(STAR)) return false
  const { prefix, depth } = globParts(entry)
  const base = `${prefix}/`
  if (!relPath.startsWith(base)) return false
  const rest = relPath.slice(base.length)
  if (rest === "") return false
  return rest.split("/").length === depth
}

export function coveredByGlob(workspaces: readonly string[], relPath: string): boolean {
  return workspaces.some((entry) => globCovers(entry, relPath))
}

export function workspacesAdding(
  workspaces: readonly string[],
  relPath: string
): WorkspacesChange {
  if (coveredByGlob(workspaces, relPath)) return { workspaces, changed: false }
  if (workspaces.includes(relPath)) return { workspaces, changed: false }
  return { workspaces: [...workspaces, relPath], changed: true }
}

export function workspacesDropping(
  workspaces: readonly string[],
  relPath: string
): WorkspacesChange {
  if (!workspaces.includes(relPath)) return { workspaces, changed: false }
  return { workspaces: workspaces.filter((entry) => entry !== relPath), changed: true }
}
