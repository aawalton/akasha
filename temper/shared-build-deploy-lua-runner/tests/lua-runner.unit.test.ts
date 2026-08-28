import { afterAll, describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { type LuaVm, makeLuaVm, withLuaVm } from "../src/lua-vm"
import { spawnPersistentVm } from "../src/persistent-vm"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

describe("makeLuaVm", () => {
  it("returns the result of a simple expression", async () => {
    const vm = await makeLuaVm()
    try {
      const result = await vm.run("return 1 + 1")
      expect(result).toBe(2)
    } finally {
      await vm.close()
    }
  })

  it("returns string values verbatim including escapes", async () => {
    const vm = await makeLuaVm()
    try {
      const result = await vm.run('return "hello\\tworld\\n"')
      expect(result).toBe("hello\tworld\n")
    } finally {
      await vm.close()
    }
  })

  it("returns boolean values", async () => {
    const vm = await makeLuaVm()
    try {
      expect(await vm.run("return true")).toBe(true)
      expect(await vm.run("return false")).toBe(false)
    } finally {
      await vm.close()
    }
  })

  it("returns nil as JS null", async () => {
    const vm = await makeLuaVm()
    try {
      const result = await vm.run("return nil")
      expect(result).toBe(null)
    } finally {
      await vm.close()
    }
  })

  it("returns a sequential table as a JS array", async () => {
    const vm = await makeLuaVm()
    try {
      const result = await vm.run("return {10, 20, 30}")
      expect(result).toEqual([10, 20, 30])
    } finally {
      await vm.close()
    }
  })

  it("returns a record-shaped table as a JS object", async () => {
    const vm = await makeLuaVm()
    try {
      const result = await vm.run('return {a = 1, b = "two", c = true}')
      expect(result).toEqual({ a: 1, b: "two", c: true })
    } finally {
      await vm.close()
    }
  })

  it("returns a nested table preserving structure", async () => {
    const vm = await makeLuaVm()
    try {
      const result = await vm.run('return {outer = {inner = {1, 2, 3}, label = "x"}}')
      expect(result).toEqual({ outer: { inner: [1, 2, 3], label: "x" } })
    } finally {
      await vm.close()
    }
  })

  it("preserves global state across multiple run calls", async () => {
    const vm = await makeLuaVm()
    try {
      await vm.run("counter = 0")
      await vm.run("counter = counter + 5")
      await vm.run("counter = counter + 7")
      expect(await vm.get("counter")).toBe(12)
    } finally {
      await vm.close()
    }
  })

  it("get retrieves a global by name", async () => {
    const vm = await makeLuaVm()
    try {
      await vm.run('greeting = "hello"')
      expect(await vm.get("greeting")).toBe("hello")
    } finally {
      await vm.close()
    }
  })

  it("get returns null when the global is unset", async () => {
    const vm = await makeLuaVm()
    try {
      expect(await vm.get("never_assigned")).toBe(null)
    } finally {
      await vm.close()
    }
  })

  it("throws a JS error when the Lua script raises an error", async () => {
    const vm = await makeLuaVm()
    try {
      let caught: unknown = null
      try {
        await vm.run('error("boom")')
      } catch (err) {
        caught = err
      }
      expect(caught).toBeInstanceOf(Error)
      expect(String(caught)).toContain("boom")
    } finally {
      await vm.close()
    }
  })

  it("throws on a Lua syntax error", async () => {
    const vm = await makeLuaVm()
    try {
      let caught: unknown = null
      try {
        await vm.run("local x = (")
      } catch (err) {
        caught = err
      }
      expect(caught).toBeInstanceOf(Error)
    } finally {
      await vm.close()
    }
  })

  it("survives a Lua error and continues to run subsequent scripts", async () => {
    const vm = await makeLuaVm()
    try {
      await vm.run("x = 10")
      try {
        await vm.run('error("intentional")')
      } catch {}
      expect(await vm.get("x")).toBe(10)
      await vm.run("x = 20")
      expect(await vm.get("x")).toBe(20)
    } finally {
      await vm.close()
    }
  })

  it("stubs are run after spawn and visible to subsequent scripts", async () => {
    const vm = await makeLuaVm({ stubs: "GetTimeStamp = function() return 1700000000 end" })
    try {
      const result = await vm.run("return GetTimeStamp()")
      expect(result).toBe(1700000000)
    } finally {
      await vm.close()
    }
  })

  it("close is idempotent", async () => {
    const vm = await makeLuaVm()
    await vm.close()
    await vm.close()
  })

  it("rejects send after close", async () => {
    const vm = await makeLuaVm()
    await vm.close()
    let caught: unknown = null
    try {
      await vm.run("return 1")
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(Error)
  })
})

describe("spawnPersistentVm handshake", () => {
  it("throws a diagnostic error when the lua binary path does not exist", async () => {
    let caught: unknown = null
    try {
      await spawnPersistentVm({
        binPath: "/nonexistent/lua-binary-9377",
      })
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(Error)
    const msg = String(caught)
    expect(msg).toMatch(/lua-runner|persistent vm|handshake|spawn/i)
    expect(msg).toContain("/nonexistent/lua-binary-9377")
  })

  it("throws a diagnostic error including stderr when the driver exits before handshake", async () => {
    const tmp = mkdtempSync(join(tmpdir(), "lua-runner-9377-"))
    made.push(tmp)
    const badDriver = join(tmp, "driver.lua")
    writeFileSync(badDriver, "io.stderr:write('STRESS_MARKER_9377\\n'); os.exit(7)\n")

    let caught: unknown = null
    try {
      await spawnPersistentVm({ driverPath: badDriver })
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(Error)
    const msg = String(caught)
    expect(msg).toContain("STRESS_MARKER_9377")
    expect(msg).toMatch(/pid[: =]/i)
    expect(msg).toMatch(/exit.*7/i)
  })

  it("retries the handshake before giving up", async () => {
    const tmp = mkdtempSync(join(tmpdir(), "lua-runner-9377-"))
    made.push(tmp)
    const exitDriver = join(tmp, "exit.lua")
    writeFileSync(exitDriver, "os.exit(0)\n")

    let caught: unknown = null
    try {
      await spawnPersistentVm({ driverPath: exitDriver })
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(Error)
    const msg = String(caught)
    expect(msg).toMatch(/handshake|retr/i)
  })
})

describe("withLuaVm", () => {
  it("closes the VM when fn returns", async () => {
    let captured: LuaVm | undefined
    const result = await withLuaVm(async (vm) => {
      captured = vm
      return await vm.run("return 21 * 2")
    })
    expect(result).toBe(42)
    if (captured === undefined) throw new Error("captured vm not set")
    let after: unknown = null
    try {
      await captured.run("return 1")
    } catch (err) {
      after = err
    }
    expect(String(after)).toMatch(/closed/i)
  })

  it("closes the VM in finally even when fn throws", async () => {
    let captured: LuaVm | undefined
    let caught: unknown = null
    try {
      await withLuaVm(async (vm) => {
        captured = vm
        throw new Error("test failure 9377")
      })
    } catch (err) {
      caught = err
    }
    expect(String(caught)).toContain("test failure 9377")
    if (captured === undefined) throw new Error("captured vm not set")
    let after: unknown = null
    try {
      await captured.run("return 1")
    } catch (err) {
      after = err
    }
    expect(String(after)).toMatch(/closed/i)
  })

  it("threads MakeLuaVmOptions to makeLuaVm", async () => {
    const result = await withLuaVm(
      { stubs: "GetTimeStamp = function() return 1700000000 end" },
      async (vm) => await vm.run("return GetTimeStamp()")
    )
    expect(result).toBe(1700000000)
  })
})
