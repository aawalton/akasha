import type { Graph } from "../types.ts"
import type { SerializedEdge, SerializedGraph, SerializedNode } from "./types.ts"

const sortKeysRecursively = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sortKeysRecursively)
  if (value === null || typeof value !== "object") return value
  return sortRecordKeys(value)
}

const sortRecordKeys = (value: unknown): Record<string, unknown> => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return {}
  const entries: [string, unknown][] = Object.entries(value)
  entries.sort(([a], [b]) => compareStrings(a, b))
  const result: Record<string, unknown> = {}
  for (const [key, held] of entries) result[key] = sortKeysRecursively(held)
  return result
}

const compareStrings = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0)

export const serializeGraph = (graph: Graph, commit: string): SerializedGraph => {
  const nodes: SerializedNode[] = graph
    .nodes()
    .map((node): SerializedNode => {
      const parts = node.repo === undefined ? { type: node.type } : { type: node.type, repo: node.repo }
      return {
        ...parts,
        key: node.key,
        attrs: sortRecordKeys(node.attrs),
        derived: sortRecordKeys(node.derived),
      }
    })
    .sort((a, b) => {
      const byType = compareStrings(a.type, b.type)
      if (byType !== 0) return byType
      const byRepo = compareStrings(a.repo ?? "", b.repo ?? "")
      return byRepo !== 0 ? byRepo : compareStrings(a.key, b.key)
    })

  const edges: SerializedEdge[] = graph
    .edges()
    .map((edge): SerializedEdge => ({
      type: edge.type,
      from: edge.from,
      to: edge.to,
      attrs: sortRecordKeys(edge.attrs),
      derived: sortRecordKeys(edge.derived),
    }))
    .sort((a, b) => {
      const byFrom = compareStrings(a.from, b.from)
      if (byFrom !== 0) return byFrom
      const byType = compareStrings(a.type, b.type)
      return byType !== 0 ? byType : compareStrings(a.to, b.to)
    })

  return { commit, nodes, edges }
}
