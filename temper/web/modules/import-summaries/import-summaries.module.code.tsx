import type { ImportResult } from "akasha/temper/web/modules/import-result/import-result.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { importSummariesAccountUpdated } from "akasha/temper/web/phrase/pages/import-summaries-account-updated.temper-web-phrase.ts"
import { importSummariesAnd } from "akasha/temper/web/phrase/pages/import-summaries-and.temper-web-phrase.ts"
import { importSummariesCharacter } from "akasha/temper/web/phrase/pages/import-summaries-character.temper-web-phrase.ts"
import { importSummariesCharacters } from "akasha/temper/web/phrase/pages/import-summaries-characters.temper-web-phrase.ts"
import { importSummariesCompanion } from "akasha/temper/web/phrase/pages/import-summaries-companion.temper-web-phrase.ts"
import { importSummariesCompanions } from "akasha/temper/web/phrase/pages/import-summaries-companions.temper-web-phrase.ts"
import { importSummariesPreservedMany } from "akasha/temper/web/phrase/pages/import-summaries-preserved-many.temper-web-phrase.ts"
import { importSummariesPreservedOne } from "akasha/temper/web/phrase/pages/import-summaries-preserved-one.temper-web-phrase.ts"
import { importSummariesSkippedMany } from "akasha/temper/web/phrase/pages/import-summaries-skipped-many.temper-web-phrase.ts"
import { importSummariesSkippedOne } from "akasha/temper/web/phrase/pages/import-summaries-skipped-one.temper-web-phrase.ts"
import { importSummariesUpToDate } from "akasha/temper/web/phrase/pages/import-summaries-up-to-date.temper-web-phrase.ts"
import { importSummariesUpdated } from "akasha/temper/web/phrase/pages/import-summaries-updated.temper-web-phrase.ts"

type EntityStatus = ImportResult["account"]["status"]

const ADVANCED: ReadonlySet<EntityStatus> = new Set<EntityStatus>(["created", "updated"])

function counted(phrase: Phrase, count: number, one: string, many: string): string {
  return phrase(count === 1 ? one : many, { count })
}

function characters(phrase: Phrase, count: number): string {
  return counted(phrase, count, importSummariesCharacter.slug, importSummariesCharacters.slug)
}

function companions(phrase: Phrase, count: number): string {
  return counted(phrase, count, importSummariesCompanion.slug, importSummariesCompanions.slug)
}

export function importHadCaveats(result: ImportResult): boolean {
  const preserved = [result.account, ...result.characters, ...result.companions].some(
    (entity) => entity.status === "preserved"
  )
  return (
    preserved ||
    result.diagnostics.skippedCharacters > 0 ||
    result.diagnostics.skippedCompanions > 0
  )
}

export function ImportSummary({ result }: { result: ImportResult }) {
  const phrase = usePhrase()
  const entities: ReadonlyArray<{ status: EntityStatus }> = [
    result.account,
    ...result.characters,
    ...result.companions,
  ]
  const advanced = entities.filter((e) => ADVANCED.has(e.status)).length
  const preserved = entities.filter((e) => e.status === "preserved").length
  const { skippedCharacters, skippedCompanions } = result.diagnostics

  const charAdvanced = result.characters.filter((c) => ADVANCED.has(c.status)).length
  const compAdvanced = result.companions.filter((c) => ADVANCED.has(c.status)).length

  const lines: string[] = []
  const updated = (things: string) => phrase(importSummariesUpdated.slug, { things })
  if (ADVANCED.has(result.account.status)) lines.push(phrase(importSummariesAccountUpdated.slug))
  if (charAdvanced > 0) lines.push(updated(characters(phrase, charAdvanced)))
  if (compAdvanced > 0) lines.push(updated(companions(phrase, compAdvanced)))
  if (advanced === 0) lines.push(phrase(importSummariesUpToDate.slug))

  const skippedParts = [
    skippedCharacters > 0 ? characters(phrase, skippedCharacters) : null,
    skippedCompanions > 0 ? companions(phrase, skippedCompanions) : null,
  ].filter((part) => part !== null)
  const [firstSkipped = "", secondSkipped] = skippedParts
  const skippedThings =
    secondSkipped === undefined
      ? firstSkipped
      : phrase(importSummariesAnd.slug, { first: firstSkipped, second: secondSkipped })
  const skippedSlug =
    skippedCharacters + skippedCompanions === 1
      ? importSummariesSkippedOne.slug
      : importSummariesSkippedMany.slug

  return (
    <div className="flex flex-col gap-2">
      <ul className="list-inside list-disc">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {preserved > 0 && (
        <p>
          {counted(
            phrase,
            preserved,
            importSummariesPreservedOne.slug,
            importSummariesPreservedMany.slug
          )}
        </p>
      )}
      {skippedParts.length > 0 && <p>{phrase(skippedSlug, { things: skippedThings })}</p>}
    </div>
  )
}
