import { z } from "zod"
import { defineNodeProducer } from "../../define-node-producer.ts"
import { readRepoFile } from "../../repos.ts"
import type { NodeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { RUST_MANIFEST_NAME, RUST_PACKAGE_NODE_TYPE, type RustPackageAttrs } from "./types.ts"

const CargoManifestSchema = z
  .object({
    package: z.object({ name: z.string() }).passthrough(),
  })
  .passthrough()

const directoryOf = (path: string): string =>
  path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ""

const isManifest = (path: string): boolean =>
  path === RUST_MANIFEST_NAME || path.endsWith(`/${RUST_MANIFEST_NAME}`)

const crateName = (raw: string): string | null => {
  let held: unknown
  try {
    held = Bun.TOML.parse(raw)
  } catch {
    return null
  }
  const parsed = CargoManifestSchema.safeParse(held)
  return parsed.success ? parsed.data.package.name : null
}

export const rustPackageNodeProducer = defineNodeProducer({
  name: "rust-package",
  nodeTypes: [RUST_PACKAGE_NODE_TYPE],
  build: (ctx) => {
    const nodes: NodeInit<"rust-package", RustPackageAttrs>[] = []
    const paths = repoFiles(ctx, CODE_REPO, { includeFixtures: true, includeGenerated: true })
    for (const path of paths) {
      if (!isManifest(path)) continue
      const raw = readRepoFile(ctx, CODE_REPO, path)
      if (raw === null) continue
      const name = crateName(raw)
      if (name === null) continue
      const attrs: RustPackageAttrs = { name, path: directoryOf(path) }
      nodes.push({ type: RUST_PACKAGE_NODE_TYPE, repo: CODE_REPO, key: name, attrs })
    }
    return { nodes }
  },
})

export default rustPackageNodeProducer
