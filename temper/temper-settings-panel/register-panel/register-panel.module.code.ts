export interface LamRegistrar<TPanel, TControl, TOptions> {
  RegisterAddonPanel: (addonId: string, panelData: TPanel) => TControl
  RegisterOptionControls: (addonId: string, optionsTable: TOptions) => void
}

export function registerPanel<TPanel, TControl, TOptions>(
  this: void,
  lam: LamRegistrar<TPanel, TControl, TOptions>,
  addonId: string,
  panelData: TPanel,
  optionsData: TOptions
): TControl {
  const panel = lam.RegisterAddonPanel(addonId, panelData)
  lam.RegisterOptionControls(addonId, optionsData)
  return panel
}
