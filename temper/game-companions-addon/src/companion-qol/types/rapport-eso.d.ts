interface FcoSceneFragment {
  IsShowing(): boolean
}

declare const COMPANION_OVERVIEW_KEYBOARD_FRAGMENT: FcoSceneFragment

interface RapportBar {
  control: Control
  valueLabel?: LabelControl
}

interface RapportOverviewKeyboard {
  rapportBar: RapportBar
}
