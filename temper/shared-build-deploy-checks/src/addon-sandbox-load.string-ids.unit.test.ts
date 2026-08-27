import { describe, expect, test } from "bun:test"
import { makeSandboxedLuaVm } from "../../shared-build-deploy-lua-runner/src/sandboxed-lua-vm"
import {
  assertStringIdsRegistered,
  buildUnregisteredStringIdsQuery,
  extractOnInitializedGetStringIds,
  filterAddonOwnedStringIds,
  type LoadResult,
  loadBundleUnderSandbox,
  type SandboxVm,
  STRING_ID_RECORDING_PRELUDE,
} from "./addon-sandbox-load"
import { ESO_BASE_GAME_GLOBALS } from "./eso-base-game-globals.generated"

describe("extractOnInitializedGetStringIds", () => {
  test("returns the exact id set across multiple OnInitialized blocks", () => {
    const xml = [
      "<GuiXml><Controls>",
      "<Label name='A'><OnInitialized>",
      '  self.font = {GetString(SI_TEMPER_COMBAT_BOLD_FONT), GetString(SI_TEMPER_COMBAT_FONT_SIZE), "soft-shadow-thin"}',
      "</OnInitialized></Label>",
      "<Label name='B'><OnInitialized>",
      '  self.font = {GetString(SI_TEMPER_COMBAT_STD_FONT), GetString(SI_TEMPER_COMBAT_FONT_SIZE_SMALL), "soft-shadow-thin"}',
      "</OnInitialized></Label>",
      "</Controls></GuiXml>",
    ].join("\n")
    expect(extractOnInitializedGetStringIds(xml)).toEqual([
      "SI_TEMPER_COMBAT_BOLD_FONT",
      "SI_TEMPER_COMBAT_FONT_SIZE",
      "SI_TEMPER_COMBAT_FONT_SIZE_SMALL",
      "SI_TEMPER_COMBAT_STD_FONT",
    ])
  })

  test("ignores GetString in non-OnInitialized handlers (OnClicked runs post-load)", () => {
    const xml = [
      "<GuiXml>",
      "<Button name='B'><OnClicked>d(GetString(SI_CLICK_ONLY))</OnClicked></Button>",
      "<Label name='L'><OnInitialized>self.text = GetString(SI_INIT_TIME)</OnInitialized></Label>",
      "</GuiXml>",
    ].join("\n")
    expect(extractOnInitializedGetStringIds(xml)).toEqual(["SI_INIT_TIME"])
  })

  test("returns empty for XML whose OnInitialized blocks never call GetString", () => {
    const xml = [
      "<GuiXml>",
      "<Label name='L'><OnInitialized>self.tooltip = {SI_BARE_ID_NO_GETSTRING}</OnInitialized></Label>",
      "</GuiXml>",
    ].join("\n")
    expect(extractOnInitializedGetStringIds(xml)).toEqual([])
  })

  test("dedupes ids consumed by multiple blocks", () => {
    const xml = [
      "<GuiXml>",
      "<Label name='A'><OnInitialized>self.text = GetString(SI_SHARED)</OnInitialized></Label>",
      "<Label name='B'><OnInitialized>self.text = GetString(SI_SHARED)</OnInitialized></Label>",
      "</GuiXml>",
    ].join("\n")
    expect(extractOnInitializedGetStringIds(xml)).toEqual(["SI_SHARED"])
  })

  test("tolerates whitespace between GetString and its argument", () => {
    const xml = "<X><OnInitialized>local s = GetString ( SI_SPACED )</OnInitialized></X>"
    expect(extractOnInitializedGetStringIds(xml)).toEqual(["SI_SPACED"])
  })
})

