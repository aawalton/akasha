import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  type ChoosingCharacter,
  type ChoosingPages,
  chooseBuild,
} from "akasha/temper/watcher/modules/watcher-build-choosing/watcher-build-choosing.module.code.ts"

const MADE = [{ id: "b-3", correlationId: "e-9" }]

function choosing(): { pages: ChoosingPages; written: unknown[] } {
  const written: unknown[] = []
  const pages: ChoosingPages = {
    get: async (args) => ({
      rows: MADE.filter((one) => JSON.stringify(args.where).includes(one.correlationId)).map(
        asPage
      ),
    }),
    upsert: async (args) => {
      written.push(args.set)
      return asPage({ id: "page-1" })
    },
  }
  return { pages, written }
}

function held(buildId: string, targetBuildIds: readonly string[]): ChoosingCharacter {
  return {
    where: [{ key: "esoCharacterId", eq: "12345" }],
    targetBuildId: "b-1",
    targetBuildIds,
    chosen: { buildId, over: "b-1" },
  }
}

test("a target build chosen in the game becomes the target build", async () => {
  const { pages, written } = choosing()
  expect(await chooseBuild(held("b-2", ["b-1", "b-2"]), pages)).toBe("b-2")
  expect(written).toEqual([{ targetBuildId: "b-2" }])
})

test("a build made in the game is chosen by the change that made it", async () => {
  const { pages, written } = choosing()
  expect(await chooseBuild(held("e-9", ["b-1", "b-3"]), pages)).toBe("b-3")
  expect(written).toEqual([{ targetBuildId: "b-3" }])
})

test("a build that is no target build of the character is not chosen", async () => {
  const { pages, written } = choosing()
  expect(await chooseBuild(held("e-9", ["b-1"]), pages)).toBeUndefined()
  expect(written).toEqual([])
})

test("a choice made over a build that is no longer the target is left", async () => {
  const { pages, written } = choosing()
  const moved = { ...held("b-2", ["b-1", "b-2"]), targetBuildId: "b-2" }
  expect(await chooseBuild(moved, pages)).toBeUndefined()
  expect(written).toEqual([])
})
