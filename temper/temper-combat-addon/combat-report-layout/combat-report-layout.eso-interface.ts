import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const combatReportLayout = {
  id: "01a0617f-584e-76ce-83fb-c830e5da8925",
  pageTypeSlug: "eso-interface",
  slug: "combat-report-layout",
  definition: "the report window shown after a fight, with its panels, lists and graph",
  markup: "xml",
  loadedAs: "TemperCombat_Report.xml",
} as const satisfies EsoInterface
