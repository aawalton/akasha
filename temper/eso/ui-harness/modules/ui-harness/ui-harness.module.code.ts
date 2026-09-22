import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { marshalLuaValue } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import {
  ESO_BANNED_GLOBALS,
  makeSandboxedLuaVm,
} from "akasha/temper/eso/lua-runner/modules/sandboxed-lua-vm/sandboxed-lua-vm.module.code.ts"
import { z } from "zod"

const LUA_MODULE = "lua-module"

const LUA = "lua"

const MODEL_SLUG = "ui-control-model"

let cachedModel: string | null = null

function modelPathIn(root: string): string {
  const page = listedAt(root, LUA_MODULE, MODEL_SLUG)[0]
  const at = page === undefined ? null : besideAt(page.path, LUA, LUA)
  if (at === null) {
    throw new Error(
      `no \`${LUA_MODULE}\` is slugged \`${MODEL_SLUG}\`, so no control would be made`
    )
  }
  return join(root, at)
}

function modelText(): string {
  if (cachedModel === null) cachedModel = readFileSync(modelPathIn(akashaRoot()), "utf8")
  return cachedModel
}

function asList(value: unknown): unknown {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return value
  return Object.keys(value).length === 0 ? [] : value
}

const anchorShape = z.object({
  point: z.number(),
  relativeTo: z.string().optional(),
  relativePoint: z.number(),
  offsetX: z.number(),
  offsetY: z.number(),
})

export type UiAnchor = z.infer<typeof anchorShape>

export type UiControl = {
  readonly name?: string
  readonly controlType: number
  readonly virtual?: string
  readonly hidden: boolean
  readonly width: number
  readonly height: number
  readonly text?: string
  readonly font?: string
  readonly texture?: string
  readonly anchors: readonly UiAnchor[]
  readonly handlers: readonly string[]
  readonly children: readonly UiControl[]
}

const controlShape: z.ZodType<UiControl> = z.lazy(() =>
  z.object({
    name: z.string().optional(),
    controlType: z.number(),
    virtual: z.string().optional(),
    hidden: z.boolean(),
    width: z.number(),
    height: z.number(),
    text: z.string().optional(),
    font: z.string().optional(),
    texture: z.string().optional(),
    anchors: z.preprocess(asList, z.array(anchorShape)),
    handlers: z.preprocess(asList, z.array(z.string())),
    children: z.preprocess(asList, z.array(controlShape)),
  })
)

export type UiHarness = {
  readonly seed: (name: string, value: unknown) => undefined
  readonly load: (source: string) => Promise<unknown>
  readonly snapshot: (name?: string) => Promise<UiControl | null>
  readonly names: () => Promise<readonly string[]>
  readonly unmodelled: () => Promise<Readonly<Record<string, number>>>
  readonly fire: (name: string, event: string, ...args: readonly unknown[]) => Promise<boolean>
  readonly close: () => Promise<void>
}

export type OpenUiHarnessOptions = {
  readonly bannedGlobals?: readonly string[]
}

export async function openUiHarness(options: OpenUiHarnessOptions = {}): Promise<UiHarness> {
  const vm = await makeSandboxedLuaVm({
    bannedGlobals: options.bannedGlobals ?? ESO_BANNED_GLOBALS,
    loadedFirst: [modelText()],
  })
  return {
    seed(name, value): undefined {
      return vm.setGlobal(name, value)
    },
    async load(source): Promise<unknown> {
      return vm.doString(source)
    },
    async snapshot(name): Promise<UiControl | null> {
      const answered = await vm.doString(`return __ui_snapshot(${marshalLuaValue(name)})`)
      if (answered === null || answered === undefined) return null
      return controlShape.parse(answered)
    },
    async names(): Promise<readonly string[]> {
      const answered = await vm.doString("return __ui_names()")
      return z.array(z.string()).parse(asList(answered))
    },
    async unmodelled(): Promise<Readonly<Record<string, number>>> {
      const answered = await vm.doString("return __ui_unmodelled()")
      if (Array.isArray(answered)) return {}
      return z.record(z.string(), z.number()).parse(answered)
    },
    async fire(name, event, ...args): Promise<boolean> {
      const passed = args.map((arg) => marshalLuaValue(arg)).join(", ")
      const tail = passed === "" ? "" : `, ${passed}`
      const answered = await vm.doString(
        `return __ui_fire(${marshalLuaValue(name)}, ${marshalLuaValue(event)}${tail})`
      )
      return answered === true
    },
    async close(): Promise<void> {
      await vm.close()
    },
  }
}
