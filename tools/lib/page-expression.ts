import type { Held } from "./page-file-values.ts"
import { ARITY, CALLS } from "./page-expression-function.ts"
import {
  ExpressionRefused,
  listed,
  scalarOnly,
  shown,
  truthy,
  valued,
  type Scalar,
  type Value,
} from "./page-expression-value.ts"

const PROP_OPEN = "prop("

type Shape =
  | "number"
  | "text"
  | "prop"
  | "name"
  | "("
  | ")"
  | "["
  | "]"
  | "."
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "!"
  | ","
  | "=="
  | "!="
  | "<"
  | ">"
  | "<="
  | ">="
  | "&&"
  | "||"
  | "end"

interface Token {
  readonly shape: Shape
  readonly text: string
}

function refuseCharacter(ch: string, at: number): never {
  throw new ExpressionRefused(`the character \`${ch}\` at position ${at} is not implemented`, "parse_error")
}

export function tokenize(expression: string): readonly Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < expression.length) {
    const ch = expression[i] ?? ""
    if (/\s/.test(ch)) {
      i += 1
      continue
    }
    if (/\d/.test(ch)) {
      let text = ""
      let dots = 0
      while (i < expression.length && /[\d.]/.test(expression[i] ?? "")) {
        if (expression[i] === ".") dots += 1
        text += expression[i]
        i += 1
      }
      if (dots > 1) {
        throw new ExpressionRefused(`\`${text}\` is not a number this evaluator reads`, "parse_error")
      }
      tokens.push({ shape: "number", text })
      continue
    }
    if (ch === '"' || ch === "'") {
      i += 1
      let text = ""
      while (i < expression.length && expression[i] !== ch) {
        text += expression[i]
        i += 1
      }
      if (i >= expression.length) {
        throw new ExpressionRefused(`a text literal opened with ${ch} is never closed`, "parse_error")
      }
      i += 1
      tokens.push({ shape: "text", text })
      continue
    }
    if (expression.slice(i, i + PROP_OPEN.length) === PROP_OPEN) {
      i += PROP_OPEN.length
      let text = ""
      while (i < expression.length && expression[i] !== ")") {
        text += expression[i]
        i += 1
      }
      if (i >= expression.length) throw new ExpressionRefused("a `prop(` reference is never closed", "parse_error")
      i += 1
      tokens.push({ shape: "prop", text: text.trim() })
      continue
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let text = ""
      while (i < expression.length && /[a-zA-Z0-9_]/.test(expression[i] ?? "")) {
        text += expression[i]
        i += 1
      }
      tokens.push({ shape: "name", text })
      continue
    }
    const two = expression.slice(i, i + 2)
    if (two === "==" || two === "!=" || two === "<=" || two === ">=" || two === "&&" || two === "||") {
      tokens.push({ shape: two, text: two })
      i += 2
      continue
    }
    if (
      ch === "+" ||
      ch === "-" ||
      ch === "*" ||
      ch === "/" ||
      ch === "%" ||
      ch === "!" ||
      ch === "," ||
      ch === "." ||
      ch === "[" ||
      ch === "]" ||
      ch === "<" ||
      ch === ">" ||
      ch === "(" ||
      ch === ")"
    ) {
      tokens.push({ shape: ch, text: ch })
      i += 1
      continue
    }
    refuseCharacter(ch, i)
  }
  tokens.push({ shape: "end", text: "" })
  return tokens
}

type Binary = "==" | "!=" | "<" | ">" | "<=" | ">=" | "&&" | "||" | "+" | "-" | "*" | "/" | "%"

type Node =
  | { readonly kind: "literal"; readonly value: Value }
  | { readonly kind: "prop"; readonly key: string }
  | { readonly kind: "path"; readonly path: readonly string[] }
  | { readonly kind: "negate"; readonly of: Node }
  | { readonly kind: "not"; readonly of: Node }
  | { readonly kind: "call"; readonly name: string; readonly args: readonly Node[] }
  | { readonly kind: "list"; readonly items: readonly Node[] }
  | { readonly kind: "bracket"; readonly of: Node; readonly key: Node }
  | { readonly kind: "binary"; readonly op: Binary; readonly left: Node; readonly right: Node }

const WORDS: Readonly<Record<string, Value>> = { true: true, false: false, null: null }

interface Reading {
  readonly tokens: readonly Token[]
  at: number
}

const peek = (s: Reading): Token => s.tokens[s.at] ?? { shape: "end", text: "" }

function parseOr(s: Reading): Node {
  let left = parseAnd(s)
  while (peek(s).shape === "||") {
    s.at += 1
    left = { kind: "binary", op: "||", left, right: parseAnd(s) }
  }
  return left
}

function parseAnd(s: Reading): Node {
  let left = parseEquality(s)
  while (peek(s).shape === "&&") {
    s.at += 1
    left = { kind: "binary", op: "&&", left, right: parseEquality(s) }
  }
  return left
}

