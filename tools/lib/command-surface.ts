
import { commandSet } from "../ops/set.ts"
import type { CommandDocument, CommandHelp } from "../ops/surface.ts"

export interface CommandSurface {
  readonly command: string
  readonly summary: string
  readonly source: string | null
  readonly help: CommandHelp
  readonly document: CommandDocument | null
}

export interface SurfaceReading {
  readonly verbs: readonly CommandSurface[]
  readonly unreadable: readonly string[]
}

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export async function commandSurface(): Promise<SurfaceReading> {
  const verbs: CommandSurface[] = []
  const unreadable: string[] = []
  for (const command of commandSet()) {
    const name = command.path.join(" ")
    try {
      const module = await command.load()
      verbs.push({
        command: name,
        summary: command.summary,
        source: command.source ?? null,
        help: module.help ?? {},
        document: command.document ?? null,
      })
    } catch (err) {
      unreadable.push(`${name}: ${messageOf(err)}`)
    }
  }
  return { verbs, unreadable }
}
