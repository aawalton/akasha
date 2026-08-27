import { describe, expect, it } from "bun:test"
import { makeSandboxedLuaVm, withSandboxedLuaVm } from "../src/sandboxed-lua-vm"

const ESO_BANNED = [
  "debug",
  "io",
  "os",
  "package",
  "require",
  "module",
  "dofile",
  "loadfile",
  "load",
]

describe("makeSandboxedLuaVm", () => {
  it("wipes banned globals so direct references surface as runtime errors", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      let caught: unknown = null
      try {
        await vm.doString("debug.traceback()")
      } catch (err) {
        caught = err
      }
      expect(caught).toBeInstanceOf(Error)
      expect(String(caught)).toContain("debug")
    })
  })

  it("makes _G[banned] return nil rather than auto-vivify a stub", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString('return _G["debug"] == nil')
      expect(result).toBe(true)
    })
  })

  it("auto-vivifies an indexable callable stub for unknown globals", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString(`
        local x = SomethingNotSeeded.foo.bar:Method(1, 2, 3)
        return type(x)
      `)
      expect(result).toBe("table")
    })
  })

  it("allows concatenating a stub result (load-time GetString(...) .. idiom)", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString(`
        local caption = GetString(SI_ATTRIBUTES1) .. " + " .. GetString(SI_ATTRIBUTES2)
        return caption
      `)
      expect(result).toBe(" + ")
    })
  })

  it("allows arithmetic on a stub result (load-time GuiRoot:GetWidth() - n idiom)", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString(`
        local x = GuiRoot:GetWidth() - 500
        local y = GuiRoot:GetHeight() + 7
        local z = -GuiRoot:GetScale() + x * 2 + y
        return z
      `)
      expect(result).toBe(-993)
    })
  })

  it("resolves a multi-return ESO API so destructured trailing locals are usable stubs", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString(`
        local _, mapping = ZO_ChatSystem_GetEventCategoryMappings()
        mapping["LibChatMessage"] = 1
        return type(mapping)
      `)
      expect(result).toBe("table")
    })
  })

  it("seeds ESO numeric constants so load-time numeric loops execute", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString(`
        local count = 0
        local quality = ITEM_FUNCTIONAL_QUALITY_MIN_VALUE
        while quality <= ITEM_FUNCTIONAL_QUALITY_MAX_VALUE do
          count = count + 1
          quality = quality + 1
        end
        return count
      `)
      expect(result).toBe(5)
    })
  })

  it("seeds ESO link-style constants as real numbers for load-time string.format", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const kinds = await vm.doString(`
        return type(LINK_STYLE_DEFAULT) .. "," .. type(LINK_STYLE_BRACKETS)
      `)
      expect(kinds).toBe("number,number")
      const link = await vm.doString(`
        return string.format("|H%s:item:%s|h|h", LINK_STYLE_BRACKETS, 54172)
      `)
      expect(link).toBe("|H1:item:54172|h|h")
    })
  })

  it("resolves count-returning ESO APIs to a number so load-time count loops execute", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const kind = await vm.doString("return type(GetNumClasses())")
      expect(kind).toBe("number")
      const count = await vm.doString(`
        local count = 0
        local i = 1
        while i <= GetNumClasses() do
          count = count + 1
          i = i + 1
        end
        return count
      `)
      expect(count).toBe(0)
    })
  })

  it("retains real stdlib survivors (string, table, math, pairs, ipairs, ...)", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const result = await vm.doString(`
        return string.format("hello %s %d", "world", 42)
      `)
      expect(result).toBe("hello world 42")
    })
  })

  it("setGlobal seeds primitive values into the sandbox env", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      vm.setGlobal("AddonName", "MyAddon")
      const result = await vm.doString("return AddonName")
      expect(result).toBe("MyAddon")
    })
  })

  it("setGlobal seeds a record-shaped object into the sandbox env", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      vm.setGlobal("Config", { debug: true, version: 7 })
      const result = await vm.doString("return Config.version")
      expect(result).toBe(7)
    })
  })

  it("setGlobal seeds a callable JS value as a Lua-side permissive stub", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      const fakeStub: unknown = () => {}
      vm.setGlobal("EVENT_MANAGER", fakeStub)
      const result = await vm.doString(`
        local x = EVENT_MANAGER:RegisterForEvent("Foo", 1, function() end)
        return type(x)
      `)
      expect(result).toBe("table")
    })
  })

  it("seeded globals do not leak into the ambient _G", async () => {
    await withSandboxedLuaVm({ bannedGlobals: ESO_BANNED }, async (vm) => {
      vm.setGlobal("SandboxOnly", "secret")
      const insideSandbox = await vm.doString("return SandboxOnly")
      expect(insideSandbox).toBe("secret")
      const ambientLeak = await vm.doString("return rawget(_G, 'SandboxOnly')")
      expect(ambientLeak).toBe(null)
    })
  })

  it("close shuts down the underlying lua5.1 process — observable via post-close doString throw", async () => {
    const vm = await makeSandboxedLuaVm({ bannedGlobals: ESO_BANNED })
    await vm.close()
    let caught: unknown = null
    try {
      await vm.doString("return 1")
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(Error)
  })
})