describe("filterAddonOwnedStringIds", () => {
  test("holds an id the authority does not carry, and exempts one it does", () => {
    const authority: ReadonlySet<string> = new Set(["SI_GAMEPAD_HELP_SEARCH"])
    expect(
      filterAddonOwnedStringIds(["SI_GAMEPAD_HELP_SEARCH", "SI_TEMPER_NEVER_MENTIONED"], authority)
    ).toEqual(["SI_TEMPER_NEVER_MENTIONED"])
  })

  test("the committed authority parts the ids this tree's XML consumes", () => {
    const consumed = [
      "SI_GAMEPAD_HELP_SEARCH",
      "SI_TRADING_HOUSE_POSTING_QUANTITY",
      "SI_ITEM_SETS_BOOK_HEADER_COLLAPSE",
      "SI_TEMPER_COMBAT_DPS",
      "SI_ITEMBROWSER_HEADER_NAME",
    ]
    expect(filterAddonOwnedStringIds(consumed, ESO_BASE_GAME_GLOBALS)).toEqual([
      "SI_TEMPER_COMBAT_DPS",
      "SI_ITEMBROWSER_HEADER_NAME",
    ])
  })
})

function makeStringIdFakeVm(options: {
  consumedIds: readonly string[]
  bundleEffect?: (register: (id: string) => void) => void
}): { vm: SandboxVm; chunks: readonly string[] } {
  const chunks: string[] = []
  const registered = new Set<string>()
  let recorderInstalled = false
  const expectedQuery = buildUnregisteredStringIdsQuery(options.consumedIds)
  const vm: SandboxVm = {
    setGlobal() {},
    async doString(source) {
      chunks.push(source)
      if (source === STRING_ID_RECORDING_PRELUDE) {
        recorderInstalled = true
        return null
      }
      if (source === expectedQuery) {
        const missing = options.consumedIds.filter((id) => !registered.has(id))
        return missing.join("\n")
      }
      options.bundleEffect?.((id) => {
        if (recorderInstalled) registered.add(id)
      })
      return null
    },
  }
  return { vm, chunks }
}

