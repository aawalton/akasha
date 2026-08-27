import { afterEach, describe, expect, test } from "bun:test"
import { type LayoutLinkProps, LayoutLinkProvider, LayoutRouterProvider } from "@shared/design-layout/router-context"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ComponentType } from "react"
import { CharactersPlanEmpty } from "./characters-plan-empty"
import type { PlanEmptyState } from "./characters-plan-empty-state"

const MECHANISM = /add-?on|import|watcher|sync/i
const DENIAL = /does not attach|will not change|will not fill|stays? empty/i
const FALSE_CLAIM = /has not received any characters/i

const TestLink: ComponentType<LayoutLinkProps> = ({ href, children }) => (
  <a href={href}>{children}</a>
)

function renderState(state: PlanEmptyState): string {
  const { container } = render(
    <LayoutRouterProvider
      value={{ pathname: "/", searchParams: { get: () => null, toString: () => "" } }}
    >
      <LayoutLinkProvider component={TestLink}>
        <CharactersPlanEmpty state={state} />
      </LayoutLinkProvider>
    </LayoutRouterProvider>
  )
  return container.textContent ?? ""
}

const measuredZero = (): string => renderState({ kind: "no-characters" })
const unconfirmed = (): string => renderState({ kind: "unconfirmed" })
const withCount = (importedCharacterCount: number): string =>
  renderState({ kind: "no-builds", importedCharacterCount })

afterEach(() => {
  cleanup()
})

describe("CharactersPlanEmpty", () => {
  test("the zero-count branch names the add-on prerequisite and denies it fills this tab", () => {
    const text = measuredZero()

    expect(text).toMatch(MECHANISM)
    expect(text).toMatch(DENIAL)
  })

  test("the >0 branch denies that importing again changes anything", () => {
    expect(withCount(3)).toMatch(DENIAL)
  })

  test("the >0 branch claims only the count it was given", () => {
    expect(withCount(1)).toContain("1 character")
    expect(withCount(3)).toContain("3 characters")
  })

  test("the unconfirmed branch never says the account received no characters", () => {
    expect(unconfirmed()).not.toMatch(FALSE_CLAIM)
  })

  test("the unconfirmed branch asserts no count at all", () => {
    expect(unconfirmed()).not.toMatch(/Temper has \d+/)
  })

  test("the unconfirmed branch does not blame the add-ons for an unfinished read", () => {
    expect(unconfirmed()).not.toMatch(/add-?on|Watcher/i)
  })

  test("the unconfirmed branch says it is still loading", () => {
    expect(unconfirmed()).toMatch(/still loading|not finished loading/i)
  })

  test("only the measured zero may make the no-characters claim", () => {
    expect(measuredZero()).toMatch(FALSE_CLAIM)
    expect(unconfirmed()).not.toMatch(FALSE_CLAIM)
    expect(withCount(20)).not.toMatch(FALSE_CLAIM)
  })
})
