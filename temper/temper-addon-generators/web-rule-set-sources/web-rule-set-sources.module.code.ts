export const WEB_SET_SOURCE_CONDITIONS = `  // setSourceTypes — match item's setId against allowed source categories.
  // Items without a set fall through (addon's behavior: hasSet=false bypasses the check).
  // setId is captured at scan; absent on pre-existing data, in which case the check passes.
  if (conditions.setSourceTypes !== undefined && conditions.setSourceTypes.length > 0) {
    if (item.setId !== undefined) {
      const category = SET_ESO_ID_TO_CATEGORY[item.setId] ?? "no-type"
      if (!conditions.setSourceTypes.includes(category)) return false
    }
  }`
