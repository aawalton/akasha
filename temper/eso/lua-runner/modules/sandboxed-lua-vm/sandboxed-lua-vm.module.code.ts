import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  luaLongStringLiteral,
  luaStringLiteral,
  marshalLuaValue,
} from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import { makeLuaVm } from "akasha/temper/eso/lua-runner/modules/lua-vm/lua-vm.module.code.ts"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"

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

export const ESO_BANNED_GLOBALS: readonly string[] = [
  "debug",
  "io",
  "os",
  "package",
  "require",
  "module",
  "dofile",
  "loadfile",
  "load",
  "loadstring",
]

export type SandboxedLuaVm = {
  readonly setGlobal: (name: string, value: unknown) => undefined
  readonly doString: (source: string) => Promise<unknown>
  readonly close: () => Promise<void>
}

export type MakeSandboxedLuaVmOptions = {
  readonly bannedGlobals: readonly string[]
  readonly loadedFirst?: readonly string[]
}

export async function makeSandboxedLuaVm(
  options: MakeSandboxedLuaVmOptions
): Promise<SandboxedLuaVm> {
  const luaVm = await makeLuaVm()
  await luaVm.run(`__eso_banned = ${marshalLuaValue([...options.bannedGlobals])}`)
  await luaVm.run(preludeText())
  for (const source of options.loadedFirst ?? []) await luaVm.run(source)

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
