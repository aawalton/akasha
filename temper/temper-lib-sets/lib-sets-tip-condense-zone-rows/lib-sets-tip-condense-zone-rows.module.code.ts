import { asStringOpt, asUnknownArray } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

export interface ZoneRow {
  zoneName: string | undefined
  parentZoneName: string | undefined
  mechanicName: string | undefined
  mechanicNameClean: string | undefined
  locationName: string | undefined
}

export interface ZoneScratchTables {
  dropZoneNames: { [idx: number]: unknown }
  parentDropZoneNames: { [idx: number]: unknown }
  dropMechanicNames: { [idx: number]: unknown }
  dropMechanicNamesClean: { [idx: number]: unknown }
  dropLocationNames: { [idx: number]: unknown }
}

const KEY_FIELD_SEPARATOR = "\u0001"

export function condenseZoneRows(this: void, rows: ZoneRow[]): ZoneRow[] {
  const rowsAlreadyKept: { [rowKey: string]: boolean } = {}
  const keptRows: ZoneRow[] = []
  for (const row of rows) {
    const rowKey =
      (row.zoneName ?? "") +
      KEY_FIELD_SEPARATOR +
      (row.parentZoneName ?? "") +
      KEY_FIELD_SEPARATOR +
      (row.mechanicName ?? "") +
      KEY_FIELD_SEPARATOR +
      (row.locationName ?? "")
    if (rowsAlreadyKept[rowKey]) {
      continue
    }
    rowsAlreadyKept[rowKey] = true
    keptRows.push(row)
  }
  return keptRows
}

export function condenseZoneScratch(this: void, scratch: ZoneScratchTables): undefined {
  const rowCount = asUnknownArray(scratch.dropZoneNames).length
  const rows: ZoneRow[] = []
  for (let idx = 1; idx <= rowCount; idx += 1) {
    rows.push({
      zoneName: asStringOpt(scratch.dropZoneNames[idx]),
      parentZoneName: asStringOpt(scratch.parentDropZoneNames[idx]),
      mechanicName: asStringOpt(scratch.dropMechanicNames[idx]),
      mechanicNameClean: asStringOpt(scratch.dropMechanicNamesClean[idx]),
      locationName: asStringOpt(scratch.dropLocationNames[idx]),
    })
  }

  const keptRows = condenseZoneRows(rows)
  scratch.dropZoneNames = {}
  scratch.parentDropZoneNames = {}
  scratch.dropMechanicNames = {}
  scratch.dropMechanicNamesClean = {}
  scratch.dropLocationNames = {}
  for (let idx = 1; idx <= keptRows.length; idx += 1) {
    const row = keptRows[idx - 1]
    if (row === undefined) {
      continue
    }
    scratch.dropZoneNames[idx] = row.zoneName
    scratch.parentDropZoneNames[idx] = row.parentZoneName
    scratch.dropMechanicNames[idx] = row.mechanicName
    scratch.dropMechanicNamesClean[idx] = row.mechanicNameClean
    scratch.dropLocationNames[idx] = row.locationName
  }
}
