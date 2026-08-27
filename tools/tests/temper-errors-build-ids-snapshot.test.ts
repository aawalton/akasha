import { describe, expect, it } from "bun:test"
import { examined } from "../lib/temper-addon-lua.ts"
import {
  BUILD_IDS_SNAPSHOT_RESULT,
  CRAFTSTORE_BARE_ERR,
  loaded,
  TC_FRAME_ERR,
  SUBJECTS,
} from "./temper-errors-capture-fixture.ts"

describe("loaded-build-id snapshot (buildIds)", () => {

  it("examines 3 code-repo sources, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(3)
  })
  it("(m) snapshots the whole registry onto an UNATTRIBUTED crash (no addon frame)", async () => {
    const result = await loaded(async (vm) =>
      BUILD_IDS_SNAPSHOT_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperCrafting = "abc12345", TemperInventory = "deadbeef" }
          -- bare CraftStoreFixed handler: no user:/AddOns/ frame → unattributed
          __capture(100, ${CRAFTSTORE_BARE_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, buildIds = e.buildIds }
        `)
      )
    )
    expect(result.entryCount).toBe(1)
    expect(result.attributedAddon ?? null).toBeNull()
    expect(result.buildIds).toEqual({ TemperCrafting: "abc12345", TemperInventory: "deadbeef" })
  })

  it("(n) leaves buildIds unset when the registry global is absent", async () => {
    const result = await loaded(async (vm) =>
      BUILD_IDS_SNAPSHOT_RESULT.parse(
        await vm.run(`
          TemperBuildIds = nil
          __capture(100, ${TC_FRAME_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, buildIds = e.buildIds }
        `)
      )
    )
    expect(result.buildIds ?? null).toBeNull()
  })

  it("(o) refreshes the snapshot to the latest occurrence on a dedupe hit", async () => {
    const result = await loaded(async (vm) =>
      BUILD_IDS_SNAPSHOT_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperCrafting = "aaaaaaaa" }
          __capture(100, ${CRAFTSTORE_BARE_ERR}, 0)
          -- same traceback re-fires after a /reloadui onto newer bytes
          TemperBuildIds = { TemperCrafting = "bbbbbbbb" }
          __capture(100, ${CRAFTSTORE_BARE_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, buildIds = e.buildIds }
        `)
      )
    )
    expect(result.entryCount).toBe(1)
    expect(result.buildIds).toEqual({ TemperCrafting: "bbbbbbbb" })
  })
})