function parseEquality(s: Reading): Node {
  let left = parseComparison(s)
  while (peek(s).shape === "==" || peek(s).shape === "!=") {
    const op = peek(s).shape === "==" ? "==" : "!="
    s.at += 1
    left = { kind: "binary", op, left, right: parseComparison(s) }
  }
  return left
}

function parseComparison(s: Reading): Node {
  let left = parseAdditive(s)
  for (;;) {
    const shape = peek(s).shape
    if (shape !== "<" && shape !== ">" && shape !== "<=" && shape !== ">=") return left
    s.at += 1
    left = { kind: "binary", op: shape, left, right: parseAdditive(s) }
  }
}

function parseAdditive(s: Reading): Node {
  let left = parseMultiplicative(s)
  for (;;) {
    const shape = peek(s).shape
    if (shape !== "+" && shape !== "-") return left
    s.at += 1
    left = { kind: "binary", op: shape, left, right: parseMultiplicative(s) }
  }
}

function parseMultiplicative(s: Reading): Node {
  let left = parseUnary(s)
  for (;;) {
    const shape = peek(s).shape
    if (shape !== "*" && shape !== "/" && shape !== "%") return left
    s.at += 1
    left = { kind: "binary", op: shape, left, right: parseUnary(s) }
  }
}

function parseUnary(s: Reading): Node {
  const shape = peek(s).shape
  if (shape === "-") {
    s.at += 1
    return { kind: "negate", of: parseUnary(s) }
  }
  if (shape === "!") {
    s.at += 1
    return { kind: "not", of: parseUnary(s) }
  }
  return parsePostfix(s)
}

function parsePostfix(s: Reading): Node {
  let of = parsePrimary(s)
  while (peek(s).shape === "[") {
    s.at += 1
    const key = parseOr(s)
    if (peek(s).shape !== "]") throw new ExpressionRefused("a `[` is never closed", "parse_error")
    s.at += 1
    of = { kind: "bracket", of, key }
  }
  return of
}

function parsePrimary(s: Reading): Node {
  const token = peek(s)
  if (token.shape === "number") {
    s.at += 1
    return { kind: "literal", value: Number(token.text) }
  }
  if (token.shape === "text") {
    s.at += 1
    return { kind: "literal", value: token.text }
  }
  if (token.shape === "prop") {
    s.at += 1
    if (token.text === "") throw new ExpressionRefused("a `prop()` reference names no key", "parse_error")
    return { kind: "prop", key: token.text }
  }
  if (token.shape === "name") {
    s.at += 1
    if (peek(s).shape === "(") return parseCall(s, token.text)
    if (peek(s).shape === ".") return parsePath(s, token.text)
    if (token.text in WORDS) return { kind: "literal", value: WORDS[token.text] ?? null }
    return { kind: "prop", key: token.text }
  }
  if (token.shape === "(") {
    s.at += 1
    const inner = parseOr(s)
    if (peek(s).shape !== ")") throw new ExpressionRefused("a `(` is never closed", "parse_error")
    s.at += 1
    return inner
  }
  if (token.shape === "[") return parseList(s)
  throw new ExpressionRefused(
    token.shape === "end"
      ? "the expression ends where a value was due"
      : `\`${token.text}\` stands where a value was due`,
    "parse_error"
  )
}

function parseList(s: Reading): Node {
  s.at += 1
  const items: Node[] = []
  if (peek(s).shape !== "]") {
    items.push(parseOr(s))
    while (peek(s).shape === ",") {
      s.at += 1
      items.push(parseOr(s))
    }
  }
  if (peek(s).shape !== "]") throw new ExpressionRefused("a `[` is never closed", "parse_error")
  s.at += 1
  return { kind: "list", items }
}

function parsePath(s: Reading, head: string): Node {
  const path: string[] = [head]
  while (peek(s).shape === ".") {
    s.at += 1
    const step = peek(s)
    if (step.shape !== "name") {
      throw new ExpressionRefused(
        step.shape === "end"
          ? "the expression ends where a path step was due"
          : `\`${step.text}\` stands where a path step was due, and a step is a bare name`,
        "parse_error"
      )
    }
    s.at += 1
    path.push(step.text)
  }
  return { kind: "path", path }
}

function parseCall(s: Reading, name: string): Node {
  const arity = ARITY[name]
  if (arity === undefined) throw new ExpressionRefused(`there is no function named \`${name}\``, "parse_error")
  s.at += 1
  const args: Node[] = []
  if (peek(s).shape !== ")") {
    args.push(parseOr(s))
    while (peek(s).shape === ",") {
      s.at += 1
      args.push(parseOr(s))
    }
  }
  if (peek(s).shape !== ")") {
    throw new ExpressionRefused(`the argument list of \`${name}(...)\` is never closed`, "parse_error")
  }
  s.at += 1
  if (args.length !== arity) {
    throw new ExpressionRefused(
      `\`${name}\` reads ${arity} argument${arity === 1 ? "" : "s"}, and ${args.length} stand${args.length === 1 ? "s" : ""} here`,
      "parse_error"
    )
  }
  if (!(name in CALLS)) {
    throw new ExpressionRefused(`the function call \`${name}(...)\` is not implemented`, "not_implemented")
  }
  return { kind: "call", name, args }
}

