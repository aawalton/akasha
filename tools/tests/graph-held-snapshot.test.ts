import { describe, expect, test } from "bun:test"
import { createGraph } from "../lib/graph/graph.ts"
import {
  createSnapshotHolder,
  HELD_AT_ONCE,
  type SnapshotReading,
} from "../lib/graph/held-snapshot.ts"
import { identityKey } from "../lib/graph/identity.ts"
import type { BuildContext, Graph } from "../lib/graph/types.ts"

const ctxOf = (commit: string): BuildContext => ({
  repoRoots: new Map(),
  repoFiles: new Map(),
  commit,
})

const reading = (commit: string, instructions: string): SnapshotReading => ({
  identity: { commit, repos: { code: commit, instructions } },
  ctx: ctxOf(commit),
})

const holderOver = (
  state: () => string,
  onBuild: (ctx: BuildContext) => undefined = () => undefined
) =>
  createSnapshotHolder(
    (commit) => reading(commit, state()),
    async (ctx) => {
      onBuild(ctx)
      return createGraph([{ type: "t", key: ctx.commit, id: ctx.commit, attrs: {}, derived: {} }], [])
    }
  )

describe("a snapshot is held against its identity rather than rebuilt", () => {
  test("a second question at one identity is answered from what is held", async () => {
    let builds = 0
    const holder = holderOver(
      () => "clean",
      () => {
        builds += 1
      }
    )
    await holder.at("abc")
    await holder.at("abc")
    expect(builds).toBe(1)
  })

  test("the same commit is built again once another repository has moved", async () => {
    let builds = 0
    let state = "clean"
    const holder = holderOver(
      () => state,
      () => {
        builds += 1
      }
    )
    await holder.at("abc")
    state = "edited"
    await holder.at("abc")
    expect(builds).toBe(2)
    expect(holder.held()).toHaveLength(2)
  })

  test("questions arriving together at one identity share the one build", async () => {
    let builds = 0
    const holder = createSnapshotHolder(
      (commit) => reading(commit, "clean"),
      async (ctx): Promise<Graph> => {
        builds += 1
        await Bun.sleep(5)
        return createGraph([{ type: "t", key: ctx.commit, id: ctx.commit, attrs: {}, derived: {} }], [])
      }
    )
    await Promise.all([holder.at("abc"), holder.at("abc"), holder.at("abc")])
    expect(builds).toBe(1)
  })

  test("the identity a snapshot was built at comes back with it", async () => {
    const holder = holderOver(() => "clean")
    const snapshot = await holder.at("abc")
    expect(snapshot.identity.commit).toBe("abc")
    expect(identityKey(snapshot.identity)).toBe("code=abc instructions=clean")
  })

  test("holding is bounded, and the identity asked for longest ago goes first", async () => {
    const holder = holderOver(() => "clean")
    for (let n = 0; n <= HELD_AT_ONCE; n += 1) await holder.at(`commit-${n}`)
    expect(holder.held()).toHaveLength(HELD_AT_ONCE)
    expect(holder.held()).not.toContain("code=commit-0 instructions=clean")
    expect(holder.held()).toContain(`code=commit-${HELD_AT_ONCE} instructions=clean`)
  })

  test("asking again for a held identity keeps it from being the next to go", async () => {
    const holder = holderOver(() => "clean")
    for (let n = 0; n < HELD_AT_ONCE; n += 1) await holder.at(`commit-${n}`)
    await holder.at("commit-0")
    await holder.at("commit-later")
    expect(holder.held()).toContain("code=commit-0 instructions=clean")
    expect(holder.held()).not.toContain("code=commit-1 instructions=clean")
  })
})
