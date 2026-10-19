import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { capturedCatalog } from "akasha/temper/catalog/world/temper-catalog-domain/modules/catalog-capture-reading/catalog-capture-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "pages/item-set.temper-catalog-domain.ts"

const CAPTURE = "pages/item-set.temper-catalog-domain.catalog-capture.uncommitted.json"

const A_SET = { "1": { name: "a set" } }

function rootHolding(body: string | null): string {
  const root = scratch.rootFor("catalog-capture-")
  mkdirSync(join(root, "pages"), { recursive: true })
  if (body !== null) writeFileSync(join(root, CAPTURE), body)
  return root
}

const listedOne = (): readonly { readonly path: string }[] => [{ path: PAGE }]

const listedNone = (): readonly { readonly path: string }[] => []

test("a catalog is read from the capture beside its domain page", () => {
  const root = rootHolding(JSON.stringify(A_SET))
  expect(capturedCatalog(root, "itemSetCatalog", listedOne)).toEqual(A_SET)
})

test("a catalog whose domain has no page has no capture", () => {
  const root = rootHolding(JSON.stringify(A_SET))
  expect(capturedCatalog(root, "itemSetCatalog", listedNone)).toBeUndefined()
})

test("a catalog with no capture beside its page has no capture", () => {
  expect(capturedCatalog(rootHolding(null), "itemSetCatalog", listedOne)).toBeUndefined()
})

test("a capture holding no table is no catalog", () => {
  expect(capturedCatalog(rootHolding("[]"), "itemSetCatalog", listedOne)).toBeUndefined()
})
