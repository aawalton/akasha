export const WEB_CAN_SELL_CONDITION = `  // Can sell to merchant — item must have a positive merchant value
  if (conditions.canSell === "can-sell") {
    if ((item.merchantValue ?? 0) <= 0) return false
  }`
