export const WEB_VALUE_CONDITIONS = `  // Combined value filter (max of market, merchant, replacement)
  if (conditions.value !== undefined) {
    const ruleValue = resolveThreshold(conditions.value)
    const cv = computeValue(item.estimatedValue, item.merchantValue, item.replacementCost)
    if (cv === undefined) {
      if (!(ruleValue === 0 && (conditions.valueOp ?? "<=") === "<=")) return false
    } else {
      const op = conditions.valueOp ?? "<="
      if (!compareWithOp(op, cv, ruleValue)) return false
    }
  }

  // Market value (TTC estimated guild store price)
  if (conditions.marketValue !== undefined) {
    const ruleMarketValue = resolveThreshold(conditions.marketValue)
    const ev = item.estimatedValue
    if (ev === undefined) {
      if (!(ruleMarketValue === 0 && (conditions.marketValueOp ?? "<=") === "<="))
        return false
    } else {
      const op = conditions.marketValueOp ?? "<="
      if (!compareWithOp(op, ev, ruleMarketValue)) return false
    }
  } else if (conditions.maxValue !== undefined || conditions.minValue !== undefined) {
    // Legacy fallback
    const ev = item.estimatedValue
    if (ev === undefined) return false
    if (conditions.maxValue !== undefined && ev > conditions.maxValue) return false
    if (conditions.minValue !== undefined && ev < conditions.minValue) return false
  }

  // Merchant value (vendor sell price)
  if (conditions.merchantValue !== undefined) {
    const ruleMerchantValue = resolveThreshold(conditions.merchantValue)
    const sellPrice = item.merchantValue ?? 0
    const op = conditions.merchantValueOp ?? "<="
    if (!compareWithOp(op, sellPrice, ruleMerchantValue)) return false
  }

  // Replacement value (TTC market price for bound items)
  if (conditions.replacementValue !== undefined) {
    const ruleReplacementValue = resolveThreshold(conditions.replacementValue)
    const rc = item.replacementCost ?? 0
    const op = conditions.replacementValueOp ?? "<="
    if (!compareWithOp(op, rc, ruleReplacementValue)) return false
  }`
