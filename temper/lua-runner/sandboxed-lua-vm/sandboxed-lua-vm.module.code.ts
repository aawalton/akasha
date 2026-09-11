import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  luaLongStringLiteral,
  luaStringLiteral,
  marshalLuaValue,
} from "akasha/temper/lua-runner/lua-marshal/lua-marshal.module.code.ts"
import { makeLuaVm } from "akasha/temper/lua-runner/lua-vm/lua-vm.module.code.ts"

const LUA_MODULE = "lua-module"

const LUA = "lua"

const PRELUDE_SLUG = "eso-sandbox-prelude"

let cachedPrelude: string | null = null

function preludePathIn(root: string): string {
  const page = listedAt(root, LUA_MODULE, PRELUDE_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, LUA, LUA)
  if (at === null) {
    throw new Error(
      `no \`${LUA_MODULE}\` is slugged \`${PRELUDE_SLUG}\`, so no sandbox would come up`
    )
  }
  return join(root, at)
}

function preludeText(): string {
  if (cachedPrelude === null) cachedPrelude = readFileSync(preludePathIn(akashaRoot()), "utf8")
  return cachedPrelude
}

export type SandboxedLuaVm = {
  readonly setGlobal: (name: string, value: unknown) => undefined
  readonly doString: (source: string) => Promise<unknown>
  readonly close: () => Promise<void>
}

export type MakeSandboxedLuaVmOptions = {
  readonly bannedGlobals: readonly string[]
}

export async function makeSandboxedLuaVm(
  options: MakeSandboxedLuaVmOptions
): Promise<SandboxedLuaVm> {
  const luaVm = await makeLuaVm()
  await luaVm.run(`__eso_banned = ${marshalLuaValue([...options.bannedGlobals])}`)
  await luaVm.run(preludeText())

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
        pendingSeeds.push(`__eso_seed(${literalName}, ${marshalLuaValue(value)})`)
      } catch {
        pendingSeeds.push(`__eso_seed(${literalName}, __eso_make_stub())`)
      }
      return undefined
    },
    async doString(source): Promise<unknown> {
      await flushSeeds()
      return luaVm.run(`return __eso_run(${luaLongStringLiteral(source)}, "bundle")`)
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
