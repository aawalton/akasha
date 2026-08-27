interface SmithingImprovementPanel {
  OnSlotChanged?: (this: void, ...args: unknown[]) => unknown
  improvementSlot: { HasItem(): boolean }
  GetRowForSelection(): unknown
  FindMaxBoostersToApply(): number | undefined
  spinner: { Activate(): void; SetValue(value: number): void }
  ClearSelections(): void
}

interface SmithingPanelWithImprovement {
  improvementPanel?: SmithingImprovementPanel
}
