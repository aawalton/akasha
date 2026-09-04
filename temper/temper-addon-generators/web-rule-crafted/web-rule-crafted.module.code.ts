export const WEB_CRAFTED_CONDITION = `  // Crafted status — absent means not crafted (addon only sets true when crafted)
  if (conditions.crafted !== undefined) {
    const isCrafted = item.crafted === true
    if (conditions.crafted === "crafted" && !isCrafted) return false
    if (conditions.crafted === "not-crafted" && isCrafted) return false
  }`
