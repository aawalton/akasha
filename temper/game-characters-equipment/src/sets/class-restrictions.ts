import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SetsAll, SetsAllId } from "./sets-all-data"
import { setsAll } from "./sets-all-data"

export function canClassEquipSet(set: SetsAll, classId: ClassId | null | undefined): boolean {
  if (classId == null || classId === "no-class") return true
  const setClassId = "classId" in set ? set.classId : undefined
  return setClassId == null || setClassId === classId
}

export function getSetIdsClassCannotEquip(classId: ClassId): readonly SetsAllId[] {
  if (classId === "no-class") return []

  return setsAll.list
    .filter((set) => "classId" in set && set.classId != null && set.classId !== classId)
    .map((set) => set.id)
}
