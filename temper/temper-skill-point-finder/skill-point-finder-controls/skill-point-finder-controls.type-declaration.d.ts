interface UspfTooltipData {
  tooltipText: string
}

interface UspfDataLabel extends LabelControl {
  data?: UspfTooltipData
}

interface UspfCharListControl extends Control {
  comboBox?: ComboBox
  data?: UspfTooltipData
}

declare const USPF_GUI: TopLevelWindow
declare const USPF_GUI_Header: Control
declare const USPF_GUI_Header_Title: LabelControl
declare const USPF_GUI_Header_CharList: UspfCharListControl
declare const USPF_GUI_Footer: Control
declare const USPF_GUI_Footer_CharacterTotal: UspfDataLabel
declare const USPF_GUI_Body_GSP: LabelControl
declare const USPF_GUI_Body_GSP_T: UspfDataLabel
declare const USPF_GUI_Body_GSP_ListHolder: Control
declare const USPF_GUI_Body_SQS: LabelControl
declare const USPF_GUI_Body_SQS_Z_T: UspfDataLabel
declare const USPF_GUI_Body_SQS_SL_T: UspfDataLabel
declare const USPF_GUI_Body_SQS_SS_T: UspfDataLabel
declare const USPF_GUI_Body_SQS_ListHolder: Control
declare const USPF_GUI_Body_GDQ: LabelControl
declare const USPF_GUI_Body_GDQ_T: UspfDataLabel
declare const USPF_GUI_Body_GDQ_ListHolder: Control
declare const USPF_GUI_Body_GDQ2_ListHolder: Control
declare const USPF_GUI_Body_PDGBE: LabelControl
declare const USPF_GUI_Body_PDGBE_T: UspfDataLabel
declare const USPF_GUI_Body_PDGBE_ListHolder: Control
