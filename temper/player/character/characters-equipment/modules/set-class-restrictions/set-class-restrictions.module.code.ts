import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { SetTemplate } from "akasha/temper/catalog/gear/equipment/modules/set-template/set-template.module.code.ts"
import { setsAll } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"

export function canClassEquipSet(set: SetTemplate, classId: ClassId | null | undefined): boolean {
  if (classId == null || classId === "no-class") return true
  const setClassId = "classId" in set ? set.classId : undefined
  return setClassId == null || setClassId === classId
}

export function getSetIdsClassCannotEquip(classId: ClassId): readonly Slug[] {
  if (classId === "no-class") return []

  return setsAll.list
    .filter((set) => "classId" in set && set.classId != null && set.classId !== classId)
    .map((set) => set.id)
}
