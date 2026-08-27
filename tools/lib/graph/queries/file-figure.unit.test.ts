import { describe, expect, it } from "bun:test"
import type { Node, NodeId } from "../types.ts"
import {
  figureOverFiles,
  inDomainPaths,
  standingOutsideTheFigure,
  standsForFile,
} from "./file-figure.ts"

const KEPT = "src/kept.ts"
const LOST = "src/lost.ts"
const TSCONFIG = "tsconfig.json"
const FIXTURE = "__fixtures__/planted.ts"

const TRACKED: readonly string[] = [KEPT, LOST, TSCONFIG, FIXTURE]

const inDomain = inDomainPaths(TRACKED)

const node = (type: string, key: string): Node => ({
  type,
  id: `${type}:code:${key}` as NodeId,
  key,
  repo: "code",
  attrs: { path: key },
  derived: {},
})

const PACKAGE = node("package", "@scope/p")
const LOCKFILE_PACKAGE = node("lockfile-package", "left-pad@1.0.0")

const figureOf = (nodes: readonly Node[], rooted: readonly string[]) =>
  figureOverFiles(
    nodes.filter((one) => standsForFile(one, inDomain)),
    new Set(rooted as NodeId[])
  )

describe("a file is counted once and rooted if any node standing for it is rooted", () => {
  it("counts a file standing as two nodes once, and roots it on either half", () => {
    const nodes = [node("json-file", TSCONFIG), node("tsconfig-file", TSCONFIG)]
    expect(figureOf(nodes, []).total).toBe(1)
    expect(figureOf(nodes, [`tsconfig-file:code:${TSCONFIG}`]).rooted).toBe(1)
    expect(figureOf(nodes, [`json-file:code:${TSCONFIG}`]).rooted).toBe(1)
  })

  it("counts a file whose key carries no `-file` suffix, deciding by shape not by type name", () => {
    const nodes = [node("ts-file", KEPT), node("tunnel-route", KEPT)]
    expect(figureOf(nodes, []).total).toBe(1)
    expect(figureOf(nodes, [`tunnel-route:code:${KEPT}`]).rooted).toBe(1)
  })
})

describe("the planted unrooted file is caught", () => {
  it("counts a file whose only node is unrooted, and names it", () => {
    const figure = figureOf([node("ts-file", LOST)], [])
    expect([figure.total, figure.rooted, figure.unrooted]).toEqual([1, 0, 1])
    expect(figure.unrootedPaths).toEqual([LOST])
  })

  it("stays quiet where that same file is rooted", () => {
    const figure = figureOf([node("ts-file", LOST)], [`ts-file:code:${LOST}`])
    expect([figure.total, figure.rooted, figure.unrooted]).toEqual([1, 1, 0])
    expect(figure.unrootedPaths).toEqual([])
  })
})

describe("the planted non-file node stays out of the figure without collapsing rootedness", () => {
  it("leaves a node standing for no tracked file uncounted", () => {
    expect(standsForFile(PACKAGE, inDomain)).toBe(false)
    expect(standsForFile(LOCKFILE_PACKAGE, inDomain)).toBe(false)
    expect(figureOf([PACKAGE, LOCKFILE_PACKAGE, node("ts-file", KEPT)], []).total).toBe(1)
  })

  it("keeps the file that node roots rooted, which is the collapse this guards", () => {
    const figure = figureOf([PACKAGE, node("ts-file", KEPT)], [PACKAGE.id, `ts-file:code:${KEPT}`])
    expect([figure.total, figure.rooted, figure.unrooted]).toEqual([1, 1, 0])
  })

  it("reports it by type beside the figure rather than dropping it", () => {
    expect(standingOutsideTheFigure([PACKAGE, LOCKFILE_PACKAGE], new Set([PACKAGE.id]))).toEqual([
      { type: "lockfile-package", total: 1, rooted: 0 },
      { type: "package", total: 1, rooted: 1 },
    ])
  })
})

describe("a file outside the graph's own domain is outside the figure", () => {
  it("leaves a fixture uncounted even though its node stands for a tracked path", () => {
    expect(standsForFile(node("ts-file", FIXTURE), inDomain)).toBe(false)
    expect(figureOf([node("ts-file", FIXTURE), node("ts-file", KEPT)], []).total).toBe(1)
  })
})
