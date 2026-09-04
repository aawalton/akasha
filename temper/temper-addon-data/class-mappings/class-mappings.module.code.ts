import { classes } from "@akasha/temper-classes/character-class"
export function generateClassMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of classes.ids.entries()) {
    const cls = classes.data[id]
    if (cls === undefined) continue
    if (cls.esoClassId === 0) continue
    indexEntries.push(`  [${cls.esoClassId}]: ${i}, // ${cls.name}`)
    temperIdEntries.push(`  [${cls.esoClassId}]: "${cls.id}", // ${cls.name}`)
  }

  return `\
/**
 * Character Class Mappings (Generated)
 *
 * Maps ESO class IDs to temper indices and string IDs.
 * Source: engine/character/classes-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const CLASS_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const CLASS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getClassIndex(esoClassId: number): number {
  return CLASS_ESO_ID_TO_INDEX[esoClassId] ?? 0
}

export function getClassTemperId(esoClassId: number): string {
  return CLASS_ESO_ID_TO_TEMPER_ID[esoClassId] ?? "no-class"
}
`
}
