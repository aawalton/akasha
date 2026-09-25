import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

const TAG = /<(\/?)(\w+)([^>]*?)(\/?)>/g

const NAMED = /\bname="([^"]+)"/

const INHERITS = /\binherits="([^"]+)"/

const TIMELINE = "AnimationTimeline"

const ANIMATION = /Animation$/

const CLOSING = "/"

type UiTimeline = {
  readonly animations: readonly string[]
  readonly timelines: readonly UiTimeline[]
}

type Declared = {
  readonly inherits: string | undefined
  readonly animations: string[]
  readonly timelines: Declared[]
}

const NONE: UiTimeline = { animations: [], timelines: [] }

function declaredIn(documents: readonly string[]): ReadonlyMap<string, Declared> {
  const named = new Map<string, Declared>()
  for (const text of documents) {
    const open: Declared[] = []
    for (const [, closing, tag = "", attributes = "", closed] of text.matchAll(TAG)) {
      if (tag === TIMELINE && closing === CLOSING) {
        open.pop()
      } else if (tag === TIMELINE) {
        const made: Declared = {
          inherits: firstCapture(INHERITS.exec(attributes)) ?? undefined,
          animations: [],
          timelines: [],
        }
        open.at(-1)?.timelines.push(made)
        const name = firstCapture(NAMED.exec(attributes))
        if (name !== null) named.set(name, made)
        if (closed !== CLOSING) open.push(made)
      } else if (closing !== CLOSING && ANIMATION.test(tag)) {
        open.at(-1)?.animations.push(tag)
      }
    }
  }
  return named
}

function resolved(
  one: Declared,
  named: ReadonlyMap<string, Declared>,
  seen: ReadonlySet<string>
): UiTimeline {
  const from = one.inherits === undefined || seen.has(one.inherits) ? undefined : one.inherits
  const base = from === undefined ? undefined : named.get(from)
  const inherited =
    from === undefined || base === undefined
      ? NONE
      : resolved(base, named, new Set([...seen, from]))
  return {
    animations: [...inherited.animations, ...one.animations],
    timelines: [
      ...inherited.timelines,
      ...one.timelines.map((inner) => resolved(inner, named, seen)),
    ],
  }
}

export function timelinesIn(documents: readonly string[]): Readonly<Record<string, UiTimeline>> {
  const named = declaredIn(documents)
  const found: Record<string, UiTimeline> = {}
  for (const [name, one] of named) found[name] = resolved(one, named, new Set([name]))
  return found
}

function timelineLua(one: UiTimeline): string {
  const parts = one.animations.map((kind) => luaStringLiteral(kind))
  if (one.timelines.length > 0) {
    parts.push(`timelines = { ${one.timelines.map(timelineLua).join(", ")} }`)
  }
  return `{ ${parts.join(", ")} }`
}

export function timelinesLua(timelines: Readonly<Record<string, UiTimeline>>): string {
  const written = Object.entries(timelines).map(
    ([name, one]) => `[${luaStringLiteral(name)}] = ${timelineLua(one)}`
  )
  return `__ui_timelines({ ${written.join(", ")} })`
}
