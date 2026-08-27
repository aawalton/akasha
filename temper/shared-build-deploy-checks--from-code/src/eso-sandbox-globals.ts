export const ESO_API_SEED: readonly string[] = [
  "EVENT_MANAGER",
  "SLASH_COMMANDS",
  "ZO_SavedVars",
  "CALLBACK_MANAGER",
  "EVENT_ADD_ON_LOADED",
  "d",
  "zo_callLater",
]

export const ESO_STRUCTURALLY_ABSENT: readonly string[] = [
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

export type PermissiveStub = {
  (...args: readonly unknown[]): PermissiveStub
  new (...args: readonly unknown[]): PermissiveStub
  readonly [key: string]: PermissiveStub
}

function asPermissiveStub(value: unknown): PermissiveStub {
  return value as PermissiveStub
}

export function isPermissiveStub(value: unknown): value is PermissiveStub {
  if (typeof value !== "function" && (typeof value !== "object" || value === null)) {
    return false
  }
  if (!("__esoPermissiveStub" in value)) return false
  return value.__esoPermissiveStub === true
}

export function createPermissiveStub(): PermissiveStub {
  const children = new Map<string | symbol, PermissiveStub>()
  const target = function stub() {}
  const handler: ProxyHandler<typeof target> = {
    get(t, prop, receiver) {
      if (prop === "__esoPermissiveStub") return true
      if (typeof prop === "symbol") return undefined
      if (prop === "then") return undefined
      if (prop === "$istable" || prop === "$getRef") return undefined
      if (
        prop === "toString" ||
        prop === "valueOf" ||
        prop === "constructor" ||
        prop === "call" ||
        prop === "apply" ||
        prop === "bind" ||
        prop === "name" ||
        prop === "length" ||
        prop === "prototype"
      ) {
        return Reflect.get(t, prop, receiver)
      }
      let existing = children.get(prop)
      if (existing === undefined) {
        existing = createPermissiveStub()
        children.set(prop, existing)
      }
      return existing
    },
    apply() {
      return createPermissiveStub()
    },
    construct() {
      return createPermissiveStub()
    },
    has() {
      return true
    },
  }
  return asPermissiveStub(new Proxy(target, handler))
}

export interface SandboxGlobalsConfig {
  readonly esoApis?: readonly string[]
  readonly extraGlobals?: Readonly<Record<string, unknown>>
}

type SandboxGlobals = Record<string, unknown>

export function buildSandboxGlobals(config: SandboxGlobalsConfig = {}): SandboxGlobals {
  const result: SandboxGlobals = {}
  const apis = config.esoApis ?? ESO_API_SEED
  for (const name of apis) {
    result[name] = createPermissiveStub()
  }
  if (config.extraGlobals) {
    for (const [key, value] of Object.entries(config.extraGlobals)) {
      result[key] = value
    }
  }
  return result
}
