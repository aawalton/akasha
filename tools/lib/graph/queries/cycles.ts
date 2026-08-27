import type { Edge, Graph, NodeId } from "../types.ts"

type Frame = {
  readonly key: NodeId
  readonly successors: readonly NodeId[]
  next: number
  childKey: NodeId | null
}

export type FindCyclesOpts = {
  readonly edgeTypes?: readonly string[]
}

export const findCycles = (graph: Graph, opts?: FindCyclesOpts): readonly (readonly NodeId[])[] => {
  const edgeTypes = opts?.edgeTypes
  const successorsOf = (id: NodeId): readonly NodeId[] => {
    const out: readonly Edge[] = graph.outEdges(id, edgeTypes)
    const result: NodeId[] = []
    for (const edge of out) result.push(edge.to)
    return result
  }

  const allNodes = graph.nodes()
  const knownNodeIds = new Set<NodeId>()
  for (const node of allNodes) knownNodeIds.add(node.id)

  const indexOf = new Map<NodeId, number>()
  const lowlinkOf = new Map<NodeId, number>()
  const onStack = new Set<NodeId>()
  const sccStack: NodeId[] = []
  let nextIndex = 0

  const sccsContainingCycle: NodeId[][] = []

  const iterativeStrongconnect = (startKey: NodeId): undefined => {
    const work: Frame[] = []
    const pushFrame = (nodeId: NodeId): undefined => {
      indexOf.set(nodeId, nextIndex)
      lowlinkOf.set(nodeId, nextIndex)
      nextIndex++
      sccStack.push(nodeId)
      onStack.add(nodeId)
      work.push({
        key: nodeId,
        successors: successorsOf(nodeId),
        next: 0,
        childKey: null,
      })
    }
    pushFrame(startKey)

    while (work.length > 0) {
      const top = work[work.length - 1]
      if (top === undefined) break

      if (top.childKey !== null) {
        const childLow = lowlinkOf.get(top.childKey)
        const ownLow = lowlinkOf.get(top.key)
        if (childLow !== undefined && ownLow !== undefined && childLow < ownLow) {
          lowlinkOf.set(top.key, childLow)
        }
        top.childKey = null
      }

      if (top.next < top.successors.length) {
        const wKey = top.successors[top.next]
        top.next++
        if (wKey === undefined) continue
        if (!indexOf.has(wKey)) {
          if (!knownNodeIds.has(wKey)) continue
          top.childKey = wKey
          pushFrame(wKey)
          continue
        }
        if (onStack.has(wKey)) {
          const wIndex = indexOf.get(wKey)
          const ownLow = lowlinkOf.get(top.key)
          if (wIndex !== undefined && ownLow !== undefined && wIndex < ownLow) {
            lowlinkOf.set(top.key, wIndex)
          }
        }
        continue
      }

      work.pop()
      const topIndex = indexOf.get(top.key)
      const topLow = lowlinkOf.get(top.key)
      if (topIndex !== undefined && topLow !== undefined && topLow === topIndex) {
        const scc: NodeId[] = []
        while (sccStack.length > 0) {
          const popped = sccStack.pop()
          if (popped === undefined) break
          onStack.delete(popped)
          scc.push(popped)
          if (popped === top.key) break
        }
        if (scc.length > 1) {
          sccsContainingCycle.push(scc)
        } else if (scc.length === 1) {
          const only = scc[0]
          if (only !== undefined) {
            const succs = successorsOf(only)
            if (succs.includes(only)) sccsContainingCycle.push(scc)
          }
        }
      }
    }
  }

  for (const node of allNodes) {
    if (indexOf.has(node.id)) continue
    iterativeStrongconnect(node.id)
  }

  const sortedCycles: NodeId[][] = []
  for (const scc of sccsContainingCycle) {
    sortedCycles.push([...scc].sort())
  }
  sortedCycles.sort((a, b) => {
    const aFirst = a[0]
    const bFirst = b[0]
    if (aFirst === undefined || bFirst === undefined) return 0
    if (aFirst < bFirst) return -1
    if (aFirst > bFirst) return 1
    return 0
  })
  return sortedCycles
}
