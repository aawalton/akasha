
import { HOLE } from "../../../page/document/holes.ts"

export class HoleMismatch extends Error {}

export function fill(body: string, values: Readonly<Record<string, string>>): string {
  const used = new Set<string>()
  const text = body.replace(HOLE, (whole, name: string) => {
    const value = values[name]
    if (value === undefined) throw new HoleMismatch(`\`{${name}}\` is marked in the body and no value was handed over`)
    used.add(name)
    return value
  })
  const surplus = Object.keys(values).filter((name) => !used.has(name))
  if (surplus.length > 0) {
    const named = surplus.map((name) => `\`${name}\``).join(", ")
    throw new HoleMismatch(`${named} was handed over and the body marks no such hole`)
  }
  return text
}
