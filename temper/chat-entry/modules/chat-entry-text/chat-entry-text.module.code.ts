export function insertChatText(this: void, text: string): undefined {
  const chatEditControl = CHAT_SYSTEM.textEntry.editControl
  if (!chatEditControl.HasFocus()) {
    StartChatInput()
  }
  chatEditControl.InsertText(text)
}
