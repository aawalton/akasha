import { identityKey, identityOf, type SnapshotIdentity } from "./identity.ts"
import { readRepos } from "./repos.ts"
import { assembleEngine } from "./snapshot.ts"
import type { BuildContext, Engine, Graph } from "./types.ts"

export const HELD_AT_ONCE = 4

export type HeldSnapshot = {
  readonly identity: SnapshotIdentity
  readonly graph: Graph
}

export type SnapshotReading = {
  readonly identity: SnapshotIdentity
  readonly ctx: BuildContext
}

export type SnapshotHolder = {
  readonly at: (commit: string) => Promise<HeldSnapshot>
  readonly held: () => readonly string[]
}

export const readAt = (commit: string): SnapshotReading => {
  const ctx = readRepos(commit)
  return { identity: identityOf(ctx), ctx }
}

let assembled: Promise<Engine> | null = null

export const buildFrom = async (ctx: BuildContext): Promise<Graph> => {
  assembled ??= assembleEngine()
  return (await assembled).build(ctx)
}

export const createSnapshotHolder = (
  read: (commit: string) => SnapshotReading = readAt,
  build: (ctx: BuildContext) => Promise<Graph> = buildFrom
): SnapshotHolder => {
  const held = new Map<string, HeldSnapshot>()
  const building = new Map<string, Promise<HeldSnapshot>>()

  const keep = (key: string, snapshot: HeldSnapshot): undefined => {
    held.delete(key)
    held.set(key, snapshot)
    while (held.size > HELD_AT_ONCE) {
      const oldest = held.keys().next()
      if (oldest.done === true) break
      held.delete(oldest.value)
    }
  }

  const at = async (commit: string): Promise<HeldSnapshot> => {
    const { identity, ctx } = read(commit)
    const key = identityKey(identity)
    const standing = held.get(key)
    if (standing !== undefined) {
      keep(key, standing)
      return standing
    }
    const running = building.get(key)
    if (running !== undefined) return running
    const started = build(ctx).then((graph) => {
      const snapshot: HeldSnapshot = { identity, graph }
      keep(key, snapshot)
      return snapshot
    })
    building.set(key, started)
    try {
      return await started
    } finally {
      building.delete(key)
    }
  }

  return { at, held: () => [...held.keys()] }
}
