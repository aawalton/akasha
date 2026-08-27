import { describe, expect, test } from "bun:test"
import { nodeKey } from "../lib/graph/key.ts"

describe("nodeKey", () => {
  test("a node standing in no repository is its type and what the type keys on", () => {
    expect(nodeKey({ type: "db-table", key: "public.users" })).toBe("db-table:public.users")
  })

  test("a node standing in a repository carries it between the two", () => {
    expect(nodeKey({ type: "ts-file", repo: "code", key: "tools/read.ts" })).toBe(
      "ts-file:code:tools/read.ts"
    )
  })

  test("one path in two repositories is two nodes", () => {
    expect(nodeKey({ type: "json-file", repo: "code", key: "package.json" })).not.toBe(
      nodeKey({ type: "json-file", repo: "instructions", key: "package.json" })
    )
  })
})
