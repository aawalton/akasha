
import type { Block, Document, FrontmatterValue, Inline, ListItem, Row, Scalar, Section } from "../../../page/document/types.ts"

const NEEDS_QUOTE = /^$|^[-?:,[\]{}#&*!|>'"%@`]|:\s|\s$|^\s|:$|[\u0000-\u001f]/

const ESCAPED: Readonly<Record<string, string>> = {
  "\\": "\\\\",
  '"': '\\"',
  "\n": "\\n",
  "\t": "\\t",
  "\r": "\\r",
  "\b": "\\b",
  "\f": "\\f",
  "\0": "\\0",
}

const escape = (char: string): string =>
  ESCAPED[char] ?? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`

function quote(scalar: Scalar): string {
  if (!NEEDS_QUOTE.test(scalar.text)) return scalar.text
  return `"${scalar.text.replace(/[\\"\u0000-\u001f]/g, escape)}"`
}

function value(node: FrontmatterValue, indent: string): string[] {
  if (node.kind === "scalar") return [quote(node.value)]
  if (node.kind === "list")
    return node.items.flatMap((item) => {
      const [head, ...rest] = value(item, `${indent}  `)
      return [`${indent}- ${head ?? ""}`, ...rest]
    })
  return node.entries.flatMap((entry) => {
    if (entry.value.kind === "scalar") return [`${indent}${quote(entry.key)}: ${quote(entry.value.value)}`]
    return [`${indent}${quote(entry.key)}:`, ...value(entry.value, `${indent}    `)]
  })
}

function frontmatter(doc: Document): string[] {
  if (doc.frontmatter.length === 0) return []
  const lines = doc.frontmatter.flatMap((key) => {
    if (key.value.kind === "scalar") return [`${key.name}: ${quote(key.value.value)}`]
    return [`${key.name}:`, ...value(key.value, "  ")]
  })
  return [["---", ...lines, "---"].join("\n")]
}

function leaf(node: Inline): string {
  return node.kind === "link" ? `[${node.text}](${node.href})` : node.text
}

function code(text: string): string {
  const fence = "`".repeat(Math.max(0, ...(text.match(/`+/g) ?? []).map((run) => run.length)) + 1)
  const pad = text.startsWith("`") || text.endsWith("`") ? " " : ""
  return `${fence}${pad}${text}${pad}${fence}`
}

function group(nodes: readonly Inline[], depth: number): string {
  let out = ""
  let i = 0
  while (i < nodes.length) {
    const node = nodes[i]!
    const mark = node.marks[depth]
    if (mark === undefined) {
      out += leaf(node)
      i += 1
      continue
    }
    let end = i + 1
    while (end < nodes.length && nodes[end]!.marks[depth] === mark) end += 1
    const inner = group(nodes.slice(i, end), depth + 1)
    out += mark === "code" ? code(inner) : `${mark === "strong" ? "**" : "*"}${inner}${mark === "strong" ? "**" : "*"}`
    i = end
  }
  return out
}

function inline(nodes: readonly Inline[]): string {
  return group(nodes, 0)
}

function item(node: ListItem, marker: string, indent: string): string[] {
  return [
    `${indent}${marker} ${inline(node.content)}`,
    ...node.children.flatMap((child) => item(child, "-", `${indent}  `)),
  ]
}

function row(cells: Row): string {
  return `| ${cells.map(inline).join(" | ")} |`
}

function fence(node: Extract<Block, { kind: "fence" }>): string {
  if (node.lang === null && /^\s*```\s*$/m.test(node.text))
    return node.text
      .split("\n")
      .map((line) => (line === "" ? "" : `    ${line}`))
      .join("\n")
  return ["```" + (node.lang ?? ""), node.text, "```"].join("\n")
}

function block(node: Block): string {
  if (node.kind === "paragraph") return inline(node.content)
  if (node.kind === "fence") return fence(node)
  if (node.kind === "list")
    return node.items.flatMap((entry, index) => item(entry, node.ordered ? `${index + 1}.` : "-", "")).join("\n")
  return [row(node.header), `| ${node.header.map(() => "---").join(" | ")} |`, ...node.rows.map(row)].join("\n")
}

function section(node: Section): string[] {
  const heading = "#".repeat(node.level) + (node.heading.length === 0 ? "" : ` ${inline(node.heading)}`)
  return [heading, ...node.blocks.map(block), ...node.sections.flatMap(section)]
}

export function print(doc: Document): string {
  return `${[...frontmatter(doc), ...doc.sections.flatMap(section)].join("\n\n")}\n`
}
