import { describe, expect, it } from "bun:test"
import { examined } from "../lib/temper-addon-lua.ts"
import { BUILD_ID_RESULT, loaded, TC_FRAME_ERR, SUBJECTS } from "./temper-errors-capture-fixture.ts"

describe("loaded-build-identity stamp (attributedAddon / attributedBuildId)", () => {

  it("examines 3 code-repo sources, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(3)
  })
  it("(e) stamps the attributed addon + its loaded build id from the _G.TemperBuildIds registry", async () => {
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
    expect(result.entryCount).toBe(1)
    expect(result.attributedAddon).toBe("TemperCrafting")
    expect(result.attributedBuildId).toBe("abc12345")
  })

  it("(f) stamps the attributed addon but no build id when the registry has no entry (external/unstamped)", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = {}
          __capture(100, ${TC_FRAME_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.attributedAddon).toBe("TemperCrafting")
    expect(result.attributedBuildId ?? null).toBeNull()
  })

  it("(g) refreshes the build id to the latest occurrence on a dedupe hit (stale RAM -> reloaded bytes)", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperCrafting = "aaaaaaaa" }
          __capture(100, ${TC_FRAME_ERR}, 0)
          -- same traceback fires again after a /reloadui onto post-fix bytes
          TemperBuildIds = { TemperCrafting = "bbbbbbbb" }
          __capture(100, ${TC_FRAME_ERR}, 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.entryCount).toBe(1)
    expect(result.count).toBe(2)
    expect(result.attributedBuildId).toBe("bbbbbbbb")
  })

  it("(h) leaves both fields unset for a blind error with no addon frame", async () => {
    const result = await loaded(async (vm) =>
      BUILD_ID_RESULT.parse(
        await vm.run(`
          TemperBuildIds = { TemperCrafting = "abc12345" }
          __capture(100, "", 0)
          local e = __sv.entries[1]
          return { entryCount = #__sv.entries, attributedAddon = e.attributedAddon, attributedBuildId = e.attributedBuildId, count = e.count }
        `)
      )
    )
    expect(result.attributedAddon ?? null).toBeNull()
    expect(result.attributedBuildId ?? null).toBeNull()
  })
})
