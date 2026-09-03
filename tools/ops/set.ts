import { declaredCommands } from "./declared.ts"
import { commandDocuments } from "./documented.ts"
import { forwarderCommands } from "./forwarders.ts"
import type { Command } from "./surface.ts"

export function commandSet(): readonly Command[] {
  const documents = new Map(commandDocuments().map((one) => [one.path.join(" "), one]))
  const taken = new Set<string>()
  const here: Command[] = []
  for (const one of [...declaredCommands(), ...forwarderCommands()]) {
    const at = one.path.join(" ")
    if (taken.has(at)) continue
    taken.add(at)
    const document = documents.get(at)
    here.push(document === undefined ? one : { ...one, document })
  }
  return [...here].sort((one, other) => {
    const a = one.path.join(" ")
    const b = other.path.join(" ")
    return a < b ? -1 : a > b ? 1 : 0
  })
}
