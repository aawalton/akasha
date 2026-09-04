export const BOOLEAN_TO_ON_OFF: { [onOff: string]: string } = {
  [tostring(false)]: string.upper(GetString(SI_CHECK_BUTTON_OFF)),
  [tostring(true)]: string.upper(GetString(SI_CHECK_BUTTON_ON)),
}
