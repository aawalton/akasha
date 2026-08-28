import { comparisonsOf, type RuleSet } from "../../lib/rules-engine.ts"
import { SIZE_MD, SIZE_SM, once } from "../../../page/document/tokens.ts"
import type { ContentRule, PartDef, ValueType } from "../../../page/document/shape-types.ts"

const act: PartDef = {
  part: "block",
  block: "paragraph",
  cardinality: once,
  content: { maxChars: SIZE_SM, marks: { every: "strong" }, lead: null, template: null },
}

const description: PartDef = {
  part: "block",
  block: "paragraph",
  cardinality: once,
  content: { maxChars: SIZE_MD, marks: null, lead: null, template: null },
}

export const judgment: PartDef = {
  part: "section",
  level: 1,
  heading: { match: "literal", text: "Rule" },
  maxChars: "contents",
  cardinality: once,
  contains: [act, description],
}

export function matchOf(ruleSet: RuleSet): PartDef {
  const field: ValueType = { type: "enum", values: ruleSet.fields.map((one) => one.name) }
  const test: ValueType = { type: "enum", values: comparisonsOf(ruleSet) }
  const condition: ContentRule = {
    maxChars: "slots",
    marks: null,
    lead: null,
    template: [
      { slot: "hole", name: "field", value: field, mark: "strong", optional: false },
      { slot: "literal", text: " ", optional: false },
      { slot: "hole", name: "test", value: test, mark: null, optional: false },
    ],
  }
  const value: ContentRule = { maxChars: SIZE_MD, marks: { every: "code" }, lead: null, template: null }
  return {
    part: "section",
    level: 1,
    heading: { match: "literal", text: "Match" },
    maxChars: "contents",
    cardinality: once,
    contains: [
      {
        part: "block",
        block: "list",
        ordered: false,
        cardinality: { least: 0, max: 1 },
        items: { least: 1, max: 10 },
        item: [condition],
        children: { least: 1, max: 40 },
        child: [value],
      },
    ],
  }
}

