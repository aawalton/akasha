import { expect, test } from "bun:test"
import {
  collectFloorsFor,
  decideFolderOwnership,
  decideInstallAction,
  foreignCopySatisfies,
  parseFloorFor,
} from "./folder-ownership.module.code.ts"

test("a folder that is not there is absent", () => {
  expect(decideFolderOwnership({ dirExists: false, markerPresent: undefined })).toBe("absent")
})

test("a folder carrying the marker belongs to the deploy", () => {
  expect(decideFolderOwnership({ dirExists: true, markerPresent: true })).toBe("temper-owned")
  expect(decideFolderOwnership({ dirExists: true, markerPresent: false })).toBe("foreign")
  expect(decideFolderOwnership({ dirExists: true, markerPresent: undefined })).toBe("unknown")
})

test("a floor is read only from a dependency naming the addon being weighed", () => {
  expect(parseFloorFor("LibGPS", "LibGPS>=71")).toBe(71)
  expect(parseFloorFor("LibGPS", "LibZone>=71")).toBeUndefined()
  expect(parseFloorFor("LibGPS", "LibGPS")).toBeUndefined()
  expect(parseFloorFor("LibGPS", "LibGPS<=71")).toBeUndefined()
  expect(parseFloorFor("LibGPS", "LibGPS>=v71")).toBeUndefined()
})

test("every floor the fleet declares is gathered", () => {
  expect(collectFloorsFor("LibGPS", [["LibGPS>=71"], ["LibGPS>=80", "LibZone>=3"]])).toEqual([
    71, 80,
  ])
})

test("a copy is judged against every floor", () => {
  expect(foreignCopySatisfies(80, [71, 80])).toBe(true)
  expect(foreignCopySatisfies(71, [71, 80])).toBe(false)
  expect(foreignCopySatisfies(undefined, [71])).toBeUndefined()
})

test("an absent or deploy-owned folder is installed into", () => {
  expect(decideInstallAction("absent", "A", undefined, "").action).toBe("install")
  expect(decideInstallAction("temper-owned", "A", undefined, "").action).toBe("install")
})

test("a folder somebody else wrote is left, refused, or refused on missing evidence", () => {
  expect(decideInstallAction("foreign", "A", true, "d").action).toBe("skip")
  expect(decideInstallAction("foreign", "A", false, "d").action).toBe("refuse")
  expect(decideInstallAction("foreign", "A", undefined, "d").action).toBe("refuse")
  expect(decideInstallAction("unknown", "A", undefined, "d").action).toBe("refuse")
})
