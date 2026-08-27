export const WEB_STACK_FULLNESS_CONDITION = `  // Stack fullness — full ⇔ stackCount >= maxStackSize; fail-closed when either
  // signal is absent (matches the addon/CLI check-stack-fullness checker).
  if (conditions.stackFullness !== undefined) {
    if (item.stackCount === undefined || item.maxStackSize === undefined) return false
    const isFull = item.stackCount >= item.maxStackSize
    if (conditions.stackFullness === "full" && !isFull) return false
    if (conditions.stackFullness === "partial" && isFull) return false
  }`
