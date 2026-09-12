export function buildGetCharacterCurseState(): (
  charId: string
) => "vampire" | "werewolf" | undefined {
  const currentCharStr = tostring(GetCurrentCharacterId())
  const curseType = GetPlayerCurseType()
  let curseState: "vampire" | "werewolf" | undefined
  if (curseType === CURSE_TYPE_VAMPIRE) {
    curseState = "vampire"
  } else if (curseType === CURSE_TYPE_WEREWOLF) {
    curseState = "werewolf"
  } else {
    curseState = undefined
  }
  return (charId) => {
    if (charId !== currentCharStr) return undefined
    return curseState
  }
}
