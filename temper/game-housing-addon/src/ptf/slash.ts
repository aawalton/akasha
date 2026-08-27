import { PortToFriend } from "./state"

interface HouseControls {
  editbox: EditControl
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

function ParseCmd(this: void, cmd: string, param: string): LuaMultiReturn<[string, string]> {
  param = zo_strtrim(param)
  cmd = zo_strtrim(cmd)

  const [cmdIndex] = string.find(param, " ")
  if (cmdIndex !== undefined) {
    cmd = zo_strtrim(string.sub(param, 1, cmdIndex))
    param = zo_strtrim(string.sub(param, cmdIndex + 1))
  } else {
    cmd = param
    param = ""
  }
  return $multi(cmd, param)
}
PortToFriend.ParseCmd = ParseCmd

function PortToMainResidence(this: void): undefined {
  const house = asHouseControls(PortToFriend.controls.house)
  let name = house.editbox.GetText()
  if (
    string.lower(name) === string.lower(GetUnitName("player")) ||
    string.lower(name) === string.lower(GetDisplayName()) ||
    name === undefined ||
    zo_strtrim(name) === ""
  ) {
    name = GetDisplayName()
  }
  PortToFriend.JumpToDefaultHouse(name)
}
PortToFriend.PortToMainResidence = PortToMainResidence

function JumpToDefaultHouse(this: void, player: string): undefined {
  if (player !== undefined && player !== "") {
    if (player === GetDisplayName() || player === undefined || zo_strtrim(player) === "") {
    } else {
      JumpToHouse(player)
    }
  }
}
PortToFriend.JumpToDefaultHouse = JumpToDefaultHouse
