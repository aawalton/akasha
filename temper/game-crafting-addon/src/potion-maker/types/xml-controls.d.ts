interface TemperPotionsTitledWindow extends TopLevelWindow {
  title: LabelControl
}

declare const TemperPotions: TemperPotionsTitledWindow
declare const TemperPotionsOutput: TemperPotionsTitledWindow
declare const TemperPotionsTopLevel: TopLevelWindow
declare const TemperPotionsTooltip: TooltipControl

declare const TemperPotionsQuestWrits: Control
declare const TemperPotionsAllMustCheckBox: Control
declare const TemperPotionsAllMustNotCheckBox: Control
declare const TemperPotionsAllMustNotCheckBoxText: LabelControl
declare const TemperPotionsOnly2: Control
declare const TemperPotionsOnly2Text: LabelControl
declare const TemperPotionsOnlyReagent: Control
declare const TemperPotionsOnlyReagentText: LabelControl
declare const TemperPotionsLoading: Control
declare const TemperPotionsClearFilter: Control
declare const TemperPotionsFavorites: Control
declare const TemperPotionsLabel: LabelControl
declare const TemperPotionsOutputCombinationLabel: LabelControl
declare const TemperPotionsOutputFavorite: Control
declare const TemperPotionsOutputNextButton: ButtonControl
declare const TemperPotionsOutputPageLabel: LabelControl
declare const TemperPotionsOutputPreviousButton: ButtonControl
declare const TemperPotionsOutputResultsBG: Control
declare const TemperPotionsOutputSearchButton: ButtonControl
declare const TemperPotionsOutputTraitLabel: LabelControl
declare const TemperPotionsReagentBG: Control
declare const TemperPotionsReagentLabel: LabelControl
declare const TemperPotionsSearchBG: Control
declare const TemperPotionsSearchButton: ButtonControl
declare const TemperPotionsSolventLabel: LabelControl
declare const TemperPotionsTraitLabel1: LabelControl
declare const TemperPotionsTraitLabel2: LabelControl
declare const TemperPotionsBagButtonTexture: TextureControl
declare const TemperPotionsBankButtonTexture: TextureControl

interface Control {
  checkState?: number
  tristate?: boolean
}
