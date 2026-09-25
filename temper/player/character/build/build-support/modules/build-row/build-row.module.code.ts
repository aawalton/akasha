import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import { parseTimestamp } from "akasha/code/type/narrowing/modules/parse-timestamp/parse-timestamp.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { momentOfVersionSeven } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"

export interface BuildRow<Metadata> {
  id: string
  accountPage: string
  buildHash: string
  buildMetadata: Metadata | null
  visibility: string
  correlationId: string | null
  createdAt: number | null
  updatedAt: number
}

export function mapBuildRow<Metadata>(
  row: Record<string, unknown>,
  metadataOf: (row: Record<string, unknown>) => Metadata | null
): BuildRow<Metadata> {
  const id = parseString(row.id)
  return {
    id,
    accountPage: parseString(row.accountPage),
    buildHash: parseString(row.buildHash),
    buildMetadata: metadataOf(row),
    visibility: parseString(row.visibility, "private"),
    correlationId: stringIn(row.correlationId),
    createdAt: momentOfVersionSeven(id),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}
