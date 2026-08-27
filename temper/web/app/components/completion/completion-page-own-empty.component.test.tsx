import { afterEach, describe, expect, test } from "bun:test"
import { type LayoutLinkProps, LayoutLinkProvider, LayoutRouterProvider } from "@shared/design-layout/router-context"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType } from "react"
import { CompletionPageOwnEmpty } from "./completion-page-own-empty"

const TestLink: ComponentType<LayoutLinkProps> = ({ href, children }) => (
  <a href={href}>{children}</a>
)

afterEach(() => {
  cleanup()
})

describe("CompletionPageOwnEmpty", () => {
  test("renders CTA links to the watcher and to manual import", () => {
    const { container } = render(
      <LayoutRouterProvider
        value={{ pathname: "/", searchParams: { get: () => null, toString: () => "" } }}
      >
        <LayoutLinkProvider component={TestLink}>
          <CompletionPageOwnEmpty />
        </LayoutLinkProvider>
      </LayoutRouterProvider>
    )

    expect(container.querySelector('a[href="/watcher"]')).not.toBeNull()
    expect(container.querySelector('a[href="/import"]')).not.toBeNull()
  })
})
