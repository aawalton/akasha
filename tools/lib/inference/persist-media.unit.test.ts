import { describe, expect, test } from "bun:test"
import { type MediaPersistDeps, persistInferenceMedia, shouldPersistMedia } from "./persist-media"

const OPS = new Set(["alpha", "beta"])

describe("shouldPersistMedia", () => {
  test("an operation in the set persists by default (persist undefined)", () => {
    expect(shouldPersistMedia("alpha", undefined, OPS)).toBe(true)
    expect(shouldPersistMedia("beta", undefined, OPS)).toBe(true)
  })
  test("persist === false opts out even for an in-set operation", () => {
    expect(shouldPersistMedia("alpha", false, OPS)).toBe(false)
    expect(shouldPersistMedia("beta", false, OPS)).toBe(false)
  })
  test("persist === true persists an in-set operation", () => {
    expect(shouldPersistMedia("alpha", true, OPS)).toBe(true)
  })
  test("an operation outside the set never persists, regardless of persist", () => {
    for (const persist of [undefined, true, false] as const) {
      expect(shouldPersistMedia("gamma", persist, OPS)).toBe(false)
    }
  })
})

describe("persistInferenceMedia", () => {
  test("creates the page then publishes the bytes, returning the new page id", async () => {
    const calls: string[] = []
    const createCalls: Record<string, unknown>[] = []
    const publishCalls: { pageId: string; bytes: Uint8Array }[] = []
    const deps: MediaPersistDeps = {
      createPage: async (properties) => {
        calls.push("create")
        createCalls.push(properties)
        return "media-7"
      },
      publishBytes: async (pageId, bytes) => {
        calls.push("publish")
        publishCalls.push({ pageId, bytes })
      },
    }
    const bytes = new Uint8Array([9, 8, 7])
    const id = await persistInferenceMedia(deps, {
      properties: { title: "x", inferenceRun: "run-1" },
      outputBytes: bytes,
    })
    expect(id).toBe("media-7")
    expect(calls).toEqual(["create", "publish"])
    expect(createCalls[0]).toMatchObject({ title: "x", inferenceRun: "run-1" })
    expect(publishCalls).toEqual([{ pageId: "media-7", bytes }])
  })

  test("does not publish when create throws", async () => {
    const calls: string[] = []
    const deps: MediaPersistDeps = {
      createPage: async () => {
        calls.push("create")
        throw new Error("create boom")
      },
      publishBytes: async () => {
        calls.push("publish")
      },
    }
    await expect(
      persistInferenceMedia(deps, { properties: {}, outputBytes: new Uint8Array([1]) })
    ).rejects.toThrow(/create boom/)
    expect(calls).toEqual(["create"])
  })
})
