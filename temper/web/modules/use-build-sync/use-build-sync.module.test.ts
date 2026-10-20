import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import { useBuildSync } from "akasha/temper/web/modules/use-build-sync/use-build-sync.module.code.ts"
import { useReducer } from "react"

type Build = { readonly hash: string }

type Meta = { readonly name: string }

type Action =
  | { readonly kind: "reset"; readonly payload: Build }
  | { readonly kind: "edit"; readonly hash: string }

function reducer(_state: Build, action: Action): Build {
  return action.kind === "reset" ? action.payload : { hash: action.hash }
}

type Served = { readonly hash: string | null; readonly meta: Meta | null }

type Saved = { readonly hash: string; readonly meta: Meta }

function drawn(initialHash: string, served: Served, encode = (build: Build) => build.hash) {
  const saved: Saved[] = []
  const hook = renderHook(
    (props: Served) => {
      const [build, dispatch] = useReducer(reducer, { hash: initialHash })
      useBuildSync<Build, Action, Meta>({
        localBuild: build,
        zeroBuildHash: props.hash,
        zeroBuildMetadata: props.meta,
        updateRemote: async (hash, meta) => {
          saved.push({ hash, meta })
        },
        dispatch,
        createResetAction: (payload) => ({ kind: "reset", payload }),
        initialBuildHash: initialHash,
        encode,
        decode: (hash) => ({ hash }),
        extractMetadata: () => props.meta ?? { name: "" },
      })
      return { build, dispatch }
    },
    { initialProps: served }
  )
  return { hook, saved }
}

test("a hash the server changes is taken in and nothing is saved", () => {
  const { hook, saved } = drawn("original", { hash: "original", meta: { name: "a" } })
  hook.rerender({ hash: "newer", meta: { name: "a" } })
  hook.rerender({ hash: "newer", meta: { name: "a" } })
  expect(hook.result.current.build.hash).toBe("newer")
  expect(saved).toEqual([])
  hook.unmount()
})

test("the row coming down again with nothing changed saves nothing", () => {
  const { hook, saved } = drawn("original", { hash: "original", meta: { name: "a" } })
  for (let i = 0; i < 5; i += 1) hook.rerender({ hash: "original", meta: { name: "a" } })
  expect(saved).toEqual([])
  hook.unmount()
})

test("a build whose encoding differs from the stored hash is not saved on load", () => {
  const { hook, saved } = drawn(
    "stored",
    { hash: "stored", meta: { name: "a" } },
    (build) => `${build.hash}-re-encoded`
  )
  hook.rerender({ hash: "stored", meta: { name: "a" } })
  expect(saved).toEqual([])
  hook.unmount()
})

test("an edit is saved once", () => {
  const { hook, saved } = drawn("original", { hash: "original", meta: { name: "a" } })
  act(() => hook.result.current.dispatch({ kind: "edit", hash: "edited" }))
  hook.rerender({ hash: "original", meta: { name: "a" } })
  expect(saved.map((one) => one.hash)).toEqual(["edited"])
  hook.unmount()
})

test("an edit after the server changed is saved, and the server's hash alone is not", () => {
  const { hook, saved } = drawn("original", { hash: "original", meta: { name: "a" } })
  hook.rerender({ hash: "newer", meta: { name: "a" } })
  act(() => hook.result.current.dispatch({ kind: "edit", hash: "edited" }))
  expect(saved.map((one) => one.hash)).toEqual(["edited"])
  hook.unmount()
})
