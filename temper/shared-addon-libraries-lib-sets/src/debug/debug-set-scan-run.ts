import { asNumberOpt, asNumRecord, asNumRecordOpt, asPresent } from "../casts"
import { getFirstEntryOfTable } from "./debug-helpers"
import {
  clientLang,
  debugHolder,
  debugOutputStartLine,
  libPrefix,
  scanState,
  unknownName,
} from "./debug-state"

const lib = LibSets

const zocstrfor = ZO_CachedStrFormat
const buildItemLink = lib.buildItemLink

const upperCaseFirstFormatter = "<<C:1>>"

function scanAllSetData(
  this: void,
  keepUncompressedetItemIds?: boolean,
  noReloadInfo?: boolean
): undefined {
  const noReload = noReloadInfo ?? false
  const keepUncompressed = keepUncompressedetItemIds ?? false
  const numItemIdPackages = lib.debugNumItemIdPackages
  const numItemIdPackageSize = lib.debugNumItemIdPackageSize

  if (
    numItemIdPackages === undefined ||
    numItemIdPackages === 0 ||
    numItemIdPackageSize === undefined ||
    numItemIdPackageSize === 0
  ) {
    return
  }
  const itemIdsToScanTotal = numItemIdPackages * numItemIdPackageSize
  d(debugOutputStartLine)
  d(
    libPrefix +
      "Start to load all set data. This could take a few minutes to finish!\nWatch the chat output for further information."
  )
  d(
    ">Scanning " +
      tostring(numItemIdPackages) +
      " packages with each " +
      tostring(numItemIdPackageSize) +
      " itemIds (total: " +
      tostring(itemIdsToScanTotal) +
      ") now..."
  )

  scanState.sets = {}
  scanState.setsEquipTypes = {}
  scanState.setsArmor = {}
  scanState.setsArmorTypes = {}
  scanState.setsJewelry = {}
  scanState.setsWeapons = {}
  scanState.setsWeaponTypes = {}

  scanState.setCount = 0
  scanState.itemCount = 0
  scanState.itemArmorCount = 0
  scanState.itemJewelryCount = 0
  scanState.itemWeaponsCount = 0
  scanState.itemIdsScanned = 0

  let milliseconds = 0
  const fromTo: { from: number; to: number }[] = []
  let fromVal = 0
  let summaryMet = false

  scanState.noFurtherItemsFound = false
  for (const numItemIdPackage of $range(1, numItemIdPackages, 1)) {
    const toVal = numItemIdPackage * numItemIdPackageSize
    fromTo.push({ from: fromVal, to: toVal })
    fromVal = toVal + 1
  }
  const numPackageLoops = fromTo.length
  for (const [packageNr, packageData] of ipairs(fromTo)) {
    const isLastLoop = packageNr === numPackageLoops

    zo_callLater((): undefined => {
      if (!summaryMet && !scanState.noFurtherItemsFound) {
        d(">loadSetsByIds, packageNr: " + tostring(packageNr))
        asPresent(debugHolder.loadSetsByIds)(packageNr, packageData.from, packageData.to, noReload)
      }
      if ((scanState.noFurtherItemsFound === true || isLastLoop === true) && !summaryMet) {
        d(">lastLoop, or noFurtherItemsFound!")
        summaryMet = true
        let loopsLeft = numPackageLoops - packageNr
        if (loopsLeft < 0) {
          loopsLeft = 0
        }
        d(
          ">>#fromTo: " +
            tostring(fromTo.length) +
            ", packageNr: " +
            tostring(packageNr) +
            ", loopsLeft: " +
            tostring(loopsLeft)
        )
        asPresent(debugHolder.showSetCountsScanned)(true, keepUncompressed, noReload, "Summary")
      }
    }, milliseconds)

    milliseconds = milliseconds + 1000
  }
}
lib.DebugScanAllSetData = scanAllSetData
debugHolder.scanAllSetData = scanAllSetData

function getNewSetName(this: void, newSetId: number | undefined): string {
  if (newSetId === undefined) {
    return unknownName
  }
  let itemId: number | undefined
  if (scanState.sets[newSetId] !== undefined) {
    itemId = asNumberOpt(getFirstEntryOfTable(scanState.sets[newSetId], true))
  }
  if (itemId === undefined) {
    const itemIdsPreloaded = asNumRecord(lib.setDataPreloaded[LIBSETS_TABLEKEY_SETITEMIDS])
    if (itemIdsPreloaded[newSetId] === undefined) {
      return unknownName
    }
    itemId = asNumberOpt(
      getFirstEntryOfTable(asNumRecordOpt(lib.DecompressSetIdItemIds(newSetId)), true)
    )
  }
  if (itemId === undefined) {
    return unknownName
  }
  const setItemLink = buildItemLink(itemId)
  if (setItemLink === undefined || setItemLink === "") {
    return unknownName
  }
  const [hasSet, setName, , , , setId] = GetItemLinkSetInfo(setItemLink, false)
  if (hasSet === true && setId === newSetId) {
    return zocstrfor(upperCaseFirstFormatter, setName)
  }
  return unknownName
}
debugHolder.getNewSetName = getNewSetName
