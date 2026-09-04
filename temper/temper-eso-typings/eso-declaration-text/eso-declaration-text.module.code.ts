import type {
  ParsedEnum,
  ParsedEvent,
  ParsedFunction,
  ParsedObject,
} from "../eso-doc-tokens/eso-doc-tokens.module.code.ts"

function header(title: string): string {
  return [
    `// ${title} (Auto-generated — opt-in scoped)`,
    "// Generated from ESOUIDocumentation.txt by ops eso generate-typings.",
    "// Do not edit by hand; add tokens to the manifest and regenerate.",
    "",
  ].join("\n")
}

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
  return "void"
}

export function generateEnumsFile(enums: readonly ParsedEnum[]): string {
  const lines: string[] = [header("ESO Enum Constants")]
  const emittedTypes = new Set<string>()
  for (const enumDef of enums) {
    if (!emittedTypes.has(enumDef.name)) {
      emittedTypes.add(enumDef.name)
      lines.push(`// ${enumDef.name}`)
      lines.push(`type ${enumDef.name} = number`)
    }
    for (const value of enumDef.values) {
      lines.push(`declare const ${value}: number`)
    }
    lines.push("")
  }
  return lines.join("\n")
}

export function generateFunctionsFile(functions: readonly ParsedFunction[]): string {
  const lines: string[] = [
    header("ESO Game API Functions"),
    "// Id64 type for 64-bit identifiers",
    'type Id64 = string & { readonly __brand: "Id64" }',
    "",
  ]
  for (const func of functions) {
    const params = func.params.map((p) => `${p.name}?: ${p.type}`)
    const sig = ["this: void", ...params].join(", ")
    lines.push(
      `declare function ${func.name}(${sig}): ${returnType(func.returns, func.hasVariableReturns)}`
    )
    lines.push("")
  }
  return lines.join("\n")
}

export function generateEventsFile(events: readonly ParsedEvent[]): string {
  const lines: string[] = [header("ESO Events")]
  const emitted = new Set<string>()
  for (const event of events) {
    if (emitted.has(event.name)) continue
    emitted.add(event.name)
    lines.push(`declare const ${event.name}: number`)
  }
  lines.push("")
  return lines.join("\n")
}

export function generateObjectsFile(objects: readonly ParsedObject[]): string {
  const lines: string[] = [header("ESO Object API")]
  for (const obj of objects) {
    const extendsClause = obj.inheritsFrom.length > 0 ? ` extends ${obj.inheritsFrom[0]}` : ""

    if (obj.methods.length === 0 && obj.inheritsFrom.length === 0) {
      lines.push(`type ${obj.name} = {}`)
      lines.push("")
      continue
    }

    lines.push(`interface ${obj.name}${extendsClause} {`)
    for (const method of obj.methods) {
      const params = method.params.map((p) => `${p.name}?: ${p.type}`).join(", ")
      lines.push(
        `  ${method.name}(${params}): ${returnType(method.returns, method.hasVariableReturns)}`
      )
    }
    lines.push("}")
    lines.push("")
  }
  return lines.join("\n")
}
