import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const useScribedSkillsEditNotSaved = {
  id: "01a0e2a3-6f16-7d69-b8ca-5607167223e9",
  type: "page-type/temper-web-phrase",
  slug: "use-scribed-skills-edit-not-saved",
  title:
    "Changes not saved — Temper has no scribed skill for this grimoire with that focus script. Check that Focus is not set to None; if it is set, this is a gap in Temper's data.",
} as const satisfies TemperWebPhrase
