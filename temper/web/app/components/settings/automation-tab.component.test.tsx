import { afterEach, describe, expect, mock, test } from "bun:test"
import { cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"

const emptyHook = () => ({})
const noop = () => {}

await mock.module("@temper/player-inventory-management-ui/hooks-inventory-settings", () => ({
  useAutomationSettings: () => ({
    automationSettings: { global: { characters: {}, companions: {} } },
    updateCharacterToggle: noop,
    updateCompanionToggle: noop,
    updateGlobalCharacterToggle: noop,
    updateGlobalCompanionToggle: noop,
  }),
  useBackpackSettings: emptyHook,
  useCraftBagAccess: emptyHook,
  useManagedGuildBanks: emptyHook,
  useInventorySettings: emptyHook,
}))

const { AutomationTab } = await import("./automation-tab")

const MASTER_WRIT_CRAFTS = [
  "Blacksmithing",
  "Clothier",
  "Woodworking",
  "Jewelrycrafting",
  "Enchanting",
  "Alchemy",
  "Provisioning",
] as const

afterEach(() => {
  cleanup()
})

describe("AutomationTab — Master Writs card", () => {
  test("renders the card with a master switch and all seven per-craft toggles", () => {
    const { container } = render(<AutomationTab active />)

    const masterCard = container.querySelector("#master-writs")
    expect(masterCard).not.toBeNull()

    expect(masterCard?.textContent ?? "").toContain("Master Writs")

    expect(masterCard?.querySelector('[data-slot="switch"]')).not.toBeNull()

    const buttons = Array.from(masterCard?.querySelectorAll("button") ?? [])
    for (const craft of MASTER_WRIT_CRAFTS) {
      expect(buttons.some((button) => button.textContent === craft)).toBe(true)
    }
  })

  test("renders nothing when inactive", () => {
    const { container } = render(<AutomationTab active={false} />)
    expect(container.querySelector("#master-writs")).toBeNull()
  })
})

describe("AutomationTab — Coming Soon group", () => {
  const COMING_SOON_LABELS = ["Skills", "Champion Points", "Attributes"] as const

  test("renders the three Coming Soon toggles as disabled", () => {
    const { container } = render(<AutomationTab active />)

    const groups = Array.from(
      container.querySelectorAll<HTMLElement>('[data-slot="badge-toggle-group"]')
    )
    const comingSoonGroup = groups.find((group) =>
      Array.from(group.querySelectorAll("button")).some(
        (button) => button.textContent === "Champion Points"
      )
    )
    expect(comingSoonGroup).toBeDefined()

    const buttons = Array.from(comingSoonGroup?.querySelectorAll("button") ?? [])
    for (const label of COMING_SOON_LABELS) {
      const button = buttons.find((candidate) => candidate.textContent === label)
      expect(button).toBeDefined()
      expect(button?.disabled).toBe(true)
    }
  })
})
