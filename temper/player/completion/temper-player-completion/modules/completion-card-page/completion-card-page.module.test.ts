import { expect, test } from "bun:test"
import {
  COMPLETION_CARD_PAGE_TYPE,
  completionCardAddress,
  completionCardOfPageSlug,
  pageSlugOfCompletionCard,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-page/completion-card-page.module.code.ts"
import { charactersCadwellsAlmanac } from "akasha/temper/player/progress/temper-completion-category/pages/characters-cadwells-almanac.temper-completion-category.ts"

test("a card's page is slugged as the tab holding that card joined to the card's name", () => {
  expect(pageSlugOfCompletionCard("cadwells-almanac")).toBe("characters-cadwells-almanac")
  expect(pageSlugOfCompletionCard("account-achievements")).toBe("account-account-achievements")
  expect(pageSlugOfCompletionCard("companion-level")).toBe("companions-companion-level")
  expect(pageSlugOfCompletionCard("guild-sales")).toBe("tasks-guild-sales")
})

test("both answers are read off the category tree rather than off the pages", () => {
  expect(completionCardOfPageSlug("characters-cadwells-almanac")).toBe("cadwells-almanac")
  expect(completionCardOfPageSlug("tasks-guild-sales")).toBe("guild-sales")
  expect(completionCardOfPageSlug("nothing-of-the-kind")).toBeNull()
  expect(pageSlugOfCompletionCard("nothing-of-the-kind")).toBeNull()
})

test("a node hung beneath a card is no card, so neither answer reaches one", () => {
  expect(pageSlugOfCompletionCard("skyshards")).toBeNull()
  expect(completionCardOfPageSlug("characters-skill-points-skyshards")).toBeNull()
})

test("the address a page is named by is built here rather than spelled by a caller", () => {
  expect(completionCardAddress("cadwells-almanac")).toBe(
    `${COMPLETION_CARD_PAGE_TYPE}/${charactersCadwellsAlmanac.slug}`
  )
  expect(completionCardAddress("nothing-of-the-kind")).toBeNull()
})
