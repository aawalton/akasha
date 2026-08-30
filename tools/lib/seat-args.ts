
import { ASSIGNMENTS, ATTRIBUTES, DECLARATIONS, type Declaration, MODES, type Mode } from "./attributes.ts"
import { type Principal, principals } from "./compose-seat-name.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
import { fail } from "./command.ts"

export interface Args {
  readonly set: Partial<Record<Declaration, string>>
  readonly initiative: string | null
  readonly flex: string | null
  readonly tokens: readonly string[]
  readonly clear: readonly Declaration[]
  readonly mode: Mode | null
  readonly principal: Principal | null
  readonly onCall: boolean
  readonly takeLiveName: boolean
  readonly show: boolean
  readonly resolve: boolean
  readonly name: boolean
  readonly fromSeat: boolean
  readonly fromHistory: boolean
  readonly asDefault: boolean
  readonly agent: string | null
  readonly parentName: string | null
  readonly registration: string | null
}

export function parseArgs(argv: readonly string[]): Args {
  const set: Partial<Record<Declaration, string>> = {}
  const tokens: string[] = []
  const clear: Declaration[] = []
  let initiative: string | null = null
  let flex: string | null = null
  let principal: Principal | null = null
  let onCall = false
  let takeLiveName = false
  let show = false
  let resolve = false
  let name = false
  let fromSeat = false
  let fromHistory = false
  let asDefault = false
  let agent: string | null = null
  let parentName: string | null = null
  let registration: string | null = null
  let mode: Mode | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i] ?? ""
    const value = (): string => {
      const next = argv[i + 1]
      if (next === undefined) fail(`${arg} needs a value`)
      i += 1
      return next
    }
    if (arg === "--repo") {
      const named = value()
      if (named !== AKASHA) {
        fail(`--repo ${named} — a seat page lands in akasha, so this states no other repository`)
      }
    }
    else if (arg === "--initiative") initiative = value()
    else if (arg === "--flex") flex = value()
    else if (arg === "--on-call") onCall = true
    else if (arg === "--take-live-name") takeLiveName = true
    else if (arg === "--principal") {
      const named = value()
      const allowed = principals(rootFor(resolveRoots(), AKASHA))
      if (!allowed.includes(named)) fail(`\`${named}\` is no principal — one of: ${allowed.join(", ")}`)
      principal = named
    } else if (arg === "--clear") {
      const named = value()
      const which = DECLARATIONS.find((one) => one === named)
      if (which === undefined) fail(`\`${named}\` is no key — one of: ${DECLARATIONS.join(", ")}`)
      clear.push(which)
    } else if (arg === "--token") tokens.push(value())
    else if (arg === "--show") show = true
    else if (arg === "--resolve") resolve = true
    else if (arg === "--name") name = true
    else if (arg === "--from-seat") fromSeat = true
    else if (arg === "--from-history") fromHistory = true
    else if (arg === "--default") asDefault = true
    else if (arg === "--agent") agent = value()
    else if (arg === "--parent-name") parentName = value()
    else if (arg === "--registration-account") registration = value()
    else if (arg === "--mode") {
      const named = value()
      if (!MODES.includes(named as Mode)) fail(`\`${named}\` is no mode — one of: ${MODES.join(", ")}`)
      mode = named as Mode
    } else {
      const stated = [...ATTRIBUTES, ...ASSIGNMENTS].find((one) => arg === `--${one}`)
      if (stated === undefined) fail(`\`${arg}\` is not an argument this takes — run it with --help`)
      set[stated] = value()
    }
  }
  return { set, initiative, flex, tokens, clear, show, resolve, name, fromSeat, fromHistory, asDefault, agent, parentName, registration, mode, principal, onCall, takeLiveName }
}
