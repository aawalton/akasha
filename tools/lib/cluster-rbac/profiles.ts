import { readdirSync } from "node:fs"
import { join } from "node:path"
import type { NamespaceProfile } from "../workflow-dsl/rbac-types.ts"

export const RBAC_DIR = "tools/lib/rbac"

export interface RbacProfileSource {
  readonly path: string
  readonly packageName: string
  readonly profiles: readonly NamespaceProfile[]
}

function listProfileSources(dir: string): readonly string[] {
  let names: readonly string[]
  try {
    names = readdirSync(dir, { encoding: "utf-8" })
  } catch (cause) {
    throw new Error(
      `${dir} holds the RBAC profiles and could not be read: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  return names
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".test.ts"))
    .sort()
    .map((name) => join(dir, name))
}

export async function profileSources(instructionsRoot: string): Promise<readonly RbacProfileSource[]> {
  const dir = join(instructionsRoot, RBAC_DIR)
  const files = listProfileSources(dir)
  if (files.length === 0) {
    throw new Error(
      `no RBAC profile source stands in ${dir}, and every namespace role is declared in one of ` +
        "them, so going on would report that nothing grants anything rather than failing"
    )
  }
  const sources: RbacProfileSource[] = []
  for (const file of files) {
    const mod: Record<string, unknown> = await import(file)
    const held = mod.profiles ?? mod.default
    const exported: readonly NamespaceProfile[] = Array.isArray(held)
      ? (held as readonly NamespaceProfile[])
      : []
    if (exported.length === 0) {
      throw new Error(`${file} stands among the RBAC profiles and exports none`)
    }
    if (typeof mod.packageName !== "string" || mod.packageName === "") {
      throw new Error(
        `${file} exports no \`packageName\`, and which package a profile belongs to is not ` +
          "recoverable from where the file sits"
      )
    }
    sources.push({ path: file, packageName: mod.packageName, profiles: exported })
  }
  return sources
}

export async function allProfiles(instructionsRoot: string): Promise<readonly NamespaceProfile[]> {
  return (await profileSources(instructionsRoot)).flatMap((source) => [...source.profiles])
}
