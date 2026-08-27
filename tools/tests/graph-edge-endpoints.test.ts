import { describe, expect, test } from "bun:test"
import { mergeProducerOutputs, type MergeRegistry } from "../lib/graph/merge.ts"
import type { EdgeTypeDef, Graph, NodeTypeDef } from "../lib/graph/types.ts"
import { endpointsOf } from "./graph-edge-endpoints-arm.ts"

const registry: MergeRegistry = {
  nodeTypes: new Map<string, NodeTypeDef>([
    ["db-trigger", { name: "db-trigger" }],
    ["db-table", { name: "db-table" }],
  ]),
  edgeTypes: new Map<string, EdgeTypeDef>([
    ["db-trigger-table", { name: "db-trigger-table", from: "db-trigger", to: "db-table" }],
  ]),
}

const TRIGGER_ID = "db-trigger:code:public.orders.touch"
const OTHER_TRIGGER_ID = "db-trigger:code:public.orders.stamp"
const TABLE_ID = "db-table:code:public.orders"

const planted = (to: string): Graph =>
  mergeProducerOutputs(
    [
      {
        nodes: [
          { type: "db-trigger", repo: "code", key: "public.orders.touch", attrs: {} },
          { type: "db-trigger", repo: "code", key: "public.orders.stamp", attrs: {} },
          { type: "db-table", repo: "code", key: "public.orders", attrs: {} },
        ],
        edges: [{ type: "db-trigger-table", from: TRIGGER_ID, to, attrs: {} }],
      },
    ],
    registry
  )

describe("an edge lands on nodes of the types its edge type declares", () => {
  test("the walk catches an endpoint whose node is of the wrong type", () => {
    const reading = endpointsOf(planted(OTHER_TRIGGER_ID), registry.edgeTypes)
    expect(reading.misplaced).toEqual([
      {
        edgeType: "db-trigger-table",
        side: "to",
        nodeId: OTHER_TRIGGER_ID,
        declared: "db-table",
        found: "db-trigger",
      },
    ])
  })

  test("the walk stays quiet where both endpoints match", () => {
    const reading = endpointsOf(planted(TABLE_ID), registry.edgeTypes)
    expect(reading.misplaced).toEqual([])
    expect(reading.resolved).toBe(2)
  })

  test("an endpoint no node answers to is not a misplacement, and is not counted", () => {
    const reading = endpointsOf(planted("db-table:code:public.absent"), registry.edgeTypes)
    expect(reading.misplaced).toEqual([])
    expect(reading.resolved).toBe(1)
  })
})
