import type {
  ParsedEnum,
  ParsedEvent,
  ParsedFunction,
  ParsedObject,
} from "akasha/temper/eso/declaration/modules/eso-doc-tokens/eso-doc-tokens.module.code.ts"

type Group = readonly string[]

const NOTHING = "void"

const ID64 = 'type Id64 = string & { readonly __brand: "Id64" }'

function returnType(
  returns: ReadonlyArray<{ name: string; type: string }>,
  hasVariableReturns: boolean
): string {
  const last = returns[returns.length - 1]
  if (hasVariableReturns) {
    if (last === undefined) return "LuaMultiReturn<unknown[]>"
    const restType = last.type
    const fixed = returns.map((r) => `${r.name}: ${r.type}`).join(", ")
    return `LuaMultiReturn<[${fixed}, ...rest: (${restType})[]]>`
  }
  if (returns.length === 1 && last !== undefined) return last.type
  if (returns.length > 1) {
    const tuple = returns.map((r) => `${r.name}: ${r.type}`).join(", ")
    return `LuaMultiReturn<[${tuple}]>`
  }
  return NOTHING
}

export function enumGroups(enums: readonly ParsedEnum[]): readonly Group[] {
  const groups: Group[] = []
  const named = new Set<string>()
  for (const held of enums) {
    const lines: string[] = []
    if (!named.has(held.name)) {
      named.add(held.name)
      lines.push(`type ${held.name} = number`)
    }
    for (const value of held.values) lines.push(`declare const ${value}: number`)
    if (lines.length > 0) groups.push(lines)
  }
  return groups
}

export function functionGroups(functions: readonly ParsedFunction[]): readonly Group[] {
  const groups: Group[] = [[ID64]]
  for (const held of functions) {
    const params = held.params.map((one) => `${one.name}?: ${one.type}`)
    const sig = ["this: void", ...params].join(", ")
    const answers = returnType(held.returns, held.hasVariableReturns)
    groups.push([
      answers === NOTHING
        ? `declare const ${held.name}: (${sig}) => ${answers}`
        : `declare function ${held.name}(${sig}): ${answers}`,
    ])
  }
  return groups
}

export function eventGroups(events: readonly ParsedEvent[]): readonly Group[] {
  const groups: Group[] = []
  const named = new Set<string>()
  for (const held of events) {
    if (named.has(held.name)) continue
    named.add(held.name)
    groups.push([`declare const ${held.name}: number`])
  }
  return groups
}

export function objectGroups(objects: readonly ParsedObject[]): readonly Group[] {
  const groups: Group[] = []
  for (const held of objects) {
    const above = held.inheritsFrom[0]
    if (held.methods.length === 0 && above === undefined) {
      groups.push([`type ${held.name} = {}`])
      continue
    }
    const opens = above === undefined ? "" : ` extends ${above}`
    const lines = [`interface ${held.name}${opens} {`]
    for (const method of held.methods) {
      const params = method.params.map((one) => `${one.name}?: ${one.type}`).join(", ")
      const answers = returnType(method.returns, method.hasVariableReturns)
      lines.push(`  ${method.name}: (${params}) => ${answers}`)
    }
    lines.push("}")
    groups.push(lines)
  }
  return groups
}
