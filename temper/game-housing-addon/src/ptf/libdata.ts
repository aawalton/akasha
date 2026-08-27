import { euLibraryData } from "./data/generated/library-data.generated"
import { naLibraryData } from "./data/generated/library-data-na.generated"
import { PortToFriend } from "./state"
import type { LibraryEntry } from "./types"

function CreateEuDataList(this: void) {
  PortToFriend.libData.euData = euLibraryData
}
PortToFriend.libData.CreateEuDataList = CreateEuDataList

function CreateNaDataList(this: void) {
  PortToFriend.libData.naData = naLibraryData
}
PortToFriend.libData.CreateNaDataList = CreateNaDataList

function CreateDataList(this: void) {
  if (GetWorldName() === "EU Megaserver") {
    PortToFriend.libData.CreateEuDataList()
  } else {
    PortToFriend.libData.CreateNaDataList()
  }
}
PortToFriend.libData.CreateDataList = CreateDataList

function GetLibraryData(this: void): LibraryEntry[] {
  PortToFriend.libData.CreateDataList()
  return GetWorldName() === "EU Megaserver"
    ? PortToFriend.libData.euData
    : PortToFriend.libData.naData
}
PortToFriend.libData.GetLibraryData = GetLibraryData
