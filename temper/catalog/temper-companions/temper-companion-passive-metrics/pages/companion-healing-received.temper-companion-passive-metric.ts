import type { TemperCompanionPassiveMetric } from "akasha/temper/catalog/temper-companions/temper-companion-passive-metrics/temper-companion-passive-metric.page-type.types.ts"

export const companionHealingReceived = {
  id: "01a05fcd-70f9-76b4-9271-d4a61f7fb768",
  type: "temper-companion-passive-metric",
  slug: "companion-healing-received",
  key: "companion-healing-received",
  title: "Healing Received",
} as const satisfies TemperCompanionPassiveMetric
