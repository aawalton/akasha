import type { InventoryImportResult } from "@akasha/temper-player-inventory-management-ui/inventory-import-types"
import type { ImportResult } from "../import-result/import-result.module.code.ts"

type EntityStatus = ImportResult["account"]["status"]

const ADVANCED: ReadonlySet<EntityStatus> = new Set<EntityStatus>(["created", "updated"])

function plural(count: number, noun: string): string {
  return `${count} ${noun}${count !== 1 ? "s" : ""}`
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
  if (ADVANCED.has(result.account.status)) lines.push("Account data updated")
  if (charAdvanced > 0) lines.push(`${plural(charAdvanced, "character")} updated`)
  if (compAdvanced > 0) lines.push(`${plural(compAdvanced, "companion")} updated`)
  if (advanced === 0) lines.push("Everything in this file was already up to date")

  return (
    <div className="flex flex-col gap-2">
      <ul className="list-inside list-disc">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {preserved > 0 && (
        <p>
          This file was missing progress you had already recorded on {plural(preserved, "record")} —
          your existing progress was kept. That usually means the add-ons that wrote it are out of
          date.
        </p>
      )}
      {(skippedCharacters > 0 || skippedCompanions > 0) && (
        <p>
          {[
            skippedCharacters > 0 ? plural(skippedCharacters, "character") : null,
            skippedCompanions > 0 ? plural(skippedCompanions, "companion") : null,
          ]
            .filter((part) => part !== null)
            .join(" and ")}{" "}
          in this file could not be read and{" "}
          {skippedCharacters + skippedCompanions === 1 ? "was" : "were"} not imported.
        </p>
      )}
    </div>
  )
}

export function InventoryImportSummary({ result }: { result: InventoryImportResult }) {
  const lines: string[] = []

  lines.push(`${result.locationCount} location${result.locationCount !== 1 ? "s" : ""} scanned`)
  lines.push(`${result.itemCount} item${result.itemCount !== 1 ? "s" : ""} indexed`)
  if (result.totalValue > 0) {
    lines.push(`Estimated value: ${Math.round(result.totalValue).toLocaleString()} gold`)
  }
  lines.push(`Inventory snapshot saved`)

  return (
    <ul className="list-inside list-disc">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  )
}
