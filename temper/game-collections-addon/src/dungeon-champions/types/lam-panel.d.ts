interface LamDropdownWidget {
  GetControl(): Control
}

interface LamRefreshControl extends Control {
  dropdown: LamDropdownWidget
}

interface DcsSettingsPanel extends Control {
  controlsToRefresh: LamRefreshControl[]
}
