import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const charactersPlanEmptyNoCharactersDescription = {
  id: "01a0e2a6-e26e-72c4-8e80-038e62de4ac0",
  type: "page-type/temper-web-phrase",
  slug: "characters-plan-empty-no-characters-description",
  title: "No characters received",
  description:
    "Temper has not received any characters for this account. The Temper ESO add-ons write the files the Watcher reads, so both need to be working before any characters reach Temper. Arriving does not attach a build, though, so this tab stays empty even once they land.",
  createdAt: "2026-09-27T11:36:22.894Z",
  updatedAt: "2026-09-27T11:36:30.000Z",
} as const satisfies TemperWebPhrase
