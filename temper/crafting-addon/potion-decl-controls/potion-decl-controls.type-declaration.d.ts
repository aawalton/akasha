interface TemperPotionsTitledWindow extends TopLevelWindow {
  title: LabelControl
}

declare const TemperPotions: TemperPotionsTitledWindow

declare const TemperPotionsOutput: TemperPotionsTitledWindow

declare const TemperPotionsTopLevel: TopLevelWindow

declare const TemperPotionsTooltip: TooltipControl

declare const TemperPotionsQuestWrits: TemperCraftingControl

declare const TemperPotionsAllMustCheckBox: TemperCraftingControl

declare const TemperPotionsAllMustNotCheckBox: TemperCraftingControl

declare const TemperPotionsAllMustNotCheckBoxText: LabelControl

declare const TemperPotionsOnly2: TemperCraftingControl

declare const TemperPotionsOnly2Text: LabelControl

declare const TemperPotionsOnlyReagent: TemperCraftingControl

declare const TemperPotionsOnlyReagentText: LabelControl

declare const TemperPotionsLoading: TemperCraftingControl

declare const TemperPotionsClearFilter: TemperCraftingControl

declare const TemperPotionsFavorites: TemperCraftingControl

declare const TemperPotionsLabel: LabelControl

declare const TemperPotionsOutputCombinationLabel: LabelControl

declare const TemperPotionsOutputFavorite: TemperCraftingControl

declare const TemperPotionsOutputNextButton: TemperCraftingButton

declare const TemperPotionsOutputPageLabel: LabelControl

declare const TemperPotionsOutputPreviousButton: TemperCraftingButton

declare const TemperPotionsOutputResultsBG: TemperCraftingControl

declare const TemperPotionsOutputSearchButton: TemperCraftingButton

declare const TemperPotionsOutputTraitLabel: LabelControl

declare const TemperPotionsReagentBG: TemperCraftingControl

declare const TemperPotionsReagentLabel: LabelControl

declare const TemperPotionsSearchBG: TemperCraftingControl

declare const TemperPotionsSearchButton: TemperCraftingButton

declare const TemperPotionsSolventLabel: LabelControl

declare const TemperPotionsTraitLabel1: LabelControl

declare const TemperPotionsTraitLabel2: LabelControl

declare const TemperPotionsBagButtonTexture: TextureControl

declare const TemperPotionsBankButtonTexture: TextureControl

interface Control {
  SetSimpleAnchorParent: (...args: unknown[]) => undefined
  EnableMouseButton: (button: number, enabled: boolean) => undefined
}

interface TooltipControl {
  AddHeaderLine: (...args: unknown[]) => undefined
}
