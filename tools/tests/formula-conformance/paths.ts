import type { Case } from "../../lib/formula-conformance.ts"

// ---------------------------------------------------------------------------
// Paths, brackets and list literals
//
// THE SUBSTRATE DIFFERENCE HERE IS OF REPRESENTATION, NOT OF ABSENCE.
//
// These cases used to say that a page cannot hold an object at all, and that no
// increment to our evaluator could reach one. Both were false, found 2026-08-27.
// An uncommitted sidecar is YAML and carries nested maps on disk today, and
// `carried` at `tools/lib/page-carry.ts:19` hands anything that is not a scalar
// or a flat list across as JSON text. So the object does reach the file side.
// What it reaches as is a string, which is why a step into it answers absent
// where the reference answers a value.
//
// That gap could be closed by parsing the text and walking it. We have not, and
// the case that asked for it was answered another way. A seat's sidecar wraps
// every value it stamps as `{value, at}` — all eleven keys, `model` and
// `cost-usd` as much as `turn-state`. A shape carried by every key of a store is
// that store's frame rather than the data's, so the answer settled with Alan was
// to unwrap the envelope rather than to give the language a way to read into it.
// Reaching in would have made a storage detail part of what every page type has
// to declare, and every formula in the system would name `{model.value}` forever
// on account of it.
//
// So this is a ruling and not an impossibility. Paths are refused until a case
// needs them that unwrapping cannot answer, rather than refused for good.
// ---------------------------------------------------------------------------

export const PATH_CASES: readonly Case[] = [
  {
    id: "dot-reads-an-object-property",
    category: "substrate",
    covers: "a dotted path reads one step into an object",
    expression: "o.k",
    values: { o: { where: "database", json: { k: "v" } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: "v" },
    why:
      "the file side is handed `o` as the JSON text `{\"k\":\"v\"}` rather than as a map, so the step meets a string where the reference meets an object, and a step into a string answers absent",
  },
  {
    id: "dot-missing-property-is-null",
    category: "substrate",
    covers: "a path step onto a key the object lacks answers null",
    expression: "o.z",
    values: { o: { where: "database", json: { k: "v" } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: null },
    why:
      "both sides answer null and neither reaches it the same way: the reference misses a key in a map, and the file side holds JSON text with no keys to miss",
  },
  {
    id: "dot-reads-two-steps",
    category: "substrate",
    covers: "a dotted path walks as many steps as it names",
    expression: "o.k.j",
    values: { o: { where: "database", json: { k: { j: 1 } } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: "1" },
    why:
      "a second step needs a map inside a map, and the file side carries the whole nesting flattened into one JSON string, so neither step lands",
  },
  {
    id: "dot-through-null-is-null",
    category: "agreed",
    covers: "a path step from null answers null rather than rejecting",
    expression: "o.k",
    values: { o: null },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: null },
  },
  {
    id: "dot-null-part-way-along-is-null",
    category: "substrate",
    covers: "a null found part way along a path stops the walk and answers null",
    expression: "o.k.j",
    values: { o: { where: "database", json: { k: null } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: null },
    why:
      "the null this stops on is one standing inside a map, and the file side carries that map as text, so the walk stops at the string rather than at the null",
  },
  {
    id: "bracket-reads-an-object-property",
    category: "substrate",
    covers: "a bracket access reads a key given as a string literal",
    expression: 'o["k"]',
    values: { o: { where: "database", json: { k: "v" } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: "v" },
    why:
      "the bracket is built against `o`, which reaches the file side as JSON text, so there is a string to index rather than a map to read",
  },
  {
    id: "bracket-key-from-a-value",
    category: "substrate",
    covers: "a bracket access takes its key from any expression, which is what a dotted path cannot do",
    expression: "o[k]",
    values: { o: { where: "database", json: { a: "v" } }, k: "a" },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: "v" },
    why:
      "what this case exists to show — a key taken from another value — needs a map to take that key into, and the file side holds that map as text",
  },
  {
    id: "bracket-missing-key-is-null",
    category: "substrate",
    covers: "a bracket access onto a key the object lacks answers null",
    expression: 'o["z"]',
    values: { o: { where: "database", json: { k: "v" } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: null },
    why:
      "both sides answer null for unlike reasons: the reference misses a key a map has room for, and the file side has a JSON string with no keys at all",
  },
  {
    id: "bracket-on-null-is-null",
    category: "agreed",
    covers: "a bracket access on null answers null before any type is judged",
    expression: 'o["k"]',
    values: { o: null },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: null },
  },
  {
    id: "bracket-with-a-null-key-is-null",
    category: "substrate",
    covers: "a null key answers null rather than rejecting as a non-string key would",
    expression: "o[k]",
    values: { o: { where: "database", json: { a: 1 } }, k: null },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: null },
    why:
      "the null key short-circuits on both sides before any type is judged, but the object it would have indexed reaches a file as text rather than as a map",
  },
  {
    id: "bracket-chains",
    category: "substrate",
    covers: "bracket access is postfix and stacks left to right",
    expression: 'o["a"]["b"]',
    values: { o: { where: "database", json: { a: { b: 2 } } } },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: "2" },
    why:
      "stacking one bracket on the next needs a map inside a map, and the file side has one JSON string carrying both levels together",
  },
  {
    id: "bracket-key-is-a-whole-expression",
    category: "substrate",
    covers: "a bracket key is parsed as a full expression, operators and all",
    expression: "o[a || b]",
    values: { o: { where: "database", json: { p: 1 } }, a: "", b: "p" },
    ours: { kind: "value", held: null },
    code: { kind: "value", held: "1" },
    why:
      "the expression between the brackets resolves to a key of `o`, and `o` reaches the file side as JSON text with no keys to resolve against",
  },
  {
    id: "array-literal-empty",
    category: "agreed",
    covers: "an empty array literal is a value",
    expression: "[]",
    ours: { kind: "value", held: [] },
    code: { kind: "value", held: [] },
  },
  {
    id: "array-literal-of-numbers",
    category: "agreed",
    covers: "an array literal holds the values its elements evaluate to",
    expression: "[1,2]",
    ours: { kind: "value", held: ["1", "2"] },
    code: { kind: "value", held: ["1", "2"] },
  },
  {
    id: "array-literal-of-references",
    category: "agreed",
    covers: "an array literal's elements are expressions rather than literals",
    expression: "[a,b]",
    values: { a: 1, b: "x" },
    ours: { kind: "value", held: ["1", "x"] },
    code: { kind: "value", held: ["1", "x"] },
  },
  {
    id: "array-literal-equality-rejects",
    category: "agreed",
    covers: "two array literals never compare, and both sides reject on the same fault",
    expression: "[1] == [1]",
    ours: { kind: "refused", says: "`==` compares scalars only, and the left side is a list of 1 item" },
    code: { kind: "error", code: "equality_non_scalar" },
  },
  {
    id: "array-literal-nested-refuses",
    category: "refused",
    covers: "an array literal holding another array literal",
    expression: "[[1]]",
    ours: {
      kind: "refused",
      says: "a list literal holds scalars, and one item of this one is a list of 1 item",
    },
    code: { kind: "value", held: ["[1]"] },
    why: "our `Value` is a scalar or a flat list of scalars, so a list inside a list has nowhere to sit. A file does carry a nested list across, as JSON text through `carried`, so the refusal is ours to make rather than one the substrate makes for us",
  },
]
