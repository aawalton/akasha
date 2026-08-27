import { spawnPersistentVm } from "./persistent-vm"

export interface LuaVm {
  readonly run: (script: string) => Promise<unknown>
  readonly get: (name: string) => Promise<unknown>
  readonly close: () => Promise<void>
}

export interface MakeLuaVmOptions {
  readonly stubs?: string
}

export async function makeLuaVm(options: MakeLuaVmOptions = {}): Promise<LuaVm> {
  const persistent = await spawnPersistentVm()
  if (options.stubs !== undefined && options.stubs.length > 0) {
    const setup = await persistent.send(options.stubs)
    if (!setup.ok) {
      await persistent.close()
      throw new Error(`stubs failed to load: ${setup.error}`)
    }
  }
  return {
    async run(script: string): Promise<unknown> {
      const r = await persistent.send(script)
      if (!r.ok) throw new Error(r.error)
      return r.value
    },
    async get(name: string): Promise<unknown> {
      const r = await persistent.send(`return ${name}`)
      if (!r.ok) throw new Error(r.error)
      return r.value
    },
    async close(): Promise<void> {
      await persistent.close()
    },
  }
}

export async function withLuaVm<T>(fn: (vm: LuaVm) => Promise<T>): Promise<T>
export async function withLuaVm<T>(
  opts: MakeLuaVmOptions,
  fn: (vm: LuaVm) => Promise<T>
): Promise<T>
export async function withLuaVm<T>(
  optsOrFn: MakeLuaVmOptions | ((vm: LuaVm) => Promise<T>),
  maybeFn?: (vm: LuaVm) => Promise<T>
): Promise<T> {
  const opts: MakeLuaVmOptions = typeof optsOrFn === "function" ? {} : optsOrFn
  const fn = typeof optsOrFn === "function" ? optsOrFn : maybeFn
  if (fn === undefined) throw new Error("withLuaVm: fn argument is required")
  const vm = await makeLuaVm(opts)
  try {
    return await fn(vm)
  } finally {
    await vm.close()
  }
}
