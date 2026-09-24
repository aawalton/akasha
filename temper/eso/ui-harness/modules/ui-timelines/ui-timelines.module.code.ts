import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

const TIMELINE =
  /<AnimationTimeline\s+name="([^"]+)"[^>]*?(?:\/>|>([\s\S]*?)<\/AnimationTimeline>)/g

const ANIMATION = /<(\w*Animation)[\s/>]/g

export function timelinesIn(
  documents: readonly string[]
): Readonly<Record<string, readonly string[]>> {
  const found: Record<string, readonly string[]> = {}
  for (const text of documents) {
    for (const [, name = "", body = ""] of text.matchAll(TIMELINE)) {
      found[name] = [...body.matchAll(ANIMATION)].map(([, kind = ""]) => kind)
    }
  }
  return found
}

export function timelinesLua(timelines: Readonly<Record<string, readonly string[]>>): string {
  const written = Object.entries(timelines).map(
    ([name, kinds]) =>
      `[${luaStringLiteral(name)}] = { ${kinds.map((kind) => luaStringLiteral(kind)).join(", ")} }`
  )
  return `__ui_timelines({ ${written.join(", ")} })`
}