export function parse(expression: string): Node {
  if (expression.trim() === "") throw new ExpressionRefused("the expression is blank", "parse_error")
  const s: Reading = { tokens: tokenize(expression), at: 0 }
  const node = parseOr(s)
  const rest = peek(s)
  if (rest.shape !== "end") {
    throw new ExpressionRefused(`\`${rest.text}\` is left over at the end of the expression`, "parse_error")
  }
  return node
}

function ordered(op: "<" | ">" | "<=" | ">=", left: Value, right: Value): Value {
  if (left === null || right === null) return null
  if (typeof left !== "number" || !Number.isFinite(left)) {
    throw new ExpressionRefused(
      `\`${op}\` reads a number on both sides, and the left side is ${shown(left)}`,
      "comparison_type_mismatch"
    )
  }
  if (typeof right !== "number" || !Number.isFinite(right)) {
    throw new ExpressionRefused(
      `\`${op}\` reads a number on both sides, and the right side is ${shown(right)}`,
      "comparison_type_mismatch"
    )
  }
  if (op === "<") return left < right
  if (op === ">") return left > right
  if (op === "<=") return left <= right
  return left >= right
}

function numbered(op: string, side: "left" | "right", value: Value): number {
  const read = Number(value)
  if (Number.isNaN(read)) {
    throw new ExpressionRefused(
      `\`${op}\` reads a number on both sides, and the ${side} side is ${shown(value)}`,
      "arithmetic_nan"
    )
  }
  return read
}

function arithmetic(op: "+" | "-" | "*" | "/" | "%", left: Value, right: Value): Value {
  if (op === "+" && (typeof left === "string" || typeof right === "string")) {
    return String(left ?? "") + String(right ?? "")
  }
  const one = numbered(op, "left", left)
  const two = numbered(op, "right", right)
  if (op === "+") return one + two
  if (op === "-") return one - two
  if (op === "*") return one * two
  if (two === 0) {
    throw new ExpressionRefused(
      `the right side of \`${op}\` is zero, and this evaluator has no answer for that`,
      "divide_by_zero"
    )
  }
  if (op === "/") return one / two
  return one % two
}

export type Reads = (key: string) => Held

function run(node: Node, reads: Reads): Value {
  if (node.kind === "literal") return node.value
  if (node.kind === "prop") return valued(reads(node.key), node.key)
  if (node.kind === "path") {
    const head = node.path[0] ?? ""
    const found = valued(reads(head), head)
    if (found === null) return null
    throw new ExpressionRefused(
      `\`${node.path.slice(1).join(".")}\` reads a step into \`${head}\`, and \`${head}\` is ` +
        `${shown(found)} rather than an object`,
      "ref_lookup_type_error"
    )
  }
  if (node.kind === "list") {
    return node.items.map(function eachItem(item) {
      const value = run(item, reads)
      if (Array.isArray(value)) {
        throw new ExpressionRefused(
          `a list literal holds scalars, and one item of this one is ${shown(value)}`,
          "not_implemented"
        )
      }
      return value as Scalar
    })
  }
  if (node.kind === "bracket") {
    const of = run(node.of, reads)
    const key = run(node.key, reads)
    if (of === null || key === null) return null
    throw new ExpressionRefused(
      `a bracket access reads an object on its left, and it stands after ${shown(of)}`,
      "bracket_access_type_error"
    )
  }
  if (node.kind === "negate") {
    const of = run(node.of, reads)
    const read = Number(of)
    if (Number.isNaN(read)) {
      throw new ExpressionRefused(`\`-\` reads a number to negate, and it stands before ${shown(of)}`, "arithmetic_nan")
    }
    return -read
  }
  if (node.kind === "not") return !truthy(run(node.of, reads))
  if (node.kind === "call") {
    const call = CALLS[node.name]
    if (call === undefined) {
      throw new ExpressionRefused(`the function call \`${node.name}(...)\` is not implemented`, "not_implemented")
    }
    return call(node.args.map(function eachArgument(arg) { return run(arg, reads) }))
  }
  if (node.op === "&&") {
    const left = run(node.left, reads)
    return truthy(left) ? run(node.right, reads) : left
  }
  if (node.op === "||") {
    const left = run(node.left, reads)
    return truthy(left) ? left : run(node.right, reads)
  }
  const left = run(node.left, reads)
  const right = run(node.right, reads)
  if (node.op === "==" || node.op === "!=") {
    const one = scalarOnly(node.op, "left", left)
    const two = scalarOnly(node.op, "right", right)
    return node.op === "==" ? one === two : one !== two
  }
  if (node.op === "<" || node.op === ">" || node.op === "<=" || node.op === ">=") {
    return ordered(node.op, left, right)
  }
  return arithmetic(node.op, left, right)
}

export function evaluate(expression: string, reads: Reads): Held {
  const value = run(parse(expression), reads)
  if (value === null) return null
  const list = listed(value)
  if (list !== null) {
    return list.map(function eachItem(item) {
      return String(item)
    })
  }
  return String(value)
}
