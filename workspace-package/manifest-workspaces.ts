import { workspacesAdding, workspacesDropping } from "./workspaces-array.ts"

const WORKSPACES = "workspaces"

const INDENT = 2

export interface ManifestChange {
  readonly body: string
  readonly changed: boolean
}

export type How = "adding" | "dropping"

function held(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

export function workspacesIn(body: string): readonly string[] | null {
  let read: unknown
  try {
    read = JSON.parse(body)
  } catch {
    return null
  }
  const manifest = held(read)
  if (manifest === null) return null
  const stated = manifest[WORKSPACES]
  if (stated === undefined) return []
  if (!Array.isArray(stated)) return null
  return stated.every((one) => typeof one === "string") ? (stated as string[]) : null
}

export function manifestWorkspaces(body: string, relPath: string, how: How): ManifestChange | null {
  const workspaces = workspacesIn(body)
  if (workspaces === null) return null
  const change =
    how === "adding" ? workspacesAdding(workspaces, relPath) : workspacesDropping(workspaces, relPath)
  if (!change.changed) return { body, changed: false }
  const manifest = JSON.parse(body) as Record<string, unknown>
  if (change.workspaces.length === 0 && manifest[WORKSPACES] === undefined) {
    return { body, changed: false }
  }
  manifest[WORKSPACES] = [...change.workspaces]
  return { body: `${JSON.stringify(manifest, null, INDENT)}\n`, changed: true }
}
