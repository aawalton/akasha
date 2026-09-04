import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const VAMPIRE_STAGE_EAV_SCHEMA = z
  .object({
    stageId: z.string(),
    stage: z.number(),
    esoVampireStageId: z.number(),
    description: z.string(),
    displayOrder: z.number(),
  })
  .strict()

interface ParsedVampireStage {
  stageId: string
  title: string
  stage: number
  esoVampireStageId: number
  description: string
  displayOrder: number
}

function parseVampireStage(row: Page): ParsedVampireStage {
  if (row.title === null) {
    throw new Error(`temper-vampire-stage row ${row.id} has null title`)
  }
  const eav = VAMPIRE_STAGE_EAV_SCHEMA.parse({
    stageId: row.stageId,
    stage: row.stage,
    esoVampireStageId: row.esoVampireStageId,
    description: row.description,
    displayOrder: row.displayOrder,
  })
  return {
    stageId: eav.stageId,
    title: row.title,
    stage: eav.stage,
    esoVampireStageId: eav.esoVampireStageId,
    description: eav.description,
    displayOrder: eav.displayOrder,
  }
}

export function generateTemperVampireStage(stageRows: readonly Page[]): string {
  const stages = stageRows.map(parseVampireStage)

  const sorted = [...stages].sort((a, b) => a.displayOrder - b.displayOrder)

  const stageLiteral = (s: ParsedVampireStage) =>
    `{ id: ${JSON.stringify(s.stageId)}, name: ${JSON.stringify(s.title)}, stage: ${s.stage}, esoVampireStageId: ${s.esoVampireStageId}, description: ${JSON.stringify(s.description)} }`

  const arrayLines = sorted.map((s) => `  ${stageLiteral(s)},`)
  const recordLines = sorted.map((s) => `  ${JSON.stringify(s.stageId)}: ${stageLiteral(s)},`)

  return `\
/**
 * Temper Vampire Stages (Generated)
 *
 * ESO vampire stages sourced from the universal pages table (page type:
 * temper-vampire-stage).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { VampireStage } from "../vampire-stages-data"

export const TEMPER_VAMPIRE_STAGES = [
${arrayLines.join("\n")}
] as const satisfies readonly VampireStage[]

/**
 * Keyed-by-id view of TEMPER_VAMPIRE_STAGES. Preserved as a literal
 * object so the resulting Record type carries the same string-literal
 * keys (\`stage-0\` … \`stage-4\`) the engine needs for its VampireStageId
 * union, with no runtime conversion and no \`as\` cast required.
 */
export const VAMPIRE_STAGE_DATA = {
${recordLines.join("\n")}
} as const satisfies Record<string, VampireStage>
`
}