describe("string-id registration assertion", () => {
  test("loadBundleUnderSandbox runs the prelude before the bundle", async () => {
    const { vm, chunks } = makeStringIdFakeVm({ consumedIds: [] })
    await loadBundleUnderSandbox(
      { source: "BUNDLE", bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
      vm
    )
    expect(chunks).toEqual([STRING_ID_RECORDING_PRELUDE, "BUNDLE"])
  })

  test("prelude failure surfaces as a LoadErr naming the prelude", async () => {
    const vm: SandboxVm = {
      setGlobal() {},
      async doString(source) {
        if (source === STRING_ID_RECORDING_PRELUDE) throw new Error("syntax error near boom")
        return null
      },
    }
    const result = await loadBundleUnderSandbox(
      { source: "BUNDLE", bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
      vm
    )
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain("prelude")
  })

  test("reports the consumed-but-unregistered subset", async () => {
    const consumedIds = ["SI_A", "SI_B"]
    const { vm } = makeStringIdFakeVm({
      consumedIds,
      bundleEffect: (register) => register("SI_A"),
    })
    await loadBundleUnderSandbox(
      { source: "BUNDLE", bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
      vm
    )
    const result = await assertStringIdsRegistered({ bundle: "MyAddon", consumedIds }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.bundle).toBe("MyAddon")
      expect(result.error).toContain("SI_B")
      expect(result.error).not.toContain("SI_A,")
      expect(result.error).toContain("XML OnInitialized consumes unregistered string id(s)")
      expect(result.error).toContain("ZO_CreateStringId")
      expect(result.error).toContain("LibCodesCommonCode.RegisterString")
      expect(result.error).toContain("at bundle module top level")
      expect(result.error).toContain("not EVENT_ADD_ON_LOADED")
    }
  })

  test("passes when every consumed id is registered at bundle top level", async () => {
    const consumedIds = ["SI_A"]
    const { vm } = makeStringIdFakeVm({
      consumedIds,
      bundleEffect: (register) => register("SI_A"),
    })
    await loadBundleUnderSandbox(
      { source: "BUNDLE", bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
      vm
    )
    const result = await assertStringIdsRegistered({ bundle: "MyAddon", consumedIds }, vm)
    expect(result.ok).toBe(true)
  })

  test("reports an id whose registration is deferred into a never-called function", async () => {
    const consumedIds = ["SI_DEFERRED"]
    const { vm } = makeStringIdFakeVm({
      consumedIds,
      bundleEffect: (register) => {
        const onAddonLoaded = (): undefined => {
          register("SI_DEFERRED")
        }
        void onAddonLoaded
      },
    })
    await loadBundleUnderSandbox(
      { source: "BUNDLE", bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
      vm
    )
    const result = await assertStringIdsRegistered({ bundle: "MyAddon", consumedIds }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain("SI_DEFERRED")
  })

  test("asserts only the addon-owned subset — ZOS built-ins consumed by XML pass through", async () => {
    const consumed = ["SI_GAMEPAD_HELP_SEARCH", "SI_OWNED_DEFERRED"]
    const bundle = [
      "local function onAddonLoaded()",
      '  ZO_CreateStringId("SI_OWNED_DEFERRED", "x")',
      "  search:SetText(GetString(SI_GAMEPAD_HELP_SEARCH))",
      "end",
    ].join("\n")
    const owned = filterAddonOwnedStringIds(consumed, ESO_BASE_GAME_GLOBALS)
    expect(owned).toEqual(["SI_OWNED_DEFERRED"])
    const { vm } = makeStringIdFakeVm({ consumedIds: owned })
    await loadBundleUnderSandbox(
      { source: bundle, bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
      vm
    )
    const result = await assertStringIdsRegistered({ bundle: "CraftStore", consumedIds: owned }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toContain("SI_OWNED_DEFERRED")
      expect(result.error).not.toContain("SI_GAMEPAD_HELP_SEARCH")
    }
  })

  test("returns ok without touching the VM when no ids are consumed", async () => {
    const { vm, chunks } = makeStringIdFakeVm({ consumedIds: ["SI_UNUSED"] })
    const result = await assertStringIdsRegistered({ bundle: "MyAddon", consumedIds: [] }, vm)
    expect(result.ok).toBe(true)
    expect(chunks).toEqual([])
  })

  test("returns a LoadErr (not a throw) when the query result is not a string", async () => {
    const vm: SandboxVm = {
      setGlobal() {},
      async doString() {
        return 42
      },
    }
    const result = await assertStringIdsRegistered({ bundle: "b", consumedIds: ["SI_A"] }, vm)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain("string-id query")
  })
})

describe("the recording prelude inside a real ESO sandbox VM", () => {
  async function assertUnderRealVm(
    bundle: string,
    consumedIds: readonly string[]
  ): Promise<LoadResult> {
    const sandboxed = await makeSandboxedLuaVm({ bannedGlobals: [] })
    const vm: SandboxVm = {
      setGlobal(name, value): undefined {
        sandboxed.setGlobal(name, value)
      },
      async doString(source): Promise<unknown> {
        return sandboxed.doString(source)
      },
    }
    try {
      const load = await loadBundleUnderSandbox(
        { source: bundle, bundle: "b.lua", prelude: STRING_ID_RECORDING_PRELUDE },
        vm
      )
      expect(load.ok).toBe(true)
      return await assertStringIdsRegistered({ bundle: "MyAddon", consumedIds }, vm)
    } finally {
      await sandboxed.close()
    }
  }

  test("counts a registration made through LibCodesCommonCode.RegisterString", async () => {
    const bundle = [
      'LibCodesCommonCode.RegisterString("SI_TEMPER_LIB_ROUTE", "Name")',
      "LibCodesCommonCode.RunAfterInitialLoadscreen(function() end)",
    ].join("\n")
    const result = await assertUnderRealVm(bundle, ["SI_TEMPER_LIB_ROUTE"])
    expect(result.ok).toBe(true)
  })

  test("still reports one LibCodesCommonCode.RegisterString never reaches at load", async () => {
    const bundle = [
      "local function onAddonLoaded()",
      '  LibCodesCommonCode.RegisterString("SI_TEMPER_LIB_DEFERRED", "Name")',
      "end",
    ].join("\n")
    const result = await assertUnderRealVm(bundle, ["SI_TEMPER_LIB_DEFERRED"])
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain("SI_TEMPER_LIB_DEFERRED")
  })
})

describe("buildUnregisteredStringIdsQuery", () => {
  test("embeds each consumed id as a quoted Lua string", () => {
    const query = buildUnregisteredStringIdsQuery(["SI_ONE", "SI_TWO"])
    expect(query).toContain('"SI_ONE"')
    expect(query).toContain('"SI_TWO"')
  })

  test("errors loudly when the recorder was never installed", () => {
    const query = buildUnregisteredStringIdsQuery(["SI_ONE"])
    expect(query).toContain("recorder not installed")
  })
})
