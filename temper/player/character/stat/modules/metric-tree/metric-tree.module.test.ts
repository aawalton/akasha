import { expect, test } from "bun:test"
import { METRIC_TREE } from "akasha/temper/player/character/stat/modules/metric-tree/metric-tree.module.code.ts"
import type { MetricTreeNode } from "akasha/temper/player/character/stat/modules/metric-tree-types/metric-tree-types.module.code.ts"
import { metrics } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

function every(nodes: readonly MetricTreeNode[] | undefined): readonly MetricTreeNode[] {
  return (nodes ?? []).flatMap((node) => [node, ...every(node.children)])
}

const NODES = Object.values(METRIC_TREE).flatMap((category) => every(category.children))

test("the categories are in the order their pages give", () => {
  expect(Object.keys(METRIC_TREE)).toEqual([
    "damage",
    "sustain",
    "toughness",
    "healing",
    "mobility",
    "target",
    "other",
  ])
})

test("every metric-tree page is one node of the tree", () => {
  const pages = import.meta.glob(
    "../../../../progress/temper-metric-tree/**/*.temper-metric-tree.ts",
    {
      eager: true,
    }
  )
  expect(Object.keys(METRIC_TREE).length + NODES.length).toBe(Object.keys(pages).length)
})

test("siblings are in the order of their display order", () => {
  const damage = METRIC_TREE["damage"]?.children?.map((node) => node.id)
  expect(damage?.slice(0, 3)).toEqual(["effective-power", "power", "attack-power"])
})

test("every metric node names a metric the catalog holds", () => {
  const missing = NODES.filter((node) => node.type === "metric" && !(node.id in metrics.data))
  expect(missing.map((node) => node.id)).toEqual([])
})
