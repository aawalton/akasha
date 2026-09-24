import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  constantsLua,
  engineConstantsTable,
} from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import { marshalLuaValue } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import {
  ESO_BANNED_GLOBALS,
  makeSandboxedLuaVm,
} from "akasha/temper/eso/lua-runner/modules/sandboxed-lua-vm/sandboxed-lua-vm.module.code.ts"
import {
  engineReturnsTable,
  returnsLua,
} from "akasha/temper/eso/return/modules/engine-returns-seeding/engine-returns-seeding.module.code.ts"
import { z } from "zod"

const LUA_MODULE = "lua-module"

const LUA = "lua"

const MODEL_SLUGS: readonly string[] = [
  "ui-place-model",
  "ui-control-model",
  "ui-control-snapshot",
  "ui-font-model",
  "ui-event-model",
  "ui-text-model",
  "ui-scene-model",
]

const NAMED = /^[A-Za-z_][A-Za-z0-9_]*$/

const KEPT_FOR_THE_GAME: readonly string[] = ["debug"]

const HARNESS_BANNED_GLOBALS: readonly string[] = ESO_BANNED_GLOBALS.filter(
  (one) => !KEPT_FOR_THE_GAME.includes(one)
)

let cachedModels: readonly string[] | null = null

let cachedConstants: readonly string[] | null = null

let cachedReturns: readonly string[] | null = null

function constantTexts(): readonly string[] {
  if (cachedConstants === null) {
    cachedConstants = constantsLua(engineConstantsTable(akashaRoot()))
  }
  return cachedConstants
}

function returnTexts(): readonly string[] {
  if (cachedReturns === null) {
    cachedReturns = returnsLua(engineReturnsTable(akashaRoot()))
  }
  return cachedReturns
}

function modelPathIn(root: string, slug: string): string {
  const page = listedAt(root, LUA_MODULE, slug)[0]
  const at = page === undefined ? null : besideAt(page.path, LUA, LUA)
  if (at === null) {
    throw new Error(`no \`${LUA_MODULE}\` is slugged \`${slug}\`, so no harness would come up`)
  }
  return join(root, at)
}

function modelTexts(): readonly string[] {
  if (cachedModels === null) {
    const root = akashaRoot()
    cachedModels = MODEL_SLUGS.map((slug) => readFileSync(modelPathIn(root, slug), "utf8"))
  }
  return cachedModels
}

const BUNDLE_TAIL = "\nreturn ____entry"

const BUNDLE_REACH = "\n_G.__bundle_require = require\nreturn ____entry"

function reachableBundle(source: string): string {
  const at = source.lastIndexOf(BUNDLE_TAIL)
  if (at === -1) {
    throw new Error("this source ends in no bundle entry, so no module of it would be reachable")
  }
  return source.slice(0, at) + BUNDLE_REACH + source.slice(at + BUNDLE_TAIL.length)
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

const colorShape = z.preprocess(asList, z.array(z.number()))

export type UiColor = readonly number[]

export type UiControl = {
  readonly name?: string
  readonly controlType: number
  readonly virtual?: string
  readonly hidden: boolean
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
  readonly alpha: number
  readonly text?: string
  readonly font?: string
  readonly alignH?: number
  readonly alignV?: number
  readonly texture?: string
  readonly color?: UiColor
  readonly centerColor?: UiColor
  readonly edgeColor?: UiColor
  readonly edgeTexture?: string
  readonly insets?: UiColor
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
    left: z.number(),
    top: z.number(),
    width: z.number(),
    height: z.number(),
    alpha: z.number(),
    text: z.string().optional(),
    font: z.string().optional(),
    alignH: z.number().optional(),
    alignV: z.number().optional(),
    texture: z.string().optional(),
    color: colorShape.optional(),
    centerColor: colorShape.optional(),
    edgeColor: colorShape.optional(),
    edgeTexture: z.string().optional(),
    insets: colorShape.optional(),
    anchors: z.preprocess(asList, z.array(anchorShape)),
    handlers: z.preprocess(asList, z.array(z.string())),
    children: z.preprocess(asList, z.array(controlShape)),
  })
)

export type UiHarness = {
  readonly seed: (name: string, value: unknown) => undefined
  readonly load: (source: string) => Promise<unknown>
  readonly loadBundle: (source: string) => Promise<unknown>
  readonly templates: (chunks: readonly string[]) => Promise<number>
  readonly snapshot: (name?: string) => Promise<UiControl | null>
  readonly names: () => Promise<readonly string[]>
  readonly unmodelled: () => Promise<Readonly<Record<string, number>>>
  readonly unmade: () => Promise<Readonly<Record<string, string>>>
  readonly fire: (name: string, event: string, ...args: readonly unknown[]) => Promise<boolean>
  readonly raise: (event: string, ...args: readonly unknown[]) => Promise<number>
  readonly settle: (rounds?: number) => Promise<number>
  readonly waiting: () => Promise<number>
  readonly close: () => Promise<void>
}

export type OpenUiHarnessOptions = {
  readonly bannedGlobals?: readonly string[]
}

export async function openUiHarness(options: OpenUiHarnessOptions = {}): Promise<UiHarness> {
  const vm = await makeSandboxedLuaVm({
    bannedGlobals: options.bannedGlobals ?? HARNESS_BANNED_GLOBALS,
    loadedFirst: [...constantTexts(), ...modelTexts(), ...returnTexts()],
  })
  return {
    seed(name, value): undefined {
      return vm.setGlobal(name, value)
    },
    async load(source): Promise<unknown> {
      return vm.doString(source)
    },
    async loadBundle(source): Promise<unknown> {
      return vm.doString(reachableBundle(source))
    },
    async templates(chunks): Promise<number> {
      const counted: number[] = []
      for (const chunk of chunks) {
        counted.push(z.number().parse(await vm.doString(`return ${chunk}`)))
      }
      return counted.reduce((all, one) => all + one, 0)
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
    async unmade(): Promise<Readonly<Record<string, string>>> {
      const answered = await vm.doString("return __ui_unmade()")
      if (Array.isArray(answered)) return {}
      return z.record(z.string(), z.string()).parse(answered)
    },
    async fire(name, event, ...args): Promise<boolean> {
      const passed = args.map((arg) => marshalLuaValue(arg)).join(", ")
      const tail = passed === "" ? "" : `, ${passed}`
      const answered = await vm.doString(
        `return __ui_fire(${marshalLuaValue(name)}, ${marshalLuaValue(event)}${tail})`
      )
      return answered === true
    },
    async raise(event, ...args): Promise<number> {
      if (NAMED.exec(event) === null) {
        throw new Error(`\`${event}\` is no name an event could be held under`)
      }
      const passed = args.map((arg) => marshalLuaValue(arg)).join(", ")
      const tail = passed === "" ? "" : `, ${passed}`
      const answered = await vm.doString(`return __ui_raise(${event}${tail})`)
      return z.number().parse(answered)
    },
    async settle(rounds): Promise<number> {
      const answered = await vm.doString(`return __ui_settle(${marshalLuaValue(rounds)})`)
      return z.number().parse(answered)
    },
    async waiting(): Promise<number> {
      const answered = await vm.doString("return __ui_waiting()")
      return z.number().parse(answered)
    },
    async close(): Promise<void> {
      await vm.close()
    },
  }
}
