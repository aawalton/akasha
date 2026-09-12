import type { AsyncLocalStorage } from "node:async_hooks"

type Held = Map<string, unknown>

type Reaching = { readonly getBuiltinModule?: (named: string) => unknown }

function builtinNamed(named: string): unknown {
  const runtime: unknown = (globalThis as Partial<typeof globalThis>).process
  if (runtime === undefined || runtime === null) return undefined
  const reach = (runtime as Reaching).getBuiltinModule
  if (typeof reach !== "function") return undefined
  return reach.call(runtime, named)
}

function callsFound(): AsyncLocalStorage<Held> | null {
  const hooks = builtinNamed("node:async_hooks") as { readonly AsyncLocalStorage?: unknown }
  if (hooks === undefined || hooks === null) return null
  const keeper = hooks.AsyncLocalStorage
  if (typeof keeper !== "function") return null
  return new (keeper as new () => AsyncLocalStorage<Held>)()
}

let heldCalls: { readonly calls: AsyncLocalStorage<Held> | null } | null = null

function calls(): AsyncLocalStorage<Held> | null {
  if (heldCalls === null) heldCalls = { calls: callsFound() }
  return heldCalls.calls
}

export function duringOneCall<T>(run: () => T): T {
  const here = calls()
  if (here === null) return run()
  const outer = here.getStore()
  if (outer !== undefined) return run()
  return here.run(new Map<string, unknown>(), run)
}

export function onceInCall<T>(key: string, make: () => T): T {
  const held = calls()?.getStore()
  if (held === undefined) return make()
  if (held.has(key)) return held.get(key) as T
  const made = make()
  held.set(key, made)
  return made
}

export function holdInCall<T>(key: string, value: T): undefined {
  calls()?.getStore()?.set(key, value)
}
