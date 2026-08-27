import { describe, expect, it } from "bun:test"
import { examined } from "../lib/temper-addon-lua.ts"
import {
  BUILD_ID_RESULT,
  CRAFTSTORE_BARE_ERR,
  LIBASYNC_TO_EXTERNAL_ERR,
  LIBASYNC_TO_TEMPER_ERR,
  loaded,
  TC_FRAME_ERR,
  SUBJECTS,
} from "./temper-errors-capture-fixture.ts"

describe("robust multi-frame attribution (#13348)", () => {

  it("examines 3 code-repo sources, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(3)
  })
  it("(i) LibAsync-dispatched crash attributes to the Temper addon PAST the external lib", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperInventory = "deadbeef" }
          __capture(100, ${LIBASYNC_TO_TEMPER_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.entryCount).toBe(1)
    expect(result.attributedAddon).toBe("TemperInventory")
    expect(result.attributedBuildId).toBe("deadbeef")
  })

  it("(j) CraftStoreFixed bare XML-handler frame stays unattributed (genuinely not Temper)", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperInventory = "deadbeef" }
          __capture(100, ${CRAFTSTORE_BARE_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.attributedAddon ?? null).toBeNull()
    expect(result.attributedBuildId ?? null).toBeNull()
  })

  it("(k) pure-external dispatch falls back to the FIRST frame (preserves prior behavior)", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperInventory = "deadbeef" }
          __capture(100, ${LIBASYNC_TO_EXTERNAL_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.attributedAddon).toBe("LibAsync")
    expect(result.attributedBuildId ?? null).toBeNull()
  })

  it("(l) direct Temper-first frame is unchanged (first registered frame wins)", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperCrafting = "abc12345" }
          __capture(100, ${TC_FRAME_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.attributedAddon).toBe("TemperCrafting")
    expect(result.attributedBuildId).toBe("abc12345")
  })
})
