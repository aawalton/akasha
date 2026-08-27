import type { Node, NodeId } from "../types.ts"
import { isOutsideGraphDomain } from "./membership.ts"

export interface Figure {
  readonly total: number
  readonly rooted: number
  readonly unrooted: number
  readonly percent: number
  readonly unrootedPaths: readonly string[]
  readonly nodesOfUnrootedFiles: readonly Node[]
}

export interface OutsideFigure {
  readonly type: string
  readonly total: number
  readonly rooted: number
}

export interface Population {
  readonly kinds: number
  readonly trackedFiles: number
  readonly outsideDomain: number
  readonly inDomain: number
  readonly noNode: number
  readonly ofNoKind: number
  readonly leftOut: number
}

export interface TypeCount {
  readonly type: string
  readonly n: number
}

export const inDomainPaths = (tracked: readonly string[]): ReadonlySet<string> =>
  new Set(tracked.filter((path) => !isOutsideGraphDomain(path)))

export const standsForFile = (node: Node, inDomain: ReadonlySet<string>): boolean =>
  inDomain.has(String(node.key))

const fileAt = (node: Node): string => `${node.repo ?? ""} ${String(node.key)}`

export const figureOverFiles = (
  fileNodes: readonly Node[],
  rooted: ReadonlySet<NodeId>
): Figure => {
  const rootedAt = new Map<string, boolean>()
  for (const node of fileNodes) {
    const at = fileAt(node)
    rootedAt.set(at, (rootedAt.get(at) ?? false) || rooted.has(node.id))
  }
  const unrootedPaths: string[] = []
  let rootedFiles = 0
  for (const [at, isRooted] of rootedAt) {
    if (isRooted) {
      rootedFiles += 1
      continue
    }
    unrootedPaths.push(at.slice(at.indexOf(" ") + 1))
  }
  const total = rootedAt.size
  return {
    total,
    rooted: rootedFiles,
    unrooted: total - rootedFiles,
    percent: total === 0 ? 0 : (rootedFiles / total) * 100,
    unrootedPaths: unrootedPaths.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    nodesOfUnrootedFiles: fileNodes.filter((node) => rootedAt.get(fileAt(node)) === false),
  }
}

export const standingOutsideTheFigure = (
  otherNodes: readonly Node[],
  rooted: ReadonlySet<NodeId>
): readonly OutsideFigure[] => {
  const held = new Map<string, { total: number; rooted: number }>()
  for (const node of otherNodes) {
    const at = held.get(node.type) ?? { total: 0, rooted: 0 }
    at.total += 1
    if (rooted.has(node.id)) at.rooted += 1
    held.set(node.type, at)
  }
  return [...held]
    .map(([type, at]) => ({ type, total: at.total, rooted: at.rooted }))
    .sort((a, b) => (b.total !== a.total ? b.total - a.total : a.type.localeCompare(b.type)))
}

const extensionOf = (path: string): string => {
  const base = path.slice(path.lastIndexOf("/") + 1)
  const dot = base.lastIndexOf(".")
  return dot <= 0 ? "" : base.slice(dot)
}

export function populationOf(tracked: readonly string[], mine: readonly Node[]): Population {
  const standing = new Set(mine.map((one) => String(one.key)))
  const inDomain = tracked.filter((path) => !isOutsideGraphDomain(path))
  const kindsStanding = new Set<string>()
  for (const path of inDomain) if (standing.has(path)) kindsStanding.add(extensionOf(path))
  let ofNoKind = 0
  let leftOut = 0
  for (const path of inDomain) {
    if (standing.has(path)) continue
    if (kindsStanding.has(extensionOf(path))) leftOut += 1
    else ofNoKind += 1
  }
  return {
    kinds: new Set(mine.map((one) => one.type)).size,
    trackedFiles: tracked.length,
    outsideDomain: tracked.length - inDomain.length,
    inDomain: inDomain.length,
    noNode: ofNoKind + leftOut,
    ofNoKind,
    leftOut,
  }
}

export function countByType(nodes: readonly Node[]): readonly TypeCount[] {
  const held = new Map<string, number>()
  for (const node of nodes) held.set(node.type, (held.get(node.type) ?? 0) + 1)
  return [...held]
    .map(([type, n]) => ({ type, n }))
    .sort((a, b) => (b.n !== a.n ? b.n - a.n : a.type.localeCompare(b.type)))
}
