import type { Command } from "@akasha/command-system/command-declaring"
import { expandProseRoutes } from "@akasha/command-system/prose-routing"

const MAX_NAMED_COMMANDS = 3

export interface CommandFlagSurface {
  readonly path: readonly string[]
  readonly surfaceNames: readonly string[]
}

export async function readSiblingFlagSurfaces(
  commands: readonly Command[],
  commandPath: readonly string[]
): Promise<readonly CommandFlagSurface[]> {
  const namespace = commandPath[0]
  if (namespace === undefined) return []
  const invoked = commandPath.join(" ")
  const surfaces: CommandFlagSurface[] = []
  for (const cmd of commands) {
    if (cmd.path[0] !== namespace || cmd.path.join(" ") === invoked) continue
    try {
      const mod = await cmd.load()
      const surfaceNames: string[] = []
      for (const flag of expandProseRoutes(mod.help?.flags ?? []).flags) {
        surfaceNames.push(flag.name)
        for (const alias of flag.aliases ?? []) surfaceNames.push(alias)
      }
      surfaces.push({ path: cmd.path, surfaceNames })
    } catch {}
  }
  return surfaces
}

function joinAlternatives(parts: readonly string[]): string {
  const last = parts[parts.length - 1] ?? ""
  if (parts.length <= 1) return last
  if (parts.length === 2) return `${parts[0]} or ${last}`
  return `${parts.slice(0, -1).join(", ")}, or ${last}`
}

export function siblingCommandHint(
  flagName: string,
  siblings: readonly CommandFlagSurface[]
): string | undefined {
  const invocations = siblings
    .filter((s) => s.surfaceNames.includes(flagName))
    .map((s) => `ops ${s.path.join(" ")} ${flagName}`)
  if (invocations.length === 0) return undefined
  const named = invocations.slice(0, MAX_NAMED_COMMANDS)
  const surplus = invocations.length - named.length
  const parts = surplus > 0 ? [...named, `${surplus} more`] : named
  return `(did you mean ${joinAlternatives(parts)}?)`
}
