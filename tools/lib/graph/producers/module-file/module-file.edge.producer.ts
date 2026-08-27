import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext, EdgeInit, Node } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { MODULE_OPENS_FILE_EDGE_TYPE, type ModuleOpensFileAttrs } from "./types.ts"

const SOURCE_ENDING = ".ts"

const JOINED = /(?:resolve|join)\(\s*import\.meta\.dir\s*,\s*((?:"[^"\n]*"\s*,\s*)*"[^"\n]*")\s*\)/g

const FROM_URL = /new URL\(\s*"([^"\n]*)"\s*,\s*import\.meta\.url\s*\)/g

const QUOTED = /"([^"\n]*)"/g

export const namedBeside = (body: string): readonly string[] => {
  const named: string[] = []
  for (const found of body.matchAll(JOINED)) {
    const parts = [...(found[1] ?? "").matchAll(QUOTED)].map((one) => one[1] ?? "")
    if (parts.length > 0) named.push(parts.join("/"))
  }
  for (const found of body.matchAll(FROM_URL)) {
    const one = found[1]
    if (one !== undefined && one !== "") named.push(one)
  }
  return named
}

const standingAt = (from: string, spelled: string): string | null => {
  const at = posix.normalize(posix.join(posix.dirname(from), spelled))
  return at.startsWith("..") || at.startsWith("/") ? null : at
}

const sourcesOf = (ctx: BuildContext): readonly string[] =>
  (ctx.repoFiles.get(CODE_REPO) ?? []).filter((rel) => rel.endsWith(SOURCE_ENDING))

export const moduleFileEdgeProducer = defineEdgeProducer({
  name: "module-file-edge",
  edgeTypes: [MODULE_OPENS_FILE_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const edges: EdgeInit[] = []

    const fileAt = (at: string): Node | undefined =>
      graph.nodesByKey(at, CODE_REPO).find((one: Node) => one.type.endsWith("-file"))

    for (const from of sourcesOf(ctx)) {
      const body = readRepoFile(ctx, CODE_REPO, from)
      if (body === null) continue
      const source = fileAt(from)
      if (source === undefined) continue
      for (const spelled of namedBeside(body)) {
        const at = standingAt(from, spelled)
        if (at === null || at === from) continue
        const target = fileAt(at)
        if (target === undefined) continue
        const attrs: ModuleOpensFileAttrs = { specifier: spelled }
        edges.push({
          type: MODULE_OPENS_FILE_EDGE_TYPE,
          from: source.id,
          to: target.id,
          attrs,
        })
      }
    }

    return { edges }
  },
})

export default moduleFileEdgeProducer
