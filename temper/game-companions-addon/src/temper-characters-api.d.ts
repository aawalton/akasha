declare namespace TemperCharacters {
  function getSavedVariables(): {
    navigation: {
      selectedTab: string
      selectedSubTab: string
      windowPosition?: { left: number; top: number }
    }
    account: { achievements: Record<string, unknown> }
    characters: Record<string, { companionRapport?: Record<number, number> }>
  }
  function HideWindow(): void
  function ShowWindow(): void
  function ToggleWindow(): void
  function scheduleTaskAutoCompletionCheck(): void
  const TabManager: {
    RegisterExternalTab(
      tabDef: { id: string; title: string; subTabs: { id: string; title: string }[] },
      creators: Record<string, (container: Control) => Control>,
      refreshers: Record<string, () => void>
    ): void
    RefreshActivePanel(): void
    SelectTopTab(tabId: string, subTabId?: string): void
    SelectSubTab(parentTabId: string, subTabId: string): void
  }
}
