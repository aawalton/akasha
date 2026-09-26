export type ScriptNamed = { readonly name: string; readonly itemId: number }

const UNREAD =
  "no scribing scripts are read yet — the skill catalogue names them when it is held, and an add-on names the ones compiled into it"

let nameToItemId: Map<string, number> | undefined

let given: (() => Iterable<ScriptNamed>) | undefined

export function readScriptsFrom(scripts: () => Iterable<ScriptNamed>): undefined {
  given = scripts
  nameToItemId = undefined
  return undefined
}

function buildMap(): Map<string, number> {
  if (given === undefined) throw new Error(UNREAD)
  const map = new Map<string, number>()
  for (const s of given()) {
    if (s.itemId !== 0) map.set(s.name, s.itemId)
  }
  return map
}

export function getScriptItemIdByName(name: string): number | undefined {
  if (!nameToItemId) nameToItemId = buildMap()
  return nameToItemId.get(name)
}
