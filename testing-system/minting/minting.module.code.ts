import { createHash } from "node:crypto"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Phase } from "@akasha/checks/checking"
import { idFiled, listedFiled } from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages-system/page-export-name"

export const REFUSES_CODE = `export function refuses(change) {
  return change.changed.map((path) => ({ path, reason: "refused for the test" }))
}
`

export const ADMITS_CODE = `export function admits() {
  return []
}
`

const CHECK = "code-check"

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const CHECK_TYPE_AT = "checks/code-checks/code-check.page-type.ts"

const MINTED_FROM = "sha256"

const VERSION_7 = "7"

const VARIANT_8 = "8"

export function mintedId(slug: string): string {
  const said = createHash(MINTED_FROM).update(slug).digest("hex")
  const time = `${said.slice(0, 8)}-${said.slice(8, 12)}`
  const version = `${VERSION_7}${said.slice(13, 16)}`
  const variant = `${VARIANT_8}${said.slice(17, 20)}`
  return `${time}-${version}-${variant}-${said.slice(20, 32)}`
}

export function pageFor(
  slug: string,
  id: string,
  definition: string,
  phase: Phase = "patch"
): string {
  return `export const ${exportedAs(slug)} = {
  id: "${id}",
  pageTypeSlug: "${CHECK}",
  slug: "${slug}",
  definition: "${definition}",
  code: "ts",
  runsOnPatch: ${phase === "patch"},
  runsOnWorktree: ${phase === "worktree"},
  runsOnDeploy: ${phase === "deploy"},
  runsOnAudit: ${phase === "audit"},
}
`
}

export function minting(
  root: string,
  slug: string,
  id: string,
  definition: string,
  code: string,
  phase: Phase = "patch"
): undefined {
  const at = `akasha/${slug}.${CHECK}.ts`
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, at), pageFor(slug, id, definition, phase))
  writeFileSync(join(root, `akasha/${slug}.${CHECK}.code.ts`), code)
  listedFiled(root, CHECK, slug, [{ path: at, id }])
  idFiled(root, CHECK_TYPE, [{ path: CHECK_TYPE_AT, id: CHECK_TYPE }])
}

export const MINTED = "a check minted for a test"

const REFUSES_ID = "01a04bed-1450-7000-8000-00000000bbbb"

const ADMITS_ID = "01a04bed-1450-7000-8000-00000000cccc"

export function refusing(root: string): undefined {
  minting(root, "refuses", REFUSES_ID, "a check refusing everything", REFUSES_CODE)
}

export function admitting(root: string): undefined {
  minting(root, "admits", ADMITS_ID, "a check admitting everything", ADMITS_CODE)
}
