import { resolveRoots } from "../../repo/roots/roots"
import { ruleSetOf, globFor, globsOf } from "./rules-engine-rule-set.ts"
import type { RuleSet } from "./rules-engine.ts"

const RULE_SET = "category-rule"

function readRuleSet(): RuleSet {
  const roots = resolveRoots()
  const globs = globsOf(RULE_SET, roots)
  return {
    ...ruleSetOf(RULE_SET, roots),
    kinds: {
      code: {
        glob: globFor(globs, "code", RULE_SET),
        constraints: null,
      },
      agent: {
        glob: globFor(globs, "agent", RULE_SET),
        constraints: null,
      },
    },
  }
}

let held: RuleSet | null = null

function stands(): RuleSet {
  return (held ??= readRuleSet())
}

export const categoryRuleSet: RuleSet = {
  get name() {
    return stands().name
  },
  get fields() {
    return stands().fields
  },
  get path() {
    return stands().path
  },
  get normalizer() {
    return stands().normalizer
  },
  get kinds() {
    return stands().kinds
  },
}
