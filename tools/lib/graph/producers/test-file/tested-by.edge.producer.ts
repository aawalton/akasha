import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Graph, NodeId } from "../../types.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPES,
} from "../file/ts-file/types.ts"
import { SYNTH_GENERATED_BY_EDGE_TYPE } from "../k8s/synth-types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { MODULE_OPENS_FILE_EDGE_TYPE } from "../module-file/types.ts"
import {
  COMPILE_TIME_ASSERTION_MODULE,
  isTestFilePath,
  TESTED_BY_EDGE_TYPE,
  type TestedByAttrs,
} from "./types.ts"

const IMPORTED_EDGE_TYPES = [
  IMPORT_STATIC_EDGE_TYPE,
  IMPORT_DYNAMIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
] as const

const SUBJECT_EDGE_TYPES = [...IMPORTED_EDGE_TYPES, MODULE_OPENS_FILE_EDGE_TYPE] as const

const TS_FILE_TYPES: ReadonlySet<string> = new Set(TS_FILE_NODE_TYPES)

const FILE_TYPE_ENDING = "-file"

const SEPARATOR = "/"

const folderOf = (repoRel: string): string => repoRel.slice(0, repoRel.lastIndexOf(SEPARATOR) + 1)

const generatorsByFolder = (upstream: Graph): ReadonlyMap<string, readonly NodeId[]> => {
  const held = new Map<string, NodeId[]>()
  for (const emitted of upstream.edges({ type: SYNTH_GENERATED_BY_EDGE_TYPE })) {
    const module = upstream.node(emitted.to)
    if (module === undefined || module.repo !== CODE_REPO) continue
    const folder = folderOf(module.key)
    const standing = held.get(folder) ?? []
    if (!standing.includes(module.id)) standing.push(module.id)
    held.set(folder, standing)
  }
  return held
}

export const testedByEdgeProducer = defineEdgeProducer({
  name: "tested-by",
  edgeTypes: [TESTED_BY_EDGE_TYPE],
  dependsOn: ["ts-file-edge", "module-file-edge", "k8s-synth-edges"],
  build: (_ctx, upstream) => {
    const edges: EdgeInit[] = []
    const attrs: TestedByAttrs = {}
    const seen = new Set<string>()
    const generators = generatorsByFolder(upstream)

    const emit = (subjectId: NodeId, testId: NodeId): undefined => {
      if (subjectId === testId) return undefined
      const at = `${subjectId} ${testId}`
      if (seen.has(at)) return undefined
      seen.add(at)
      edges.push({ type: TESTED_BY_EDGE_TYPE, from: subjectId, to: testId, attrs })
      return undefined
    }

    const assertsAtCompileTime = (fileId: string): boolean => {
      for (const named of upstream.outEdges(fileId, IMPORTED_EDGE_TYPES)) {
        const subject = upstream.node(named.to)
        if (subject?.repo === CODE_REPO && subject.key === COMPILE_TIME_ASSERTION_MODULE) return true
      }
      return false
    }

    for (const test of upstream.nodes(TS_FILE_NODE_TYPES)) {
      if (test.repo !== CODE_REPO) continue
      if (!isTestFilePath(test.key) && !assertsAtCompileTime(test.id)) continue
      for (const named of upstream.outEdges(test.id, SUBJECT_EDGE_TYPES)) {
        const subject = upstream.node(named.to)
        if (subject === undefined) continue
        const opened = named.type === MODULE_OPENS_FILE_EDGE_TYPE
        if (opened ? !subject.type.endsWith(FILE_TYPE_ENDING) : !TS_FILE_TYPES.has(subject.type)) {
          continue
        }
        if (subject.repo !== CODE_REPO) continue
        emit(subject.id, test.id)
      }
      if (!isTestFilePath(test.key)) continue
      for (const module of generators.get(folderOf(test.key)) ?? []) emit(module, test.id)
    }

    return { edges }
  },
})

export default testedByEdgeProducer
