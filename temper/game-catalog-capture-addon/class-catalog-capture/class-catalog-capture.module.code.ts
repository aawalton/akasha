import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-globals"
import type { ClassCatalogEntry } from "@akasha/temper-capture-shapes/class-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export function collectClassCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const classes: Record<number, ClassCatalogEntry> = {}

  const numClasses = GetNumClasses()
  for (let i = 1; i <= numClasses; i++) {
    const [esoClassId, lore, , , , isSelectable] = GetClassInfo(i)
    const skillLineIds: number[] = []
    let j = 1
    while (true) {
      const skillLineId = GetSkillLineIdForClass(esoClassId, j)
      if (skillLineId === 0) break
      skillLineIds.push(skillLineId)
      j++
    }
    classes[esoClassId] = {
      esoClassId,
      lore: zo_strformat("<<1>>", lore),
      isSelectable,
      skillLineIds,
    }
  }

  savedVars.classCatalog = classes
  onComplete()
}
registerCatalogDomain({ key: "classCatalog", collect: collectClassCatalog })
