import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { SetId } from "akasha/temper/temper-equipment/set-ids/set-ids.module.code.ts"
import type { SetTemplate } from "akasha/temper/temper-equipment/set-template/set-template.module.code.ts"
import { setsAll } from "../sets-all/sets-all.module.code.ts"

export function canClassEquipSet(set: SetTemplate, classId: ClassId | null | undefined): boolean {
  if (classId == null || classId === "no-class") return true
  const setClassId = "classId" in set ? set.classId : undefined
  return setClassId == null || setClassId === classId
}

export function getSetIdsClassCannotEquip(classId: ClassId): readonly SetId[] {
  if (classId === "no-class") return []

  return setsAll.list
    .filter((set) => "classId" in set && set.classId != null && set.classId !== classId)
    .map((set) => set.id)
}
