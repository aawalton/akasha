import { describe, expect, test } from "bun:test"
import { CHECK_WORKFLOW_DISPATCH_NODE_TYPES } from "./check-workflow-watch.ts"
import { DECLARED_TABLE_DIRECTORY, declaredCheckEntries } from "./declared-check-configs.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const LEAST_CHECKS = 100

const LEAST_TABLES = 30

const TRACKED_FILE_POPULATIONS: readonly string[] = [
  "package",
  "ts-file",
  "tsx-file",
  "js-file",
  "jsx-file",
  "md-file",
  "css-file",
  "yaml-file",
  "yml-file",
  "lua-file",
  "sql-file",
  "json-file",
  "sh-file",
  "rust-file",
  "toml-file",
  "swift-file",
  "dockerfile-file",
  "systemd-unit-file",
  "txt-file",
  "lock-file",
  "tsconfig-file",
]

const codeRoot = process.env.WORKSPACE ?? resolveRoots().code

const { entries, modules } = await declaredCheckEntries(codeRoot)

const kindOf = (entry: unknown): string =>
  typeof entry === "string" ? entry : String((entry as { readonly kind?: unknown }).kind)

const listAt = (config: Record<string, unknown>, field: string): readonly unknown[] => {
  const held = config[field]
  return Array.isArray(held) ? held : []
}

const watched: ReadonlySet<string> = new Set(CHECK_WORKFLOW_DISPATCH_NODE_TYPES.map(kindOf))

describe("check workflow watch coverage", () => {
  test(`reads at least ${LEAST_CHECKS} check(s) across at least ${LEAST_TABLES} table(s), an emptied population otherwise reading as full coverage`, () => {
    expect({ checks: entries.length >= LEAST_CHECKS, tables: modules >= LEAST_TABLES }).toEqual({
      checks: true,
      tables: true,
    })
  })

  test("covers package and every tracked file-node population", () => {
    expect(TRACKED_FILE_POPULATIONS.filter((kind) => !watched.has(kind))).toEqual([])
  })

  test(`covers every population kind a check declared under ${DECLARED_TABLE_DIRECTORY} watches`, () => {
    const missing = new Set<string>()
    for (const { config } of entries) {
      for (const entry of listAt(config, "dispatchNodeTypes")) {
        if (!watched.has(kindOf(entry))) missing.add(`${config.name}: ${kindOf(entry)}`)
      }
      for (const id of listAt(config, "dispatchNodes")) {
        const named = String(id)
        const kind = named.slice(0, named.indexOf(":"))
        if (!watched.has(kind)) missing.add(`${config.name}: ${kind}`)
      }
    }
    expect([...missing].sort()).toEqual([])
  })
})
