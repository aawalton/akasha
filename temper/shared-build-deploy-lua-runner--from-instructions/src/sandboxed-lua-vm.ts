import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { makeLuaVm } from "./lua-vm"
import { luaLongStringLiteral, luaStringLiteral, marshalLuaValue } from "./marshal"

const PRELUDE_PATH = resolve(import.meta.dir, "eso-sandbox-prelude.lua")
let cachedPrelude: string | null = null
function getPrelude(): string {
  if (cachedPrelude === null) {
    cachedPrelude = readFileSync(PRELUDE_PATH, "utf8")
  }
  return cachedPrelude
}

export interface SandboxedLuaVm {
  readonly setGlobal: (name: string, value: unknown) => undefined
  readonly doString: (source: string) => Promise<unknown>
  readonly close: () => Promise<void>
}

export interface MakeSandboxedLuaVmOptions {
  readonly bannedGlobals: readonly string[]
}

export async function makeSandboxedLuaVm(
  options: MakeSandboxedLuaVmOptions
): Promise<SandboxedLuaVm> {
  const luaVm = await makeLuaVm()
  await luaVm.run(`__eso_banned = ${marshalLuaValue([...options.bannedGlobals])}`)
  await luaVm.run(getPrelude())

  const pendingSeeds: string[] = []

  async function flushSeeds(): Promise<void> {
    if (pendingSeeds.length === 0) return
    const script = pendingSeeds.join("\n")
    pendingSeeds.length = 0
    await luaVm.run(script)
  }

  return {
    setGlobal(name, value): undefined {
      const literalName = luaStringLiteral(name)
      if (typeof value === "function") {
        pendingSeeds.push(`__eso_seed(${literalName}, __eso_make_stub())`)
        return undefined
      }
      try {
        const literal = marshalLuaValue(value)
        pendingSeeds.push(`__eso_seed(${literalName}, ${literal})`)
      } catch {
        pendingSeeds.push(`__eso_seed(${literalName}, __eso_make_stub())`)
      }
      return undefined
    },
    async doString(source): Promise<unknown> {
      await flushSeeds()
      const literal = luaLongStringLiteral(source)
      return luaVm.run(`return __eso_run(${literal}, "bundle")`)
    },
    async close(): Promise<void> {
      await luaVm.close()
    },
  }
}

export async function withSandboxedLuaVm<T>(
  options: MakeSandboxedLuaVmOptions,
  fn: (vm: SandboxedLuaVm) => Promise<T>
): Promise<T> {
  const vm = await makeSandboxedLuaVm(options)
  try {
    return await fn(vm)
  } finally {
    await vm.close()
  }
}
