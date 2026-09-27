import { metricFormula } from "akasha/temper/player/character/stat/temper-metric/properties/metric-formula.code-file-property.ts"

const BARE = /^[A-Za-z_$][\w$]*$/

const STEP = "  "

const TYPED = /^import type \{ (\w+) \} from "([^"]+)"/

const TRAILING = /,(\s*[}\]])/g

const BARE_KEY = /^(\s*)([A-Za-z_$][\w$]*):/gm

function keyOf(key: string): string {
  return BARE.test(key) ? key : JSON.stringify(key)
}

function literalOf(value: unknown, depth: number): string {
  const inner = STEP.repeat(depth + 1)
  const outer = STEP.repeat(depth)
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    const lines = value.map((one) => `${inner}${literalOf(one, depth + 1)},`)
    return `[\n${lines.join("\n")}\n${outer}]`
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value)
    if (entries.length === 0) return "{}"
    const lines = entries.map(
      ([key, one]) => `${inner}${keyOf(key)}: ${literalOf(one, depth + 1)},`
    )
    return `{\n${lines.join("\n")}\n${outer}}`
  }
  return JSON.stringify(value)
}

function formulaFileBody(typeName: string, typeFrom: string, formula: unknown): string {
  const named = metricFormula.fixedExport[0]
  return [
    `import type { ${typeName} } from "${typeFrom}"`,
    "",
    `export const ${named}: ${typeName} = ${literalOf(formula, 0)}`,
    "",
  ].join("\n")
}

export function formulaFileWrittenAgain(text: string): string | null {
  const typed = TYPED.exec(text)
  const opened = text.indexOf("= ")
  if (typed === null || opened < 0) return null
  const [, typeName, typeFrom] = typed
  if (typeName === undefined || typeFrom === undefined) return null
  const literal = text
    .slice(opened + 2)
    .replace(BARE_KEY, '$1"$2":')
    .replace(TRAILING, "$1")
  const formula: unknown = JSON.parse(literal)
  return formulaFileBody(typeName, typeFrom, formula)
}
