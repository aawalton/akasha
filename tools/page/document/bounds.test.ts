import { describe, expect, test } from "bun:test"
import { diskFileTree } from "../../../page/file-tree.ts"
import { registryOf } from "../../../page/property/registry.ts"
import { shapeFor } from "../../../page/shape/chain.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import * as tokens from "../../../page/document/tokens.ts"
import { SIZE_MD } from "../../../page/document/tokens.ts"
import type { ContentRule, PartDef, TemplateSlot, ValueType } from "../../../page/document/shape-types.ts"

export const named: ContentRule = { maxChars: SIZE_MD, marks: null, lead: null, template: null }
// @ts-expect-error a raw figure is not a ceiling, and neither is one that happens to equal one
export const raw: ContentRule = { maxChars: 207, marks: null, lead: null, template: null }

const admits = (t: ValueType): number => {
  switch (t.type) {
    case "text": return t.maxChars
    case "pattern": return t.backstop
    case "enum": return Math.max(...t.values.map((v) => v.length))
    case "date": return 10
    case "union": return Math.max(...t.of.map(admits))
    case "slug": case "glob": case "docref": case "list": return Infinity
  }
}

const templateAdmits = (slots: readonly TemplateSlot[]): number => {
  let n = 0
  for (const slot of slots) {
    n += slot.slot === "literal" ? slot.text.length : admits(slot.value)
  }
  return n
}

const rulesOf = (parts: readonly PartDef[]): ContentRule[] => {
  const out: ContentRule[] = []
  for (const part of parts) {
    if (part.part === "section") {
      if (part.heading.match === "any") out.push(part.heading.content)
      out.push(...rulesOf(part.contains))
    } else if (part.part === "block") {
      if (part.block !== "list") out.push(part.content)
      else {
        out.push(...part.item)
        if (part.children !== null) out.push(...part.child)
      }
    }
  }
  return out
}

const everyRule = (): readonly ContentRule[] => {
  const tree = diskFileTree(resolveRoots())
  const out: ContentRule[] = []
  for (const type of registryOf(tree)) {
    const { compiled: compiled } = shapeFor(type, tree)
    if (compiled === null) continue
    out.push(...rulesOf(compiled.sections))
    for (const fragment of Object.values(compiled.fragments)) out.push(...rulesOf(fragment.parts))
  }
  return out
}

describe("the ceilings", () => {
  test("are the seven", () => {
    const held = Object.entries(tokens).flatMap(([name, value]) => (typeof value === "number" ? [name] : []))
    expect(new Set(held)).toEqual(new Set(["SIZE_XS", "SIZE_SM", "SIZE_MD", "SIZE_LG", "SIZE_XL", "SIZE_2XL", "SIZE_3XL"]))
  })
})

describe("a ceiling over a template", () => {
  test("no figure stands above what its own template admits", () => {
    const dead: string[] = []
    for (const rule of everyRule()) {
      if (typeof rule.maxChars !== "number" || rule.template === null) continue
      const room = templateAdmits(rule.template)
      if (rule.maxChars > room) dead.push(`${rule.maxChars} over ${room}`)
    }
    expect(dead).toEqual([])
  })
})
