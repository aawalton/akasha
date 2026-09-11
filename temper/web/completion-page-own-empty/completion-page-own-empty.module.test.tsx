import { describe, expect, test } from "bun:test"
import { CompletionPageOwnEmpty } from "akasha/temper/web/completion-page-own-empty/completion-page-own-empty.module.code.tsx"
import type { ReactElement, ReactNode } from "react"

type LinkLikeProps = { href?: unknown; children?: ReactNode }

function hrefsIn(node: ReactNode): readonly string[] {
  if (node === null || node === undefined || typeof node !== "object") return []
  if (Array.isArray(node)) return node.flatMap((one) => hrefsIn(one as ReactNode))
  const props = (node as ReactElement<LinkLikeProps>).props
  if (props === undefined || props === null) return []
  const here = typeof props.href === "string" ? [props.href] : []
  return [...here, ...hrefsIn(props.children)]
}

describe("CompletionPageOwnEmpty", () => {
  test("renders CTA links to the watcher and to manual import", () => {
    const hrefs = hrefsIn(CompletionPageOwnEmpty())
    expect(hrefs).toContain("/watcher")
    expect(hrefs).toContain("/import")
  })
})
