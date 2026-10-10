import { expect, test } from "bun:test"
import {
  chestMatchProblem,
  houseBankKeyFor,
  houseStorageTarget,
  matchStorageChest,
  type StorageChest,
  storageChestChoices,
} from "akasha/temper/items/rules/core/modules/house-storage-chest/house-storage-chest.module.code.ts"

const CHESTS: readonly StorageChest[] = [
  { chestId: "4677", name: "Empty" },
  { chestId: "4678", name: "Crown Items" },
  { chestId: "4673", name: "Empty" },
]

test("a name finds the one chest holding that name", () => {
  expect(matchStorageChest("Crown Items", CHESTS)).toEqual({ kind: "one", chestId: "4678" })
})

test("a name finds its chest whatever the case and the spaces at its ends", () => {
  expect(matchStorageChest("  crown ITEMS ", CHESTS)).toEqual({ kind: "one", chestId: "4678" })
})

test("a name no chest holds finds no chest and says so", () => {
  const match = matchStorageChest("Alliance War", CHESTS)
  expect(match).toEqual({ kind: "none" })
  expect(chestMatchProblem("Alliance War", match)).toBe("no storage chest named Alliance War")
})

test("a name two chests hold finds neither and says so", () => {
  const match = matchStorageChest("Empty", CHESTS)
  expect(match).toEqual({ kind: "several", chestIds: ["4677", "4673"] })
  expect(chestMatchProblem("Empty", match)).toBe("2 storage chests named Empty")
})

test("a destination of digits names a chest by its collectible id", () => {
  expect(matchStorageChest("4677", CHESTS)).toEqual({ kind: "one", chestId: "4677" })
})

test("a chest is offered by its name, or by its id where its name is not its own", () => {
  const locations = {
    "HouseBank:5462:4678": { displayName: "Crown Items" },
    "HouseBank:5462:4677": { displayName: "Empty" },
    "HouseBank:5462:4673": { displayName: "Empty" },
    "HouseBank:5462:4679": { displayName: "" },
  }
  expect(storageChestChoices(locations).map((one) => one.destination)).toEqual([
    "house-storage:Crown Items",
    "house-storage:4677",
    "house-storage:4673",
    "house-storage:4679",
  ])
})

test("a destination finds the saved location of the chest it names", () => {
  const locations = {
    "HouseBank:5462:4678": { displayName: "Crown Items" },
    "HouseBank:5462:4677": { displayName: "Empty" },
    Bank: { displayName: "Bank" },
  }
  expect(houseStorageTarget("house-storage:Crown Items")).toBe("Crown Items")
  expect(houseBankKeyFor("house-storage:Crown Items", locations)).toBe("HouseBank:5462:4678")
  expect(houseBankKeyFor("house-storage:Alliance War", locations)).toBe(undefined)
})
