import {
  parseFunctions,
  parseObjects,
} from "akasha/temper/eso/declaration/modules/eso-doc-tokens/eso-doc-tokens.module.code.ts"

const CONTROL = "Control"

const HEADING = /^h1\. ESO UI Documentation for API Version (\d+)/m

const NO_VERSION = "0"

const OR_NOTHING = " | undefined"

export type ReturnKind = "number" | "word" | "truth" | "thing" | "nothing"

const NUMBER: ReturnKind = "number"

const NOTHING: ReturnKind = "nothing"

const KINDS: Readonly<Record<string, ReturnKind>> = {
  boolean: "truth",
  string: "word",
  unknown: "thing",
  "unknown[]": "nothing",
}

export interface EngineReturns {
  readonly apiVersion: number
  readonly returns: Readonly<Record<string, readonly ReturnKind[]>>
  readonly controlMethods: readonly string[]
}

export function controlMethodsIn(doc: string): readonly string[] {
  const found = new Set<string>()
  for (const one of parseObjects(doc)) {
    if (one.name !== CONTROL && !one.inheritsFrom.includes(CONTROL)) continue
    for (const method of one.methods) found.add(method.name)
  }
  return [...found].sort()
}

export function returnKindOf(type: string): ReturnKind {
  if (type.endsWith(OR_NOTHING)) return NOTHING
  return KINDS[type] ?? NUMBER
}

export function apiVersionIn(doc: string): number {
  const said = HEADING.exec(doc)
  return Number(said?.[1] ?? NO_VERSION)
}

export function engineReturnsIn(doc: string): EngineReturns {
  const found = new Map<string, readonly ReturnKind[]>()
  for (const one of parseFunctions(doc)) {
    found.set(
      one.name,
      one.returns.map((back) => returnKindOf(back.type))
    )
  }
  const returns: Record<string, readonly ReturnKind[]> = {}
  for (const name of [...found.keys()].sort()) {
    const kinds = found.get(name)
    if (kinds !== undefined) returns[name] = kinds
  }
  return { apiVersion: apiVersionIn(doc), returns, controlMethods: controlMethodsIn(doc) }
}

export function returnsBody(held: EngineReturns): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
