import { deleteRecordKey } from "@akasha/utils-narrow/delete-record-key"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

const STRIP_KEYS = ["id", "totalXPNeeded", "totalXPProgress"] as const
const VARIANT_KEYS = ["base", "morph1", "morph2"] as const

export function stripMorphVariantFields(progress: unknown): undefined {
  if (!isObjectRecord(progress)) return
  for (const [, line] of Object.entries(progress)) {
    if (!isObjectRecord(line)) continue
    const skills = line["skills"]
    if (!isObjectRecord(skills)) continue
    for (const [, skill] of Object.entries(skills)) {
      if (!isObjectRecord(skill)) continue
      for (const variantKey of VARIANT_KEYS) {
        const variant = skill[variantKey]
        if (!isObjectRecord(variant)) continue
        for (const key of STRIP_KEYS) deleteRecordKey(variant, key)
      }
    }
  }
}
