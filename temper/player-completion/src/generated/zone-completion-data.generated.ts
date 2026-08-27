/**
 * Zone Completion Static Data (Generated)
 *
 * 42 zones, 460 completion types, 3795 activities
 *
 * apiVersion: eso.live.12.0.6.3274791
 * DO NOT EDIT — regenerate with: ops temper catalog generate zone-completion
 */

interface ZoneCompletionActivityEntry {
  activityIndex: number
  activityId: number
  name: string
}

interface ZoneCompletionTypeEntry {
  completionType: number
  label: string
  activities: readonly ZoneCompletionActivityEntry[]
}

interface ZoneCompletionZoneEntry {
  zoneId: number
  name: string
  completionTypes: readonly ZoneCompletionTypeEntry[]
}

export const zoneCompletionData: ZoneCompletionZoneEntry[] = [
  {
    "zoneId": 104,
    "name": "Alik'r Desert",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2130,
            "name": "Rise of the Dead"
          },
          {
            "activityIndex": 2,
            "activityId": 2146,
            "name": "The Impervious Vault"
          },
          {
            "activityIndex": 3,
            "activityId": 4672,
            "name": "Morwha's Curse"
          },
          {
            "activityIndex": 4,
            "activityId": 4686,
            "name": "The Initiation"
          },
          {
            "activityIndex": 5,
            "activityId": 3190,
            "name": "Ash'abah Rising"
          },
          {
            "activityIndex": 6,
            "activityId": 2184,
            "name": "Tu'whacca's Breath"
          },
          {
            "activityIndex": 7,
            "activityId": 2192,
            "name": "A Reckoning with Uwafa"
          },
          {
            "activityIndex": 8,
            "activityId": 2222,
            "name": "Alasan's Plot"
          },
          {
            "activityIndex": 9,
            "activityId": 2997,
            "name": "Amputating the Hand"
          },
          {
            "activityIndex": 10,
            "activityId": 2998,
            "name": "Restoring the Ansei Wards"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 184,
            "name": "Sentinel Docks"
          },
          {
            "activityIndex": 2,
            "activityId": 190,
            "name": "Ancestor's Landing"
          },
          {
            "activityIndex": 3,
            "activityId": 193,
            "name": "Rain Catcher Fields"
          },
          {
            "activityIndex": 4,
            "activityId": 191,
            "name": "Morwha's Bounty"
          },
          {
            "activityIndex": 5,
            "activityId": 194,
            "name": "Tu'whacca's Throne"
          },
          {
            "activityIndex": 6,
            "activityId": 196,
            "name": "Kulati Mines"
          },
          {
            "activityIndex": 7,
            "activityId": 200,
            "name": "Leki's Blade"
          },
          {
            "activityIndex": 8,
            "activityId": 202,
            "name": "Sep's Spine"
          },
          {
            "activityIndex": 9,
            "activityId": 203,
            "name": "Bergama"
          },
          {
            "activityIndex": 10,
            "activityId": 205,
            "name": "Tava's Blessing"
          },
          {
            "activityIndex": 11,
            "activityId": 225,
            "name": "HoonDing's Watch"
          },
          {
            "activityIndex": 12,
            "activityId": 248,
            "name": "Satakalaam"
          },
          {
            "activityIndex": 13,
            "activityId": 251,
            "name": "Kozanset"
          },
          {
            "activityIndex": 14,
            "activityId": 256,
            "name": "Sentinel"
          },
          {
            "activityIndex": 15,
            "activityId": 257,
            "name": "Salas En"
          },
          {
            "activityIndex": 16,
            "activityId": 263,
            "name": "Motalion Necropolis"
          },
          {
            "activityIndex": 17,
            "activityId": 887,
            "name": "Ogre's Bluff"
          },
          {
            "activityIndex": 18,
            "activityId": 1370,
            "name": "Saltwalker Militia Camp"
          },
          {
            "activityIndex": 19,
            "activityId": 915,
            "name": "Tears of the Dishonored"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 59,
            "name": "Alik'r Desert Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 707,
            "name": "Na-Totambu Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 396,
            "name": "Lost City Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 474,
            "name": "Alik'r Desert Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 428,
            "name": "Morwha's Bounty Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 429,
            "name": "Sentinel Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 430,
            "name": "Bergama Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 431,
            "name": "Leki's Blade Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 432,
            "name": "Satakalaam Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 779,
            "name": "Divad's Chagrin Mine Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 780,
            "name": "Kulati Mines Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 781,
            "name": "Aswala Stables Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 782,
            "name": "Sep's Spine Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 888,
            "name": "Shrikes' Aerie Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 889,
            "name": "HoonDing's Watch Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 965,
            "name": "Goat's Head Oasis Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 455,
            "name": "Santaki"
          },
          {
            "activityIndex": 2,
            "activityId": 456,
            "name": "Divad's Chagrin Mine"
          },
          {
            "activityIndex": 3,
            "activityId": 457,
            "name": "Aldunz"
          },
          {
            "activityIndex": 4,
            "activityId": 458,
            "name": "Coldrock Diggings"
          },
          {
            "activityIndex": 5,
            "activityId": 460,
            "name": "Sandblown Mine"
          },
          {
            "activityIndex": 6,
            "activityId": 461,
            "name": "Yldzuun"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 227,
            "name": "Sentinel of a domed tower."
          },
          {
            "activityIndex": 2,
            "activityId": 228,
            "name": "Shedding shame in the oasis."
          },
          {
            "activityIndex": 3,
            "activityId": 229,
            "name": "Across the ruin from the Warrior."
          },
          {
            "activityIndex": 4,
            "activityId": 230,
            "name": "Stored on a Bergama roof."
          },
          {
            "activityIndex": 5,
            "activityId": 231,
            "name": "Walltop view of the broken blade."
          },
          {
            "activityIndex": 6,
            "activityId": 232,
            "name": "Beside a drydocked stern."
          },
          {
            "activityIndex": 7,
            "activityId": 233,
            "name": "Left out in the open by Kozanset Mages."
          },
          {
            "activityIndex": 8,
            "activityId": 234,
            "name": "Near a paid feather-finder north of Kozanset."
          },
          {
            "activityIndex": 9,
            "activityId": 235,
            "name": "Tears shed for a toppled spire."
          },
          {
            "activityIndex": 10,
            "activityId": 236,
            "name": "Second stop on her search for the Pearl."
          },
          {
            "activityIndex": 11,
            "activityId": 237,
            "name": "Buried respite from desert heat."
          },
          {
            "activityIndex": 12,
            "activityId": 238,
            "name": "Dig deep, don't be embarrassed."
          },
          {
            "activityIndex": 13,
            "activityId": 239,
            "name": "Blown down a mine shaft."
          },
          {
            "activityIndex": 14,
            "activityId": 240,
            "name": "A caravan's wreckage marks the path."
          },
          {
            "activityIndex": 15,
            "activityId": 241,
            "name": "Trapped within the steam closet."
          },
          {
            "activityIndex": 16,
            "activityId": 242,
            "name": "Monumental find in the Lost City."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 896,
            "name": "Myrkwasa Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 897,
            "name": "Hollow Waste Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 898,
            "name": "Tigonus Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1233,
            "name": "Lost Caravan"
          },
          {
            "activityIndex": 2,
            "activityId": 1234,
            "name": "Lesser Circle"
          },
          {
            "activityIndex": 3,
            "activityId": 1235,
            "name": "Giant Camp"
          },
          {
            "activityIndex": 4,
            "activityId": 1236,
            "name": "Forsaken Hearts Cave"
          },
          {
            "activityIndex": 5,
            "activityId": 1237,
            "name": "Hag Camp"
          },
          {
            "activityIndex": 6,
            "activityId": 1238,
            "name": "King's Rest"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1371,
            "name": "Aswala's Remembrance"
          },
          {
            "activityIndex": 2,
            "activityId": 1372,
            "name": "Ragnthar"
          },
          {
            "activityIndex": 3,
            "activityId": 1374,
            "name": "Easterly Aerie"
          },
          {
            "activityIndex": 4,
            "activityId": 1376,
            "name": "Hatiha's Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 1378,
            "name": "Na-Totambu's Landing"
          },
          {
            "activityIndex": 6,
            "activityId": 1380,
            "name": "Duneripper Downs"
          },
          {
            "activityIndex": 7,
            "activityId": 1381,
            "name": "Wayfarer's Wharf"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 52,
            "name": "Redguards, History and Heroes, V. 1"
          },
          {
            "activityIndex": 2,
            "activityId": 53,
            "name": "Redguards, History and Heroes, V. 2"
          },
          {
            "activityIndex": 3,
            "activityId": 54,
            "name": "Redguards, History and Heroes, V. 3"
          },
          {
            "activityIndex": 4,
            "activityId": 55,
            "name": "Tu'whacca's Prayer"
          },
          {
            "activityIndex": 5,
            "activityId": 56,
            "name": "Varieties of Faith, Crown Redguards"
          },
          {
            "activityIndex": 6,
            "activityId": 57,
            "name": "Varieties of Faith, The Forebears"
          },
          {
            "activityIndex": 7,
            "activityId": 58,
            "name": "Motalion Necropolis Report"
          },
          {
            "activityIndex": 8,
            "activityId": 59,
            "name": "The Salas En Expedition"
          },
          {
            "activityIndex": 9,
            "activityId": 60,
            "name": "Sentinel, the Jewel of Alik'r"
          },
          {
            "activityIndex": 10,
            "activityId": 61,
            "name": "Sacrilege and Mayhem in the Alik'r"
          },
          {
            "activityIndex": 11,
            "activityId": 169,
            "name": "Opusculus Lamae Bal ta Mezzamortie"
          },
          {
            "activityIndex": 12,
            "activityId": 170,
            "name": "The Totems of Hircine"
          },
          {
            "activityIndex": 13,
            "activityId": 203,
            "name": "Ancient Scrolls of the Dwemer I-B"
          },
          {
            "activityIndex": 14,
            "activityId": 204,
            "name": "Guylaine's Dwemer Architecture"
          },
          {
            "activityIndex": 15,
            "activityId": 205,
            "name": "Ancient Scrolls of the Dwemer VIII"
          },
          {
            "activityIndex": 16,
            "activityId": 210,
            "name": "An Accounting of the Elder Scrolls"
          },
          {
            "activityIndex": 17,
            "activityId": 211,
            "name": "The Adabal-a"
          },
          {
            "activityIndex": 18,
            "activityId": 212,
            "name": "The Amulet of Kings"
          },
          {
            "activityIndex": 19,
            "activityId": 213,
            "name": "The Cleansing of the Fane"
          },
          {
            "activityIndex": 20,
            "activityId": 214,
            "name": "The Exclusionary Mandates"
          },
          {
            "activityIndex": 21,
            "activityId": 215,
            "name": "The Last King of the Ayleids"
          },
          {
            "activityIndex": 22,
            "activityId": 216,
            "name": "The Order of the Ancestor Moth"
          },
          {
            "activityIndex": 23,
            "activityId": 217,
            "name": "Tamrielic Artifacts, Part One"
          },
          {
            "activityIndex": 24,
            "activityId": 218,
            "name": "Tamrielic Artifacts, Part Two"
          },
          {
            "activityIndex": 25,
            "activityId": 219,
            "name": "Tamrielic Artifacts, Part Three"
          },
          {
            "activityIndex": 26,
            "activityId": 225,
            "name": "The Lusty Argonian Maid, Vol. 2"
          },
          {
            "activityIndex": 27,
            "activityId": 263,
            "name": "The Battle of Glenumbria Moors"
          },
          {
            "activityIndex": 28,
            "activityId": 264,
            "name": "The Book of Dawn and Dusk"
          },
          {
            "activityIndex": 29,
            "activityId": 265,
            "name": "The Cantatas of Vivec"
          },
          {
            "activityIndex": 30,
            "activityId": 266,
            "name": "The Five Far Stars"
          },
          {
            "activityIndex": 31,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          },
          {
            "activityIndex": 32,
            "activityId": 268,
            "name": "Ode to the Tundrastriders"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 899,
            "name": "The Warrior"
          },
          {
            "activityIndex": 2,
            "activityId": 900,
            "name": "The Ritual"
          },
          {
            "activityIndex": 3,
            "activityId": 901,
            "name": "The Thief"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 480,
            "name": "Lost City of the Na-Totambu"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1373,
            "name": "Rkulftzel"
          },
          {
            "activityIndex": 2,
            "activityId": 1375,
            "name": "Alezer Kotu"
          },
          {
            "activityIndex": 3,
            "activityId": 1379,
            "name": "Artisan's Oasis"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1413,
    "name": "Apocrypha",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6971,
            "name": "Fate's Proxy"
          },
          {
            "activityIndex": 2,
            "activityId": 6972,
            "name": "Keeper of the Fate"
          },
          {
            "activityIndex": 3,
            "activityId": 6973,
            "name": "Spirit of Fate"
          },
          {
            "activityIndex": 4,
            "activityId": 6974,
            "name": "Fate's Lost Dream"
          },
          {
            "activityIndex": 5,
            "activityId": 6975,
            "name": "A Hidden Fate"
          },
          {
            "activityIndex": 6,
            "activityId": 6976,
            "name": "Conclave of Fate"
          },
          {
            "activityIndex": 7,
            "activityId": 7025,
            "name": "A Calamity of Fate"
          },
          {
            "activityIndex": 8,
            "activityId": 6991,
            "name": "An Unhealthy Fate"
          },
          {
            "activityIndex": 9,
            "activityId": 6977,
            "name": "Chronicle of Fate"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2652,
            "name": "Rectory Corporea"
          },
          {
            "activityIndex": 2,
            "activityId": 2651,
            "name": "The Feral Gallery"
          },
          {
            "activityIndex": 3,
            "activityId": 2649,
            "name": "Cenotaph of the Remnants"
          },
          {
            "activityIndex": 4,
            "activityId": 2654,
            "name": "The Sidereal Cloisters"
          },
          {
            "activityIndex": 5,
            "activityId": 2653,
            "name": "The Ravening Morass"
          },
          {
            "activityIndex": 6,
            "activityId": 2647,
            "name": "Ald Isra"
          },
          {
            "activityIndex": 7,
            "activityId": 2650,
            "name": "Kemel-Ze"
          },
          {
            "activityIndex": 8,
            "activityId": 2655,
            "name": "Sailenmora"
          },
          {
            "activityIndex": 9,
            "activityId": 2656,
            "name": "Tel Dreloth"
          },
          {
            "activityIndex": 10,
            "activityId": 2658,
            "name": "Necrom"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3637,
            "name": "Necrom Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 3739,
            "name": "Keeper of the Bastion"
          },
          {
            "activityIndex": 3,
            "activityId": 3675,
            "name": "Grave Discoveries"
          },
          {
            "activityIndex": 4,
            "activityId": 3731,
            "name": "Savior of Necrom"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2682,
            "name": "Still Shallows Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2681,
            "name": "Soundless Bight Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2683,
            "name": "Cipher's Midden Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2700,
            "name": "Speiran Tarn Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2701,
            "name": "Writhing Wastes Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2702,
            "name": "Tranquil Catalog Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2703,
            "name": "Apogee Nadir Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2704,
            "name": "Forlorn Palisades Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2705,
            "name": "Feral Gallery Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2676,
            "name": "Necrom Outskirts Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2677,
            "name": "Necrom Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2678,
            "name": "Fungal Lowlands Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 2679,
            "name": "Ald Isra Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 2680,
            "name": "Padomaic Crest Wayshrine"
          },
          {
            "activityIndex": 15,
            "activityId": 2708,
            "name": "Great Arm Wayshrine"
          },
          {
            "activityIndex": 16,
            "activityId": 2710,
            "name": "Alavelis Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2643,
            "name": "Quires Wind"
          },
          {
            "activityIndex": 2,
            "activityId": 2644,
            "name": "The Disquiet Study"
          },
          {
            "activityIndex": 3,
            "activityId": 2646,
            "name": "Apogee of the Tormenting Eye"
          },
          {
            "activityIndex": 4,
            "activityId": 2645,
            "name": "Fathoms Drift"
          },
          {
            "activityIndex": 5,
            "activityId": 2641,
            "name": "Anchre Egg Mine"
          },
          {
            "activityIndex": 6,
            "activityId": 2642,
            "name": "Camonnaruhn"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 528,
            "name": "Tickling the palm of a mountainous hand."
          },
          {
            "activityIndex": 2,
            "activityId": 529,
            "name": "Near an ancient pillar south of Kemel-Ze."
          },
          {
            "activityIndex": 3,
            "activityId": 530,
            "name": "Near the dock, east of the glass mine."
          },
          {
            "activityIndex": 4,
            "activityId": 531,
            "name": "Among craggy rocks on the water's edge, north of Tel Dreloth."
          },
          {
            "activityIndex": 5,
            "activityId": 532,
            "name": "At the foot of the Endless Library's climbing mire."
          },
          {
            "activityIndex": 6,
            "activityId": 533,
            "name": "On the deck of a ship overlooking the Ichor Sea."
          },
          {
            "activityIndex": 7,
            "activityId": 534,
            "name": "In a dark corner of the echoing caves that divide Apocrypha."
          },
          {
            "activityIndex": 8,
            "activityId": 535,
            "name": "Overlooking inky waters betwixt quag and acropolis."
          },
          {
            "activityIndex": 9,
            "activityId": 536,
            "name": "Atop a stone helix east of the Tormenting Eye."
          },
          {
            "activityIndex": 10,
            "activityId": 537,
            "name": "Atop a cliff overlooking Chthon Plaza and the Fallen Hues."
          },
          {
            "activityIndex": 11,
            "activityId": 538,
            "name": "On a platform of ripped and ravaged books in the Underweave."
          },
          {
            "activityIndex": 12,
            "activityId": 539,
            "name": "On the scaffolding high above Gorne's north-central courtyard."
          },
          {
            "activityIndex": 13,
            "activityId": 540,
            "name": "Among the eggs of Anchre, beyond a dead and rotting tree."
          },
          {
            "activityIndex": 14,
            "activityId": 541,
            "name": "Nestled among the highest northern point in a disquiet study."
          },
          {
            "activityIndex": 15,
            "activityId": 542,
            "name": "In Quires Wind, just beyond the gaze of Mora's searching eye."
          },
          {
            "activityIndex": 16,
            "activityId": 543,
            "name": "On a prow pointed to the sky, among the ghosts of voyages past."
          },
          {
            "activityIndex": 17,
            "activityId": 544,
            "name": "Atop the central scaffolding in a Dunmer crime syndicate lair."
          },
          {
            "activityIndex": 18,
            "activityId": 545,
            "name": "Beyond the central arches, where the Tormenting Eye was shelved."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2664,
            "name": "Libram Cathedral"
          },
          {
            "activityIndex": 2,
            "activityId": 2666,
            "name": "Deepreave Quag"
          },
          {
            "activityIndex": 3,
            "activityId": 2665,
            "name": "Runemaster's Acropolis"
          },
          {
            "activityIndex": 4,
            "activityId": 2667,
            "name": "Chthon Plaza"
          },
          {
            "activityIndex": 5,
            "activityId": 2662,
            "name": "Clamorclap Bowl"
          },
          {
            "activityIndex": 6,
            "activityId": 2663,
            "name": "Nightmare Den"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2692,
            "name": "Fractured Monolith"
          },
          {
            "activityIndex": 2,
            "activityId": 2712,
            "name": "Syzygial Rostrum"
          },
          {
            "activityIndex": 3,
            "activityId": 2713,
            "name": "Study of the Lost Cipher"
          },
          {
            "activityIndex": 4,
            "activityId": 2714,
            "name": "Altar of the One Who Knows"
          },
          {
            "activityIndex": 5,
            "activityId": 2684,
            "name": "Tomb of the Nameless Master"
          },
          {
            "activityIndex": 6,
            "activityId": 2711,
            "name": "House Dres Encampment"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 163,
            "name": "Aedra and Daedra"
          },
          {
            "activityIndex": 2,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 3,
            "activityId": 168,
            "name": "Modern Heretics"
          },
          {
            "activityIndex": 4,
            "activityId": 171,
            "name": "Fragmentae Abyssum Hermaeus Morus"
          },
          {
            "activityIndex": 5,
            "activityId": 190,
            "name": "Where Magical Paths Meet"
          },
          {
            "activityIndex": 6,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 7,
            "activityId": 311,
            "name": "Ancestors and the Dunmer (Abridged)"
          },
          {
            "activityIndex": 8,
            "activityId": 313,
            "name": "The Great Houses and Their Uses"
          },
          {
            "activityIndex": 9,
            "activityId": 317,
            "name": "Mottos of the Dunmeri Great Houses"
          },
          {
            "activityIndex": 10,
            "activityId": 578,
            "name": "Sanctioned Murder"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2669,
            "name": "The Underweave"
          },
          {
            "activityIndex": 2,
            "activityId": 2668,
            "name": "Gorne"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2661,
            "name": "Versicolor Carrels"
          },
          {
            "activityIndex": 2,
            "activityId": 2660,
            "name": "Artisan's Hermitage"
          },
          {
            "activityIndex": 3,
            "activityId": 2659,
            "name": "Tel Hlurag Ven"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 381,
    "name": "Auridon",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4255,
            "name": "Ensuring Security"
          },
          {
            "activityIndex": 2,
            "activityId": 4256,
            "name": "A Hostile Situation"
          },
          {
            "activityIndex": 3,
            "activityId": 4217,
            "name": "In the Name of the Queen"
          },
          {
            "activityIndex": 4,
            "activityId": 4222,
            "name": "Rites of the Queen"
          },
          {
            "activityIndex": 5,
            "activityId": 4293,
            "name": "Putting the Pieces Together"
          },
          {
            "activityIndex": 6,
            "activityId": 4294,
            "name": "The Unveiling"
          },
          {
            "activityIndex": 7,
            "activityId": 4330,
            "name": "Lifting the Veil"
          },
          {
            "activityIndex": 8,
            "activityId": 4331,
            "name": "Wearing the Veil"
          },
          {
            "activityIndex": 9,
            "activityId": 4345,
            "name": "The Veil Falls"
          },
          {
            "activityIndex": 10,
            "activityId": 4355,
            "name": "Through the Ashes"
          },
          {
            "activityIndex": 11,
            "activityId": 4260,
            "name": "Breaking the Barrier"
          },
          {
            "activityIndex": 12,
            "activityId": 4261,
            "name": "Sever All Ties"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 631,
            "name": "Ezduiin"
          },
          {
            "activityIndex": 2,
            "activityId": 653,
            "name": "Tanzelwil"
          },
          {
            "activityIndex": 3,
            "activityId": 658,
            "name": "South Beacon"
          },
          {
            "activityIndex": 4,
            "activityId": 667,
            "name": "Glister Vale"
          },
          {
            "activityIndex": 5,
            "activityId": 646,
            "name": "Silsailen"
          },
          {
            "activityIndex": 6,
            "activityId": 678,
            "name": "Firsthold"
          },
          {
            "activityIndex": 7,
            "activityId": 679,
            "name": "Phaer"
          },
          {
            "activityIndex": 8,
            "activityId": 684,
            "name": "Shattered Grove"
          },
          {
            "activityIndex": 9,
            "activityId": 686,
            "name": "North Beacon"
          },
          {
            "activityIndex": 10,
            "activityId": 689,
            "name": "Vulkhel Guard"
          },
          {
            "activityIndex": 11,
            "activityId": 691,
            "name": "Torinaan"
          },
          {
            "activityIndex": 12,
            "activityId": 716,
            "name": "Mathiisen"
          },
          {
            "activityIndex": 13,
            "activityId": 724,
            "name": "Greenwater Cove"
          },
          {
            "activityIndex": 14,
            "activityId": 740,
            "name": "Quendeluun"
          },
          {
            "activityIndex": 15,
            "activityId": 741,
            "name": "College of Aldmeri Propriety"
          },
          {
            "activityIndex": 16,
            "activityId": 754,
            "name": "Dawnbreak"
          },
          {
            "activityIndex": 17,
            "activityId": 757,
            "name": "Castle Rilis"
          },
          {
            "activityIndex": 18,
            "activityId": 721,
            "name": "Skywatch"
          },
          {
            "activityIndex": 19,
            "activityId": 2920,
            "name": "Shrine of Lamae Bal"
          },
          {
            "activityIndex": 20,
            "activityId": 2921,
            "name": "Shrine of Hircine"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 604,
            "name": "Auridon Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 468,
            "name": "Toothmaul Gully Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 390,
            "name": "Toothmaul Gully Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 483,
            "name": "Auridon Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 719,
            "name": "Vulkhel Guard Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 727,
            "name": "Phaer Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 728,
            "name": "Tanzelwil Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 729,
            "name": "Firsthold Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 730,
            "name": "Mathiisen Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 731,
            "name": "Skywatch Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 732,
            "name": "Quendeluun Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 733,
            "name": "College Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 734,
            "name": "Greenwater Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 752,
            "name": "Windy Glade Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 669,
            "name": "Del's Claim"
          },
          {
            "activityIndex": 2,
            "activityId": 670,
            "name": "Ondil"
          },
          {
            "activityIndex": 3,
            "activityId": 671,
            "name": "Entila's Folly"
          },
          {
            "activityIndex": 4,
            "activityId": 674,
            "name": "Wansalen"
          },
          {
            "activityIndex": 5,
            "activityId": 675,
            "name": "Mehrunes' Spite"
          },
          {
            "activityIndex": 6,
            "activityId": 676,
            "name": "Bewan"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 93,
            "name": "A landing of noble's blood."
          },
          {
            "activityIndex": 2,
            "activityId": 94,
            "name": "Adorns Valano's terrace."
          },
          {
            "activityIndex": 3,
            "activityId": 95,
            "name": "Offered to appease riled ancestors."
          },
          {
            "activityIndex": 4,
            "activityId": 96,
            "name": "Watching the sky in a tower of swords."
          },
          {
            "activityIndex": 5,
            "activityId": 97,
            "name": "Between cursed ruin and shrine."
          },
          {
            "activityIndex": 6,
            "activityId": 98,
            "name": "Near Merormo's refreshment."
          },
          {
            "activityIndex": 7,
            "activityId": 99,
            "name": "Contemplation's overlook."
          },
          {
            "activityIndex": 8,
            "activityId": 100,
            "name": "Up and west in the broken dawn."
          },
          {
            "activityIndex": 9,
            "activityId": 101,
            "name": "Gleaming beacon, ship-guide."
          },
          {
            "activityIndex": 10,
            "activityId": 102,
            "name": "Ancient chamber of golden glow."
          },
          {
            "activityIndex": 11,
            "activityId": 103,
            "name": "The Heritance stakes this claim."
          },
          {
            "activityIndex": 12,
            "activityId": 104,
            "name": "Near the folly's end."
          },
          {
            "activityIndex": 13,
            "activityId": 105,
            "name": "Held in a corner by the House of Troubles."
          },
          {
            "activityIndex": 14,
            "activityId": 106,
            "name": "Blood-drained thralls stumble past."
          },
          {
            "activityIndex": 15,
            "activityId": 107,
            "name": "Corpses from another age walk here."
          },
          {
            "activityIndex": 16,
            "activityId": 108,
            "name": "Hidden home in the gully's wall."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 771,
            "name": "Iluvamir Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 772,
            "name": "Calambar Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 773,
            "name": "Vafe Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1153,
            "name": "Soulfire Plateau"
          },
          {
            "activityIndex": 2,
            "activityId": 1154,
            "name": "Seaside Scarp Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 1155,
            "name": "Wreck of the Raptor"
          },
          {
            "activityIndex": 4,
            "activityId": 1156,
            "name": "Heretic's Summons"
          },
          {
            "activityIndex": 5,
            "activityId": 1157,
            "name": "Nestmother's Den"
          },
          {
            "activityIndex": 6,
            "activityId": 1158,
            "name": "Heritance Proving Ground"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1252,
            "name": "Maormer Invasion Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1254,
            "name": "Buraniim Isle"
          },
          {
            "activityIndex": 3,
            "activityId": 1255,
            "name": "Errinorne Isle"
          },
          {
            "activityIndex": 4,
            "activityId": 1256,
            "name": "Nine-Prow Landing"
          },
          {
            "activityIndex": 5,
            "activityId": 1257,
            "name": "Isle of Contemplation"
          },
          {
            "activityIndex": 6,
            "activityId": 1260,
            "name": "Monkey's Rest"
          },
          {
            "activityIndex": 7,
            "activityId": 1261,
            "name": "Smuggler's Cove"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 163,
            "name": "Aedra and Daedra"
          },
          {
            "activityIndex": 2,
            "activityId": 164,
            "name": "Boethiah's Proving"
          },
          {
            "activityIndex": 3,
            "activityId": 153,
            "name": "Galerion the Mystic"
          },
          {
            "activityIndex": 4,
            "activityId": 154,
            "name": "Great Harbingers of the Companions"
          },
          {
            "activityIndex": 5,
            "activityId": 155,
            "name": "The Illusion of Death"
          },
          {
            "activityIndex": 6,
            "activityId": 156,
            "name": "Jorunn the Skald-King"
          },
          {
            "activityIndex": 7,
            "activityId": 157,
            "name": "Triumphs of a Monarch, Ch. 3"
          },
          {
            "activityIndex": 8,
            "activityId": 158,
            "name": "Triumphs of a Monarch, Ch. 6"
          },
          {
            "activityIndex": 9,
            "activityId": 159,
            "name": "Triumphs of a Monarch, Ch. 10"
          },
          {
            "activityIndex": 10,
            "activityId": 160,
            "name": "Trials of Saint Alessia"
          },
          {
            "activityIndex": 11,
            "activityId": 173,
            "name": "The Anuad Paraphrased"
          },
          {
            "activityIndex": 12,
            "activityId": 174,
            "name": "The Lunar Lorkhan"
          },
          {
            "activityIndex": 13,
            "activityId": 175,
            "name": "Monomyth: Dragon God & Missing God"
          },
          {
            "activityIndex": 14,
            "activityId": 193,
            "name": "Ancient Scrolls of the Dwemer I-A"
          },
          {
            "activityIndex": 15,
            "activityId": 195,
            "name": "Ancient Scrolls of the Dwemer II"
          },
          {
            "activityIndex": 16,
            "activityId": 196,
            "name": "Ancient Scrolls of the Dwemer III"
          },
          {
            "activityIndex": 17,
            "activityId": 273,
            "name": "Ayleid Inscriptions Translated"
          },
          {
            "activityIndex": 18,
            "activityId": 274,
            "name": "Frontier, Conquest"
          },
          {
            "activityIndex": 19,
            "activityId": 275,
            "name": "History of the Fighters Guild Pt. 1"
          },
          {
            "activityIndex": 20,
            "activityId": 276,
            "name": "History of the Fighters Guild Pt. 2"
          },
          {
            "activityIndex": 21,
            "activityId": 277,
            "name": "Origin of the Mages Guild"
          },
          {
            "activityIndex": 22,
            "activityId": 897,
            "name": "Crimes of the Daggerfall Covenant"
          },
          {
            "activityIndex": 23,
            "activityId": 898,
            "name": "Regarding the Ebonheart Pact"
          },
          {
            "activityIndex": 24,
            "activityId": 899,
            "name": "The Lay of Firsthold"
          },
          {
            "activityIndex": 25,
            "activityId": 900,
            "name": "Varieties of Faith: The High Elves"
          },
          {
            "activityIndex": 26,
            "activityId": 905,
            "name": "Why Don the Veil?"
          },
          {
            "activityIndex": 27,
            "activityId": 906,
            "name": "Fang of the Sea Vipers"
          },
          {
            "activityIndex": 28,
            "activityId": 907,
            "name": "The Rise of Queen Ayrenn"
          },
          {
            "activityIndex": 29,
            "activityId": 908,
            "name": "Kinlord Rilis and the Mages Guild"
          },
          {
            "activityIndex": 30,
            "activityId": 909,
            "name": "Life in the Eagle's Shadow"
          },
          {
            "activityIndex": 31,
            "activityId": 910,
            "name": "Thalmor Handbill"
          },
          {
            "activityIndex": 32,
            "activityId": 189,
            "name": "The Binding Stone"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 677,
            "name": "The Lady"
          },
          {
            "activityIndex": 2,
            "activityId": 725,
            "name": "The Lover"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 792,
            "name": "Toothmaul Gully"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1253,
            "name": "Hightide Keep"
          },
          {
            "activityIndex": 2,
            "activityId": 1258,
            "name": "Beacon Falls"
          },
          {
            "activityIndex": 3,
            "activityId": 1259,
            "name": "Eastshore Islets Camp"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 281,
    "name": "Bal Foyen",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4023,
            "name": "If By Sea"
          },
          {
            "activityIndex": 2,
            "activityId": 4041,
            "name": "Crossroads"
          },
          {
            "activityIndex": 3,
            "activityId": 4028,
            "name": "Breaking the Tide"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 558,
            "name": "Dhalmora"
          },
          {
            "activityIndex": 2,
            "activityId": 1141,
            "name": "Bal Foyen Dockyards"
          },
          {
            "activityIndex": 3,
            "activityId": 1140,
            "name": "Fort Zeren"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 559,
            "name": "Dhalmora Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 750,
            "name": "Fort Zeren Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 751,
            "name": "Foyen Docks Wayshrine"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4,
            "name": "Hidden near the highest hut."
          },
          {
            "activityIndex": 2,
            "activityId": 5,
            "name": "In the fort, just around the way."
          },
          {
            "activityIndex": 3,
            "activityId": 6,
            "name": "About to set sail."
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1285,
            "name": "Hidden Dagger Landing Site"
          },
          {
            "activityIndex": 2,
            "activityId": 1286,
            "name": "Plantation Point Overlook"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 92,
    "name": "Bangkorai",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1799,
            "name": "A City in Black"
          },
          {
            "activityIndex": 2,
            "activityId": 3280,
            "name": "Imperial Infiltration"
          },
          {
            "activityIndex": 3,
            "activityId": 1834,
            "name": "Heart of Evil"
          },
          {
            "activityIndex": 4,
            "activityId": 4891,
            "name": "The Parley"
          },
          {
            "activityIndex": 5,
            "activityId": 4912,
            "name": "Storming the Garrison"
          },
          {
            "activityIndex": 6,
            "activityId": 2016,
            "name": "Hallin's Burden"
          },
          {
            "activityIndex": 7,
            "activityId": 2017,
            "name": "The Lion's Den"
          },
          {
            "activityIndex": 8,
            "activityId": 2018,
            "name": "A Thirst for Revolution"
          },
          {
            "activityIndex": 9,
            "activityId": 4918,
            "name": "The Shifting Sands of Fate"
          },
          {
            "activityIndex": 10,
            "activityId": 4959,
            "name": "Trials and Tribulations"
          },
          {
            "activityIndex": 11,
            "activityId": 4960,
            "name": "To Walk on Far Shores"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 155,
            "name": "Jackdaw Cove"
          },
          {
            "activityIndex": 2,
            "activityId": 156,
            "name": "Northglen"
          },
          {
            "activityIndex": 3,
            "activityId": 159,
            "name": "Halcyon Lake"
          },
          {
            "activityIndex": 4,
            "activityId": 160,
            "name": "Pelin Graveyard"
          },
          {
            "activityIndex": 5,
            "activityId": 162,
            "name": "Fallen Grotto"
          },
          {
            "activityIndex": 6,
            "activityId": 165,
            "name": "Nilata Ruins"
          },
          {
            "activityIndex": 7,
            "activityId": 166,
            "name": "Hall of Heroes"
          },
          {
            "activityIndex": 8,
            "activityId": 167,
            "name": "Kerbol's Hollow"
          },
          {
            "activityIndex": 9,
            "activityId": 171,
            "name": "Hallin's Stand"
          },
          {
            "activityIndex": 10,
            "activityId": 173,
            "name": "Onsi's Breath"
          },
          {
            "activityIndex": 11,
            "activityId": 176,
            "name": "Qharroa Ruins"
          },
          {
            "activityIndex": 12,
            "activityId": 163,
            "name": "Bangkorai Garrison"
          },
          {
            "activityIndex": 13,
            "activityId": 265,
            "name": "Martyr's Crossing"
          },
          {
            "activityIndex": 14,
            "activityId": 266,
            "name": "Evermore"
          },
          {
            "activityIndex": 15,
            "activityId": 259,
            "name": "Viridian Woods"
          },
          {
            "activityIndex": 16,
            "activityId": 390,
            "name": "Old Tower"
          },
          {
            "activityIndex": 17,
            "activityId": 391,
            "name": "Murcien's Hamlet"
          },
          {
            "activityIndex": 18,
            "activityId": 1377,
            "name": "Damar Farmstead"
          },
          {
            "activityIndex": 19,
            "activityId": 262,
            "name": "Sunken Road"
          },
          {
            "activityIndex": 20,
            "activityId": 1723,
            "name": "Merchant's Gate"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 60,
            "name": "Bangkorai Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 708,
            "name": "Razak's Wheel Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1055,
            "name": "Razak's Wheel Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 475,
            "name": "Bangkorai Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 375,
            "name": "Evermore Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 378,
            "name": "Troll's Toothpick Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 379,
            "name": "Viridian Woods Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 380,
            "name": "Bangkorai Pass Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 381,
            "name": "Nilata Ruins Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 382,
            "name": "Hallin's Stand Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 383,
            "name": "Old Tower Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 384,
            "name": "Onsi's Breath Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 385,
            "name": "Sunken Road Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 1038,
            "name": "Eastern Evermore Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 1082,
            "name": "Halcyon Lake Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 470,
            "name": "Torog's Spite"
          },
          {
            "activityIndex": 2,
            "activityId": 471,
            "name": "Troll's Toothpick"
          },
          {
            "activityIndex": 3,
            "activityId": 472,
            "name": "Viridian Watch"
          },
          {
            "activityIndex": 4,
            "activityId": 473,
            "name": "Crypt of the Exiles"
          },
          {
            "activityIndex": 5,
            "activityId": 474,
            "name": "Klathzgar"
          },
          {
            "activityIndex": 6,
            "activityId": 475,
            "name": "Rubble Butte"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 243,
            "name": "A scenic view of Evermore's bridge."
          },
          {
            "activityIndex": 2,
            "activityId": 244,
            "name": "Listening to Silaseli's whispers."
          },
          {
            "activityIndex": 3,
            "activityId": 245,
            "name": "Tossed into a coveside tower."
          },
          {
            "activityIndex": 4,
            "activityId": 246,
            "name": "Answer the call to battle."
          },
          {
            "activityIndex": 5,
            "activityId": 247,
            "name": "Secret shrine by Pelin's Church."
          },
          {
            "activityIndex": 6,
            "activityId": 248,
            "name": "Hears hags but sees mobile limbs."
          },
          {
            "activityIndex": 7,
            "activityId": 249,
            "name": "Waiting to be inducted to the Hall."
          },
          {
            "activityIndex": 8,
            "activityId": 250,
            "name": "Take a fall from the grotto."
          },
          {
            "activityIndex": 9,
            "activityId": 251,
            "name": "Nested in an Imperial camp."
          },
          {
            "activityIndex": 10,
            "activityId": 252,
            "name": "Sent away to stay with the dead."
          },
          {
            "activityIndex": 11,
            "activityId": 253,
            "name": "Tragic tale of architect and princess."
          },
          {
            "activityIndex": 12,
            "activityId": 254,
            "name": "Found in spite."
          },
          {
            "activityIndex": 13,
            "activityId": 255,
            "name": "Where a stormy ritual brews."
          },
          {
            "activityIndex": 14,
            "activityId": 256,
            "name": "Stuck in a troll's maw."
          },
          {
            "activityIndex": 15,
            "activityId": 257,
            "name": "Bjoulsae bandits' hidden lair."
          },
          {
            "activityIndex": 16,
            "activityId": 258,
            "name": "Meddling Imperials disrupt the wheel."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1030,
            "name": "Mournoth Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 1031,
            "name": "Ephesus Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 1032,
            "name": "Fallen Wastes Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1239,
            "name": "Blighted Isle"
          },
          {
            "activityIndex": 2,
            "activityId": 1240,
            "name": "Lakewatch Tower"
          },
          {
            "activityIndex": 3,
            "activityId": 1241,
            "name": "Arlimahera's Sanctum"
          },
          {
            "activityIndex": 4,
            "activityId": 1242,
            "name": "Summoner's Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 1243,
            "name": "Nilata Falls"
          },
          {
            "activityIndex": 6,
            "activityId": 1244,
            "name": "Telesubi Ruins"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1383,
            "name": "Yanurah's Respite"
          },
          {
            "activityIndex": 2,
            "activityId": 1384,
            "name": "Ash'abahs' Oasis"
          },
          {
            "activityIndex": 3,
            "activityId": 1385,
            "name": "Gjarma's Rock"
          },
          {
            "activityIndex": 4,
            "activityId": 1386,
            "name": "Strastnoc's Landing"
          },
          {
            "activityIndex": 5,
            "activityId": 1388,
            "name": "Basking Grounds"
          },
          {
            "activityIndex": 6,
            "activityId": 1390,
            "name": "Sacred Springs"
          },
          {
            "activityIndex": 7,
            "activityId": 1391,
            "name": "Howlers' Nook"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 42,
            "name": "The Legend of Fallen Grotto"
          },
          {
            "activityIndex": 2,
            "activityId": 43,
            "name": "Living with Lycanthropy"
          },
          {
            "activityIndex": 3,
            "activityId": 44,
            "name": "Bangkorai, Shield of High Rock"
          },
          {
            "activityIndex": 4,
            "activityId": 45,
            "name": "The Posting of the Hunt"
          },
          {
            "activityIndex": 5,
            "activityId": 46,
            "name": "Aspects of Lord Hircine"
          },
          {
            "activityIndex": 6,
            "activityId": 47,
            "name": "The Viridian Sentinel"
          },
          {
            "activityIndex": 7,
            "activityId": 48,
            "name": "The True-Told Tale of Hallin, Pt. 1"
          },
          {
            "activityIndex": 8,
            "activityId": 49,
            "name": "The True-Told Tale of Hallin, Pt. 2"
          },
          {
            "activityIndex": 9,
            "activityId": 50,
            "name": "A Life Barbaric and Brutal"
          },
          {
            "activityIndex": 10,
            "activityId": 51,
            "name": "The Glenmoril Wyrd"
          },
          {
            "activityIndex": 11,
            "activityId": 206,
            "name": "Dwemer Inquiries Volume I"
          },
          {
            "activityIndex": 12,
            "activityId": 207,
            "name": "Dwemer Inquiries Volume II"
          },
          {
            "activityIndex": 13,
            "activityId": 208,
            "name": "Dwemer Inquiries Volume III"
          },
          {
            "activityIndex": 14,
            "activityId": 209,
            "name": "Ancient Scrolls of the Dwemer IV"
          },
          {
            "activityIndex": 15,
            "activityId": 222,
            "name": "The Homilies of Blessed Almalexia"
          },
          {
            "activityIndex": 16,
            "activityId": 223,
            "name": "The Legendary Scourge"
          },
          {
            "activityIndex": 17,
            "activityId": 224,
            "name": "The Lusty Argonian Maid, Vol. 1"
          },
          {
            "activityIndex": 18,
            "activityId": 225,
            "name": "The Lusty Argonian Maid, Vol. 2"
          },
          {
            "activityIndex": 19,
            "activityId": 226,
            "name": "Myths of Sheogorath, Volume 1"
          },
          {
            "activityIndex": 20,
            "activityId": 227,
            "name": "Myths of Sheogorath, Volume 2"
          },
          {
            "activityIndex": 21,
            "activityId": 228,
            "name": "The Red Book of Riddles"
          },
          {
            "activityIndex": 22,
            "activityId": 230,
            "name": "16 Accords of Madness, Vol. VI"
          },
          {
            "activityIndex": 23,
            "activityId": 231,
            "name": "Crow and Raven: Three Short Fables"
          },
          {
            "activityIndex": 24,
            "activityId": 232,
            "name": "Wabbajack"
          },
          {
            "activityIndex": 25,
            "activityId": 269,
            "name": "Proper-Life: Three Chants"
          },
          {
            "activityIndex": 26,
            "activityId": 270,
            "name": "Song of the Askelde Men"
          },
          {
            "activityIndex": 27,
            "activityId": 271,
            "name": "The Warrior's Charge"
          },
          {
            "activityIndex": 28,
            "activityId": 272,
            "name": "Words of the Wind"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 372,
            "name": "The Steed"
          },
          {
            "activityIndex": 2,
            "activityId": 374,
            "name": "The Apprentice"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 299,
            "name": "Razak's Wheel"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1382,
            "name": "Silaseli Ruins"
          },
          {
            "activityIndex": 2,
            "activityId": 1387,
            "name": "Viridian Hideaway"
          },
          {
            "activityIndex": 3,
            "activityId": 1389,
            "name": "Wethers' Cleft"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 535,
    "name": "Betnikh",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4523,
            "name": "The Bloodthorn Plot"
          },
          {
            "activityIndex": 2,
            "activityId": 4449,
            "name": "Carzog's Demise"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 802,
            "name": "Grimfield"
          },
          {
            "activityIndex": 2,
            "activityId": 828,
            "name": "Carved Hills"
          },
          {
            "activityIndex": 3,
            "activityId": 825,
            "name": "Moriseli"
          },
          {
            "activityIndex": 4,
            "activityId": 845,
            "name": "Carzog's Demise"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 774,
            "name": "Betnikh Pathfinder"
          },
          {
            "activityIndex": 2,
            "activityId": 408,
            "name": "Betnikh Skyshard Hunter"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 830,
            "name": "Stonetooth Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 831,
            "name": "Grimfield Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 832,
            "name": "Carved Hills Wayshrine"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 176,
            "name": "In the dig site."
          },
          {
            "activityIndex": 2,
            "activityId": 177,
            "name": "Where wolves prowl eastern ruins."
          },
          {
            "activityIndex": 3,
            "activityId": 178,
            "name": "Outside a house for the dead."
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1303,
            "name": "Gilbard's Nook"
          },
          {
            "activityIndex": 2,
            "activityId": 1304,
            "name": "Eyearata"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1261,
    "name": "Blackwood",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6615,
            "name": "A Deadly Secret"
          },
          {
            "activityIndex": 2,
            "activityId": 6616,
            "name": "An Unexpected Adversary"
          },
          {
            "activityIndex": 3,
            "activityId": 6630,
            "name": "A Hidden Vault"
          },
          {
            "activityIndex": 4,
            "activityId": 6619,
            "name": "A Mysterious Event"
          },
          {
            "activityIndex": 5,
            "activityId": 6617,
            "name": "Weapons of Destruction"
          },
          {
            "activityIndex": 6,
            "activityId": 6614,
            "name": "Pyre of Ambition"
          },
          {
            "activityIndex": 7,
            "activityId": 6660,
            "name": "Heroes of Blackwood"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2353,
            "name": "Borderwatch"
          },
          {
            "activityIndex": 2,
            "activityId": 2360,
            "name": "Deepscorn Hollow"
          },
          {
            "activityIndex": 3,
            "activityId": 2364,
            "name": "Veyond"
          },
          {
            "activityIndex": 4,
            "activityId": 2367,
            "name": "Doomvault Vulpinaz"
          },
          {
            "activityIndex": 5,
            "activityId": 2376,
            "name": "Farmer's Nook"
          },
          {
            "activityIndex": 6,
            "activityId": 2380,
            "name": "Hutan-Tzel"
          },
          {
            "activityIndex": 7,
            "activityId": 2383,
            "name": "Gideon"
          },
          {
            "activityIndex": 8,
            "activityId": 2385,
            "name": "Glenbridge"
          },
          {
            "activityIndex": 9,
            "activityId": 2392,
            "name": "Stonewastes"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3056,
            "name": "Blackwood Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 2994,
            "name": "Silent Halls Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 2995,
            "name": "Zenithar's Abbey Group Event"
          },
          {
            "activityIndex": 4,
            "activityId": 3076,
            "name": "Oblivion Obliterator"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2375,
            "name": "Bloodrun Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2395,
            "name": "Leyawiin Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2396,
            "name": "Gideon Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2397,
            "name": "Borderwatch Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2398,
            "name": "Fort Redmane Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2399,
            "name": "Blueblood Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2400,
            "name": "Stonewastes Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2405,
            "name": "Leyawiin Outskirts Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2442,
            "name": "Doomvault Vulpinaz Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2443,
            "name": "Blackwood Crossroads Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2444,
            "name": "Hutan-Tzel Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2445,
            "name": "Vunalk Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2355,
            "name": "Undertow Cavern"
          },
          {
            "activityIndex": 2,
            "activityId": 2369,
            "name": "Arpenia"
          },
          {
            "activityIndex": 3,
            "activityId": 2374,
            "name": "Bloodrun Cave"
          },
          {
            "activityIndex": 4,
            "activityId": 2381,
            "name": "Doomvault Porcixid"
          },
          {
            "activityIndex": 5,
            "activityId": 2386,
            "name": "Vunalk"
          },
          {
            "activityIndex": 6,
            "activityId": 2394,
            "name": "Xi-Tsei"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 478,
            "name": "In the ruins of a fort along the coast."
          },
          {
            "activityIndex": 2,
            "activityId": 479,
            "name": "Outside the marshy walls of a fort overrun with enemies."
          },
          {
            "activityIndex": 3,
            "activityId": 480,
            "name": "Behind the statue of a warrior."
          },
          {
            "activityIndex": 4,
            "activityId": 481,
            "name": "On an island in the sea."
          },
          {
            "activityIndex": 5,
            "activityId": 482,
            "name": "Where the floating roads sink beneath the water."
          },
          {
            "activityIndex": 6,
            "activityId": 483,
            "name": "Southeast of where the forgotten tower sits."
          },
          {
            "activityIndex": 7,
            "activityId": 484,
            "name": "Hidden where specters guard a dead fortress."
          },
          {
            "activityIndex": 8,
            "activityId": 485,
            "name": "In a place where a misstep leads to a long fall."
          },
          {
            "activityIndex": 9,
            "activityId": 486,
            "name": "Where the rocks pile high and the trees stand tall."
          },
          {
            "activityIndex": 10,
            "activityId": 487,
            "name": "By the island where the haj mota prowls."
          },
          {
            "activityIndex": 11,
            "activityId": 488,
            "name": "In a hidden corridor by the blooming red blossoms."
          },
          {
            "activityIndex": 12,
            "activityId": 489,
            "name": "On a platform above where the dead and living walk."
          },
          {
            "activityIndex": 13,
            "activityId": 490,
            "name": "Nestled in the moss where the behemoth stalks."
          },
          {
            "activityIndex": 14,
            "activityId": 491,
            "name": "High above where the Goblins scheme."
          },
          {
            "activityIndex": 15,
            "activityId": 492,
            "name": "Watched over by flaming skulls."
          },
          {
            "activityIndex": 16,
            "activityId": 493,
            "name": "Where spiders creep and birds speak."
          },
          {
            "activityIndex": 17,
            "activityId": 494,
            "name": "In a cave by the false night's sky."
          },
          {
            "activityIndex": 18,
            "activityId": 495,
            "name": "In a rocky alcove, guarded by a vicious wamasu."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2361,
            "name": "Shardius's Excavation"
          },
          {
            "activityIndex": 2,
            "activityId": 2368,
            "name": "Toad-Tongue War Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 2372,
            "name": "Sul-Xan Ritual Site"
          },
          {
            "activityIndex": 4,
            "activityId": 2377,
            "name": "Old Deathwart's Pond"
          },
          {
            "activityIndex": 5,
            "activityId": 2387,
            "name": "Xeemhok's Lagoon"
          },
          {
            "activityIndex": 6,
            "activityId": 2393,
            "name": "The Shattered Xanmeer"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2354,
            "name": "White Stallion Inn"
          },
          {
            "activityIndex": 2,
            "activityId": 2358,
            "name": "Plateau of the Traveler"
          },
          {
            "activityIndex": 3,
            "activityId": 2362,
            "name": "Fort Blueblood"
          },
          {
            "activityIndex": 4,
            "activityId": 2370,
            "name": "Shrine to Nocturnal"
          },
          {
            "activityIndex": 5,
            "activityId": 2378,
            "name": "Salvitto Estate"
          },
          {
            "activityIndex": 6,
            "activityId": 2391,
            "name": "Ojel-Bak"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 160,
            "name": "Trials of Saint Alessia"
          },
          {
            "activityIndex": 2,
            "activityId": 180,
            "name": "Nine Commands of the Eight Divines"
          },
          {
            "activityIndex": 3,
            "activityId": 216,
            "name": "The Order of the Ancestor Moth"
          },
          {
            "activityIndex": 4,
            "activityId": 239,
            "name": "Reality and Other Falsehoods"
          },
          {
            "activityIndex": 5,
            "activityId": 273,
            "name": "Ayleid Inscriptions Translated"
          },
          {
            "activityIndex": 6,
            "activityId": 278,
            "name": "Eulogy for Emperor Varen"
          },
          {
            "activityIndex": 7,
            "activityId": 279,
            "name": "House Tharn of Nibenay"
          },
          {
            "activityIndex": 8,
            "activityId": 295,
            "name": "Freedom's Price"
          },
          {
            "activityIndex": 9,
            "activityId": 318,
            "name": "Varieties of Faith: The Argonians"
          },
          {
            "activityIndex": 10,
            "activityId": 1414,
            "name": "Varieties of Faith: The Khajiit"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2371,
            "name": "Zenithar's Abbey"
          },
          {
            "activityIndex": 2,
            "activityId": 2384,
            "name": "The Silent Halls"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2406,
            "name": "Pentric Run"
          },
          {
            "activityIndex": 2,
            "activityId": 2407,
            "name": "Sariellen's Sword"
          },
          {
            "activityIndex": 3,
            "activityId": 2408,
            "name": "Withered Root"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 280,
    "name": "Bleakrock Isle",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3987,
            "name": "Hozzin's Folly"
          },
          {
            "activityIndex": 2,
            "activityId": 3995,
            "name": "The Frozen Man"
          },
          {
            "activityIndex": 3,
            "activityId": 3992,
            "name": "What Waits Beneath"
          },
          {
            "activityIndex": 4,
            "activityId": 4016,
            "name": "The Missing of Bleakrock"
          },
          {
            "activityIndex": 5,
            "activityId": 4002,
            "name": "Sparking the Flame"
          },
          {
            "activityIndex": 6,
            "activityId": 3991,
            "name": "Escape from Bleakrock"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 495,
            "name": "Orkey's Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 500,
            "name": "Skyshroud Barrow"
          },
          {
            "activityIndex": 3,
            "activityId": 502,
            "name": "Hozzin's Folly"
          },
          {
            "activityIndex": 4,
            "activityId": 503,
            "name": "Bleakrock Village"
          },
          {
            "activityIndex": 5,
            "activityId": 1142,
            "name": "Frostedge Camp"
          },
          {
            "activityIndex": 6,
            "activityId": 1143,
            "name": "Hunter's Camp"
          },
          {
            "activityIndex": 7,
            "activityId": 1144,
            "name": "Halmaera's House"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 194,
            "name": "Hero of Bleakrock"
          },
          {
            "activityIndex": 2,
            "activityId": 493,
            "name": "Bleakrock Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 501,
            "name": "Bleakrock Wayshrine"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1,
            "name": "High atop the shrouded Barrow."
          },
          {
            "activityIndex": 2,
            "activityId": 2,
            "name": "A Hollow victory beyond the iceflows."
          },
          {
            "activityIndex": 3,
            "activityId": 3,
            "name": "To dig too deep would be no Folly."
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1290,
            "name": "Companions Point"
          },
          {
            "activityIndex": 2,
            "activityId": 1291,
            "name": "Paddlefloe Fishing Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 1294,
            "name": "Deathclaw's Lair"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 980,
    "name": "Clockwork City",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6050,
            "name": "To The Clockwork City"
          },
          {
            "activityIndex": 2,
            "activityId": 6057,
            "name": "In Search of a Sponsor"
          },
          {
            "activityIndex": 3,
            "activityId": 6063,
            "name": "The Strangeness of Seht"
          },
          {
            "activityIndex": 4,
            "activityId": 6025,
            "name": "Deepening Shadows"
          },
          {
            "activityIndex": 5,
            "activityId": 6052,
            "name": "Lost in the Gloam"
          },
          {
            "activityIndex": 6,
            "activityId": 6046,
            "name": "Unto the Dark"
          },
          {
            "activityIndex": 7,
            "activityId": 6047,
            "name": "Where Shadows Lie"
          },
          {
            "activityIndex": 8,
            "activityId": 6048,
            "name": "The Light of Knowledge"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1977,
            "name": "Everwound Wellspring"
          },
          {
            "activityIndex": 2,
            "activityId": 1978,
            "name": "Mnemonic Planisphere"
          },
          {
            "activityIndex": 3,
            "activityId": 1989,
            "name": "The Brass Fortress"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2069,
            "name": "Clockwork City Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 2049,
            "name": "Hero of Clockwork City"
          },
          {
            "activityIndex": 3,
            "activityId": 1958,
            "name": "Precursor Maker"
          },
          {
            "activityIndex": 4,
            "activityId": 2027,
            "name": "Clockwork City Master Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1975,
            "name": "Clockwork Crossroads Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1976,
            "name": "Mire Mechanica Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 1991,
            "name": "Sanctuary Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 1974,
            "name": "Brass Fortress Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1972,
            "name": "Halls of Regulation"
          },
          {
            "activityIndex": 2,
            "activityId": 1973,
            "name": "The Shadow Cleft"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 400,
            "name": "Beneath the drainage pipes along the river."
          },
          {
            "activityIndex": 2,
            "activityId": 401,
            "name": "Soaking near a fluid pump north of the Pavilion of Artifice."
          },
          {
            "activityIndex": 3,
            "activityId": 402,
            "name": "By the collapsed pipes in the Mechanical Fundament."
          },
          {
            "activityIndex": 4,
            "activityId": 403,
            "name": "On the lip of the Skybridge."
          },
          {
            "activityIndex": 5,
            "activityId": 404,
            "name": "In a junction with three exits in the Halls of Regulation."
          },
          {
            "activityIndex": 6,
            "activityId": 405,
            "name": "Amidst the wafts in the Shadow Cleft."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1985,
            "name": "Sanctuary of Verification"
          },
          {
            "activityIndex": 2,
            "activityId": 1986,
            "name": "Exarchs' Egress"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1980,
            "name": "Elegiac Replication"
          },
          {
            "activityIndex": 2,
            "activityId": 1981,
            "name": "Insalubrious Effluvium"
          },
          {
            "activityIndex": 3,
            "activityId": 1982,
            "name": "Vale of Tiers"
          },
          {
            "activityIndex": 4,
            "activityId": 1983,
            "name": "Ventral Terminus"
          },
          {
            "activityIndex": 5,
            "activityId": 1988,
            "name": "Mire Mechanica"
          },
          {
            "activityIndex": 6,
            "activityId": 1990,
            "name": "Barilzar's Eighth Laboratory"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 2,
            "activityId": 237,
            "name": "The Old Ways"
          },
          {
            "activityIndex": 3,
            "activityId": 256,
            "name": "The Doors of Oblivion, Part 2"
          },
          {
            "activityIndex": 4,
            "activityId": 319,
            "name": "Varieties of Faith: The Dark Elves"
          },
          {
            "activityIndex": 5,
            "activityId": 570,
            "name": "The Living Gods"
          },
          {
            "activityIndex": 6,
            "activityId": 1419,
            "name": "The Devouring of Gil-Var-Delle"
          },
          {
            "activityIndex": 7,
            "activityId": 179,
            "name": "Monomyth: The Heart of the World"
          },
          {
            "activityIndex": 8,
            "activityId": 231,
            "name": "Crow and Raven: Three Short Fables"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2040,
            "name": "The Refurbishing Yard"
          },
          {
            "activityIndex": 2,
            "activityId": 2041,
            "name": "Pavilion of Artifice"
          },
          {
            "activityIndex": 3,
            "activityId": 2039,
            "name": "Restricted Brassworks"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 347,
    "name": "Coldharbour",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4605,
            "name": "The Hollow City"
          },
          {
            "activityIndex": 2,
            "activityId": 4610,
            "name": "The Army of Meridia"
          },
          {
            "activityIndex": 3,
            "activityId": 4626,
            "name": "Vanus Unleashed"
          },
          {
            "activityIndex": 4,
            "activityId": 4730,
            "name": "Breaking the Shackle"
          },
          {
            "activityIndex": 5,
            "activityId": 4399,
            "name": "Into the Woods"
          },
          {
            "activityIndex": 6,
            "activityId": 4679,
            "name": "The Shadow's Embrace"
          },
          {
            "activityIndex": 7,
            "activityId": 4602,
            "name": "Light from the Darkness"
          },
          {
            "activityIndex": 8,
            "activityId": 4701,
            "name": "Crossing the Chasm"
          },
          {
            "activityIndex": 9,
            "activityId": 4715,
            "name": "The Harvest Heart"
          },
          {
            "activityIndex": 10,
            "activityId": 4774,
            "name": "The Citadel Must Fall"
          },
          {
            "activityIndex": 11,
            "activityId": 4758,
            "name": "The Final Assault"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 755,
            "name": "The Everfull Flagon"
          },
          {
            "activityIndex": 2,
            "activityId": 759,
            "name": "The Lost Fleet"
          },
          {
            "activityIndex": 3,
            "activityId": 760,
            "name": "Cliffs of Failure"
          },
          {
            "activityIndex": 4,
            "activityId": 764,
            "name": "The Moonless Walk"
          },
          {
            "activityIndex": 5,
            "activityId": 868,
            "name": "Tower of Lies"
          },
          {
            "activityIndex": 6,
            "activityId": 892,
            "name": "Haj Uxith"
          },
          {
            "activityIndex": 7,
            "activityId": 902,
            "name": "Court of Contempt"
          },
          {
            "activityIndex": 8,
            "activityId": 903,
            "name": "The Chasm"
          },
          {
            "activityIndex": 9,
            "activityId": 907,
            "name": "The Orchard"
          },
          {
            "activityIndex": 10,
            "activityId": 913,
            "name": "The Black Forge"
          },
          {
            "activityIndex": 11,
            "activityId": 924,
            "name": "The Vile Laboratory"
          },
          {
            "activityIndex": 12,
            "activityId": 753,
            "name": "Library of Dusk"
          },
          {
            "activityIndex": 13,
            "activityId": 762,
            "name": "Spurned Peak"
          },
          {
            "activityIndex": 14,
            "activityId": 928,
            "name": "The Lightless Oubliette"
          },
          {
            "activityIndex": 15,
            "activityId": 929,
            "name": "The Manor of Revelry"
          },
          {
            "activityIndex": 16,
            "activityId": 940,
            "name": "The Reaver Citadel"
          },
          {
            "activityIndex": 17,
            "activityId": 941,
            "name": "The Hollow City"
          },
          {
            "activityIndex": 18,
            "activityId": 909,
            "name": "The Great Shackle"
          },
          {
            "activityIndex": 19,
            "activityId": 966,
            "name": "The Endless Stair"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 616,
            "name": "Coldharbour Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 874,
            "name": "Village of the Lost Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1056,
            "name": "Village of the Lost Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 490,
            "name": "Coldharbour Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 848,
            "name": "Library of Dusk Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 849,
            "name": "Great Shackle Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 850,
            "name": "The Chasm Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 851,
            "name": "Hollow City Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 852,
            "name": "Endless Stair Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 853,
            "name": "Everfull Flagon Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 854,
            "name": "Moonless Walk Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 855,
            "name": "Haj Uxith Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 857,
            "name": "Manor of Revelry Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 858,
            "name": "Reaver Citadel Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 859,
            "name": "The Orchard Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 908,
            "name": "Shrouded Plains Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 916,
            "name": "Court of Contempt Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 861,
            "name": "Aba-Loria"
          },
          {
            "activityIndex": 2,
            "activityId": 862,
            "name": "The Grotto of Depravity"
          },
          {
            "activityIndex": 3,
            "activityId": 863,
            "name": "The Cave of Trophies"
          },
          {
            "activityIndex": 4,
            "activityId": 864,
            "name": "Vault of Haman Forgefire"
          },
          {
            "activityIndex": 5,
            "activityId": 865,
            "name": "Mal Sorra's Tomb"
          },
          {
            "activityIndex": 6,
            "activityId": 866,
            "name": "The Wailing Maw"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 260,
            "name": "East of the bastion of deceit."
          },
          {
            "activityIndex": 2,
            "activityId": 261,
            "name": "Discarded from the mages' walls."
          },
          {
            "activityIndex": 3,
            "activityId": 262,
            "name": "Seek a shattered bridge suspended."
          },
          {
            "activityIndex": 4,
            "activityId": 263,
            "name": "Unfit for court."
          },
          {
            "activityIndex": 5,
            "activityId": 264,
            "name": "Ejected from the Village."
          },
          {
            "activityIndex": 6,
            "activityId": 265,
            "name": "Among the vessel's burnt cousins."
          },
          {
            "activityIndex": 7,
            "activityId": 266,
            "name": "In the Chasm's western watchtower."
          },
          {
            "activityIndex": 8,
            "activityId": 267,
            "name": "Not invited into the plotting wives' home."
          },
          {
            "activityIndex": 9,
            "activityId": 268,
            "name": "Washed to strange shores with the fleet."
          },
          {
            "activityIndex": 10,
            "activityId": 269,
            "name": "Among the bones of Aba-Loria."
          },
          {
            "activityIndex": 11,
            "activityId": 270,
            "name": "Enduring Forgefire's flames."
          },
          {
            "activityIndex": 12,
            "activityId": 271,
            "name": "Seek the deepest depravity."
          },
          {
            "activityIndex": 13,
            "activityId": 272,
            "name": "Entombed in the Orchard."
          },
          {
            "activityIndex": 14,
            "activityId": 273,
            "name": "One of the hunters' many prides."
          },
          {
            "activityIndex": 15,
            "activityId": 274,
            "name": "Where endless cries issue forth."
          },
          {
            "activityIndex": 16,
            "activityId": 275,
            "name": "Behind disaster-claimed Dunmer hall."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1245,
            "name": "Aba-Darre"
          },
          {
            "activityIndex": 2,
            "activityId": 1246,
            "name": "Duriatundur's Killing Field"
          },
          {
            "activityIndex": 3,
            "activityId": 1247,
            "name": "Zemarek's Hollow"
          },
          {
            "activityIndex": 4,
            "activityId": 1248,
            "name": "Daedroth Larder"
          },
          {
            "activityIndex": 5,
            "activityId": 1249,
            "name": "Risen Court"
          },
          {
            "activityIndex": 6,
            "activityId": 1250,
            "name": "Cynhamoth's Grove"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1436,
            "name": "Cadwell's Hovel"
          },
          {
            "activityIndex": 2,
            "activityId": 1437,
            "name": "Shrine of Kyne"
          },
          {
            "activityIndex": 3,
            "activityId": 1438,
            "name": "Endless Overlook"
          },
          {
            "activityIndex": 4,
            "activityId": 1439,
            "name": "Forsaken Village"
          },
          {
            "activityIndex": 5,
            "activityId": 1440,
            "name": "Survivor's Camp"
          },
          {
            "activityIndex": 6,
            "activityId": 1442,
            "name": "Mages Guildhall"
          },
          {
            "activityIndex": 7,
            "activityId": 1443,
            "name": "Fighters Guildhall"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1465,
            "name": "Exegesis of Merid-Nunda"
          },
          {
            "activityIndex": 2,
            "activityId": 1466,
            "name": "The Whithering of Delodiil"
          },
          {
            "activityIndex": 3,
            "activityId": 1467,
            "name": "Chaotic Creatia: The Azure Plasm"
          },
          {
            "activityIndex": 4,
            "activityId": 1468,
            "name": "I was Summoned by a Mortal"
          },
          {
            "activityIndex": 5,
            "activityId": 1469,
            "name": "A Life of Strife and Struggle"
          },
          {
            "activityIndex": 6,
            "activityId": 1470,
            "name": "The Black Forge"
          },
          {
            "activityIndex": 7,
            "activityId": 1471,
            "name": "The Lightless Oubliette"
          },
          {
            "activityIndex": 8,
            "activityId": 1472,
            "name": "The Library of Dusk: Rare Books"
          },
          {
            "activityIndex": 9,
            "activityId": 1473,
            "name": "Oath of a Dishonored Clan"
          },
          {
            "activityIndex": 10,
            "activityId": 1474,
            "name": "Protocols of the Court of Contempt"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1058,
            "name": "Village of the Lost"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1435,
            "name": "Deathspinner's Lair"
          },
          {
            "activityIndex": 2,
            "activityId": 1444,
            "name": "Font of Schemes"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 888,
    "name": "Craglorn",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5747,
            "name": "The Star-Gazers"
          },
          {
            "activityIndex": 2,
            "activityId": 5748,
            "name": "The Warrior's Call"
          },
          {
            "activityIndex": 3,
            "activityId": 5761,
            "name": "Elemental Army"
          },
          {
            "activityIndex": 4,
            "activityId": 5760,
            "name": "The Missing Guardian"
          },
          {
            "activityIndex": 5,
            "activityId": 5768,
            "name": "Slithering Brood"
          },
          {
            "activityIndex": 6,
            "activityId": 5769,
            "name": "The Serpent's Fang"
          },
          {
            "activityIndex": 7,
            "activityId": 5771,
            "name": "Dawn of the Exalted Viper"
          },
          {
            "activityIndex": 8,
            "activityId": 5776,
            "name": "The Time-Lost Warrior"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1089,
            "name": "Rahni'Za, School of Warriors"
          },
          {
            "activityIndex": 2,
            "activityId": 1101,
            "name": "The Seeker's Archive"
          },
          {
            "activityIndex": 3,
            "activityId": 1104,
            "name": "Shada's Tear"
          },
          {
            "activityIndex": 4,
            "activityId": 1461,
            "name": "Elinhir"
          },
          {
            "activityIndex": 5,
            "activityId": 1463,
            "name": "Spellscar"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1664,
            "name": "Anka-Ra Consecrationist"
          },
          {
            "activityIndex": 2,
            "activityId": 1663,
            "name": "Anomalous Scholar"
          },
          {
            "activityIndex": 3,
            "activityId": 1665,
            "name": "Nirncrux Inspector"
          },
          {
            "activityIndex": 4,
            "activityId": 916,
            "name": "Craglorn Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1136,
            "name": "Seeker's Archive Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1137,
            "name": "Sandy Path Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 1138,
            "name": "Shada's Tear Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 1147,
            "name": "Belkarth Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 1490,
            "name": "Elinhir Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 1491,
            "name": "Spellscar Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 1492,
            "name": "Mountain Overlook Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 1493,
            "name": "Inazzur's Hold Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 1584,
            "name": "Dragonstar Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 1585,
            "name": "Skyreach Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 1586,
            "name": "Valley of Scars Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1091,
            "name": "Molavar"
          },
          {
            "activityIndex": 2,
            "activityId": 1100,
            "name": "Serpent's Nest"
          },
          {
            "activityIndex": 3,
            "activityId": 1103,
            "name": "Ilthag's Undertower"
          },
          {
            "activityIndex": 4,
            "activityId": 1111,
            "name": "Loth'Na Caverns"
          },
          {
            "activityIndex": 5,
            "activityId": 1113,
            "name": "Haddock's Market"
          },
          {
            "activityIndex": 6,
            "activityId": 1115,
            "name": "Buried Sands"
          },
          {
            "activityIndex": 7,
            "activityId": 1117,
            "name": "The Howling Sepulchers"
          },
          {
            "activityIndex": 8,
            "activityId": 1118,
            "name": "Balamath"
          },
          {
            "activityIndex": 9,
            "activityId": 1119,
            "name": "Fearfangs Cavern"
          },
          {
            "activityIndex": 10,
            "activityId": 1120,
            "name": "Exarch's Stronghold"
          },
          {
            "activityIndex": 11,
            "activityId": 1122,
            "name": "Tombs of the Na-Totambu"
          }
        ]
      },
      {
        "completionType": 6,
        "label": "Set Stations",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1095,
            "name": "Rkundzelft"
          },
          {
            "activityIndex": 2,
            "activityId": 1102,
            "name": "Ruins of Kardala"
          },
          {
            "activityIndex": 3,
            "activityId": 1112,
            "name": "Rkhardahrk"
          },
          {
            "activityIndex": 4,
            "activityId": 1114,
            "name": "Chiselshriek Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 1116,
            "name": "Mtharnaz"
          },
          {
            "activityIndex": 6,
            "activityId": 1121,
            "name": "Zalgaz's Den"
          },
          {
            "activityIndex": 7,
            "activityId": 1123,
            "name": "Hircine's Haunt"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 322,
            "name": "Lava flows where Ayleids walked."
          },
          {
            "activityIndex": 2,
            "activityId": 323,
            "name": "In a lair of metal spiders."
          },
          {
            "activityIndex": 3,
            "activityId": 324,
            "name": "Among Yokuda's dead."
          },
          {
            "activityIndex": 4,
            "activityId": 325,
            "name": "Where sunlight penetrates Dwarven delves."
          },
          {
            "activityIndex": 5,
            "activityId": 326,
            "name": "Where fishmongers sell no fish."
          },
          {
            "activityIndex": 6,
            "activityId": 327,
            "name": "Where chisled tunnels meet crystal caverns."
          },
          {
            "activityIndex": 7,
            "activityId": 328,
            "name": "A sea of dunes beneath the earth."
          },
          {
            "activityIndex": 8,
            "activityId": 329,
            "name": "Under Centurion guard."
          },
          {
            "activityIndex": 9,
            "activityId": 330,
            "name": "At the head of the class."
          },
          {
            "activityIndex": 10,
            "activityId": 331,
            "name": "In the grotto of snake-women."
          },
          {
            "activityIndex": 11,
            "activityId": 332,
            "name": "Beyond the pillar of hunger."
          },
          {
            "activityIndex": 12,
            "activityId": 333,
            "name": "Howling at the moon."
          },
          {
            "activityIndex": 13,
            "activityId": 334,
            "name": "In the nesting grounds of scales and deceit."
          },
          {
            "activityIndex": 14,
            "activityId": 335,
            "name": "Beneath the tower on the ridge."
          },
          {
            "activityIndex": 15,
            "activityId": 336,
            "name": "Overlooking a valley of serpents beneath glimmering falls."
          },
          {
            "activityIndex": 16,
            "activityId": 337,
            "name": "Amidst howling winds and restless tombs."
          },
          {
            "activityIndex": 17,
            "activityId": 338,
            "name": "Clutched within the jaws of the stone serpent."
          },
          {
            "activityIndex": 18,
            "activityId": 339,
            "name": "Among the treasures of the Iron Exarch."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1124,
            "name": "Conflagrant Anomaly"
          },
          {
            "activityIndex": 2,
            "activityId": 1125,
            "name": "Fulminant Anomaly"
          },
          {
            "activityIndex": 3,
            "activityId": 1126,
            "name": "Adamant Anomaly"
          },
          {
            "activityIndex": 4,
            "activityId": 1127,
            "name": "Cyclonic Anomaly"
          },
          {
            "activityIndex": 5,
            "activityId": 1146,
            "name": "Boreal Anomaly"
          },
          {
            "activityIndex": 6,
            "activityId": 1128,
            "name": "Anka-Ra's Vigil"
          },
          {
            "activityIndex": 7,
            "activityId": 1129,
            "name": "Anka-Ra's Plight"
          },
          {
            "activityIndex": 8,
            "activityId": 1130,
            "name": "Anka-Ra's Avowal"
          },
          {
            "activityIndex": 9,
            "activityId": 1131,
            "name": "Anka-Ra's Crucible"
          },
          {
            "activityIndex": 10,
            "activityId": 1139,
            "name": "Anka-Ra's Mettle"
          },
          {
            "activityIndex": 11,
            "activityId": 1525,
            "name": "Defunct Nirncrux Mine"
          },
          {
            "activityIndex": 12,
            "activityId": 1526,
            "name": "Overrun Nirncrux Mine"
          },
          {
            "activityIndex": 13,
            "activityId": 1527,
            "name": "Neglected Nirncrux Mine"
          },
          {
            "activityIndex": 14,
            "activityId": 1528,
            "name": "Secluded Nirncrux Mine"
          },
          {
            "activityIndex": 15,
            "activityId": 1529,
            "name": "Pillaged Nirncrux Mine"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1495,
            "name": "Bangkorai Gate"
          },
          {
            "activityIndex": 2,
            "activityId": 1494,
            "name": "Proving Grounds Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 1589,
            "name": "Crossroads Encampment"
          },
          {
            "activityIndex": 4,
            "activityId": 1501,
            "name": "Taborra's Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 1502,
            "name": "Inazzur's Hold"
          },
          {
            "activityIndex": 6,
            "activityId": 1503,
            "name": "Thunder Falls Camp"
          },
          {
            "activityIndex": 7,
            "activityId": 1504,
            "name": "Scorpion Ravine"
          },
          {
            "activityIndex": 8,
            "activityId": 1505,
            "name": "Lake of Teeth"
          },
          {
            "activityIndex": 9,
            "activityId": 1506,
            "name": "Ogondar's Winery"
          },
          {
            "activityIndex": 10,
            "activityId": 1587,
            "name": "Sunken Lair"
          },
          {
            "activityIndex": 11,
            "activityId": 1588,
            "name": "Skyreach Overlook"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1646,
            "name": "Atelier of the Twice-Born Star"
          },
          {
            "activityIndex": 2,
            "activityId": 1533,
            "name": "Lanista's Waystation"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 181,
    "name": "Cyrodiil",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4704,
            "name": "Welcome to Cyrodiil"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 477,
            "name": "Sardavar Leed"
          },
          {
            "activityIndex": 2,
            "activityId": 483,
            "name": "Gray Viper Outpost"
          },
          {
            "activityIndex": 3,
            "activityId": 485,
            "name": "Homestead Ruins"
          },
          {
            "activityIndex": 4,
            "activityId": 486,
            "name": "Culotte"
          },
          {
            "activityIndex": 5,
            "activityId": 493,
            "name": "Juras Falls"
          },
          {
            "activityIndex": 6,
            "activityId": 498,
            "name": "Howling Cave"
          },
          {
            "activityIndex": 7,
            "activityId": 504,
            "name": "Ceyatatar"
          },
          {
            "activityIndex": 8,
            "activityId": 506,
            "name": "Lunar Fang Docks"
          },
          {
            "activityIndex": 9,
            "activityId": 514,
            "name": "Abbey of the Eight"
          },
          {
            "activityIndex": 10,
            "activityId": 521,
            "name": "Nornalhorst"
          },
          {
            "activityIndex": 11,
            "activityId": 535,
            "name": "Narsinfel"
          },
          {
            "activityIndex": 12,
            "activityId": 539,
            "name": "Fanacasecul"
          },
          {
            "activityIndex": 13,
            "activityId": 541,
            "name": "Hackdirt"
          },
          {
            "activityIndex": 14,
            "activityId": 591,
            "name": "Wenyandawik"
          },
          {
            "activityIndex": 15,
            "activityId": 625,
            "name": "Chorrol"
          },
          {
            "activityIndex": 16,
            "activityId": 637,
            "name": "Ninendava"
          },
          {
            "activityIndex": 17,
            "activityId": 638,
            "name": "Moranda"
          },
          {
            "activityIndex": 18,
            "activityId": 639,
            "name": "Piukanda"
          },
          {
            "activityIndex": 19,
            "activityId": 641,
            "name": "Sercen"
          },
          {
            "activityIndex": 20,
            "activityId": 642,
            "name": "Anga"
          },
          {
            "activityIndex": 21,
            "activityId": 644,
            "name": "Hrotanda Vale"
          },
          {
            "activityIndex": 22,
            "activityId": 650,
            "name": "Lindai"
          },
          {
            "activityIndex": 23,
            "activityId": 690,
            "name": "Lake Mist Ruins"
          },
          {
            "activityIndex": 24,
            "activityId": 722,
            "name": "Waterside Mine"
          },
          {
            "activityIndex": 25,
            "activityId": 742,
            "name": "Nornal"
          },
          {
            "activityIndex": 26,
            "activityId": 516,
            "name": "Cheydinhal"
          },
          {
            "activityIndex": 27,
            "activityId": 745,
            "name": "Harlun's Watch"
          },
          {
            "activityIndex": 28,
            "activityId": 747,
            "name": "Belda"
          },
          {
            "activityIndex": 29,
            "activityId": 748,
            "name": "Burned Estate"
          },
          {
            "activityIndex": 30,
            "activityId": 973,
            "name": "Temple of the Ancestor Moths"
          },
          {
            "activityIndex": 31,
            "activityId": 1057,
            "name": "Cloud Ruler Temple"
          },
          {
            "activityIndex": 32,
            "activityId": 481,
            "name": "Riverwatch"
          },
          {
            "activityIndex": 33,
            "activityId": 1061,
            "name": "Zimar's Winery"
          },
          {
            "activityIndex": 34,
            "activityId": 1062,
            "name": "Thalara's Winery"
          },
          {
            "activityIndex": 35,
            "activityId": 1063,
            "name": "Wilminn's Winery"
          },
          {
            "activityIndex": 36,
            "activityId": 1064,
            "name": "Sedor"
          },
          {
            "activityIndex": 37,
            "activityId": 651,
            "name": "Coldcorn Ruin"
          },
          {
            "activityIndex": 38,
            "activityId": 1065,
            "name": "Fanacas"
          },
          {
            "activityIndex": 39,
            "activityId": 492,
            "name": "Hedoran Estate"
          },
          {
            "activityIndex": 40,
            "activityId": 1066,
            "name": "Weynon Priory"
          },
          {
            "activityIndex": 41,
            "activityId": 1067,
            "name": "Crooked Finger Redoubt"
          },
          {
            "activityIndex": 42,
            "activityId": 932,
            "name": "Highlander Camp"
          },
          {
            "activityIndex": 43,
            "activityId": 1076,
            "name": "Ice-Heart Home"
          },
          {
            "activityIndex": 44,
            "activityId": 749,
            "name": "Weye"
          },
          {
            "activityIndex": 45,
            "activityId": 1085,
            "name": "Shurgak Clan Estate"
          },
          {
            "activityIndex": 46,
            "activityId": 1448,
            "name": "Nagastani"
          },
          {
            "activityIndex": 47,
            "activityId": 1449,
            "name": "Barren Cave"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 767,
            "name": "Cyrodiil Champion"
          },
          {
            "activityIndex": 2,
            "activityId": 137,
            "name": "Tremendous Damage Dealer"
          },
          {
            "activityIndex": 3,
            "activityId": 140,
            "name": "Tremendous Healer"
          },
          {
            "activityIndex": 4,
            "activityId": 489,
            "name": "Cyrodiil Angler"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 505,
            "name": "Haynote Cave"
          },
          {
            "activityIndex": 2,
            "activityId": 507,
            "name": "Pothole Caverns"
          },
          {
            "activityIndex": 3,
            "activityId": 512,
            "name": "Newt Cave"
          },
          {
            "activityIndex": 4,
            "activityId": 534,
            "name": "Nisin Cave"
          },
          {
            "activityIndex": 5,
            "activityId": 598,
            "name": "Bloodmayne Cave"
          },
          {
            "activityIndex": 6,
            "activityId": 630,
            "name": "Red Ruby Cave"
          },
          {
            "activityIndex": 7,
            "activityId": 636,
            "name": "Capstone Cave"
          },
          {
            "activityIndex": 8,
            "activityId": 645,
            "name": "Echo Cave"
          },
          {
            "activityIndex": 9,
            "activityId": 508,
            "name": "Lipsand Tarn"
          },
          {
            "activityIndex": 10,
            "activityId": 735,
            "name": "Cracked Wood Cave"
          },
          {
            "activityIndex": 11,
            "activityId": 736,
            "name": "Kingscrest Cavern"
          },
          {
            "activityIndex": 12,
            "activityId": 511,
            "name": "Muck Valley Cavern"
          },
          {
            "activityIndex": 13,
            "activityId": 737,
            "name": "Quickwater Cave"
          },
          {
            "activityIndex": 14,
            "activityId": 513,
            "name": "Vahtacen"
          },
          {
            "activityIndex": 15,
            "activityId": 738,
            "name": "Breakneck Cave"
          },
          {
            "activityIndex": 16,
            "activityId": 739,
            "name": "Serpent Hollow Cave"
          },
          {
            "activityIndex": 17,
            "activityId": 510,
            "name": "Underpall Cave"
          },
          {
            "activityIndex": 18,
            "activityId": 509,
            "name": "Toadstool Hollow"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 276,
            "name": "Near the scroll of royalty's secret syllable."
          },
          {
            "activityIndex": 2,
            "activityId": 277,
            "name": "Rope ladder hangs south of Ghartok."
          },
          {
            "activityIndex": 3,
            "activityId": 278,
            "name": "Keeping the crops alive."
          },
          {
            "activityIndex": 4,
            "activityId": 279,
            "name": "Cradled in a ruined temple hall."
          },
          {
            "activityIndex": 5,
            "activityId": 280,
            "name": "The Arvinas' pride."
          },
          {
            "activityIndex": 6,
            "activityId": 281,
            "name": "Blue Road's trees fall just down the hill."
          },
          {
            "activityIndex": 7,
            "activityId": 282,
            "name": "Where bound spirits hold vigil."
          },
          {
            "activityIndex": 8,
            "activityId": 283,
            "name": "Soft wings spin choral garb."
          },
          {
            "activityIndex": 9,
            "activityId": 284,
            "name": "Wedged well in Sedor."
          },
          {
            "activityIndex": 10,
            "activityId": 285,
            "name": "Fractured by the Bloody Hand."
          },
          {
            "activityIndex": 11,
            "activityId": 286,
            "name": "The monarch's buried secret."
          },
          {
            "activityIndex": 12,
            "activityId": 287,
            "name": "Enjoy a good roll in the muck."
          },
          {
            "activityIndex": 13,
            "activityId": 288,
            "name": "Nurtured by amphibious host."
          },
          {
            "activityIndex": 14,
            "activityId": 289,
            "name": "Rushing water in the depths."
          },
          {
            "activityIndex": 15,
            "activityId": 290,
            "name": "Facing the Faceless."
          },
          {
            "activityIndex": 16,
            "activityId": 291,
            "name": "Approach the southern scroll."
          },
          {
            "activityIndex": 17,
            "activityId": 292,
            "name": "Overlooking Ni-Mohk's falls."
          },
          {
            "activityIndex": 18,
            "activityId": 293,
            "name": "Near liquid fire flowing."
          },
          {
            "activityIndex": 19,
            "activityId": 294,
            "name": "Decorating a Nord's manor grounds."
          },
          {
            "activityIndex": 20,
            "activityId": 295,
            "name": "Offering at the priory."
          },
          {
            "activityIndex": 21,
            "activityId": 296,
            "name": "Atop a crumbling Empire."
          },
          {
            "activityIndex": 22,
            "activityId": 297,
            "name": "Home of the goat-faced altar."
          },
          {
            "activityIndex": 23,
            "activityId": 298,
            "name": "Search near the cliffs … cliffs … cliffs …."
          },
          {
            "activityIndex": 24,
            "activityId": 299,
            "name": "Where a ruin-seeking Khajiit is denied."
          },
          {
            "activityIndex": 25,
            "activityId": 300,
            "name": "Bandits' crowning achievement."
          },
          {
            "activityIndex": 26,
            "activityId": 301,
            "name": "Amid reverberations of clattering bones."
          },
          {
            "activityIndex": 27,
            "activityId": 302,
            "name": "Vampires prowl where Elves once lived."
          },
          {
            "activityIndex": 28,
            "activityId": 303,
            "name": "In a cave of crimson treasures."
          },
          {
            "activityIndex": 29,
            "activityId": 304,
            "name": "Surrounded by frozen fungus."
          },
          {
            "activityIndex": 30,
            "activityId": 305,
            "name": "Under shroud and ground."
          },
          {
            "activityIndex": 31,
            "activityId": 306,
            "name": "Within sight of Mnem."
          },
          {
            "activityIndex": 32,
            "activityId": 307,
            "name": "Ascending toward prophecy and dawn."
          },
          {
            "activityIndex": 33,
            "activityId": 308,
            "name": "Helping establish a new town."
          },
          {
            "activityIndex": 34,
            "activityId": 309,
            "name": "Tooth of Jone or Jode."
          },
          {
            "activityIndex": 35,
            "activityId": 310,
            "name": "Ruined spire peering north to the Tower."
          },
          {
            "activityIndex": 36,
            "activityId": 311,
            "name": "Hears hacking to the east."
          },
          {
            "activityIndex": 37,
            "activityId": 312,
            "name": "Upon timbered fingers."
          },
          {
            "activityIndex": 38,
            "activityId": 313,
            "name": "Ruin's crown between three castles."
          },
          {
            "activityIndex": 39,
            "activityId": 314,
            "name": "Where archers of the Eight train."
          },
          {
            "activityIndex": 40,
            "activityId": 315,
            "name": "Six-legged assassins crawl the cave."
          },
          {
            "activityIndex": 41,
            "activityId": 316,
            "name": "The Black Dagger's prize."
          },
          {
            "activityIndex": 42,
            "activityId": 317,
            "name": "Singing straw's song."
          },
          {
            "activityIndex": 43,
            "activityId": 318,
            "name": "Walk the Shadowed Path."
          },
          {
            "activityIndex": 44,
            "activityId": 319,
            "name": "At the end of a bumpy road."
          },
          {
            "activityIndex": 45,
            "activityId": 320,
            "name": "Where bear and ogre burrow."
          },
          {
            "activityIndex": 46,
            "activityId": 321,
            "name": "Where White Fall reaches for Aetherius."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1015,
            "name": "Greenmead Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 1016,
            "name": "Great Forest Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 1017,
            "name": "Nibenay Valley Dolmen"
          },
          {
            "activityIndex": 4,
            "activityId": 1021,
            "name": "Applewatch Wood Dolmen"
          },
          {
            "activityIndex": 5,
            "activityId": 1022,
            "name": "Winter's Reach Dolmen"
          },
          {
            "activityIndex": 6,
            "activityId": 1023,
            "name": "Northwestern Shore Dolmen"
          },
          {
            "activityIndex": 7,
            "activityId": 1025,
            "name": "Eastern Shore Dolmen"
          },
          {
            "activityIndex": 8,
            "activityId": 1026,
            "name": "Niben Basin Dolmen"
          },
          {
            "activityIndex": 9,
            "activityId": 1028,
            "name": "Cheydinhal Foothills Dolmen"
          },
          {
            "activityIndex": 10,
            "activityId": 515,
            "name": "Bruma"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 537,
            "name": "Wooden Hand Outlook"
          },
          {
            "activityIndex": 2,
            "activityId": 652,
            "name": "Empire Tower"
          },
          {
            "activityIndex": 3,
            "activityId": 1447,
            "name": "Abandoned Orchard"
          },
          {
            "activityIndex": 4,
            "activityId": 1450,
            "name": "Moffka's Lament"
          },
          {
            "activityIndex": 5,
            "activityId": 1453,
            "name": "White Fall Mountain"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 163,
            "name": "Aedra and Daedra"
          },
          {
            "activityIndex": 2,
            "activityId": 164,
            "name": "Boethiah's Proving"
          },
          {
            "activityIndex": 3,
            "activityId": 165,
            "name": "The Dreamstride"
          },
          {
            "activityIndex": 4,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 5,
            "activityId": 168,
            "name": "Modern Heretics"
          },
          {
            "activityIndex": 6,
            "activityId": 169,
            "name": "Opusculus Lamae Bal ta Mezzamortie"
          },
          {
            "activityIndex": 7,
            "activityId": 170,
            "name": "The Totems of Hircine"
          },
          {
            "activityIndex": 8,
            "activityId": 171,
            "name": "Fragmentae Abyssum Hermaeus Morus"
          },
          {
            "activityIndex": 9,
            "activityId": 172,
            "name": "The Spawn of Molag Bal"
          },
          {
            "activityIndex": 10,
            "activityId": 153,
            "name": "Galerion the Mystic"
          },
          {
            "activityIndex": 11,
            "activityId": 154,
            "name": "Great Harbingers of the Companions"
          },
          {
            "activityIndex": 12,
            "activityId": 155,
            "name": "The Illusion of Death"
          },
          {
            "activityIndex": 13,
            "activityId": 157,
            "name": "Triumphs of a Monarch, Ch. 3"
          },
          {
            "activityIndex": 14,
            "activityId": 158,
            "name": "Triumphs of a Monarch, Ch. 6"
          },
          {
            "activityIndex": 15,
            "activityId": 159,
            "name": "Triumphs of a Monarch, Ch. 10"
          },
          {
            "activityIndex": 16,
            "activityId": 160,
            "name": "Trials of Saint Alessia"
          },
          {
            "activityIndex": 17,
            "activityId": 161,
            "name": "The All-Beneficent King Fahara'jad"
          },
          {
            "activityIndex": 18,
            "activityId": 173,
            "name": "The Anuad Paraphrased"
          },
          {
            "activityIndex": 19,
            "activityId": 174,
            "name": "The Lunar Lorkhan"
          },
          {
            "activityIndex": 20,
            "activityId": 175,
            "name": "Monomyth: Dragon God & Missing God"
          },
          {
            "activityIndex": 21,
            "activityId": 176,
            "name": "Monomyth: Lorkhan and Satakal"
          },
          {
            "activityIndex": 22,
            "activityId": 178,
            "name": "Monomyth: The Myth of Aurbis"
          },
          {
            "activityIndex": 23,
            "activityId": 179,
            "name": "Monomyth: The Heart of the World"
          },
          {
            "activityIndex": 24,
            "activityId": 180,
            "name": "Nine Commands of the Eight Divines"
          },
          {
            "activityIndex": 25,
            "activityId": 181,
            "name": "Gods and Worship In Tamriel"
          },
          {
            "activityIndex": 26,
            "activityId": 182,
            "name": "Vivec and Mephala"
          },
          {
            "activityIndex": 27,
            "activityId": 183,
            "name": "With Regards to the Ebony Blade"
          },
          {
            "activityIndex": 28,
            "activityId": 184,
            "name": "What is Volendrung?"
          },
          {
            "activityIndex": 29,
            "activityId": 186,
            "name": "War Weather"
          },
          {
            "activityIndex": 30,
            "activityId": 188,
            "name": "The Art of Kwama Egg Cooking"
          },
          {
            "activityIndex": 31,
            "activityId": 190,
            "name": "Where Magical Paths Meet"
          },
          {
            "activityIndex": 32,
            "activityId": 191,
            "name": "Wayrest Sewers: A Short History"
          },
          {
            "activityIndex": 33,
            "activityId": 192,
            "name": "To Posterity"
          },
          {
            "activityIndex": 34,
            "activityId": 193,
            "name": "Ancient Scrolls of the Dwemer I-A"
          },
          {
            "activityIndex": 35,
            "activityId": 195,
            "name": "Ancient Scrolls of the Dwemer II"
          },
          {
            "activityIndex": 36,
            "activityId": 196,
            "name": "Ancient Scrolls of the Dwemer III"
          },
          {
            "activityIndex": 37,
            "activityId": 197,
            "name": "Ancient Scrolls of the Dwemer V"
          },
          {
            "activityIndex": 38,
            "activityId": 198,
            "name": "Ancient Scrolls of the Dwemer VI"
          },
          {
            "activityIndex": 39,
            "activityId": 199,
            "name": "Ancient Scrolls of the Dwemer X"
          },
          {
            "activityIndex": 40,
            "activityId": 200,
            "name": "Ancient Scrolls of the Dwemer XI"
          },
          {
            "activityIndex": 41,
            "activityId": 203,
            "name": "Ancient Scrolls of the Dwemer I-B"
          },
          {
            "activityIndex": 42,
            "activityId": 204,
            "name": "Guylaine's Dwemer Architecture"
          },
          {
            "activityIndex": 43,
            "activityId": 205,
            "name": "Ancient Scrolls of the Dwemer VIII"
          },
          {
            "activityIndex": 44,
            "activityId": 206,
            "name": "Dwemer Inquiries Volume I"
          },
          {
            "activityIndex": 45,
            "activityId": 207,
            "name": "Dwemer Inquiries Volume II"
          },
          {
            "activityIndex": 46,
            "activityId": 208,
            "name": "Dwemer Inquiries Volume III"
          },
          {
            "activityIndex": 47,
            "activityId": 209,
            "name": "Ancient Scrolls of the Dwemer IV"
          },
          {
            "activityIndex": 48,
            "activityId": 202,
            "name": "Dwarven Automatons"
          },
          {
            "activityIndex": 49,
            "activityId": 210,
            "name": "An Accounting of the Elder Scrolls"
          },
          {
            "activityIndex": 50,
            "activityId": 211,
            "name": "The Adabal-a"
          },
          {
            "activityIndex": 51,
            "activityId": 212,
            "name": "The Amulet of Kings"
          },
          {
            "activityIndex": 52,
            "activityId": 213,
            "name": "The Cleansing of the Fane"
          },
          {
            "activityIndex": 53,
            "activityId": 214,
            "name": "The Exclusionary Mandates"
          },
          {
            "activityIndex": 54,
            "activityId": 215,
            "name": "The Last King of the Ayleids"
          },
          {
            "activityIndex": 55,
            "activityId": 216,
            "name": "The Order of the Ancestor Moth"
          },
          {
            "activityIndex": 56,
            "activityId": 219,
            "name": "Tamrielic Artifacts, Part Three"
          },
          {
            "activityIndex": 57,
            "activityId": 222,
            "name": "The Homilies of Blessed Almalexia"
          },
          {
            "activityIndex": 58,
            "activityId": 223,
            "name": "The Legendary Scourge"
          },
          {
            "activityIndex": 59,
            "activityId": 225,
            "name": "The Lusty Argonian Maid, Vol. 2"
          },
          {
            "activityIndex": 60,
            "activityId": 227,
            "name": "Myths of Sheogorath, Volume 2"
          },
          {
            "activityIndex": 61,
            "activityId": 228,
            "name": "The Red Book of Riddles"
          },
          {
            "activityIndex": 62,
            "activityId": 230,
            "name": "16 Accords of Madness, Vol. VI"
          },
          {
            "activityIndex": 63,
            "activityId": 231,
            "name": "Crow and Raven: Three Short Fables"
          },
          {
            "activityIndex": 64,
            "activityId": 232,
            "name": "Wabbajack"
          },
          {
            "activityIndex": 65,
            "activityId": 224,
            "name": "The Lusty Argonian Maid, Vol. 1"
          },
          {
            "activityIndex": 66,
            "activityId": 239,
            "name": "Reality and Other Falsehoods"
          },
          {
            "activityIndex": 67,
            "activityId": 240,
            "name": "Guild Memo on Soul-Trapping"
          },
          {
            "activityIndex": 68,
            "activityId": 242,
            "name": "Proposal: Schools of Magic"
          },
          {
            "activityIndex": 69,
            "activityId": 241,
            "name": "Wayshrines of Tamriel"
          },
          {
            "activityIndex": 70,
            "activityId": 236,
            "name": "Manual of Spellcraft"
          },
          {
            "activityIndex": 71,
            "activityId": 234,
            "name": "Liminal Bridges"
          },
          {
            "activityIndex": 72,
            "activityId": 233,
            "name": "Arcana Restored"
          },
          {
            "activityIndex": 73,
            "activityId": 235,
            "name": "Magic from the Sky"
          },
          {
            "activityIndex": 74,
            "activityId": 243,
            "name": "Before the Ages of Man: Dawn Era"
          },
          {
            "activityIndex": 75,
            "activityId": 244,
            "name": "Before the Ages of Man: Merethic Era"
          },
          {
            "activityIndex": 76,
            "activityId": 245,
            "name": "Ebony Blade History"
          },
          {
            "activityIndex": 77,
            "activityId": 246,
            "name": "Noxiphilic Sanguivoria"
          },
          {
            "activityIndex": 78,
            "activityId": 247,
            "name": "A Werewolf's Confession"
          },
          {
            "activityIndex": 79,
            "activityId": 248,
            "name": "The Firmament"
          },
          {
            "activityIndex": 80,
            "activityId": 249,
            "name": "The Pig Children"
          },
          {
            "activityIndex": 81,
            "activityId": 250,
            "name": "Ruminations on the Elder Scrolls"
          },
          {
            "activityIndex": 82,
            "activityId": 252,
            "name": "The Consecrations of Arkay"
          },
          {
            "activityIndex": 83,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 84,
            "activityId": 254,
            "name": "Darkest Darkness"
          },
          {
            "activityIndex": 85,
            "activityId": 258,
            "name": "Spirit of the Daedra"
          },
          {
            "activityIndex": 86,
            "activityId": 259,
            "name": "Varieties of Daedra, Part 1"
          },
          {
            "activityIndex": 87,
            "activityId": 260,
            "name": "Varieties of Daedra, Part 2"
          },
          {
            "activityIndex": 88,
            "activityId": 262,
            "name": "On the Nature of Coldharbour"
          },
          {
            "activityIndex": 89,
            "activityId": 255,
            "name": "The Doors of Oblivion, Part 1"
          },
          {
            "activityIndex": 90,
            "activityId": 263,
            "name": "The Battle of Glenumbria Moors"
          },
          {
            "activityIndex": 91,
            "activityId": 264,
            "name": "The Book of Dawn and Dusk"
          },
          {
            "activityIndex": 92,
            "activityId": 265,
            "name": "The Cantatas of Vivec"
          },
          {
            "activityIndex": 93,
            "activityId": 266,
            "name": "The Five Far Stars"
          },
          {
            "activityIndex": 94,
            "activityId": 268,
            "name": "Ode to the Tundrastriders"
          },
          {
            "activityIndex": 95,
            "activityId": 269,
            "name": "Proper-Life: Three Chants"
          },
          {
            "activityIndex": 96,
            "activityId": 270,
            "name": "Song of the Askelde Men"
          },
          {
            "activityIndex": 97,
            "activityId": 271,
            "name": "The Warrior's Charge"
          },
          {
            "activityIndex": 98,
            "activityId": 272,
            "name": "Words of the Wind"
          },
          {
            "activityIndex": 99,
            "activityId": 273,
            "name": "Ayleid Inscriptions Translated"
          },
          {
            "activityIndex": 100,
            "activityId": 274,
            "name": "Frontier, Conquest"
          },
          {
            "activityIndex": 101,
            "activityId": 275,
            "name": "History of the Fighters Guild Pt. 1"
          },
          {
            "activityIndex": 102,
            "activityId": 276,
            "name": "History of the Fighters Guild Pt. 2"
          },
          {
            "activityIndex": 103,
            "activityId": 277,
            "name": "Origin of the Mages Guild"
          },
          {
            "activityIndex": 104,
            "activityId": 278,
            "name": "Eulogy for Emperor Varen"
          },
          {
            "activityIndex": 105,
            "activityId": 279,
            "name": "House Tharn of Nibenay"
          },
          {
            "activityIndex": 106,
            "activityId": 280,
            "name": "The Order of the Black Worm"
          },
          {
            "activityIndex": 107,
            "activityId": 281,
            "name": "Return to Orsinium"
          },
          {
            "activityIndex": 108,
            "activityId": 282,
            "name": "The Second Akaviri Invasion"
          },
          {
            "activityIndex": 109,
            "activityId": 251,
            "name": "Sithis"
          },
          {
            "activityIndex": 110,
            "activityId": 156,
            "name": "Jorunn the Skald-King"
          },
          {
            "activityIndex": 111,
            "activityId": 237,
            "name": "The Old Ways"
          },
          {
            "activityIndex": 112,
            "activityId": 189,
            "name": "The Binding Stone"
          },
          {
            "activityIndex": 113,
            "activityId": 201,
            "name": "Antecedents of Dwemer Law"
          },
          {
            "activityIndex": 114,
            "activityId": 256,
            "name": "The Doors of Oblivion, Part 2"
          },
          {
            "activityIndex": 115,
            "activityId": 257,
            "name": "On Oblivion"
          },
          {
            "activityIndex": 116,
            "activityId": 187,
            "name": "Civility and Etiquette: Wood Orcs I"
          },
          {
            "activityIndex": 117,
            "activityId": 167,
            "name": "Invocation of Azura"
          },
          {
            "activityIndex": 118,
            "activityId": 218,
            "name": "Tamrielic Artifacts, Part Two"
          },
          {
            "activityIndex": 119,
            "activityId": 238,
            "name": "On the Detachment of the Sheath"
          },
          {
            "activityIndex": 120,
            "activityId": 177,
            "name": "Monomyth: \"Shezarr's Song\""
          },
          {
            "activityIndex": 121,
            "activityId": 162,
            "name": "Ayrenn: The Unforeseen Queen"
          },
          {
            "activityIndex": 122,
            "activityId": 261,
            "name": "The Slave Pits of Coldharbour"
          },
          {
            "activityIndex": 123,
            "activityId": 185,
            "name": "The Thief God's Treasures"
          },
          {
            "activityIndex": 124,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          },
          {
            "activityIndex": 125,
            "activityId": 226,
            "name": "Myths of Sheogorath, Volume 1"
          },
          {
            "activityIndex": 126,
            "activityId": 217,
            "name": "Tamrielic Artifacts, Part One"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1042,
            "name": "The Apprentice"
          },
          {
            "activityIndex": 2,
            "activityId": 1043,
            "name": "The Atronach"
          },
          {
            "activityIndex": 3,
            "activityId": 1044,
            "name": "The Lady"
          },
          {
            "activityIndex": 4,
            "activityId": 1045,
            "name": "The Warrior"
          },
          {
            "activityIndex": 5,
            "activityId": 1046,
            "name": "The Mage"
          },
          {
            "activityIndex": 6,
            "activityId": 1047,
            "name": "The Thief"
          },
          {
            "activityIndex": 7,
            "activityId": 1048,
            "name": "The Lover"
          },
          {
            "activityIndex": 8,
            "activityId": 1049,
            "name": "The Serpent"
          },
          {
            "activityIndex": 9,
            "activityId": 1050,
            "name": "The Ritual"
          },
          {
            "activityIndex": 10,
            "activityId": 1051,
            "name": "The Tower"
          },
          {
            "activityIndex": 11,
            "activityId": 1052,
            "name": "The Steed"
          },
          {
            "activityIndex": 12,
            "activityId": 1053,
            "name": "The Shadow"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2272,
            "name": "Cropsford Armory"
          },
          {
            "activityIndex": 2,
            "activityId": 2273,
            "name": "Vlastarus Armory"
          },
          {
            "activityIndex": 3,
            "activityId": 2274,
            "name": "Bruma Armory"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 57,
    "name": "Deshaan",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5057,
            "name": "Bad Medicine"
          },
          {
            "activityIndex": 2,
            "activityId": 5067,
            "name": "Proprietary Formula"
          },
          {
            "activityIndex": 3,
            "activityId": 5068,
            "name": "Quest for the Cure"
          },
          {
            "activityIndex": 4,
            "activityId": 3610,
            "name": "For Their Own Protection"
          },
          {
            "activityIndex": 5,
            "activityId": 3659,
            "name": "Unwanted Guests"
          },
          {
            "activityIndex": 6,
            "activityId": 3652,
            "name": "Fighting Back"
          },
          {
            "activityIndex": 7,
            "activityId": 3653,
            "name": "Ratting Them Out"
          },
          {
            "activityIndex": 8,
            "activityId": 3660,
            "name": "Hiding in Plain Sight"
          },
          {
            "activityIndex": 9,
            "activityId": 3673,
            "name": "Death Trap"
          },
          {
            "activityIndex": 10,
            "activityId": 3705,
            "name": "Payback"
          },
          {
            "activityIndex": 11,
            "activityId": 3797,
            "name": "Plague Bringer"
          },
          {
            "activityIndex": 12,
            "activityId": 4453,
            "name": "A Favor Returned"
          },
          {
            "activityIndex": 13,
            "activityId": 4459,
            "name": "The Mournhold Underground"
          },
          {
            "activityIndex": 14,
            "activityId": 3817,
            "name": "The Seal of Three"
          },
          {
            "activityIndex": 15,
            "activityId": 3818,
            "name": "A Saint Asunder"
          },
          {
            "activityIndex": 16,
            "activityId": 3749,
            "name": "Into the Mouth of Madness"
          },
          {
            "activityIndex": 17,
            "activityId": 3810,
            "name": "Motive for Heresy"
          },
          {
            "activityIndex": 18,
            "activityId": 3831,
            "name": "The Judgment of Veloth"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 269,
            "name": "Malak's Maw"
          },
          {
            "activityIndex": 2,
            "activityId": 276,
            "name": "Silent Mire"
          },
          {
            "activityIndex": 3,
            "activityId": 282,
            "name": "Muth Gnaar"
          },
          {
            "activityIndex": 4,
            "activityId": 283,
            "name": "Deepcrag Den"
          },
          {
            "activityIndex": 5,
            "activityId": 286,
            "name": "Quarantine Serk"
          },
          {
            "activityIndex": 6,
            "activityId": 93,
            "name": "Narsis"
          },
          {
            "activityIndex": 7,
            "activityId": 295,
            "name": "Tal'Deic Fortress"
          },
          {
            "activityIndex": 8,
            "activityId": 302,
            "name": "Mzithumz"
          },
          {
            "activityIndex": 9,
            "activityId": 303,
            "name": "Vale of the Ghost Snake"
          },
          {
            "activityIndex": 10,
            "activityId": 321,
            "name": "Obsidian Gorge"
          },
          {
            "activityIndex": 11,
            "activityId": 329,
            "name": "Eidolon's Hollow"
          },
          {
            "activityIndex": 12,
            "activityId": 270,
            "name": "Mournhold"
          },
          {
            "activityIndex": 13,
            "activityId": 408,
            "name": "Tribunal Temple"
          },
          {
            "activityIndex": 14,
            "activityId": 327,
            "name": "Shrine of Saint Veloth"
          },
          {
            "activityIndex": 15,
            "activityId": 448,
            "name": "Shad Astula"
          },
          {
            "activityIndex": 16,
            "activityId": 330,
            "name": "Selfora"
          },
          {
            "activityIndex": 17,
            "activityId": 342,
            "name": "Bthanual"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 595,
            "name": "Deshaan Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 388,
            "name": "Forgotten Crypts Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 370,
            "name": "Forgotten Crypts Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 478,
            "name": "Deshaan Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 697,
            "name": "West Narsis Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 698,
            "name": "Muth Gnaar Hills Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 699,
            "name": "Quarantine Serk Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 700,
            "name": "Ghost Snake Vale Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 701,
            "name": "Mournhold Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 702,
            "name": "Tal'Deic Grounds Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 703,
            "name": "Obsidian Gorge Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 704,
            "name": "Mzithumz Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 706,
            "name": "Selfora Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 707,
            "name": "Silent Mire Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 708,
            "name": "Eidolon's Hollow Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 1059,
            "name": "Shad Astula Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 660,
            "name": "Lady Llarel's Shelter"
          },
          {
            "activityIndex": 2,
            "activityId": 661,
            "name": "Lower Bthanual"
          },
          {
            "activityIndex": 3,
            "activityId": 662,
            "name": "Triple Circle Mine"
          },
          {
            "activityIndex": 4,
            "activityId": 663,
            "name": "Taleon's Crag"
          },
          {
            "activityIndex": 5,
            "activityId": 664,
            "name": "Knife Ear Grotto"
          },
          {
            "activityIndex": 6,
            "activityId": 665,
            "name": "The Corpse Garden"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 23,
            "name": "Free from quarantine."
          },
          {
            "activityIndex": 2,
            "activityId": 24,
            "name": "A Hlaalu victory in Narsis."
          },
          {
            "activityIndex": 3,
            "activityId": 25,
            "name": "A river view on Muth Gnaar's outskirts."
          },
          {
            "activityIndex": 4,
            "activityId": 26,
            "name": "A twin falls in Mournhold."
          },
          {
            "activityIndex": 5,
            "activityId": 27,
            "name": "Near the remnants of a House caravan."
          },
          {
            "activityIndex": 6,
            "activityId": 28,
            "name": "Follow the river that snakes south to its source."
          },
          {
            "activityIndex": 7,
            "activityId": 29,
            "name": "Search near the cavern with three eyes."
          },
          {
            "activityIndex": 8,
            "activityId": 30,
            "name": "The right tower is Tal'Deic's left."
          },
          {
            "activityIndex": 9,
            "activityId": 31,
            "name": "Where ships dock and mushrooms Mire."
          },
          {
            "activityIndex": 10,
            "activityId": 32,
            "name": "Where the dead walk and no memories linger."
          },
          {
            "activityIndex": 11,
            "activityId": 33,
            "name": "Lend me your ear."
          },
          {
            "activityIndex": 12,
            "activityId": 34,
            "name": "Where a lady seeks kwama before the storm."
          },
          {
            "activityIndex": 13,
            "activityId": 35,
            "name": "Asleep in the depths, the Dwemer awakens."
          },
          {
            "activityIndex": 14,
            "activityId": 36,
            "name": "Mind your step where the water drops in."
          },
          {
            "activityIndex": 15,
            "activityId": 37,
            "name": "Go from Crags to riches."
          },
          {
            "activityIndex": 16,
            "activityId": 38,
            "name": "Where corpses till a garden of sand."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 783,
            "name": "Redolent Loam Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 784,
            "name": "Lagomere Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 785,
            "name": "Siltreen Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1188,
            "name": "Short-Tusk's Hillock"
          },
          {
            "activityIndex": 2,
            "activityId": 1189,
            "name": "Grove of the Abomination"
          },
          {
            "activityIndex": 3,
            "activityId": 1190,
            "name": "Dire Bramblepatch"
          },
          {
            "activityIndex": 4,
            "activityId": 1191,
            "name": "Mabrigash Burial Circle"
          },
          {
            "activityIndex": 5,
            "activityId": 1192,
            "name": "Druitularg's Ritual Altar"
          },
          {
            "activityIndex": 6,
            "activityId": 1193,
            "name": "Caravan Crest"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1393,
            "name": "House Dres Farmstead"
          },
          {
            "activityIndex": 2,
            "activityId": 1397,
            "name": "Old Ida's Cottage"
          },
          {
            "activityIndex": 3,
            "activityId": 1398,
            "name": "Shrine to Saint Rilms"
          },
          {
            "activityIndex": 4,
            "activityId": 1399,
            "name": "Coiled Path Landing"
          },
          {
            "activityIndex": 5,
            "activityId": 1400,
            "name": "Smuggler's Slip"
          },
          {
            "activityIndex": 6,
            "activityId": 1401,
            "name": "Redoran Pier"
          },
          {
            "activityIndex": 7,
            "activityId": 1402,
            "name": "Hlanii's Hovel"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 165,
            "name": "The Dreamstride"
          },
          {
            "activityIndex": 2,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 3,
            "activityId": 176,
            "name": "Monomyth: Lorkhan and Satakal"
          },
          {
            "activityIndex": 4,
            "activityId": 177,
            "name": "Monomyth: \"Shezarr's Song\""
          },
          {
            "activityIndex": 5,
            "activityId": 178,
            "name": "Monomyth: The Myth of Aurbis"
          },
          {
            "activityIndex": 6,
            "activityId": 197,
            "name": "Ancient Scrolls of the Dwemer V"
          },
          {
            "activityIndex": 7,
            "activityId": 198,
            "name": "Ancient Scrolls of the Dwemer VI"
          },
          {
            "activityIndex": 8,
            "activityId": 199,
            "name": "Ancient Scrolls of the Dwemer X"
          },
          {
            "activityIndex": 9,
            "activityId": 233,
            "name": "Arcana Restored"
          },
          {
            "activityIndex": 10,
            "activityId": 234,
            "name": "Liminal Bridges"
          },
          {
            "activityIndex": 11,
            "activityId": 235,
            "name": "Magic from the Sky"
          },
          {
            "activityIndex": 12,
            "activityId": 236,
            "name": "Manual of Spellcraft"
          },
          {
            "activityIndex": 13,
            "activityId": 237,
            "name": "The Old Ways"
          },
          {
            "activityIndex": 14,
            "activityId": 238,
            "name": "On the Detachment of the Sheath"
          },
          {
            "activityIndex": 15,
            "activityId": 239,
            "name": "Reality and Other Falsehoods"
          },
          {
            "activityIndex": 16,
            "activityId": 240,
            "name": "Guild Memo on Soul-Trapping"
          },
          {
            "activityIndex": 17,
            "activityId": 243,
            "name": "Before the Ages of Man: Dawn Era"
          },
          {
            "activityIndex": 18,
            "activityId": 244,
            "name": "Before the Ages of Man: Merethic Era"
          },
          {
            "activityIndex": 19,
            "activityId": 245,
            "name": "Ebony Blade History"
          },
          {
            "activityIndex": 20,
            "activityId": 246,
            "name": "Noxiphilic Sanguivoria"
          },
          {
            "activityIndex": 21,
            "activityId": 247,
            "name": "A Werewolf's Confession"
          },
          {
            "activityIndex": 22,
            "activityId": 570,
            "name": "The Living Gods"
          },
          {
            "activityIndex": 23,
            "activityId": 571,
            "name": "The Judgment of Saint Veloth"
          },
          {
            "activityIndex": 24,
            "activityId": 572,
            "name": "Kwama Mining for Fun and Profit"
          },
          {
            "activityIndex": 25,
            "activityId": 573,
            "name": "Shad Astula Academy Handbook"
          },
          {
            "activityIndex": 26,
            "activityId": 574,
            "name": "Dwemer Dungeons: What I Know"
          },
          {
            "activityIndex": 27,
            "activityId": 575,
            "name": "Legend of the Ghost Snake"
          },
          {
            "activityIndex": 28,
            "activityId": 576,
            "name": "War of Two Houses"
          },
          {
            "activityIndex": 29,
            "activityId": 577,
            "name": "A Pocket Guide to Mournhold"
          },
          {
            "activityIndex": 30,
            "activityId": 578,
            "name": "Sanctioned Murder"
          },
          {
            "activityIndex": 31,
            "activityId": 579,
            "name": "Dark Ruins"
          },
          {
            "activityIndex": 32,
            "activityId": 188,
            "name": "The Art of Kwama Egg Cooking"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 434,
            "name": "The Tower"
          },
          {
            "activityIndex": 2,
            "activityId": 435,
            "name": "The Mage"
          },
          {
            "activityIndex": 3,
            "activityId": 436,
            "name": "The Lord"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 602,
            "name": "Forgotten Crypts"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1394,
            "name": "Avayan's Farm"
          },
          {
            "activityIndex": 2,
            "activityId": 1395,
            "name": "Lake Hlaalu Retreat"
          },
          {
            "activityIndex": 3,
            "activityId": 1396,
            "name": "Berezan's Mine"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 101,
    "name": "Eastmarch",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4058,
            "name": "Shadows Over Windhelm"
          },
          {
            "activityIndex": 2,
            "activityId": 4059,
            "name": "The Konunleikar"
          },
          {
            "activityIndex": 3,
            "activityId": 4060,
            "name": "Windhelm's Champion"
          },
          {
            "activityIndex": 4,
            "activityId": 4061,
            "name": "One Victor, One King"
          },
          {
            "activityIndex": 5,
            "activityId": 4062,
            "name": "Blindsided"
          },
          {
            "activityIndex": 6,
            "activityId": 4071,
            "name": "Sleep for the Dead"
          },
          {
            "activityIndex": 7,
            "activityId": 4150,
            "name": "Sleeping on the Job"
          },
          {
            "activityIndex": 8,
            "activityId": 4158,
            "name": "The Pride of a Prince"
          },
          {
            "activityIndex": 9,
            "activityId": 4166,
            "name": "The War Council"
          },
          {
            "activityIndex": 10,
            "activityId": 4205,
            "name": "Our Poor Town"
          },
          {
            "activityIndex": 11,
            "activityId": 4075,
            "name": "A Right to Live"
          },
          {
            "activityIndex": 12,
            "activityId": 4106,
            "name": "The Better of Two Evils"
          },
          {
            "activityIndex": 13,
            "activityId": 4203,
            "name": "Lifeline"
          },
          {
            "activityIndex": 14,
            "activityId": 4115,
            "name": "Eternal Slumber"
          },
          {
            "activityIndex": 15,
            "activityId": 4123,
            "name": "Gods Save the King"
          },
          {
            "activityIndex": 16,
            "activityId": 4069,
            "name": "Making Amends"
          },
          {
            "activityIndex": 17,
            "activityId": 4078,
            "name": "A Council of Thanes"
          },
          {
            "activityIndex": 18,
            "activityId": 4116,
            "name": "Snow and Flame"
          },
          {
            "activityIndex": 19,
            "activityId": 4117,
            "name": "Songs of Sovngarde"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 517,
            "name": "Thulvald's Logging Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 536,
            "name": "Lower Yorgrim"
          },
          {
            "activityIndex": 3,
            "activityId": 557,
            "name": "Kynesgrove"
          },
          {
            "activityIndex": 4,
            "activityId": 560,
            "name": "Windhelm"
          },
          {
            "activityIndex": 5,
            "activityId": 561,
            "name": "Fort Morvunskar"
          },
          {
            "activityIndex": 6,
            "activityId": 575,
            "name": "Cradlecrush"
          },
          {
            "activityIndex": 7,
            "activityId": 580,
            "name": "Mzulft"
          },
          {
            "activityIndex": 8,
            "activityId": 583,
            "name": "Wittestadr"
          },
          {
            "activityIndex": 9,
            "activityId": 590,
            "name": "Bonestrewn Crest"
          },
          {
            "activityIndex": 10,
            "activityId": 603,
            "name": "Fort Amol"
          },
          {
            "activityIndex": 11,
            "activityId": 615,
            "name": "Mistwatch"
          },
          {
            "activityIndex": 12,
            "activityId": 543,
            "name": "Voljar's Meadery"
          },
          {
            "activityIndex": 13,
            "activityId": 597,
            "name": "Lost Knife Cave"
          },
          {
            "activityIndex": 14,
            "activityId": 596,
            "name": "Cragwallow"
          },
          {
            "activityIndex": 15,
            "activityId": 564,
            "name": "Jorunn's Stand"
          },
          {
            "activityIndex": 16,
            "activityId": 633,
            "name": "Skuldafn"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 600,
            "name": "Eastmarch Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 381,
            "name": "Hall of the Dead Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 376,
            "name": "Hall of the Dead Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 480,
            "name": "Eastmarch Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 604,
            "name": "Windhelm Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 605,
            "name": "Fort Morvunskar Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 606,
            "name": "Kynesgrove Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 607,
            "name": "Voljar Meadery Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 608,
            "name": "Cradlecrush Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 609,
            "name": "Fort Amol Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 610,
            "name": "Wittestadr Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 611,
            "name": "Mistwatch Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 612,
            "name": "Jorunn's Stand Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 613,
            "name": "Logging Camp Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 614,
            "name": "Skuldafn Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 619,
            "name": "The Chill Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 620,
            "name": "Icehammer's Vault"
          },
          {
            "activityIndex": 3,
            "activityId": 621,
            "name": "Old Sord's Cave"
          },
          {
            "activityIndex": 4,
            "activityId": 622,
            "name": "The Frigid Grotto"
          },
          {
            "activityIndex": 5,
            "activityId": 623,
            "name": "Stormcrag Crypt"
          },
          {
            "activityIndex": 6,
            "activityId": 624,
            "name": "The Bastard's Tomb"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 55,
            "name": "Nestled beside Morvunskar's royal tomb."
          },
          {
            "activityIndex": 2,
            "activityId": 56,
            "name": "Giants despoil the village below."
          },
          {
            "activityIndex": 3,
            "activityId": 57,
            "name": "Leave the hollow to cure the chill."
          },
          {
            "activityIndex": 4,
            "activityId": 58,
            "name": "Strewn between tusks near the barrow."
          },
          {
            "activityIndex": 5,
            "activityId": 59,
            "name": "Beside a bridge to Amol."
          },
          {
            "activityIndex": 6,
            "activityId": 60,
            "name": "Lost in ruins beyond the grotto."
          },
          {
            "activityIndex": 7,
            "activityId": 61,
            "name": "Mzulft's secrets are not all underground."
          },
          {
            "activityIndex": 8,
            "activityId": 62,
            "name": "Attempting to spy on Aelif."
          },
          {
            "activityIndex": 9,
            "activityId": 63,
            "name": "Stashed near a farm in icy winds."
          },
          {
            "activityIndex": 10,
            "activityId": 64,
            "name": "An illegitimate child's reading material."
          },
          {
            "activityIndex": 11,
            "activityId": 65,
            "name": "Search the slipperiest places in the hollow."
          },
          {
            "activityIndex": 12,
            "activityId": 66,
            "name": "Three eyes gleam, a frigid prize."
          },
          {
            "activityIndex": 13,
            "activityId": 67,
            "name": "Crashed from the sky to open the vault."
          },
          {
            "activityIndex": 14,
            "activityId": 68,
            "name": "Old Sord excelled at hide-and-seek."
          },
          {
            "activityIndex": 15,
            "activityId": 69,
            "name": "Among the dead, sheltered from storms."
          },
          {
            "activityIndex": 16,
            "activityId": 70,
            "name": "Near a throne in the Hall of the Dead."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 840,
            "name": "Giant's Run Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 841,
            "name": "Frostwater Tundra Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 842,
            "name": "Icewind Peaks Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1200,
            "name": "Rageclaw's Den"
          },
          {
            "activityIndex": 2,
            "activityId": 1201,
            "name": "Dragon Mound"
          },
          {
            "activityIndex": 3,
            "activityId": 1202,
            "name": "Ratmaster's Prowl"
          },
          {
            "activityIndex": 4,
            "activityId": 1203,
            "name": "Dragon's Hallow"
          },
          {
            "activityIndex": 5,
            "activityId": 1204,
            "name": "Ammabani's Pride"
          },
          {
            "activityIndex": 6,
            "activityId": 1205,
            "name": "Swiftblade's Camp"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1415,
            "name": "Darkwater Crossing"
          },
          {
            "activityIndex": 2,
            "activityId": 1416,
            "name": "Giant's Heart"
          },
          {
            "activityIndex": 3,
            "activityId": 1417,
            "name": "Ragnthar"
          },
          {
            "activityIndex": 4,
            "activityId": 1418,
            "name": "Cragwallow Cave"
          },
          {
            "activityIndex": 5,
            "activityId": 1420,
            "name": "Bitterblade's Camp"
          },
          {
            "activityIndex": 6,
            "activityId": 1423,
            "name": "Hermit's Hideout"
          },
          {
            "activityIndex": 7,
            "activityId": 1424,
            "name": "Thane Jeggi's Drinking Hole"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 169,
            "name": "Opusculus Lamae Bal ta Mezzamortie"
          },
          {
            "activityIndex": 2,
            "activityId": 170,
            "name": "The Totems of Hircine"
          },
          {
            "activityIndex": 3,
            "activityId": 203,
            "name": "Ancient Scrolls of the Dwemer I-B"
          },
          {
            "activityIndex": 4,
            "activityId": 204,
            "name": "Guylaine's Dwemer Architecture"
          },
          {
            "activityIndex": 5,
            "activityId": 205,
            "name": "Ancient Scrolls of the Dwemer VIII"
          },
          {
            "activityIndex": 6,
            "activityId": 210,
            "name": "An Accounting of the Elder Scrolls"
          },
          {
            "activityIndex": 7,
            "activityId": 211,
            "name": "The Adabal-a"
          },
          {
            "activityIndex": 8,
            "activityId": 212,
            "name": "The Amulet of Kings"
          },
          {
            "activityIndex": 9,
            "activityId": 213,
            "name": "The Cleansing of the Fane"
          },
          {
            "activityIndex": 10,
            "activityId": 214,
            "name": "The Exclusionary Mandates"
          },
          {
            "activityIndex": 11,
            "activityId": 215,
            "name": "The Last King of the Ayleids"
          },
          {
            "activityIndex": 12,
            "activityId": 216,
            "name": "The Order of the Ancestor Moth"
          },
          {
            "activityIndex": 13,
            "activityId": 217,
            "name": "Tamrielic Artifacts, Part One"
          },
          {
            "activityIndex": 14,
            "activityId": 218,
            "name": "Tamrielic Artifacts, Part Two"
          },
          {
            "activityIndex": 15,
            "activityId": 219,
            "name": "Tamrielic Artifacts, Part Three"
          },
          {
            "activityIndex": 16,
            "activityId": 263,
            "name": "The Battle of Glenumbria Moors"
          },
          {
            "activityIndex": 17,
            "activityId": 264,
            "name": "The Book of Dawn and Dusk"
          },
          {
            "activityIndex": 18,
            "activityId": 265,
            "name": "The Cantatas of Vivec"
          },
          {
            "activityIndex": 19,
            "activityId": 266,
            "name": "The Five Far Stars"
          },
          {
            "activityIndex": 20,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          },
          {
            "activityIndex": 21,
            "activityId": 268,
            "name": "Ode to the Tundrastriders"
          },
          {
            "activityIndex": 22,
            "activityId": 471,
            "name": "The Brothers' War"
          },
          {
            "activityIndex": 23,
            "activityId": 472,
            "name": "Second Invasion: Reports"
          },
          {
            "activityIndex": 24,
            "activityId": 473,
            "name": "The Ternion Monks"
          },
          {
            "activityIndex": 25,
            "activityId": 474,
            "name": "Orcs of Skyrim"
          },
          {
            "activityIndex": 26,
            "activityId": 475,
            "name": "The Crown of Freydis"
          },
          {
            "activityIndex": 27,
            "activityId": 476,
            "name": "Spirits of Skyrim"
          },
          {
            "activityIndex": 28,
            "activityId": 477,
            "name": "All About Giants"
          },
          {
            "activityIndex": 29,
            "activityId": 478,
            "name": "The Stormfist Clan"
          },
          {
            "activityIndex": 30,
            "activityId": 479,
            "name": "On Stepping Lightly"
          },
          {
            "activityIndex": 31,
            "activityId": 480,
            "name": "Dreamwalkers"
          },
          {
            "activityIndex": 32,
            "activityId": 192,
            "name": "To Posterity"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 519,
            "name": "The Thief"
          },
          {
            "activityIndex": 2,
            "activityId": 520,
            "name": "The Warrior"
          },
          {
            "activityIndex": 3,
            "activityId": 522,
            "name": "The Ritual"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 720,
            "name": "Hall of the Dead"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1419,
            "name": "Hammerhome"
          },
          {
            "activityIndex": 2,
            "activityId": 1421,
            "name": "Tinkerer Tobin's Workshop"
          },
          {
            "activityIndex": 3,
            "activityId": 1422,
            "name": "Crimson Kada's Crafting Cavern"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1383,
    "name": "Galen",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6849,
            "name": "A Sea of Troubles"
          },
          {
            "activityIndex": 2,
            "activityId": 6850,
            "name": "Tides of Ruin"
          },
          {
            "activityIndex": 3,
            "activityId": 6855,
            "name": "Seeds of Destruction"
          },
          {
            "activityIndex": 4,
            "activityId": 6859,
            "name": "The Siege of Vastyr"
          },
          {
            "activityIndex": 5,
            "activityId": 6852,
            "name": "The Dream of Kasorayn"
          },
          {
            "activityIndex": 6,
            "activityId": 6853,
            "name": "Guardian of Y'ffelon"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2552,
            "name": "Y'ffre's Path"
          },
          {
            "activityIndex": 2,
            "activityId": 2553,
            "name": "Llanshara"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3498,
            "name": "Welcome to Galen"
          },
          {
            "activityIndex": 2,
            "activityId": 3506,
            "name": "Galen Grand Adventurer"
          },
          {
            "activityIndex": 3,
            "activityId": 3491,
            "name": "Galen Master Explorer"
          },
          {
            "activityIndex": 4,
            "activityId": 3502,
            "name": "The Best of Friends"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2584,
            "name": "Vastyr Outskirts Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2585,
            "name": "Glimmertarn Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2586,
            "name": "Embervine Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2587,
            "name": "Llanshara Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2588,
            "name": "Y'ffre's Path Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2589,
            "name": "Vastyr Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2590,
            "name": "Eastern Shores Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2555,
            "name": "Embervine"
          },
          {
            "activityIndex": 2,
            "activityId": 2556,
            "name": "Fauns' Thicket"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 522,
            "name": "Through a lofty tunnel in Glimmertarn, on a balcony with a view."
          },
          {
            "activityIndex": 2,
            "activityId": 523,
            "name": "Found near a curious bridge made from a large tree near Ivyhame."
          },
          {
            "activityIndex": 3,
            "activityId": 524,
            "name": "Between two boulders in the hills northwest of Tuinh."
          },
          {
            "activityIndex": 4,
            "activityId": 525,
            "name": "Southeast of Fauns' Thicket on a bluff, surrounded by rocks."
          },
          {
            "activityIndex": 5,
            "activityId": 526,
            "name": "Inside Fauns' Thicket, on ruined stairs in the southern cliffs."
          },
          {
            "activityIndex": 6,
            "activityId": 527,
            "name": "Overlooking the magma pools near the northern tip of Embervine."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2562,
            "name": "Vastyr Outskirts Volcanic Vent"
          },
          {
            "activityIndex": 2,
            "activityId": 2563,
            "name": "Farpoint Volcanic Vent"
          },
          {
            "activityIndex": 3,
            "activityId": 2564,
            "name": "Llanshara Volcanic Vent"
          },
          {
            "activityIndex": 4,
            "activityId": 2565,
            "name": "Telling Stone Volcanic Vent"
          },
          {
            "activityIndex": 5,
            "activityId": 2566,
            "name": "Eastern Shores Volcanic Vent"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2557,
            "name": "Valley of the Watcher"
          },
          {
            "activityIndex": 2,
            "activityId": 2558,
            "name": "Grove of the Chimera"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2567,
            "name": "Windwrack Fort"
          },
          {
            "activityIndex": 2,
            "activityId": 2570,
            "name": "Castle Tonnere"
          },
          {
            "activityIndex": 3,
            "activityId": 2571,
            "name": "Glimmertarn"
          },
          {
            "activityIndex": 4,
            "activityId": 2572,
            "name": "Clohaigh"
          },
          {
            "activityIndex": 5,
            "activityId": 2574,
            "name": "Ivyhame"
          },
          {
            "activityIndex": 6,
            "activityId": 2576,
            "name": "The Telling Stone"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 12,
            "name": "Guide to the Daggerfall Covenant"
          },
          {
            "activityIndex": 2,
            "activityId": 14,
            "name": "Varieties of Faith: The Bretons"
          },
          {
            "activityIndex": 3,
            "activityId": 16,
            "name": "Wyresses: The Name-Daughters"
          },
          {
            "activityIndex": 4,
            "activityId": 24,
            "name": "The Knightly Orders of High Rock"
          },
          {
            "activityIndex": 5,
            "activityId": 25,
            "name": "The Bretons: Mongrels or Paragons?"
          },
          {
            "activityIndex": 6,
            "activityId": 31,
            "name": "Wayrest, Jewel of the Bay"
          },
          {
            "activityIndex": 7,
            "activityId": 157,
            "name": "Triumphs of a Monarch, Ch. 3"
          },
          {
            "activityIndex": 8,
            "activityId": 158,
            "name": "Triumphs of a Monarch, Ch. 6"
          },
          {
            "activityIndex": 9,
            "activityId": 159,
            "name": "Triumphs of a Monarch, Ch. 10"
          },
          {
            "activityIndex": 10,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2559,
            "name": "Old Port Mornard"
          },
          {
            "activityIndex": 2,
            "activityId": 2560,
            "name": "Fort Avrippe"
          },
          {
            "activityIndex": 3,
            "activityId": 2561,
            "name": "Oaken Forge"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 3,
    "name": "Glenumbra",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3000,
            "name": "Blood and the Crescent Moon"
          },
          {
            "activityIndex": 2,
            "activityId": 3006,
            "name": "Bloodthorn Assassins"
          },
          {
            "activityIndex": 3,
            "activityId": 3009,
            "name": "Turning of the Trees"
          },
          {
            "activityIndex": 4,
            "activityId": 2599,
            "name": "Ash and Reprieve"
          },
          {
            "activityIndex": 5,
            "activityId": 3016,
            "name": "The Wyrd Tree's Roots"
          },
          {
            "activityIndex": 6,
            "activityId": 3060,
            "name": "Seeking the Guardians"
          },
          {
            "activityIndex": 7,
            "activityId": 3063,
            "name": "Champion of the Guardians"
          },
          {
            "activityIndex": 8,
            "activityId": 3191,
            "name": "Reclaiming the Elements"
          },
          {
            "activityIndex": 9,
            "activityId": 3235,
            "name": "Purifying the Wyrd Tree"
          },
          {
            "activityIndex": 10,
            "activityId": 974,
            "name": "A Duke in Exile"
          },
          {
            "activityIndex": 11,
            "activityId": 3013,
            "name": "Wolves in the Fold"
          },
          {
            "activityIndex": 12,
            "activityId": 3018,
            "name": "Lineage of Tooth and Claw"
          },
          {
            "activityIndex": 13,
            "activityId": 3027,
            "name": "Ripple Effect"
          },
          {
            "activityIndex": 14,
            "activityId": 3047,
            "name": "A Step Back in Time"
          },
          {
            "activityIndex": 15,
            "activityId": 3049,
            "name": "The Nameless Soldier"
          },
          {
            "activityIndex": 16,
            "activityId": 3064,
            "name": "Rally Cry"
          },
          {
            "activityIndex": 17,
            "activityId": 3174,
            "name": "A Lingering Hope"
          },
          {
            "activityIndex": 18,
            "activityId": 3189,
            "name": "Hidden in Flames"
          },
          {
            "activityIndex": 19,
            "activityId": 3267,
            "name": "The Fall of Faolchu"
          },
          {
            "activityIndex": 20,
            "activityId": 3082,
            "name": "The Lion Guard's Stand"
          },
          {
            "activityIndex": 21,
            "activityId": 3277,
            "name": "Mastering the Talisman"
          },
          {
            "activityIndex": 22,
            "activityId": 3338,
            "name": "Mists of Corruption"
          },
          {
            "activityIndex": 23,
            "activityId": 3357,
            "name": "The Labyrinth"
          },
          {
            "activityIndex": 24,
            "activityId": 3379,
            "name": "Angof the Gravesinger"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 7,
            "name": "Red Rook Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 10,
            "name": "Hag Fen"
          },
          {
            "activityIndex": 3,
            "activityId": 16,
            "name": "Burial Mounds"
          },
          {
            "activityIndex": 4,
            "activityId": 243,
            "name": "Daggerfall"
          },
          {
            "activityIndex": 5,
            "activityId": 245,
            "name": "Deleyn's Mill"
          },
          {
            "activityIndex": 6,
            "activityId": 246,
            "name": "Aldcroft"
          },
          {
            "activityIndex": 7,
            "activityId": 247,
            "name": "Shrieking Scar"
          },
          {
            "activityIndex": 8,
            "activityId": 249,
            "name": "Glenumbra Moors"
          },
          {
            "activityIndex": 9,
            "activityId": 244,
            "name": "Westtry"
          },
          {
            "activityIndex": 10,
            "activityId": 250,
            "name": "Lion Guard Redoubt"
          },
          {
            "activityIndex": 11,
            "activityId": 253,
            "name": "Vale of the Guardians"
          },
          {
            "activityIndex": 12,
            "activityId": 252,
            "name": "Eagle's Brook"
          },
          {
            "activityIndex": 13,
            "activityId": 254,
            "name": "Camlorn"
          },
          {
            "activityIndex": 14,
            "activityId": 255,
            "name": "Beldama Wyrd Tree"
          },
          {
            "activityIndex": 15,
            "activityId": 258,
            "name": "Tomb of Lost Kings"
          },
          {
            "activityIndex": 16,
            "activityId": 260,
            "name": "Crosswych"
          },
          {
            "activityIndex": 17,
            "activityId": 261,
            "name": "Cath Bedraud"
          },
          {
            "activityIndex": 18,
            "activityId": 278,
            "name": "Dresan Keep"
          },
          {
            "activityIndex": 19,
            "activityId": 279,
            "name": "Baelborne Rock"
          },
          {
            "activityIndex": 20,
            "activityId": 388,
            "name": "Dwynnarth Ruins"
          },
          {
            "activityIndex": 21,
            "activityId": 389,
            "name": "Cambray Pass"
          },
          {
            "activityIndex": 22,
            "activityId": 2922,
            "name": "Shrine of Hircine"
          },
          {
            "activityIndex": 23,
            "activityId": 2924,
            "name": "Shrine of Lamae Bal"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 34,
            "name": "Glenumbra Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 380,
            "name": "Bad Man's Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1053,
            "name": "Bad Man's Hallows Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 471,
            "name": "Glenumbra Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 359,
            "name": "Wyrd Tree Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 361,
            "name": "Aldcroft Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 363,
            "name": "Deleyn's Mill Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 366,
            "name": "Eagle's Brook Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 368,
            "name": "North Hag Fen Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 369,
            "name": "Lion Guard Redoubt Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 370,
            "name": "Crosswych Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 371,
            "name": "Farwatch Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 373,
            "name": "Baelborne Rock Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 376,
            "name": "Daggerfall Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 377,
            "name": "Burial Tombs Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 1321,
            "name": "Hag Fen Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 345,
            "name": "Ilessan Tower"
          },
          {
            "activityIndex": 2,
            "activityId": 346,
            "name": "Silumm"
          },
          {
            "activityIndex": 3,
            "activityId": 347,
            "name": "Mines of Khuras"
          },
          {
            "activityIndex": 4,
            "activityId": 348,
            "name": "Enduum"
          },
          {
            "activityIndex": 5,
            "activityId": 353,
            "name": "Ebon Crypt"
          },
          {
            "activityIndex": 6,
            "activityId": 354,
            "name": "Cryptwatch Fort"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 179,
            "name": "Guarding Daggerfall's eastern gates."
          },
          {
            "activityIndex": 2,
            "activityId": 180,
            "name": "Before Dresan's headless sentinel."
          },
          {
            "activityIndex": 3,
            "activityId": 181,
            "name": "Search among the shrieks."
          },
          {
            "activityIndex": 4,
            "activityId": 182,
            "name": "Westtry's dead slept underneath."
          },
          {
            "activityIndex": 5,
            "activityId": 183,
            "name": "Far behind the Elf-haters' lines."
          },
          {
            "activityIndex": 6,
            "activityId": 184,
            "name": "Beneath a Hag's footbridge."
          },
          {
            "activityIndex": 7,
            "activityId": 185,
            "name": "Where vines strangle the sleeping dead."
          },
          {
            "activityIndex": 8,
            "activityId": 186,
            "name": "Close to finding the kings."
          },
          {
            "activityIndex": 9,
            "activityId": 187,
            "name": "A climb above Crosswych."
          },
          {
            "activityIndex": 10,
            "activityId": 188,
            "name": "A tower explored is Ilessen learned."
          },
          {
            "activityIndex": 11,
            "activityId": 189,
            "name": "Near Silumm's well on Daggerfall shores."
          },
          {
            "activityIndex": 12,
            "activityId": 190,
            "name": "Within a mine of blood and thorns."
          },
          {
            "activityIndex": 13,
            "activityId": 191,
            "name": "Behind a wall to Enduum all."
          },
          {
            "activityIndex": 14,
            "activityId": 192,
            "name": "Where Ebon Crypts become Ebon Caves."
          },
          {
            "activityIndex": 15,
            "activityId": 193,
            "name": "In the bowels of Cryptwatch."
          },
          {
            "activityIndex": 16,
            "activityId": 194,
            "name": "In the roots of the Hallows."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 837,
            "name": "Daenia Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 838,
            "name": "Cambray Hills Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 839,
            "name": "King's Guard Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1212,
            "name": "Seaview Point"
          },
          {
            "activityIndex": 2,
            "activityId": 1213,
            "name": "Western Overlook"
          },
          {
            "activityIndex": 3,
            "activityId": 1214,
            "name": "The Wolf's Camp"
          },
          {
            "activityIndex": 4,
            "activityId": 1215,
            "name": "North Shore Point"
          },
          {
            "activityIndex": 5,
            "activityId": 1216,
            "name": "Trapjaw's Cove"
          },
          {
            "activityIndex": 6,
            "activityId": 1218,
            "name": "Balefire Island"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1262,
            "name": "Valewatch Tower"
          },
          {
            "activityIndex": 2,
            "activityId": 1263,
            "name": "Merovec's Folly"
          },
          {
            "activityIndex": 3,
            "activityId": 1264,
            "name": "Tangle Rock"
          },
          {
            "activityIndex": 4,
            "activityId": 1266,
            "name": "Mire Falls"
          },
          {
            "activityIndex": 5,
            "activityId": 1267,
            "name": "Miltrin's Fishing Cabin"
          },
          {
            "activityIndex": 6,
            "activityId": 1268,
            "name": "Gaudet Farm"
          },
          {
            "activityIndex": 7,
            "activityId": 1273,
            "name": "Dourstone Island"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 7,
            "name": "The Code of Mauloch"
          },
          {
            "activityIndex": 2,
            "activityId": 8,
            "name": "A Warning to the Aldmeri Dominion"
          },
          {
            "activityIndex": 3,
            "activityId": 9,
            "name": "True Heirs of the Empire"
          },
          {
            "activityIndex": 4,
            "activityId": 11,
            "name": "The Werewolf's Hide"
          },
          {
            "activityIndex": 5,
            "activityId": 12,
            "name": "Guide to the Daggerfall Covenant"
          },
          {
            "activityIndex": 6,
            "activityId": 13,
            "name": "The True Nature of Orcs"
          },
          {
            "activityIndex": 7,
            "activityId": 14,
            "name": "Varieties of Faith: The Bretons"
          },
          {
            "activityIndex": 8,
            "activityId": 15,
            "name": "Varieties of Faith: The Orcs"
          },
          {
            "activityIndex": 9,
            "activityId": 16,
            "name": "Wyresses: The Name-Daughters"
          },
          {
            "activityIndex": 10,
            "activityId": 17,
            "name": "Schemes of the Reachmage"
          },
          {
            "activityIndex": 11,
            "activityId": 163,
            "name": "Aedra and Daedra"
          },
          {
            "activityIndex": 12,
            "activityId": 164,
            "name": "Boethiah's Proving"
          },
          {
            "activityIndex": 13,
            "activityId": 153,
            "name": "Galerion the Mystic"
          },
          {
            "activityIndex": 14,
            "activityId": 154,
            "name": "Great Harbingers of the Companions"
          },
          {
            "activityIndex": 15,
            "activityId": 155,
            "name": "The Illusion of Death"
          },
          {
            "activityIndex": 16,
            "activityId": 156,
            "name": "Jorunn the Skald-King"
          },
          {
            "activityIndex": 17,
            "activityId": 157,
            "name": "Triumphs of a Monarch, Ch. 3"
          },
          {
            "activityIndex": 18,
            "activityId": 158,
            "name": "Triumphs of a Monarch, Ch. 6"
          },
          {
            "activityIndex": 19,
            "activityId": 159,
            "name": "Triumphs of a Monarch, Ch. 10"
          },
          {
            "activityIndex": 20,
            "activityId": 160,
            "name": "Trials of Saint Alessia"
          },
          {
            "activityIndex": 21,
            "activityId": 173,
            "name": "The Anuad Paraphrased"
          },
          {
            "activityIndex": 22,
            "activityId": 174,
            "name": "The Lunar Lorkhan"
          },
          {
            "activityIndex": 23,
            "activityId": 175,
            "name": "Monomyth: Dragon God & Missing God"
          },
          {
            "activityIndex": 24,
            "activityId": 193,
            "name": "Ancient Scrolls of the Dwemer I-A"
          },
          {
            "activityIndex": 25,
            "activityId": 195,
            "name": "Ancient Scrolls of the Dwemer II"
          },
          {
            "activityIndex": 26,
            "activityId": 196,
            "name": "Ancient Scrolls of the Dwemer III"
          },
          {
            "activityIndex": 27,
            "activityId": 273,
            "name": "Ayleid Inscriptions Translated"
          },
          {
            "activityIndex": 28,
            "activityId": 274,
            "name": "Frontier, Conquest"
          },
          {
            "activityIndex": 29,
            "activityId": 275,
            "name": "History of the Fighters Guild Pt. 1"
          },
          {
            "activityIndex": 30,
            "activityId": 276,
            "name": "History of the Fighters Guild Pt. 2"
          },
          {
            "activityIndex": 31,
            "activityId": 277,
            "name": "Origin of the Mages Guild"
          },
          {
            "activityIndex": 32,
            "activityId": 190,
            "name": "Where Magical Paths Meet"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 386,
            "name": "The Lover"
          },
          {
            "activityIndex": 2,
            "activityId": 387,
            "name": "The Lady"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 585,
            "name": "Bad Man's Hallows"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1265,
            "name": "Mesanthano's Tower"
          },
          {
            "activityIndex": 2,
            "activityId": 1271,
            "name": "Chill House"
          },
          {
            "activityIndex": 3,
            "activityId": 1272,
            "name": "Par Molag"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 823,
    "name": "Gold Coast",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5538,
            "name": "Voices in the Dark"
          },
          {
            "activityIndex": 2,
            "activityId": 5540,
            "name": "Signed in Blood"
          },
          {
            "activityIndex": 3,
            "activityId": 5542,
            "name": "Welcome Home"
          },
          {
            "activityIndex": 4,
            "activityId": 5708,
            "name": "Contract: Kvatch"
          },
          {
            "activityIndex": 5,
            "activityId": 5595,
            "name": "A Lesson in Silence"
          },
          {
            "activityIndex": 6,
            "activityId": 5599,
            "name": "Questions of Faith"
          },
          {
            "activityIndex": 7,
            "activityId": 5596,
            "name": "A Special Request"
          },
          {
            "activityIndex": 8,
            "activityId": 5567,
            "name": "Dark Revelations"
          },
          {
            "activityIndex": 9,
            "activityId": 5597,
            "name": "A Ghost from the Past"
          },
          {
            "activityIndex": 10,
            "activityId": 5598,
            "name": "The Wrath of Sithis"
          },
          {
            "activityIndex": 11,
            "activityId": 5600,
            "name": "Filling the Void"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1730,
            "name": "Kvatch"
          },
          {
            "activityIndex": 2,
            "activityId": 1731,
            "name": "Anvil"
          },
          {
            "activityIndex": 3,
            "activityId": 1734,
            "name": "Knightsgrave"
          },
          {
            "activityIndex": 4,
            "activityId": 1740,
            "name": "Enclave of the Hourglass"
          },
          {
            "activityIndex": 5,
            "activityId": 1752,
            "name": "Dark Brotherhood Sanctuary"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1433,
            "name": "Gold Coast Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 1434,
            "name": "Bane of the Gold Coast"
          },
          {
            "activityIndex": 3,
            "activityId": 1410,
            "name": "Litany of Blood"
          },
          {
            "activityIndex": 4,
            "activityId": 1431,
            "name": "Gold Coast Master Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1726,
            "name": "Anvil Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1727,
            "name": "Kvatch Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 1728,
            "name": "Strid River Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 1729,
            "name": "Gold Coast Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1732,
            "name": "Hrota Cave"
          },
          {
            "activityIndex": 2,
            "activityId": 1733,
            "name": "Garlas Agea"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 376,
            "name": "On a lonely isle staring out across the Abecean."
          },
          {
            "activityIndex": 2,
            "activityId": 377,
            "name": "Proudly displayed near the Caretaker’s home."
          },
          {
            "activityIndex": 3,
            "activityId": 378,
            "name": "Nestled in the arm of the eastern watchtower."
          },
          {
            "activityIndex": 4,
            "activityId": 379,
            "name": "Pulled from the ground in a strange harvest."
          },
          {
            "activityIndex": 5,
            "activityId": 380,
            "name": "Hidden away where only spelunkers will find it."
          },
          {
            "activityIndex": 6,
            "activityId": 381,
            "name": "A treasure of the Gold Coast, kept in a stolen vault."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1735,
            "name": "Tribune's Folly"
          },
          {
            "activityIndex": 2,
            "activityId": 1750,
            "name": "Kvatch Arena"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1738,
            "name": "At-Himah Family Estate"
          },
          {
            "activityIndex": 2,
            "activityId": 1739,
            "name": "Beldaburo"
          },
          {
            "activityIndex": 3,
            "activityId": 1741,
            "name": "Jarol Estate"
          },
          {
            "activityIndex": 4,
            "activityId": 1742,
            "name": "Anvil Lighthouse"
          },
          {
            "activityIndex": 5,
            "activityId": 1743,
            "name": "Varen's Wall Gatehouse"
          },
          {
            "activityIndex": 6,
            "activityId": 1744,
            "name": "Garlas Malatar"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 160,
            "name": "Trials of Saint Alessia"
          },
          {
            "activityIndex": 2,
            "activityId": 211,
            "name": "The Adabal-a"
          },
          {
            "activityIndex": 3,
            "activityId": 213,
            "name": "The Cleansing of the Fane"
          },
          {
            "activityIndex": 4,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          },
          {
            "activityIndex": 5,
            "activityId": 269,
            "name": "Proper-Life: Three Chants"
          },
          {
            "activityIndex": 6,
            "activityId": 278,
            "name": "Eulogy for Emperor Varen"
          },
          {
            "activityIndex": 7,
            "activityId": 273,
            "name": "Ayleid Inscriptions Translated"
          },
          {
            "activityIndex": 8,
            "activityId": 251,
            "name": "Sithis"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1745,
            "name": "Marja's Mill"
          },
          {
            "activityIndex": 2,
            "activityId": 1746,
            "name": "Strid River Artisans Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 1747,
            "name": "Colovian Revolt Forge Yard"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 383,
    "name": "Grahtwood",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4396,
            "name": "Unsafe Haven"
          },
          {
            "activityIndex": 2,
            "activityId": 4943,
            "name": "The Honor of the Queen"
          },
          {
            "activityIndex": 3,
            "activityId": 4951,
            "name": "Fit to Rule"
          },
          {
            "activityIndex": 4,
            "activityId": 4868,
            "name": "The Grip of Madness"
          },
          {
            "activityIndex": 5,
            "activityId": 4385,
            "name": "Lost in Study"
          },
          {
            "activityIndex": 6,
            "activityId": 4386,
            "name": "Heart of the Matter"
          },
          {
            "activityIndex": 7,
            "activityId": 4885,
            "name": "A Lasting Winter"
          },
          {
            "activityIndex": 8,
            "activityId": 4922,
            "name": "The Orrery of Elden Root"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 774,
            "name": "Reliquary of Stars"
          },
          {
            "activityIndex": 2,
            "activityId": 763,
            "name": "Haven"
          },
          {
            "activityIndex": 3,
            "activityId": 777,
            "name": "Reman's Bluff"
          },
          {
            "activityIndex": 4,
            "activityId": 778,
            "name": "Bone Orchard"
          },
          {
            "activityIndex": 5,
            "activityId": 786,
            "name": "Gil-Var-Delle"
          },
          {
            "activityIndex": 6,
            "activityId": 788,
            "name": "Cave of Broken Sails"
          },
          {
            "activityIndex": 7,
            "activityId": 958,
            "name": "The Gray Mire"
          },
          {
            "activityIndex": 8,
            "activityId": 972,
            "name": "Brackenleaf"
          },
          {
            "activityIndex": 9,
            "activityId": 975,
            "name": "Ossuary of Telacar"
          },
          {
            "activityIndex": 10,
            "activityId": 1000,
            "name": "Laeloria"
          },
          {
            "activityIndex": 11,
            "activityId": 1011,
            "name": "Elden Root"
          },
          {
            "activityIndex": 12,
            "activityId": 1012,
            "name": "Southpoint"
          },
          {
            "activityIndex": 13,
            "activityId": 1041,
            "name": "Falinesti Winter Site"
          },
          {
            "activityIndex": 14,
            "activityId": 1055,
            "name": "Karthdar"
          },
          {
            "activityIndex": 15,
            "activityId": 1068,
            "name": "Cormount"
          },
          {
            "activityIndex": 16,
            "activityId": 1056,
            "name": "Redfur Trading Post"
          },
          {
            "activityIndex": 17,
            "activityId": 1069,
            "name": "Goldfolly"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 608,
            "name": "Grahtwood Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 470,
            "name": "Root Sunder Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1049,
            "name": "Root Sunder Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 484,
            "name": "Grahtwood Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 984,
            "name": "Elden Root Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 985,
            "name": "Gil-Var-Delle Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 986,
            "name": "Elden Root Temple Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 987,
            "name": "Haven Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 988,
            "name": "Redfur Trading Post Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 989,
            "name": "Southpoint Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 990,
            "name": "Cormount Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 991,
            "name": "Ossuary Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 1083,
            "name": "Gray Mire Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 1145,
            "name": "Falinesti Winter Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1070,
            "name": "Ne Salas"
          },
          {
            "activityIndex": 2,
            "activityId": 1071,
            "name": "The Scuttle Pit"
          },
          {
            "activityIndex": 3,
            "activityId": 1072,
            "name": "Vinedeath Cave"
          },
          {
            "activityIndex": 4,
            "activityId": 1073,
            "name": "Burroot Kwama Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 1074,
            "name": "Wormroot Depths"
          },
          {
            "activityIndex": 6,
            "activityId": 1075,
            "name": "Mobar Mine"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 109,
            "name": "Granted safe haven by the mages."
          },
          {
            "activityIndex": 2,
            "activityId": 110,
            "name": "The shrine of the south leads north."
          },
          {
            "activityIndex": 3,
            "activityId": 111,
            "name": "Cooling off on the way to the Tower."
          },
          {
            "activityIndex": 4,
            "activityId": 112,
            "name": "Where the road to the root is an isle."
          },
          {
            "activityIndex": 5,
            "activityId": 113,
            "name": "Atop falls that feed the temple."
          },
          {
            "activityIndex": 6,
            "activityId": 114,
            "name": "Spotted from a treehouse vantage."
          },
          {
            "activityIndex": 7,
            "activityId": 115,
            "name": "A doorway to trolls near Redfur."
          },
          {
            "activityIndex": 8,
            "activityId": 116,
            "name": "Among ancient words in the stones."
          },
          {
            "activityIndex": 9,
            "activityId": 117,
            "name": "Above a seasonal site of return."
          },
          {
            "activityIndex": 10,
            "activityId": 118,
            "name": "Where Covenant forces pour forth."
          },
          {
            "activityIndex": 11,
            "activityId": 119,
            "name": "A scrabbling, a skittering, a scurrying."
          },
          {
            "activityIndex": 12,
            "activityId": 120,
            "name": "Six-legged thunder invades."
          },
          {
            "activityIndex": 13,
            "activityId": 121,
            "name": "Not yet dead on the vine."
          },
          {
            "activityIndex": 14,
            "activityId": 122,
            "name": "Stolen starlight in wormy depths."
          },
          {
            "activityIndex": 15,
            "activityId": 123,
            "name": "Mined by the bandits of Mobar."
          },
          {
            "activityIndex": 16,
            "activityId": 124,
            "name": "Crocs claimed a meal in the sunder."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1033,
            "name": "Long Coast Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 1034,
            "name": "Green Hall Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 1035,
            "name": "Tarlain Heights Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1165,
            "name": "Hircine's Henge"
          },
          {
            "activityIndex": 2,
            "activityId": 1166,
            "name": "Nindaeril's Perch"
          },
          {
            "activityIndex": 3,
            "activityId": 1167,
            "name": "Lady Solace's Fen"
          },
          {
            "activityIndex": 4,
            "activityId": 1168,
            "name": "Poacher Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 1169,
            "name": "Thugrub's Cave"
          },
          {
            "activityIndex": 6,
            "activityId": 1170,
            "name": "Valanir's Rest"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1305,
            "name": "Tarlain Bandit Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1307,
            "name": "Boar's Run Overlook"
          },
          {
            "activityIndex": 3,
            "activityId": 1308,
            "name": "Battle of Cormount Memorial"
          },
          {
            "activityIndex": 4,
            "activityId": 1310,
            "name": "Sweetbreeze Cottage"
          },
          {
            "activityIndex": 5,
            "activityId": 1311,
            "name": "Sacred Leap Grotto"
          },
          {
            "activityIndex": 6,
            "activityId": 1313,
            "name": "Forked Root Camp"
          },
          {
            "activityIndex": 7,
            "activityId": 1314,
            "name": "Faltonia's Mine"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 165,
            "name": "The Dreamstride"
          },
          {
            "activityIndex": 2,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 3,
            "activityId": 176,
            "name": "Monomyth: Lorkhan and Satakal"
          },
          {
            "activityIndex": 4,
            "activityId": 177,
            "name": "Monomyth: \"Shezarr's Song\""
          },
          {
            "activityIndex": 5,
            "activityId": 178,
            "name": "Monomyth: The Myth of Aurbis"
          },
          {
            "activityIndex": 6,
            "activityId": 197,
            "name": "Ancient Scrolls of the Dwemer V"
          },
          {
            "activityIndex": 7,
            "activityId": 198,
            "name": "Ancient Scrolls of the Dwemer VI"
          },
          {
            "activityIndex": 8,
            "activityId": 199,
            "name": "Ancient Scrolls of the Dwemer X"
          },
          {
            "activityIndex": 9,
            "activityId": 233,
            "name": "Arcana Restored"
          },
          {
            "activityIndex": 10,
            "activityId": 234,
            "name": "Liminal Bridges"
          },
          {
            "activityIndex": 11,
            "activityId": 235,
            "name": "Magic from the Sky"
          },
          {
            "activityIndex": 12,
            "activityId": 239,
            "name": "Reality and Other Falsehoods"
          },
          {
            "activityIndex": 13,
            "activityId": 240,
            "name": "Guild Memo on Soul-Trapping"
          },
          {
            "activityIndex": 14,
            "activityId": 238,
            "name": "On the Detachment of the Sheath"
          },
          {
            "activityIndex": 15,
            "activityId": 237,
            "name": "The Old Ways"
          },
          {
            "activityIndex": 16,
            "activityId": 236,
            "name": "Manual of Spellcraft"
          },
          {
            "activityIndex": 17,
            "activityId": 243,
            "name": "Before the Ages of Man: Dawn Era"
          },
          {
            "activityIndex": 18,
            "activityId": 244,
            "name": "Before the Ages of Man: Merethic Era"
          },
          {
            "activityIndex": 19,
            "activityId": 245,
            "name": "Ebony Blade History"
          },
          {
            "activityIndex": 20,
            "activityId": 246,
            "name": "Noxiphilic Sanguivoria"
          },
          {
            "activityIndex": 21,
            "activityId": 247,
            "name": "A Werewolf's Confession"
          },
          {
            "activityIndex": 22,
            "activityId": 1414,
            "name": "Varieties of Faith: The Khajiit"
          },
          {
            "activityIndex": 23,
            "activityId": 1415,
            "name": "Varieties of Faith: The Wood Elves"
          },
          {
            "activityIndex": 24,
            "activityId": 1416,
            "name": "The Book of the Great Tree"
          },
          {
            "activityIndex": 25,
            "activityId": 1417,
            "name": "Common Arms of Valenwood"
          },
          {
            "activityIndex": 26,
            "activityId": 1418,
            "name": "War Customs of the Tribal Bosmer"
          },
          {
            "activityIndex": 27,
            "activityId": 1419,
            "name": "The Devouring of Gil-Var-Delle"
          },
          {
            "activityIndex": 28,
            "activityId": 1420,
            "name": "Ayleid Survivals in Valenwood"
          },
          {
            "activityIndex": 29,
            "activityId": 1421,
            "name": "Aurbic Enigma 4: The Elden Tree"
          },
          {
            "activityIndex": 30,
            "activityId": 1422,
            "name": "The Legend of Vastarie"
          },
          {
            "activityIndex": 31,
            "activityId": 1423,
            "name": "In the Company of Wood Orcs"
          },
          {
            "activityIndex": 32,
            "activityId": 187,
            "name": "Civility and Etiquette: Wood Orcs I"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 981,
            "name": "The Tower"
          },
          {
            "activityIndex": 2,
            "activityId": 982,
            "name": "The Mage"
          },
          {
            "activityIndex": 3,
            "activityId": 983,
            "name": "The Lord"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 775,
            "name": "Root Sunder Ruins"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1306,
            "name": "Vineshade Lodge"
          },
          {
            "activityIndex": 2,
            "activityId": 1309,
            "name": "Temple of the Eight"
          },
          {
            "activityIndex": 3,
            "activityId": 1312,
            "name": "Fisherman's Isle"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 108,
    "name": "Greenshade",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4735,
            "name": "The Staff of Magnus"
          },
          {
            "activityIndex": 2,
            "activityId": 4573,
            "name": "Frighten the Fearsome"
          },
          {
            "activityIndex": 3,
            "activityId": 4593,
            "name": "Audience with the Wilderking"
          },
          {
            "activityIndex": 4,
            "activityId": 4586,
            "name": "The Witch of Silatar"
          },
          {
            "activityIndex": 5,
            "activityId": 4750,
            "name": "Throne of the Wilderking"
          },
          {
            "activityIndex": 6,
            "activityId": 4574,
            "name": "Veil of Illusion"
          },
          {
            "activityIndex": 7,
            "activityId": 4580,
            "name": "Double Jeopardy"
          },
          {
            "activityIndex": 8,
            "activityId": 4739,
            "name": "A Storm Upon the Shore"
          },
          {
            "activityIndex": 9,
            "activityId": 4765,
            "name": "Pelidil's End"
          },
          {
            "activityIndex": 10,
            "activityId": 4546,
            "name": "Retaking the Pass"
          },
          {
            "activityIndex": 11,
            "activityId": 4601,
            "name": "Right of Theft"
          },
          {
            "activityIndex": 12,
            "activityId": 4608,
            "name": "The Blight of the Bosmer"
          },
          {
            "activityIndex": 13,
            "activityId": 4690,
            "name": "Striking at the Heart"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 847,
            "name": "Bramblebreach"
          },
          {
            "activityIndex": 2,
            "activityId": 843,
            "name": "Woodhearth"
          },
          {
            "activityIndex": 3,
            "activityId": 844,
            "name": "Rootwater Grove"
          },
          {
            "activityIndex": 4,
            "activityId": 860,
            "name": "Verrant Morass"
          },
          {
            "activityIndex": 5,
            "activityId": 867,
            "name": "Shademist Moors"
          },
          {
            "activityIndex": 6,
            "activityId": 881,
            "name": "Moonhenge"
          },
          {
            "activityIndex": 7,
            "activityId": 884,
            "name": "Shadows Crawl"
          },
          {
            "activityIndex": 8,
            "activityId": 885,
            "name": "Driladan Pass"
          },
          {
            "activityIndex": 9,
            "activityId": 894,
            "name": "Shrouded Vale"
          },
          {
            "activityIndex": 10,
            "activityId": 895,
            "name": "Serpent's Grotto"
          },
          {
            "activityIndex": 11,
            "activityId": 910,
            "name": "Spinner's Cottage"
          },
          {
            "activityIndex": 12,
            "activityId": 914,
            "name": "Seaside Sanctuary"
          },
          {
            "activityIndex": 13,
            "activityId": 926,
            "name": "Greenheart"
          },
          {
            "activityIndex": 14,
            "activityId": 931,
            "name": "Dread Vullain"
          },
          {
            "activityIndex": 15,
            "activityId": 933,
            "name": "Hectahame"
          },
          {
            "activityIndex": 16,
            "activityId": 971,
            "name": "Marbruk"
          },
          {
            "activityIndex": 17,
            "activityId": 1315,
            "name": "Falinesti Spring Site"
          },
          {
            "activityIndex": 18,
            "activityId": 1405,
            "name": "Labyrinth"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 610,
            "name": "Greenshade Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 445,
            "name": "Rulanyil's Fall Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1050,
            "name": "Rulanyil's Fall Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 485,
            "name": "Greenshade Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 942,
            "name": "Greenheart Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 943,
            "name": "Marbruk Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 944,
            "name": "Labyrinth Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 945,
            "name": "Falinesti Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 946,
            "name": "Seaside Sanctuary Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 947,
            "name": "Verrant Morass Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 948,
            "name": "Woodhearth Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 949,
            "name": "Moonhenge Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 950,
            "name": "Serpent's Grotto Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 993,
            "name": "Gurzag's Mine"
          },
          {
            "activityIndex": 2,
            "activityId": 994,
            "name": "Carac Dena"
          },
          {
            "activityIndex": 3,
            "activityId": 995,
            "name": "Naril Nagaia"
          },
          {
            "activityIndex": 4,
            "activityId": 996,
            "name": "The Underroot"
          },
          {
            "activityIndex": 5,
            "activityId": 997,
            "name": "Harridan's Lair"
          },
          {
            "activityIndex": 6,
            "activityId": 998,
            "name": "Barrow Trench"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 125,
            "name": "Flee the labyrinth of words and stone."
          },
          {
            "activityIndex": 2,
            "activityId": 126,
            "name": "In crumbled keep where shadow creeps."
          },
          {
            "activityIndex": 3,
            "activityId": 127,
            "name": "Breath of fresh air for Marbruk's mages."
          },
          {
            "activityIndex": 4,
            "activityId": 128,
            "name": "Find an eclectic outskirt by the sea."
          },
          {
            "activityIndex": 5,
            "activityId": 129,
            "name": "Where moor becomes moat."
          },
          {
            "activityIndex": 6,
            "activityId": 130,
            "name": "Stay dry where the Wooded Eye wards."
          },
          {
            "activityIndex": 7,
            "activityId": 131,
            "name": "No longer entrenched."
          },
          {
            "activityIndex": 8,
            "activityId": 132,
            "name": "Unheeded by Wood Orc lookouts."
          },
          {
            "activityIndex": 9,
            "activityId": 133,
            "name": "Down in the gorge of rope bridges."
          },
          {
            "activityIndex": 10,
            "activityId": 134,
            "name": "In Gurzag's supplies."
          },
          {
            "activityIndex": 11,
            "activityId": 135,
            "name": "Halls ruined further by blue-skinned brutes."
          },
          {
            "activityIndex": 12,
            "activityId": 136,
            "name": "A pretender in Naril Nagaia."
          },
          {
            "activityIndex": 13,
            "activityId": 137,
            "name": "Under root, but hidden high."
          },
          {
            "activityIndex": 14,
            "activityId": 138,
            "name": "Batted around in the purring lair."
          },
          {
            "activityIndex": 15,
            "activityId": 139,
            "name": "Mined up in a barrow."
          },
          {
            "activityIndex": 16,
            "activityId": 140,
            "name": "Outside the Harbinger's chamber."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 954,
            "name": "Green's Marrow Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 955,
            "name": "Drowned Coast Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 956,
            "name": "Wilderking Court Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1159,
            "name": "Reconnaissance Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1160,
            "name": "Pelda Tarn"
          },
          {
            "activityIndex": 3,
            "activityId": 1161,
            "name": "Gathongor's Mire"
          },
          {
            "activityIndex": 4,
            "activityId": 1162,
            "name": "Rootwater Spring"
          },
          {
            "activityIndex": 5,
            "activityId": 1163,
            "name": "Thodundor's View"
          },
          {
            "activityIndex": 6,
            "activityId": 1164,
            "name": "Maormer Camp"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1316,
            "name": "Seaside Overlook"
          },
          {
            "activityIndex": 2,
            "activityId": 1318,
            "name": "Twin Falls Rest"
          },
          {
            "activityIndex": 3,
            "activityId": 1319,
            "name": "Echo Pond"
          },
          {
            "activityIndex": 4,
            "activityId": 1322,
            "name": "Hollow Den"
          },
          {
            "activityIndex": 5,
            "activityId": 1324,
            "name": "Tower Rocks Vale"
          },
          {
            "activityIndex": 6,
            "activityId": 1325,
            "name": "Camp Gushnukbur"
          },
          {
            "activityIndex": 7,
            "activityId": 1327,
            "name": "Fisherman's Rest"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 167,
            "name": "Invocation of Azura"
          },
          {
            "activityIndex": 2,
            "activityId": 168,
            "name": "Modern Heretics"
          },
          {
            "activityIndex": 3,
            "activityId": 179,
            "name": "Monomyth: The Heart of the World"
          },
          {
            "activityIndex": 4,
            "activityId": 180,
            "name": "Nine Commands of the Eight Divines"
          },
          {
            "activityIndex": 5,
            "activityId": 181,
            "name": "Gods and Worship In Tamriel"
          },
          {
            "activityIndex": 6,
            "activityId": 182,
            "name": "Vivec and Mephala"
          },
          {
            "activityIndex": 7,
            "activityId": 200,
            "name": "Ancient Scrolls of the Dwemer XI"
          },
          {
            "activityIndex": 8,
            "activityId": 201,
            "name": "Antecedents of Dwemer Law"
          },
          {
            "activityIndex": 9,
            "activityId": 202,
            "name": "Dwarven Automatons"
          },
          {
            "activityIndex": 10,
            "activityId": 248,
            "name": "The Firmament"
          },
          {
            "activityIndex": 11,
            "activityId": 249,
            "name": "The Pig Children"
          },
          {
            "activityIndex": 12,
            "activityId": 250,
            "name": "Ruminations on the Elder Scrolls"
          },
          {
            "activityIndex": 13,
            "activityId": 251,
            "name": "Sithis"
          },
          {
            "activityIndex": 14,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 15,
            "activityId": 254,
            "name": "Darkest Darkness"
          },
          {
            "activityIndex": 16,
            "activityId": 255,
            "name": "The Doors of Oblivion, Part 1"
          },
          {
            "activityIndex": 17,
            "activityId": 256,
            "name": "The Doors of Oblivion, Part 2"
          },
          {
            "activityIndex": 18,
            "activityId": 257,
            "name": "On Oblivion"
          },
          {
            "activityIndex": 19,
            "activityId": 258,
            "name": "Spirit of the Daedra"
          },
          {
            "activityIndex": 20,
            "activityId": 259,
            "name": "Varieties of Daedra, Part 1"
          },
          {
            "activityIndex": 21,
            "activityId": 260,
            "name": "Varieties of Daedra, Part 2"
          },
          {
            "activityIndex": 22,
            "activityId": 1424,
            "name": "Words of Clan Mother Ahnissi, Pt. 1"
          },
          {
            "activityIndex": 23,
            "activityId": 1425,
            "name": "Words of Clan Mother Ahnissi, Pt. 2"
          },
          {
            "activityIndex": 24,
            "activityId": 1426,
            "name": "The Ooze: A Fable"
          },
          {
            "activityIndex": 25,
            "activityId": 1427,
            "name": "The Wilderking Legend"
          },
          {
            "activityIndex": 26,
            "activityId": 1428,
            "name": "Visions of the Green Pact Bosmer"
          },
          {
            "activityIndex": 27,
            "activityId": 1429,
            "name": "Woodhearth: A Pocket Guide"
          },
          {
            "activityIndex": 28,
            "activityId": 1430,
            "name": "The Eldest: A Pilgrim's Tale"
          },
          {
            "activityIndex": 29,
            "activityId": 1431,
            "name": "The Green Pact and the Dominion"
          },
          {
            "activityIndex": 30,
            "activityId": 1432,
            "name": "Gifts of the Nereids"
          },
          {
            "activityIndex": 31,
            "activityId": 1433,
            "name": "The Wood Elf Gourmet, Ch. 1"
          },
          {
            "activityIndex": 32,
            "activityId": 1506,
            "name": "Burning Vestige, Vol. I"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 951,
            "name": "The Atronach"
          },
          {
            "activityIndex": 2,
            "activityId": 952,
            "name": "The Serpent"
          },
          {
            "activityIndex": 3,
            "activityId": 953,
            "name": "The Shadow"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 812,
            "name": "Rulanyil's Fall"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1320,
            "name": "Lanalda Pond"
          },
          {
            "activityIndex": 2,
            "activityId": 1323,
            "name": "Arananga"
          },
          {
            "activityIndex": 3,
            "activityId": 1326,
            "name": "Rootwatch Tower"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 816,
    "name": "Hew's Bane",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5531,
            "name": "Partners in Crime"
          },
          {
            "activityIndex": 2,
            "activityId": 5534,
            "name": "Cleaning House"
          },
          {
            "activityIndex": 3,
            "activityId": 5532,
            "name": "The Long Game"
          },
          {
            "activityIndex": 4,
            "activityId": 5556,
            "name": "A Flawless Plan"
          },
          {
            "activityIndex": 5,
            "activityId": 5549,
            "name": "Forever Hold Your Peace"
          },
          {
            "activityIndex": 6,
            "activityId": 5545,
            "name": "Prison Break"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1714,
            "name": "Abah's Landing"
          },
          {
            "activityIndex": 2,
            "activityId": 1716,
            "name": "No Shira Citadel"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1366,
            "name": "Hew's Bane Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 1383,
            "name": "A Cutpurse Above"
          },
          {
            "activityIndex": 3,
            "activityId": 1349,
            "name": "Breaking and Entering"
          },
          {
            "activityIndex": 4,
            "activityId": 1351,
            "name": "Hew's Bane Master Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1719,
            "name": "Abah's Landing Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1720,
            "name": "Zeht's Displeasure Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 1721,
            "name": "No Shira Citadel Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1706,
            "name": "Shark's Teeth Grotto"
          },
          {
            "activityIndex": 2,
            "activityId": 1707,
            "name": "Bahraha's Gloom"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 370,
            "name": "The bank's finest treasure."
          },
          {
            "activityIndex": 2,
            "activityId": 371,
            "name": "Near what is now Lost."
          },
          {
            "activityIndex": 3,
            "activityId": 372,
            "name": "On the shoulder of the arch."
          },
          {
            "activityIndex": 4,
            "activityId": 373,
            "name": "Overlooking the home of the Deep."
          },
          {
            "activityIndex": 5,
            "activityId": 374,
            "name": "Necromancer's passage to the rafters."
          },
          {
            "activityIndex": 6,
            "activityId": 375,
            "name": "Highest point in the Grotto."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1709,
            "name": "Thrall Cove"
          },
          {
            "activityIndex": 2,
            "activityId": 1710,
            "name": "Ko Estaran"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1711,
            "name": "Tava's Beak"
          },
          {
            "activityIndex": 2,
            "activityId": 1712,
            "name": "Hubalajad's Reflection"
          },
          {
            "activityIndex": 3,
            "activityId": 1713,
            "name": "Prince Hew's Shuttered Tomb"
          },
          {
            "activityIndex": 4,
            "activityId": 1722,
            "name": "Placations of Zeht"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 185,
            "name": "The Thief God's Treasures"
          },
          {
            "activityIndex": 2,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1715,
            "name": "The Lost Pavilion"
          },
          {
            "activityIndex": 2,
            "activityId": 1718,
            "name": "Forebear's Junction"
          },
          {
            "activityIndex": 3,
            "activityId": 1717,
            "name": "No Shira Workshop"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1318,
    "name": "High Isle",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6752,
            "name": "Of Knights and Knaves"
          },
          {
            "activityIndex": 2,
            "activityId": 6753,
            "name": "People of Import"
          },
          {
            "activityIndex": 3,
            "activityId": 6754,
            "name": "Deadly Investigations"
          },
          {
            "activityIndex": 4,
            "activityId": 6764,
            "name": "Escape from Amenos"
          },
          {
            "activityIndex": 5,
            "activityId": 6765,
            "name": "To Catch a Magus"
          },
          {
            "activityIndex": 6,
            "activityId": 6766,
            "name": "The Ascendant Storm"
          },
          {
            "activityIndex": 7,
            "activityId": 6781,
            "name": "A Chance for Peace"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2455,
            "name": "Gonfalon Bay"
          },
          {
            "activityIndex": 2,
            "activityId": 2452,
            "name": "Castle Navire"
          },
          {
            "activityIndex": 3,
            "activityId": 2453,
            "name": "Steadfast Manor"
          },
          {
            "activityIndex": 4,
            "activityId": 2454,
            "name": "Stonelore Grove"
          },
          {
            "activityIndex": 5,
            "activityId": 2456,
            "name": "Garick's Rest"
          },
          {
            "activityIndex": 6,
            "activityId": 2457,
            "name": "All Flags Islet"
          },
          {
            "activityIndex": 7,
            "activityId": 2458,
            "name": "Tor Draioch"
          },
          {
            "activityIndex": 8,
            "activityId": 2459,
            "name": "Amenos Station"
          },
          {
            "activityIndex": 9,
            "activityId": 2460,
            "name": "Brokerock Mine"
          },
          {
            "activityIndex": 10,
            "activityId": 2461,
            "name": "Skulltooth Coast"
          },
          {
            "activityIndex": 11,
            "activityId": 2580,
            "name": "Colossus View Lighthouse"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3462,
            "name": "Flower of Chivalry"
          },
          {
            "activityIndex": 2,
            "activityId": 3272,
            "name": "High Isle Master Explorer"
          },
          {
            "activityIndex": 3,
            "activityId": 3418,
            "name": "Basalt Assault"
          },
          {
            "activityIndex": 4,
            "activityId": 3301,
            "name": "High Isle Grand Adventurer"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2477,
            "name": "Coral Road Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2478,
            "name": "Tor Draioch Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2479,
            "name": "Steadfast Manor Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2480,
            "name": "Castle Navire Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2481,
            "name": "Garick's Rest Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2482,
            "name": "Stonelore Grove Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2483,
            "name": "Dufort Shipyards Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2484,
            "name": "Amenos Station Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2485,
            "name": "Brokerock Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2490,
            "name": "All Flags Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2499,
            "name": "Trappers Peak Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2505,
            "name": "Westbay Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 2519,
            "name": "Gonfalon Square Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 2545,
            "name": "Serpents Hollow Wayshrine"
          },
          {
            "activityIndex": 15,
            "activityId": 2546,
            "name": "Flooded Coast Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2464,
            "name": "Breakwater Cave"
          },
          {
            "activityIndex": 2,
            "activityId": 2465,
            "name": "The Firepot"
          },
          {
            "activityIndex": 3,
            "activityId": 2466,
            "name": "Death's Valor Keep"
          },
          {
            "activityIndex": 4,
            "activityId": 2467,
            "name": "Shipwreck Shoals"
          },
          {
            "activityIndex": 5,
            "activityId": 2468,
            "name": "Whalefall"
          },
          {
            "activityIndex": 6,
            "activityId": 2469,
            "name": "Coral Cliffs"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 504,
            "name": "High above the river across from the Firepot."
          },
          {
            "activityIndex": 2,
            "activityId": 505,
            "name": "Under the middle bridge spanning Loch Abhain."
          },
          {
            "activityIndex": 3,
            "activityId": 506,
            "name": "By a beach near the bridge on High Isle's southern coast."
          },
          {
            "activityIndex": 4,
            "activityId": 507,
            "name": "Hidden in the rocks above Jheury's Cove on High Isle."
          },
          {
            "activityIndex": 5,
            "activityId": 508,
            "name": "Just west of a pointed rock on High Isle's northernmost beach."
          },
          {
            "activityIndex": 6,
            "activityId": 509,
            "name": "In the shadow of All Flags Castle's north wall."
          },
          {
            "activityIndex": 7,
            "activityId": 510,
            "name": "Overlooking the volcanic vent north of Tor Draioch."
          },
          {
            "activityIndex": 8,
            "activityId": 511,
            "name": "In the heart of the river canyon east of Amenos Station."
          },
          {
            "activityIndex": 9,
            "activityId": 512,
            "name": "On the shore of the Flooded Coast below Snake's Eye View."
          },
          {
            "activityIndex": 10,
            "activityId": 513,
            "name": "By a bay full of wrecked ships along Skulltooth Coast."
          },
          {
            "activityIndex": 11,
            "activityId": 514,
            "name": "Follow a climbing path on the southern side of Ghost Haven Bay."
          },
          {
            "activityIndex": 12,
            "activityId": 515,
            "name": "In the hedge maze of the Spire of the Crimson Coin."
          },
          {
            "activityIndex": 13,
            "activityId": 516,
            "name": "On a ledge above a pool in the back of Breakwater Cave."
          },
          {
            "activityIndex": 14,
            "activityId": 517,
            "name": "Guarded by the dead in Death's Valor Keep."
          },
          {
            "activityIndex": 15,
            "activityId": 518,
            "name": "At one end of a natural bridge in the heart of the Firepot."
          },
          {
            "activityIndex": 16,
            "activityId": 519,
            "name": "At the end of a winding path high above Shipwreck Shoals."
          },
          {
            "activityIndex": 17,
            "activityId": 520,
            "name": "By a blue tree within the caverns of Coral Cliffs."
          },
          {
            "activityIndex": 18,
            "activityId": 521,
            "name": "Hidden high among the rocky ridges of Whalefall."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2492,
            "name": "Sapphire Point Volcanic Vent"
          },
          {
            "activityIndex": 2,
            "activityId": 2493,
            "name": "Navire Volcanic Vent"
          },
          {
            "activityIndex": 3,
            "activityId": 2494,
            "name": "Feywatch Isle Volcanic Vent"
          },
          {
            "activityIndex": 4,
            "activityId": 2495,
            "name": "Garick's Rise Volcanic Vent"
          },
          {
            "activityIndex": 5,
            "activityId": 2496,
            "name": "Serpents Hollow Volcanic Vent"
          },
          {
            "activityIndex": 6,
            "activityId": 2497,
            "name": "Haunted Coast Volcanic Vent"
          },
          {
            "activityIndex": 7,
            "activityId": 2498,
            "name": "Flooded Coast Volcanic Vent"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2470,
            "name": "Y'ffre's Cauldron"
          },
          {
            "activityIndex": 2,
            "activityId": 2471,
            "name": "Serpent Bog"
          },
          {
            "activityIndex": 3,
            "activityId": 2472,
            "name": "Faun Falls"
          },
          {
            "activityIndex": 4,
            "activityId": 2473,
            "name": "Dark Stone Hollow"
          },
          {
            "activityIndex": 5,
            "activityId": 2474,
            "name": "Amenos Basin"
          },
          {
            "activityIndex": 6,
            "activityId": 2475,
            "name": "Mornard Falls"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2500,
            "name": "Spriggan's Crown"
          },
          {
            "activityIndex": 2,
            "activityId": 2512,
            "name": "Augury Monoliths"
          },
          {
            "activityIndex": 3,
            "activityId": 2577,
            "name": "Green Serpent Getaway"
          },
          {
            "activityIndex": 4,
            "activityId": 2578,
            "name": "Banished Refuge"
          },
          {
            "activityIndex": 5,
            "activityId": 2579,
            "name": "Albatross Leap"
          },
          {
            "activityIndex": 6,
            "activityId": 2582,
            "name": "Stonelore Falls"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 12,
            "name": "Guide to the Daggerfall Covenant"
          },
          {
            "activityIndex": 2,
            "activityId": 14,
            "name": "Varieties of Faith: The Bretons"
          },
          {
            "activityIndex": 3,
            "activityId": 16,
            "name": "Wyresses: The Name-Daughters"
          },
          {
            "activityIndex": 4,
            "activityId": 24,
            "name": "The Knightly Orders of High Rock"
          },
          {
            "activityIndex": 5,
            "activityId": 25,
            "name": "The Bretons: Mongrels or Paragons?"
          },
          {
            "activityIndex": 6,
            "activityId": 31,
            "name": "Wayrest, Jewel of the Bay"
          },
          {
            "activityIndex": 7,
            "activityId": 157,
            "name": "Triumphs of a Monarch, Ch. 3"
          },
          {
            "activityIndex": 8,
            "activityId": 158,
            "name": "Triumphs of a Monarch, Ch. 6"
          },
          {
            "activityIndex": 9,
            "activityId": 159,
            "name": "Triumphs of a Monarch, Ch. 10"
          },
          {
            "activityIndex": 10,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2462,
            "name": "Spire of the Crimson Coin"
          },
          {
            "activityIndex": 2,
            "activityId": 2463,
            "name": "Ghost Haven Bay"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2487,
            "name": "Stonelore Forge and Craft"
          },
          {
            "activityIndex": 2,
            "activityId": 2488,
            "name": "Steadfast Hammer and Saw"
          },
          {
            "activityIndex": 3,
            "activityId": 2489,
            "name": "Hidden Foundry"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 584,
    "name": "Imperial City",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5496,
            "name": "City on the Brink"
          },
          {
            "activityIndex": 2,
            "activityId": 5483,
            "name": "The Imperial Standard"
          },
          {
            "activityIndex": 3,
            "activityId": 5480,
            "name": "The Bleeding Temple"
          },
          {
            "activityIndex": 4,
            "activityId": 5477,
            "name": "The Watcher in the Walls"
          },
          {
            "activityIndex": 5,
            "activityId": 5473,
            "name": "Of Brands and Bones"
          },
          {
            "activityIndex": 6,
            "activityId": 5489,
            "name": "The Lock and the Legion"
          },
          {
            "activityIndex": 7,
            "activityId": 5490,
            "name": "Knowledge is Power"
          },
          {
            "activityIndex": 8,
            "activityId": 5482,
            "name": "The Sublime Brazier"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1678,
            "name": "Arboretum"
          },
          {
            "activityIndex": 2,
            "activityId": 1679,
            "name": "Arena District"
          },
          {
            "activityIndex": 3,
            "activityId": 1680,
            "name": "Elven Gardens District"
          },
          {
            "activityIndex": 4,
            "activityId": 1681,
            "name": "Memorial District"
          },
          {
            "activityIndex": 5,
            "activityId": 1682,
            "name": "Nobles District"
          },
          {
            "activityIndex": 6,
            "activityId": 1683,
            "name": "Temple District"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1174,
            "name": "Horror of Horrors"
          },
          {
            "activityIndex": 2,
            "activityId": 4254,
            "name": "Imperial Fragment Collector"
          },
          {
            "activityIndex": 3,
            "activityId": 1267,
            "name": "Alliance Gladiator"
          },
          {
            "activityIndex": 4,
            "activityId": 1186,
            "name": "Imperial City Angler"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 340,
            "name": "Atop a pile of rancid flesh."
          },
          {
            "activityIndex": 2,
            "activityId": 341,
            "name": "Cheap seats at a pit fight."
          },
          {
            "activityIndex": 3,
            "activityId": 342,
            "name": "In the Garden's darkest corner."
          },
          {
            "activityIndex": 4,
            "activityId": 343,
            "name": "From the river to the grave."
          },
          {
            "activityIndex": 5,
            "activityId": 344,
            "name": "The most eminent nobles live upstairs."
          },
          {
            "activityIndex": 6,
            "activityId": 345,
            "name": "Near contested holy ruins."
          },
          {
            "activityIndex": 7,
            "activityId": 346,
            "name": "Darkest alchemy, bought in bulk."
          },
          {
            "activityIndex": 8,
            "activityId": 347,
            "name": "Where laundry never gets dry."
          },
          {
            "activityIndex": 9,
            "activityId": 348,
            "name": "An Aldmeri outpost, lost to crocodiles."
          },
          {
            "activityIndex": 10,
            "activityId": 349,
            "name": "Dozing in the portal-light."
          },
          {
            "activityIndex": 11,
            "activityId": 350,
            "name": "The shard is slipping down the drain."
          },
          {
            "activityIndex": 12,
            "activityId": 351,
            "name": "This cistern contains the heart of a lion."
          },
          {
            "activityIndex": 13,
            "activityId": 352,
            "name": "The deepest depths where the Tower grows roots."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1628,
            "name": "Ebral the Betrayer"
          },
          {
            "activityIndex": 2,
            "activityId": 1629,
            "name": "Emperor Leovic"
          },
          {
            "activityIndex": 3,
            "activityId": 1631,
            "name": "Hzu-Hakan"
          },
          {
            "activityIndex": 4,
            "activityId": 1632,
            "name": "Lady of the Depths"
          },
          {
            "activityIndex": 5,
            "activityId": 1633,
            "name": "Otholug gro-Goldfolly"
          },
          {
            "activityIndex": 6,
            "activityId": 1634,
            "name": "Secundinus the Despoiler"
          },
          {
            "activityIndex": 7,
            "activityId": 1635,
            "name": "Taebod the Gatekeeper"
          },
          {
            "activityIndex": 8,
            "activityId": 1636,
            "name": "Wadracki"
          },
          {
            "activityIndex": 9,
            "activityId": 1674,
            "name": "General Nazenaechar"
          },
          {
            "activityIndex": 10,
            "activityId": 1676,
            "name": "General Kryozote"
          },
          {
            "activityIndex": 11,
            "activityId": 1677,
            "name": "General Zamachar"
          },
          {
            "activityIndex": 12,
            "activityId": 1630,
            "name": "Gati the Storm Sister"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1637,
            "name": "Drain-Dweller's Outpost"
          },
          {
            "activityIndex": 2,
            "activityId": 1638,
            "name": "Unfinished Memoirs"
          },
          {
            "activityIndex": 3,
            "activityId": 1639,
            "name": "Alik'ri Alcove"
          },
          {
            "activityIndex": 4,
            "activityId": 1690,
            "name": "Bloodmist Slaughterhouse"
          },
          {
            "activityIndex": 5,
            "activityId": 1691,
            "name": "Headsman's Bone Pile"
          },
          {
            "activityIndex": 6,
            "activityId": 1692,
            "name": "Inquisitor's Retreat"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 210,
            "name": "An Accounting of the Elder Scrolls"
          },
          {
            "activityIndex": 2,
            "activityId": 212,
            "name": "The Amulet of Kings"
          },
          {
            "activityIndex": 3,
            "activityId": 260,
            "name": "Varieties of Daedra, Part 2"
          },
          {
            "activityIndex": 4,
            "activityId": 280,
            "name": "The Order of the Black Worm"
          },
          {
            "activityIndex": 5,
            "activityId": 172,
            "name": "The Spawn of Molag Bal"
          },
          {
            "activityIndex": 6,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 7,
            "activityId": 257,
            "name": "On Oblivion"
          },
          {
            "activityIndex": 8,
            "activityId": 254,
            "name": "Darkest Darkness"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1658,
            "name": "Arboretum Armory"
          },
          {
            "activityIndex": 2,
            "activityId": 1659,
            "name": "Nobles Armory"
          },
          {
            "activityIndex": 3,
            "activityId": 1660,
            "name": "Memorial Armory"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 537,
    "name": "Khenarthi's Roost",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4680,
            "name": "Storm on the Horizon"
          },
          {
            "activityIndex": 2,
            "activityId": 4620,
            "name": "Cast Adrift"
          },
          {
            "activityIndex": 3,
            "activityId": 4625,
            "name": "Tears of the Two Moons"
          },
          {
            "activityIndex": 4,
            "activityId": 4624,
            "name": "The Perils of Diplomacy"
          },
          {
            "activityIndex": 5,
            "activityId": 4621,
            "name": "The Tempest Unleashed"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 870,
            "name": "Eagle's Strand"
          },
          {
            "activityIndex": 2,
            "activityId": 871,
            "name": "Temple of the Mourning Springs"
          },
          {
            "activityIndex": 3,
            "activityId": 872,
            "name": "Shattered Shoals"
          },
          {
            "activityIndex": 4,
            "activityId": 873,
            "name": "Mistral"
          },
          {
            "activityIndex": 5,
            "activityId": 904,
            "name": "Hazak's Hollow"
          },
          {
            "activityIndex": 6,
            "activityId": 882,
            "name": "Cat's Eye Quay"
          },
          {
            "activityIndex": 7,
            "activityId": 1001,
            "name": "Windcatcher Plantation"
          },
          {
            "activityIndex": 8,
            "activityId": 1002,
            "name": "Speckled Shell Plantation"
          },
          {
            "activityIndex": 9,
            "activityId": 1003,
            "name": "Laughing Moons Plantation"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 526,
            "name": "Skooma Watch"
          },
          {
            "activityIndex": 2,
            "activityId": 492,
            "name": "Khenarthi's Roost Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 879,
            "name": "Khenarthi's Roost Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 880,
            "name": "Mistral Wayshrine"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 87,
            "name": "Exposed to sky, surveying the strand."
          },
          {
            "activityIndex": 2,
            "activityId": 88,
            "name": "Southern temple's hidden jewel."
          },
          {
            "activityIndex": 3,
            "activityId": 89,
            "name": "Wooden bones, awash in ruin."
          },
          {
            "activityIndex": 4,
            "activityId": 90,
            "name": "Abandoned before mourning."
          },
          {
            "activityIndex": 5,
            "activityId": 91,
            "name": "Sighted by serpents in Mistral."
          },
          {
            "activityIndex": 6,
            "activityId": 92,
            "name": "Surly root-chewers burrow nearby."
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1295,
            "name": "Bolga's Hunting Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1296,
            "name": "Temple of the Crescent Moons"
          },
          {
            "activityIndex": 3,
            "activityId": 1297,
            "name": "Temple of Two-Moons Dance"
          },
          {
            "activityIndex": 4,
            "activityId": 1298,
            "name": "Temple of the Dark Moon"
          },
          {
            "activityIndex": 5,
            "activityId": 1299,
            "name": "Rid-Thar's Solace"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 58,
    "name": "Malabal Tor",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4193,
            "name": "House and Home"
          },
          {
            "activityIndex": 2,
            "activityId": 4194,
            "name": "One Fell Swoop"
          },
          {
            "activityIndex": 3,
            "activityId": 4458,
            "name": "The Drublog of Dra'bul"
          },
          {
            "activityIndex": 4,
            "activityId": 4452,
            "name": "Reap What Is Sown"
          },
          {
            "activityIndex": 5,
            "activityId": 4456,
            "name": "The Hound's Plan"
          },
          {
            "activityIndex": 6,
            "activityId": 4124,
            "name": "The Prisoner of Jathsogur"
          },
          {
            "activityIndex": 7,
            "activityId": 4477,
            "name": "A Wedding to Attend"
          },
          {
            "activityIndex": 8,
            "activityId": 4143,
            "name": "Restore the Silvenar"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 563,
            "name": "Ouze"
          },
          {
            "activityIndex": 2,
            "activityId": 586,
            "name": "Jathsogur"
          },
          {
            "activityIndex": 3,
            "activityId": 582,
            "name": "Bloodtoil Valley"
          },
          {
            "activityIndex": 4,
            "activityId": 588,
            "name": "Wilding Run"
          },
          {
            "activityIndex": 5,
            "activityId": 589,
            "name": "Vulkwasten"
          },
          {
            "activityIndex": 6,
            "activityId": 584,
            "name": "Fuller's Break"
          },
          {
            "activityIndex": 7,
            "activityId": 592,
            "name": "Jode's Pocket"
          },
          {
            "activityIndex": 8,
            "activityId": 594,
            "name": "Silvenar"
          },
          {
            "activityIndex": 9,
            "activityId": 587,
            "name": "Ilayas Ruins"
          },
          {
            "activityIndex": 10,
            "activityId": 600,
            "name": "Abamath"
          },
          {
            "activityIndex": 11,
            "activityId": 599,
            "name": "Dra'bul"
          },
          {
            "activityIndex": 12,
            "activityId": 618,
            "name": "Treehenge"
          },
          {
            "activityIndex": 13,
            "activityId": 581,
            "name": "Valeguard"
          },
          {
            "activityIndex": 14,
            "activityId": 628,
            "name": "Velyn Harbor"
          },
          {
            "activityIndex": 15,
            "activityId": 629,
            "name": "Baandari Trading Post"
          },
          {
            "activityIndex": 16,
            "activityId": 562,
            "name": "Deepwoods"
          },
          {
            "activityIndex": 17,
            "activityId": 723,
            "name": "Belarata"
          },
          {
            "activityIndex": 18,
            "activityId": 1332,
            "name": "Tanglehaven"
          },
          {
            "activityIndex": 19,
            "activityId": 1333,
            "name": "Falinesti Summer Site"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 611,
            "name": "Malabal Tor Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 460,
            "name": "Crimson Cove Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1051,
            "name": "Crimson Cove Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 486,
            "name": "Malabal Tor Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 565,
            "name": "Dra'bul Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 566,
            "name": "Ilayas Ruins Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 567,
            "name": "Velyn Harbor Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 568,
            "name": "Vulkwasten Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 569,
            "name": "Abamath Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 570,
            "name": "Wilding Run Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 571,
            "name": "Baandari Market Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 572,
            "name": "Bloodtoil Valley Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 574,
            "name": "Valeguard Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 672,
            "name": "Dead Man's Drop"
          },
          {
            "activityIndex": 2,
            "activityId": 680,
            "name": "Black Vine Ruins"
          },
          {
            "activityIndex": 3,
            "activityId": 681,
            "name": "Roots of Silvenar"
          },
          {
            "activityIndex": 4,
            "activityId": 682,
            "name": "Shael Ruins"
          },
          {
            "activityIndex": 5,
            "activityId": 717,
            "name": "Hoarvor Pit"
          },
          {
            "activityIndex": 6,
            "activityId": 718,
            "name": "Tomb of the Apostates"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 141,
            "name": "Near Ayleid ruins guarded by the Stormwardens."
          },
          {
            "activityIndex": 2,
            "activityId": 142,
            "name": "The best view of Fuller's Break."
          },
          {
            "activityIndex": 3,
            "activityId": 143,
            "name": "Unnoticed by a melancholy Elf."
          },
          {
            "activityIndex": 4,
            "activityId": 144,
            "name": "Near the river, disentangled."
          },
          {
            "activityIndex": 5,
            "activityId": 145,
            "name": "Seek seaward cliffs by the brewery town."
          },
          {
            "activityIndex": 6,
            "activityId": 146,
            "name": "Fell from a bridge fleeing Abamath."
          },
          {
            "activityIndex": 7,
            "activityId": 147,
            "name": "Search every nook to lift the Vale."
          },
          {
            "activityIndex": 8,
            "activityId": 148,
            "name": "Eyed from an islet in the river."
          },
          {
            "activityIndex": 9,
            "activityId": 149,
            "name": "Follow the sound of the wilding waves."
          },
          {
            "activityIndex": 10,
            "activityId": 150,
            "name": "Withered within the vine."
          },
          {
            "activityIndex": 11,
            "activityId": 151,
            "name": "Dropped off when he still lived."
          },
          {
            "activityIndex": 12,
            "activityId": 152,
            "name": "Property of parasites."
          },
          {
            "activityIndex": 13,
            "activityId": 153,
            "name": "Fungus dwellers dig far from home."
          },
          {
            "activityIndex": 14,
            "activityId": 154,
            "name": "Part of Arrai's spectral dominion."
          },
          {
            "activityIndex": 15,
            "activityId": 155,
            "name": "Haunted by heretics."
          },
          {
            "activityIndex": 16,
            "activityId": 156,
            "name": "Held by red-handed bandits."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 768,
            "name": "Broken Coast Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 769,
            "name": "Xylo River Basin Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 770,
            "name": "Silvenar Vale Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1171,
            "name": "Bone Grappler's Nest"
          },
          {
            "activityIndex": 2,
            "activityId": 1172,
            "name": "Bitterpoint Strand"
          },
          {
            "activityIndex": 3,
            "activityId": 1173,
            "name": "Dugan's Knoll"
          },
          {
            "activityIndex": 4,
            "activityId": 1174,
            "name": "River Edge"
          },
          {
            "activityIndex": 5,
            "activityId": 1175,
            "name": "Jagged Grotto"
          },
          {
            "activityIndex": 6,
            "activityId": 1176,
            "name": "Windshriek Strand"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1328,
            "name": "Horseshoe Island"
          },
          {
            "activityIndex": 2,
            "activityId": 1329,
            "name": "Supplication House"
          },
          {
            "activityIndex": 3,
            "activityId": 1330,
            "name": "Ogrim's Yawn"
          },
          {
            "activityIndex": 4,
            "activityId": 1335,
            "name": "Stranglewatch"
          },
          {
            "activityIndex": 5,
            "activityId": 1336,
            "name": "Ragnthar"
          },
          {
            "activityIndex": 6,
            "activityId": 1338,
            "name": "Starwalk Cavern"
          },
          {
            "activityIndex": 7,
            "activityId": 1446,
            "name": "Four Quarry Islet"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 169,
            "name": "Opusculus Lamae Bal ta Mezzamortie"
          },
          {
            "activityIndex": 2,
            "activityId": 170,
            "name": "The Totems of Hircine"
          },
          {
            "activityIndex": 3,
            "activityId": 203,
            "name": "Ancient Scrolls of the Dwemer I-B"
          },
          {
            "activityIndex": 4,
            "activityId": 204,
            "name": "Guylaine's Dwemer Architecture"
          },
          {
            "activityIndex": 5,
            "activityId": 205,
            "name": "Ancient Scrolls of the Dwemer VIII"
          },
          {
            "activityIndex": 6,
            "activityId": 210,
            "name": "An Accounting of the Elder Scrolls"
          },
          {
            "activityIndex": 7,
            "activityId": 211,
            "name": "The Adabal-a"
          },
          {
            "activityIndex": 8,
            "activityId": 212,
            "name": "The Amulet of Kings"
          },
          {
            "activityIndex": 9,
            "activityId": 213,
            "name": "The Cleansing of the Fane"
          },
          {
            "activityIndex": 10,
            "activityId": 214,
            "name": "The Exclusionary Mandates"
          },
          {
            "activityIndex": 11,
            "activityId": 215,
            "name": "The Last King of the Ayleids"
          },
          {
            "activityIndex": 12,
            "activityId": 216,
            "name": "The Order of the Ancestor Moth"
          },
          {
            "activityIndex": 13,
            "activityId": 217,
            "name": "Tamrielic Artifacts, Part One"
          },
          {
            "activityIndex": 14,
            "activityId": 218,
            "name": "Tamrielic Artifacts, Part Two"
          },
          {
            "activityIndex": 15,
            "activityId": 219,
            "name": "Tamrielic Artifacts, Part Three"
          },
          {
            "activityIndex": 16,
            "activityId": 263,
            "name": "The Battle of Glenumbria Moors"
          },
          {
            "activityIndex": 17,
            "activityId": 264,
            "name": "The Book of Dawn and Dusk"
          },
          {
            "activityIndex": 18,
            "activityId": 265,
            "name": "The Cantatas of Vivec"
          },
          {
            "activityIndex": 19,
            "activityId": 266,
            "name": "The Five Far Stars"
          },
          {
            "activityIndex": 20,
            "activityId": 267,
            "name": "Flesh to Cut from Bone"
          },
          {
            "activityIndex": 21,
            "activityId": 268,
            "name": "Ode to the Tundrastriders"
          },
          {
            "activityIndex": 22,
            "activityId": 354,
            "name": "The Voice of the People"
          },
          {
            "activityIndex": 23,
            "activityId": 355,
            "name": "The Woodsmer"
          },
          {
            "activityIndex": 24,
            "activityId": 356,
            "name": "Green Lady, My Lady"
          },
          {
            "activityIndex": 25,
            "activityId": 357,
            "name": "Valenwood: A Study"
          },
          {
            "activityIndex": 26,
            "activityId": 358,
            "name": "The Humor of Wood Elves"
          },
          {
            "activityIndex": 27,
            "activityId": 359,
            "name": "Pirates of the Abecean"
          },
          {
            "activityIndex": 28,
            "activityId": 360,
            "name": "The Wedding Feast: A Memoir"
          },
          {
            "activityIndex": 29,
            "activityId": 361,
            "name": "A Nereid Stole My Husband"
          },
          {
            "activityIndex": 30,
            "activityId": 362,
            "name": "The Red Paint"
          },
          {
            "activityIndex": 31,
            "activityId": 363,
            "name": "Ayleid Cities of Valenwood"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 577,
            "name": "The Thief"
          },
          {
            "activityIndex": 2,
            "activityId": 578,
            "name": "The Ritual"
          },
          {
            "activityIndex": 3,
            "activityId": 579,
            "name": "The Warrior"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 761,
            "name": "Crimson Cove"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1334,
            "name": "Sleepy Senche Overlook"
          },
          {
            "activityIndex": 2,
            "activityId": 1337,
            "name": "Chancel of Divine Entreaty"
          },
          {
            "activityIndex": 3,
            "activityId": 1339,
            "name": "Matthild's Last Venture"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 726,
    "name": "Murkmire",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6246,
            "name": "Sunken Treasure"
          },
          {
            "activityIndex": 2,
            "activityId": 6266,
            "name": "Missing in Murkmire"
          },
          {
            "activityIndex": 3,
            "activityId": 6241,
            "name": "Whispers in the Wood"
          },
          {
            "activityIndex": 4,
            "activityId": 6259,
            "name": "Death and Dreaming"
          },
          {
            "activityIndex": 5,
            "activityId": 6243,
            "name": "The Swamp and the Serpent"
          },
          {
            "activityIndex": 6,
            "activityId": 6244,
            "name": "The Remnant of Argon"
          },
          {
            "activityIndex": 7,
            "activityId": 6245,
            "name": "By River and Root"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2086,
            "name": "Lilmoth"
          },
          {
            "activityIndex": 2,
            "activityId": 2087,
            "name": "Bright-Throat Village"
          },
          {
            "activityIndex": 3,
            "activityId": 2088,
            "name": "Dead-Water Village"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2332,
            "name": "Murkmire Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 2320,
            "name": "Chronic Chronologer"
          },
          {
            "activityIndex": 3,
            "activityId": 2357,
            "name": "Vine-Tongue Traveler"
          },
          {
            "activityIndex": 4,
            "activityId": 2295,
            "name": "Murkmire Master Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2091,
            "name": "Lilmoth Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2092,
            "name": "Bright-Throat Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2093,
            "name": "Dead-Water Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2100,
            "name": "Root-Whisper Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2112,
            "name": "Blackrose Prison Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2096,
            "name": "Tsofeer Cavern"
          },
          {
            "activityIndex": 2,
            "activityId": 2097,
            "name": "Teeth of Sithis"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 424,
            "name": "Atop the xanmeer between Lilmoth and Alten Meerhleel"
          },
          {
            "activityIndex": 2,
            "activityId": 425,
            "name": "Along the shore south of the Xinchei-Konu"
          },
          {
            "activityIndex": 3,
            "activityId": 426,
            "name": "Amidst the falls south of the Dominus Fatum"
          },
          {
            "activityIndex": 4,
            "activityId": 427,
            "name": "Beside the rotten hut north of Dead-Water Village"
          },
          {
            "activityIndex": 5,
            "activityId": 428,
            "name": "Deep in Tsofeer Cavern, far from any exit"
          },
          {
            "activityIndex": 6,
            "activityId": 429,
            "name": "Within the Teeth of Sithis atop the sunrise xanmeer"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2095,
            "name": "Echoing Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 2094,
            "name": "Bok-Xul"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2090,
            "name": "Alten Meerhleel"
          },
          {
            "activityIndex": 2,
            "activityId": 2098,
            "name": "The Dominus Fatum"
          },
          {
            "activityIndex": 3,
            "activityId": 2099,
            "name": "Ruined Guardhouse"
          },
          {
            "activityIndex": 4,
            "activityId": 2101,
            "name": "Root-Whisper Village"
          },
          {
            "activityIndex": 5,
            "activityId": 2105,
            "name": "Xinchei-Konu Monument"
          },
          {
            "activityIndex": 6,
            "activityId": 2110,
            "name": "Path of the Lily"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2102,
            "name": "Ruined Village"
          },
          {
            "activityIndex": 2,
            "activityId": 2103,
            "name": "Deep Swamp Forge"
          },
          {
            "activityIndex": 3,
            "activityId": 2104,
            "name": "Sweet Breeze Overlook"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1086,
    "name": "Northern Elsweyr",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6336,
            "name": "A Rage of Dragons"
          },
          {
            "activityIndex": 2,
            "activityId": 6338,
            "name": "The Usurper Queen"
          },
          {
            "activityIndex": 3,
            "activityId": 6296,
            "name": "The Battle for Riverhold"
          },
          {
            "activityIndex": 4,
            "activityId": 6304,
            "name": "Two Queens"
          },
          {
            "activityIndex": 5,
            "activityId": 6297,
            "name": "The Final Order"
          },
          {
            "activityIndex": 6,
            "activityId": 6305,
            "name": "Cadwell the Betrayer"
          },
          {
            "activityIndex": 7,
            "activityId": 6315,
            "name": "Jode's Core"
          },
          {
            "activityIndex": 8,
            "activityId": 6328,
            "name": "The Heir of Anequina"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2133,
            "name": "Riverhold"
          },
          {
            "activityIndex": 2,
            "activityId": 2134,
            "name": "Rimmen"
          },
          {
            "activityIndex": 3,
            "activityId": 2135,
            "name": "Hakoshae"
          },
          {
            "activityIndex": 4,
            "activityId": 2136,
            "name": "The Prowl"
          },
          {
            "activityIndex": 5,
            "activityId": 2137,
            "name": "Anequina Aqueduct"
          },
          {
            "activityIndex": 6,
            "activityId": 2138,
            "name": "Weeping Scar"
          },
          {
            "activityIndex": 7,
            "activityId": 2139,
            "name": "Cicatrice"
          },
          {
            "activityIndex": 8,
            "activityId": 2140,
            "name": "Ashen Scar"
          },
          {
            "activityIndex": 9,
            "activityId": 2141,
            "name": "The Stitches"
          },
          {
            "activityIndex": 10,
            "activityId": 2142,
            "name": "Two Moons at Tenmar Temple"
          },
          {
            "activityIndex": 11,
            "activityId": 2143,
            "name": "Merryvale Farms"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2508,
            "name": "Elsweyr Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 2463,
            "name": "Mural Mender"
          },
          {
            "activityIndex": 3,
            "activityId": 2444,
            "name": "Rimmen Necropolis Group Event"
          },
          {
            "activityIndex": 4,
            "activityId": 2445,
            "name": "Orcrest Group Event"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2156,
            "name": "Riverhold Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2157,
            "name": "Rimmen Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2158,
            "name": "The Stitches Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2159,
            "name": "Tenmar Temple Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2161,
            "name": "Scar's End Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2162,
            "name": "Hakoshae Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2160,
            "name": "Star Haven Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2125,
            "name": "Abode of Ignominy"
          },
          {
            "activityIndex": 2,
            "activityId": 2126,
            "name": "Predator Mesa"
          },
          {
            "activityIndex": 3,
            "activityId": 2128,
            "name": "Tomb of the Serpents"
          },
          {
            "activityIndex": 4,
            "activityId": 2129,
            "name": "Darkpool Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 2130,
            "name": "The Tangle"
          },
          {
            "activityIndex": 6,
            "activityId": 2164,
            "name": "Desert Wind Caverns"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 430,
            "name": "Near Riverhold, where the river falls."
          },
          {
            "activityIndex": 2,
            "activityId": 431,
            "name": "In the ruins where poachers Prowl."
          },
          {
            "activityIndex": 3,
            "activityId": 432,
            "name": "At the creek's end, where shadows dance."
          },
          {
            "activityIndex": 4,
            "activityId": 433,
            "name": "In a cart among Rimmen's canes."
          },
          {
            "activityIndex": 5,
            "activityId": 434,
            "name": "In a shattered crate beneath the Stitches."
          },
          {
            "activityIndex": 6,
            "activityId": 435,
            "name": "In a hidden cave beneath the Moon Gate of Anequina."
          },
          {
            "activityIndex": 7,
            "activityId": 436,
            "name": "Overlooking the buzzing hives of Merryvale Farms."
          },
          {
            "activityIndex": 8,
            "activityId": 437,
            "name": "Behind a burned out farmhouse."
          },
          {
            "activityIndex": 9,
            "activityId": 438,
            "name": "In the shadow of a Dragon's wings."
          },
          {
            "activityIndex": 10,
            "activityId": 439,
            "name": "On the ridgeline overlooking the Ashen Scar."
          },
          {
            "activityIndex": 11,
            "activityId": 440,
            "name": "In the darkest depths of Orcrest, where all the pipes converge."
          },
          {
            "activityIndex": 12,
            "activityId": 441,
            "name": "On an altar, deep within the Rimmen Necropolis."
          },
          {
            "activityIndex": 13,
            "activityId": 442,
            "name": "On an unsteady ledge, buffeted by the Desert Wind."
          },
          {
            "activityIndex": 14,
            "activityId": 443,
            "name": "Tucked away on the highest scarp of Predator Mesa."
          },
          {
            "activityIndex": 15,
            "activityId": 444,
            "name": "At the mouth of a cave, in an ignoble abode."
          },
          {
            "activityIndex": 16,
            "activityId": 445,
            "name": "On an oil-slick island in Darkpool Mine."
          },
          {
            "activityIndex": 17,
            "activityId": 446,
            "name": "Hidden in the Tangle undergrowth."
          },
          {
            "activityIndex": 18,
            "activityId": 447,
            "name": "Protected by the armored guardians of the serpents' tomb."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2119,
            "name": "The Bone Pit"
          },
          {
            "activityIndex": 2,
            "activityId": 2120,
            "name": "Scar's Edge"
          },
          {
            "activityIndex": 3,
            "activityId": 2121,
            "name": "Red Hands Run"
          },
          {
            "activityIndex": 4,
            "activityId": 2122,
            "name": "Hill of Shattered Swords"
          },
          {
            "activityIndex": 5,
            "activityId": 2123,
            "name": "Talon Gulch"
          },
          {
            "activityIndex": 6,
            "activityId": 2124,
            "name": "Nightmare Plateau"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2150,
            "name": "Star Haven Adeptorium"
          },
          {
            "activityIndex": 2,
            "activityId": 2151,
            "name": "Shadow Dance Ruins"
          },
          {
            "activityIndex": 3,
            "activityId": 2152,
            "name": "Moon Gate of Anequina"
          },
          {
            "activityIndex": 4,
            "activityId": 2153,
            "name": "Sleepy Senche Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 2154,
            "name": "Defense Force Outpost"
          },
          {
            "activityIndex": 6,
            "activityId": 2155,
            "name": "Sandswirl Manor"
          },
          {
            "activityIndex": 7,
            "activityId": 2166,
            "name": "Valenwood Gate"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 8,
            "name": "A Warning to the Aldmeri Dominion"
          },
          {
            "activityIndex": 2,
            "activityId": 298,
            "name": "On the Knahaten Flu"
          },
          {
            "activityIndex": 3,
            "activityId": 907,
            "name": "The Rise of Queen Ayrenn"
          },
          {
            "activityIndex": 4,
            "activityId": 1414,
            "name": "Varieties of Faith: The Khajiit"
          },
          {
            "activityIndex": 5,
            "activityId": 1422,
            "name": "The Legend of Vastarie"
          },
          {
            "activityIndex": 6,
            "activityId": 1434,
            "name": "The Moon Cats and their Dance"
          },
          {
            "activityIndex": 7,
            "activityId": 1435,
            "name": "Litter-Mates of Darkness"
          },
          {
            "activityIndex": 8,
            "activityId": 1440,
            "name": "Moon-Sugar for Glossy Fur? Yes!"
          },
          {
            "activityIndex": 9,
            "activityId": 1441,
            "name": "Master Zoaraym's Tale, Part 1"
          },
          {
            "activityIndex": 10,
            "activityId": 1442,
            "name": "Master Zoaraym's Tale, Part 2"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2131,
            "name": "Rimmen Necropolis"
          },
          {
            "activityIndex": 2,
            "activityId": 2132,
            "name": "Orcrest"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2144,
            "name": "Starlight Adeptorium"
          },
          {
            "activityIndex": 2,
            "activityId": 2145,
            "name": "Valenwood Border Artisan Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 2146,
            "name": "Rimmen Masterworks"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 382,
    "name": "Reaper's March",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4460,
            "name": "Grim Situation"
          },
          {
            "activityIndex": 2,
            "activityId": 4461,
            "name": "Grimmer Still"
          },
          {
            "activityIndex": 3,
            "activityId": 4652,
            "name": "The Colovian Occupation"
          },
          {
            "activityIndex": 4,
            "activityId": 4653,
            "name": "Stonefire Machinations"
          },
          {
            "activityIndex": 5,
            "activityId": 4689,
            "name": "A Door Into Moonlight"
          },
          {
            "activityIndex": 6,
            "activityId": 4712,
            "name": "The First Step"
          },
          {
            "activityIndex": 7,
            "activityId": 4479,
            "name": "Motes in the Moonlight"
          },
          {
            "activityIndex": 8,
            "activityId": 4550,
            "name": "The Fires of Dune"
          },
          {
            "activityIndex": 9,
            "activityId": 4719,
            "name": "The Moonlit Path"
          },
          {
            "activityIndex": 10,
            "activityId": 4720,
            "name": "The Den of Lorkhaj"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 790,
            "name": "Thormar"
          },
          {
            "activityIndex": 2,
            "activityId": 789,
            "name": "Fort Grimwatch"
          },
          {
            "activityIndex": 3,
            "activityId": 810,
            "name": "Moonmont"
          },
          {
            "activityIndex": 4,
            "activityId": 814,
            "name": "Vinedusk Village"
          },
          {
            "activityIndex": 5,
            "activityId": 821,
            "name": "Senalana"
          },
          {
            "activityIndex": 6,
            "activityId": 815,
            "name": "Falinesti Autumn Site"
          },
          {
            "activityIndex": 7,
            "activityId": 820,
            "name": "S'ren-ja"
          },
          {
            "activityIndex": 8,
            "activityId": 836,
            "name": "Do'Krin Monastery"
          },
          {
            "activityIndex": 9,
            "activityId": 824,
            "name": "Dune"
          },
          {
            "activityIndex": 10,
            "activityId": 846,
            "name": "Hadran's Caravan"
          },
          {
            "activityIndex": 11,
            "activityId": 883,
            "name": "Greenhill"
          },
          {
            "activityIndex": 12,
            "activityId": 890,
            "name": "Pa'alat"
          },
          {
            "activityIndex": 13,
            "activityId": 886,
            "name": "Arenthia"
          },
          {
            "activityIndex": 14,
            "activityId": 893,
            "name": "Thizzrini Arena"
          },
          {
            "activityIndex": 15,
            "activityId": 925,
            "name": "Two Moons Path"
          },
          {
            "activityIndex": 16,
            "activityId": 927,
            "name": "Willowgrove"
          },
          {
            "activityIndex": 17,
            "activityId": 906,
            "name": "Rawl'kha"
          },
          {
            "activityIndex": 18,
            "activityId": 1054,
            "name": "Fort Sphinxmoth"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 602,
            "name": "Reaper's March Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 469,
            "name": "Vile Manse Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1052,
            "name": "The Vile Manse Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 487,
            "name": "Reaper's March Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 967,
            "name": "Vinedusk Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 968,
            "name": "Fort Grimwatch Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 969,
            "name": "Fort Sphinxmoth Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 970,
            "name": "Arenthia Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 976,
            "name": "Dune Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 977,
            "name": "Willowgrove Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 978,
            "name": "Moonmont Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 979,
            "name": "Rawl'kha Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 980,
            "name": "S'ren-ja Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 917,
            "name": "Kuna's Delve"
          },
          {
            "activityIndex": 2,
            "activityId": 918,
            "name": "Thibaut's Cairn"
          },
          {
            "activityIndex": 3,
            "activityId": 919,
            "name": "Weeping Wind Cave"
          },
          {
            "activityIndex": 4,
            "activityId": 920,
            "name": "Claw's Strike"
          },
          {
            "activityIndex": 5,
            "activityId": 921,
            "name": "Fardir's Folly"
          },
          {
            "activityIndex": 6,
            "activityId": 922,
            "name": "Jode's Light"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 157,
            "name": "East from the solemn eye's shrine."
          },
          {
            "activityIndex": 2,
            "activityId": 158,
            "name": "Where temple became tree-house."
          },
          {
            "activityIndex": 3,
            "activityId": 159,
            "name": "In a smoldering shell."
          },
          {
            "activityIndex": 4,
            "activityId": 160,
            "name": "Overlooking the site of the fall."
          },
          {
            "activityIndex": 5,
            "activityId": 161,
            "name": "Camped on the way to Claw's Strike."
          },
          {
            "activityIndex": 6,
            "activityId": 162,
            "name": "Hidden by a less subtle blade."
          },
          {
            "activityIndex": 7,
            "activityId": 163,
            "name": "Dune's arcane beacon."
          },
          {
            "activityIndex": 8,
            "activityId": 164,
            "name": "Mara's devout frets in view."
          },
          {
            "activityIndex": 9,
            "activityId": 165,
            "name": "Within earshot of the cheering crowd."
          },
          {
            "activityIndex": 10,
            "activityId": 166,
            "name": "Growling, beastly gladiators prowl."
          },
          {
            "activityIndex": 11,
            "activityId": 167,
            "name": "Treasure of the bard's tomb."
          },
          {
            "activityIndex": 12,
            "activityId": 168,
            "name": "Awash in tears underground."
          },
          {
            "activityIndex": 13,
            "activityId": 169,
            "name": "Outlaws strike skooma deals here."
          },
          {
            "activityIndex": 14,
            "activityId": 170,
            "name": "The folly is in passing through quickly."
          },
          {
            "activityIndex": 15,
            "activityId": 171,
            "name": "Moon's light reveals its secret."
          },
          {
            "activityIndex": 16,
            "activityId": 172,
            "name": "Far beneath a foul manor."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 934,
            "name": "Northern Woods Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 935,
            "name": "Jodewood Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 936,
            "name": "Dawnmead Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1177,
            "name": "Deathsong Cleft"
          },
          {
            "activityIndex": 2,
            "activityId": 1178,
            "name": "Big Ozur's Valley"
          },
          {
            "activityIndex": 3,
            "activityId": 1179,
            "name": "Waterdancer Falls"
          },
          {
            "activityIndex": 4,
            "activityId": 1180,
            "name": "Reaper's Henge"
          },
          {
            "activityIndex": 5,
            "activityId": 1181,
            "name": "Old S'ren-ja Docks"
          },
          {
            "activityIndex": 6,
            "activityId": 1182,
            "name": "Ushmal's Rest"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1340,
            "name": "Willowgrove Cavern"
          },
          {
            "activityIndex": 2,
            "activityId": 1342,
            "name": "Researcher's Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 1343,
            "name": "Crescent River Camp"
          },
          {
            "activityIndex": 4,
            "activityId": 1346,
            "name": "Dawnmead Brigand Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 1347,
            "name": "Little Ozur's Camp"
          },
          {
            "activityIndex": 6,
            "activityId": 1348,
            "name": "Fishing Dock"
          },
          {
            "activityIndex": 7,
            "activityId": 1349,
            "name": "Dawnmead Ruin Camp"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 206,
            "name": "Dwemer Inquiries Volume I"
          },
          {
            "activityIndex": 2,
            "activityId": 207,
            "name": "Dwemer Inquiries Volume II"
          },
          {
            "activityIndex": 3,
            "activityId": 208,
            "name": "Dwemer Inquiries Volume III"
          },
          {
            "activityIndex": 4,
            "activityId": 209,
            "name": "Ancient Scrolls of the Dwemer IV"
          },
          {
            "activityIndex": 5,
            "activityId": 222,
            "name": "The Homilies of Blessed Almalexia"
          },
          {
            "activityIndex": 6,
            "activityId": 223,
            "name": "The Legendary Scourge"
          },
          {
            "activityIndex": 7,
            "activityId": 224,
            "name": "The Lusty Argonian Maid, Vol. 1"
          },
          {
            "activityIndex": 8,
            "activityId": 225,
            "name": "The Lusty Argonian Maid, Vol. 2"
          },
          {
            "activityIndex": 9,
            "activityId": 226,
            "name": "Myths of Sheogorath, Volume 1"
          },
          {
            "activityIndex": 10,
            "activityId": 227,
            "name": "Myths of Sheogorath, Volume 2"
          },
          {
            "activityIndex": 11,
            "activityId": 228,
            "name": "The Red Book of Riddles"
          },
          {
            "activityIndex": 12,
            "activityId": 230,
            "name": "16 Accords of Madness, Vol. VI"
          },
          {
            "activityIndex": 13,
            "activityId": 231,
            "name": "Crow and Raven: Three Short Fables"
          },
          {
            "activityIndex": 14,
            "activityId": 232,
            "name": "Wabbajack"
          },
          {
            "activityIndex": 15,
            "activityId": 269,
            "name": "Proper-Life: Three Chants"
          },
          {
            "activityIndex": 16,
            "activityId": 270,
            "name": "Song of the Askelde Men"
          },
          {
            "activityIndex": 17,
            "activityId": 271,
            "name": "The Warrior's Charge"
          },
          {
            "activityIndex": 18,
            "activityId": 272,
            "name": "Words of the Wind"
          },
          {
            "activityIndex": 19,
            "activityId": 1434,
            "name": "The Moon Cats and their Dance"
          },
          {
            "activityIndex": 20,
            "activityId": 1435,
            "name": "Litter-Mates of Darkness"
          },
          {
            "activityIndex": 21,
            "activityId": 1436,
            "name": "Yours for the Taking!"
          },
          {
            "activityIndex": 22,
            "activityId": 1437,
            "name": "A Looter's Paradise"
          },
          {
            "activityIndex": 23,
            "activityId": 1438,
            "name": "The Eagle and the Cat"
          },
          {
            "activityIndex": 24,
            "activityId": 1439,
            "name": "Elven Eyes, Elven Spies"
          },
          {
            "activityIndex": 25,
            "activityId": 1440,
            "name": "Moon-Sugar for Glossy Fur? Yes!"
          },
          {
            "activityIndex": 26,
            "activityId": 1441,
            "name": "Master Zoaraym's Tale, Part 1"
          },
          {
            "activityIndex": 27,
            "activityId": 1442,
            "name": "Master Zoaraym's Tale, Part 2"
          },
          {
            "activityIndex": 28,
            "activityId": 1443,
            "name": "Cohort Briefing: Arenthia"
          },
          {
            "activityIndex": 29,
            "activityId": 1509,
            "name": "Soul-Trapping I: An Introduction"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 937,
            "name": "The Steed"
          },
          {
            "activityIndex": 2,
            "activityId": 938,
            "name": "The Apprentice"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 930,
            "name": "The Vile Manse"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1341,
            "name": "Old Town Cavern"
          },
          {
            "activityIndex": 2,
            "activityId": 1344,
            "name": "Broken Arch"
          },
          {
            "activityIndex": 3,
            "activityId": 1345,
            "name": "Greenspeaker's Grove"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 20,
    "name": "Rivenspire",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4902,
            "name": "Shornhelm Divided"
          },
          {
            "activityIndex": 2,
            "activityId": 4903,
            "name": "Dream-Walk Into Darkness"
          },
          {
            "activityIndex": 3,
            "activityId": 465,
            "name": "The Blood-Splattered Shield"
          },
          {
            "activityIndex": 4,
            "activityId": 4857,
            "name": "The Concealing Veil"
          },
          {
            "activityIndex": 5,
            "activityId": 4958,
            "name": "Northpoint in Peril"
          },
          {
            "activityIndex": 6,
            "activityId": 4972,
            "name": "The Liberation of Northpoint"
          },
          {
            "activityIndex": 7,
            "activityId": 5024,
            "name": "Puzzle of the Pass"
          },
          {
            "activityIndex": 8,
            "activityId": 4884,
            "name": "The Lightless Remnant"
          },
          {
            "activityIndex": 9,
            "activityId": 4936,
            "name": "The Crown of Shornhelm"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 29,
            "name": "Hinault Farm"
          },
          {
            "activityIndex": 2,
            "activityId": 30,
            "name": "Moira's Hope"
          },
          {
            "activityIndex": 3,
            "activityId": 31,
            "name": "Silverhoof Vale"
          },
          {
            "activityIndex": 4,
            "activityId": 238,
            "name": "Northpoint"
          },
          {
            "activityIndex": 5,
            "activityId": 34,
            "name": "Crestshade"
          },
          {
            "activityIndex": 6,
            "activityId": 35,
            "name": "Camp Tamrith"
          },
          {
            "activityIndex": 7,
            "activityId": 237,
            "name": "Fell's Run"
          },
          {
            "activityIndex": 8,
            "activityId": 37,
            "name": "Traitor's Tor"
          },
          {
            "activityIndex": 9,
            "activityId": 39,
            "name": "Sanguine Barrows"
          },
          {
            "activityIndex": 10,
            "activityId": 235,
            "name": "Shornhelm"
          },
          {
            "activityIndex": 11,
            "activityId": 76,
            "name": "Edrald Estate"
          },
          {
            "activityIndex": 12,
            "activityId": 42,
            "name": "Breagha-Fin"
          },
          {
            "activityIndex": 13,
            "activityId": 44,
            "name": "Ravenwatch Castle"
          },
          {
            "activityIndex": 14,
            "activityId": 242,
            "name": "The Doomcrag"
          },
          {
            "activityIndex": 15,
            "activityId": 38,
            "name": "Lorkrata Hills"
          },
          {
            "activityIndex": 16,
            "activityId": 404,
            "name": "Hoarfrost Downs"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 58,
            "name": "Rivenspire Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 713,
            "name": "Obsidian Scar Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 378,
            "name": "Obsidian Scar Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 473,
            "name": "Rivenspire Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 401,
            "name": "Oldgate Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 402,
            "name": "Crestshade Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 403,
            "name": "Camp Tamrith Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 405,
            "name": "Boralis Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 406,
            "name": "Staging Grounds Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 409,
            "name": "Northpoint Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 410,
            "name": "Fell's Run Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 411,
            "name": "Hoarfrost Downs Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 412,
            "name": "Shornhelm Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 573,
            "name": "Sanguine Barrows Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 1087,
            "name": "Shrouded Pass Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 422,
            "name": "Crestshade Mine"
          },
          {
            "activityIndex": 2,
            "activityId": 423,
            "name": "Flyleaf Catacombs"
          },
          {
            "activityIndex": 3,
            "activityId": 424,
            "name": "Tribulation Crypt"
          },
          {
            "activityIndex": 4,
            "activityId": 425,
            "name": "Orc's Finger Ruins"
          },
          {
            "activityIndex": 5,
            "activityId": 426,
            "name": "Erokii Ruins"
          },
          {
            "activityIndex": 6,
            "activityId": 427,
            "name": "Hildune's Secret Refuge"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 211,
            "name": "Just outside Shornhelm's gate."
          },
          {
            "activityIndex": 2,
            "activityId": 212,
            "name": "Honoring the dead in Eyebright's west."
          },
          {
            "activityIndex": 3,
            "activityId": 213,
            "name": "Crumbled tower, Crestshade's welcome."
          },
          {
            "activityIndex": 4,
            "activityId": 214,
            "name": "Wolves howl at the Hoarfrost nearby."
          },
          {
            "activityIndex": 5,
            "activityId": 215,
            "name": "Cresting the wood of words."
          },
          {
            "activityIndex": 6,
            "activityId": 216,
            "name": "In the eye of the Point."
          },
          {
            "activityIndex": 7,
            "activityId": 217,
            "name": "Skittered over in the pass."
          },
          {
            "activityIndex": 8,
            "activityId": 218,
            "name": "Follow the song to the Landing."
          },
          {
            "activityIndex": 9,
            "activityId": 219,
            "name": "Ditched outside of Lorkrata."
          },
          {
            "activityIndex": 10,
            "activityId": 220,
            "name": "In the tunnels under Crestshade."
          },
          {
            "activityIndex": 11,
            "activityId": 221,
            "name": "Seek worms that burrow for a tear."
          },
          {
            "activityIndex": 12,
            "activityId": 222,
            "name": "Among Flyleaf's unearthed dead."
          },
          {
            "activityIndex": 13,
            "activityId": 223,
            "name": "Secret in the blood-suckers' hideaway."
          },
          {
            "activityIndex": 14,
            "activityId": 224,
            "name": "Look upon the Orsimer's hand."
          },
          {
            "activityIndex": 15,
            "activityId": 225,
            "name": "Conquer the crypt of trials."
          },
          {
            "activityIndex": 16,
            "activityId": 226,
            "name": "Stolen by worshipers of Ashpit's Lord."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 961,
            "name": "Eyebright Feld Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 962,
            "name": "Westmark Moor Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 963,
            "name": "Boralis Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1227,
            "name": "Aesar's Web"
          },
          {
            "activityIndex": 2,
            "activityId": 1228,
            "name": "Valeguard Tower"
          },
          {
            "activityIndex": 3,
            "activityId": 1229,
            "name": "Old Kalgon's Keep"
          },
          {
            "activityIndex": 4,
            "activityId": 1230,
            "name": "Magdelena's Haunt"
          },
          {
            "activityIndex": 5,
            "activityId": 1231,
            "name": "East-Rock Landing"
          },
          {
            "activityIndex": 6,
            "activityId": 1232,
            "name": "Siren's Cove"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1360,
            "name": "Shadowfate Cavern"
          },
          {
            "activityIndex": 2,
            "activityId": 1361,
            "name": "Old Fell's Fort"
          },
          {
            "activityIndex": 3,
            "activityId": 1362,
            "name": "Lagra's Pearl"
          },
          {
            "activityIndex": 4,
            "activityId": 1363,
            "name": "Northsalt Village"
          },
          {
            "activityIndex": 5,
            "activityId": 1366,
            "name": "Dorell Farmhouse"
          },
          {
            "activityIndex": 6,
            "activityId": 1367,
            "name": "Southgard Tower"
          },
          {
            "activityIndex": 7,
            "activityId": 1368,
            "name": "Old Shornhelm Ruins"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 32,
            "name": "The Barrows of Westmark Moor"
          },
          {
            "activityIndex": 2,
            "activityId": 33,
            "name": "The Story of Princess Eselde"
          },
          {
            "activityIndex": 3,
            "activityId": 34,
            "name": "Bloodfiends of Rivenspire"
          },
          {
            "activityIndex": 4,
            "activityId": 35,
            "name": "The Remnant of Light"
          },
          {
            "activityIndex": 5,
            "activityId": 36,
            "name": "The Horse-Folk of Silverhoof"
          },
          {
            "activityIndex": 6,
            "activityId": 37,
            "name": "Dire Legends of the Doomcrag"
          },
          {
            "activityIndex": 7,
            "activityId": 38,
            "name": "House Tamrith: A Recent History"
          },
          {
            "activityIndex": 8,
            "activityId": 39,
            "name": "Shornhelm, Crown City of the North"
          },
          {
            "activityIndex": 9,
            "activityId": 40,
            "name": "Northpoint: An Assessment"
          },
          {
            "activityIndex": 10,
            "activityId": 41,
            "name": "House Ravenwatch Proclamation"
          },
          {
            "activityIndex": 11,
            "activityId": 167,
            "name": "Invocation of Azura"
          },
          {
            "activityIndex": 12,
            "activityId": 168,
            "name": "Modern Heretics"
          },
          {
            "activityIndex": 13,
            "activityId": 179,
            "name": "Monomyth: The Heart of the World"
          },
          {
            "activityIndex": 14,
            "activityId": 180,
            "name": "Nine Commands of the Eight Divines"
          },
          {
            "activityIndex": 15,
            "activityId": 181,
            "name": "Gods and Worship In Tamriel"
          },
          {
            "activityIndex": 16,
            "activityId": 182,
            "name": "Vivec and Mephala"
          },
          {
            "activityIndex": 17,
            "activityId": 200,
            "name": "Ancient Scrolls of the Dwemer XI"
          },
          {
            "activityIndex": 18,
            "activityId": 201,
            "name": "Antecedents of Dwemer Law"
          },
          {
            "activityIndex": 19,
            "activityId": 202,
            "name": "Dwarven Automatons"
          },
          {
            "activityIndex": 20,
            "activityId": 248,
            "name": "The Firmament"
          },
          {
            "activityIndex": 21,
            "activityId": 249,
            "name": "The Pig Children"
          },
          {
            "activityIndex": 22,
            "activityId": 250,
            "name": "Ruminations on the Elder Scrolls"
          },
          {
            "activityIndex": 23,
            "activityId": 251,
            "name": "Sithis"
          },
          {
            "activityIndex": 24,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 25,
            "activityId": 254,
            "name": "Darkest Darkness"
          },
          {
            "activityIndex": 26,
            "activityId": 255,
            "name": "The Doors of Oblivion, Part 1"
          },
          {
            "activityIndex": 27,
            "activityId": 256,
            "name": "The Doors of Oblivion, Part 2"
          },
          {
            "activityIndex": 28,
            "activityId": 257,
            "name": "On Oblivion"
          },
          {
            "activityIndex": 29,
            "activityId": 258,
            "name": "Spirit of the Daedra"
          },
          {
            "activityIndex": 30,
            "activityId": 259,
            "name": "Varieties of Daedra, Part 1"
          },
          {
            "activityIndex": 31,
            "activityId": 260,
            "name": "Varieties of Daedra, Part 2"
          },
          {
            "activityIndex": 32,
            "activityId": 274,
            "name": "Frontier, Conquest"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 413,
            "name": "The Atronach"
          },
          {
            "activityIndex": 2,
            "activityId": 414,
            "name": "The Shadow"
          },
          {
            "activityIndex": 3,
            "activityId": 415,
            "name": "The Serpent"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 290,
            "name": "Obsidian Scar"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1364,
            "name": "Veawend Ede"
          },
          {
            "activityIndex": 2,
            "activityId": 1365,
            "name": "Westwind Lighthouse"
          },
          {
            "activityIndex": 3,
            "activityId": 1369,
            "name": "Trader's Rest"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 117,
    "name": "Shadowfen",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3686,
            "name": "Three Tender Souls"
          },
          {
            "activityIndex": 2,
            "activityId": 3687,
            "name": "Getting to the Truth"
          },
          {
            "activityIndex": 3,
            "activityId": 4587,
            "name": "Trail of the Skin-Stealer"
          },
          {
            "activityIndex": 4,
            "activityId": 4590,
            "name": "The Skin-Stealer's Lair"
          },
          {
            "activityIndex": 5,
            "activityId": 4606,
            "name": "Keepers of the Shell"
          },
          {
            "activityIndex": 6,
            "activityId": 3909,
            "name": "The Dominion's Alchemist"
          },
          {
            "activityIndex": 7,
            "activityId": 3910,
            "name": "The Dream of the Hist"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 287,
            "name": "Alten Corimont"
          },
          {
            "activityIndex": 2,
            "activityId": 317,
            "name": "Stormhold"
          },
          {
            "activityIndex": 3,
            "activityId": 301,
            "name": "Stillrise Village"
          },
          {
            "activityIndex": 4,
            "activityId": 320,
            "name": "Zuuk"
          },
          {
            "activityIndex": 5,
            "activityId": 300,
            "name": "Hissmir"
          },
          {
            "activityIndex": 6,
            "activityId": 322,
            "name": "Xal Ithix"
          },
          {
            "activityIndex": 7,
            "activityId": 315,
            "name": "Deep Graves"
          },
          {
            "activityIndex": 8,
            "activityId": 324,
            "name": "Ten-Maur-Wolk"
          },
          {
            "activityIndex": 9,
            "activityId": 318,
            "name": "Murkwater"
          },
          {
            "activityIndex": 10,
            "activityId": 331,
            "name": "Bogmother"
          },
          {
            "activityIndex": 11,
            "activityId": 334,
            "name": "Forsaken Hamlet"
          },
          {
            "activityIndex": 12,
            "activityId": 336,
            "name": "Hatching Pools"
          },
          {
            "activityIndex": 13,
            "activityId": 340,
            "name": "Sunscale Strand"
          },
          {
            "activityIndex": 14,
            "activityId": 332,
            "name": "Mud Tree Village"
          },
          {
            "activityIndex": 15,
            "activityId": 341,
            "name": "Percolating Mire"
          },
          {
            "activityIndex": 16,
            "activityId": 220,
            "name": "White Rose Prison"
          },
          {
            "activityIndex": 17,
            "activityId": 439,
            "name": "Loriasel"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 596,
            "name": "Shadowfen Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 372,
            "name": "Sanguine's Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 300,
            "name": "Sanguine's Demesne Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 479,
            "name": "Shadowfen Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 352,
            "name": "Stillrise Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 355,
            "name": "Stormhold Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 356,
            "name": "Hatching Pools Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 357,
            "name": "Bogmother Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 358,
            "name": "Alten Corimont Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 360,
            "name": "Percolating Mire Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 362,
            "name": "Hissmir Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 364,
            "name": "Loriasel Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 367,
            "name": "Venomous Fens Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 393,
            "name": "Forsaken Hamlet Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 528,
            "name": "Shrine of the Black Maw"
          },
          {
            "activityIndex": 2,
            "activityId": 529,
            "name": "Broken Tusk"
          },
          {
            "activityIndex": 3,
            "activityId": 530,
            "name": "Atanaz Ruins"
          },
          {
            "activityIndex": 4,
            "activityId": 531,
            "name": "Onkobra Kwama Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 532,
            "name": "Chid-Moska Ruins"
          },
          {
            "activityIndex": 6,
            "activityId": 533,
            "name": "Gandranen Ruins"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 39,
            "name": "Above the mages' eye between the falls."
          },
          {
            "activityIndex": 2,
            "activityId": 40,
            "name": "Still shrouded by spray past a western rise."
          },
          {
            "activityIndex": 3,
            "activityId": 41,
            "name": "Sneak behind the relic-thieves' camp."
          },
          {
            "activityIndex": 4,
            "activityId": 42,
            "name": "Beside a bowsprit among pirates."
          },
          {
            "activityIndex": 5,
            "activityId": 43,
            "name": "Ritual flames brew trouble in the mire."
          },
          {
            "activityIndex": 6,
            "activityId": 44,
            "name": "Where wisps waylay wanderers."
          },
          {
            "activityIndex": 7,
            "activityId": 45,
            "name": "Like the sound of steam or snakes."
          },
          {
            "activityIndex": 8,
            "activityId": 46,
            "name": "Overlooking the murk of Xal Ithix."
          },
          {
            "activityIndex": 9,
            "activityId": 47,
            "name": "Imprisoned in a crumbling tower."
          },
          {
            "activityIndex": 10,
            "activityId": 48,
            "name": "Peek behind pillars in Atanaz."
          },
          {
            "activityIndex": 11,
            "activityId": 49,
            "name": "Skittering, slithering, a tusk once whole."
          },
          {
            "activityIndex": 12,
            "activityId": 50,
            "name": "Unearthed by an outlaw excavation."
          },
          {
            "activityIndex": 13,
            "activityId": 51,
            "name": "Crown in hand, leave and look right."
          },
          {
            "activityIndex": 14,
            "activityId": 52,
            "name": "Climb, little kwama, to reach your goal."
          },
          {
            "activityIndex": 15,
            "activityId": 53,
            "name": "Digesting in the belly of the Black Maw."
          },
          {
            "activityIndex": 16,
            "activityId": 54,
            "name": "Deep in the den of debauchery."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 765,
            "name": "Reticulated Spine Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 766,
            "name": "Leafwater Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 767,
            "name": "Venomous Fens Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1194,
            "name": "Haynekhtnamet's Lair"
          },
          {
            "activityIndex": 2,
            "activityId": 1195,
            "name": "Captain Bones' Ship"
          },
          {
            "activityIndex": 3,
            "activityId": 1196,
            "name": "Bitterroot Cave"
          },
          {
            "activityIndex": 4,
            "activityId": 1197,
            "name": "Nen Ria"
          },
          {
            "activityIndex": 5,
            "activityId": 1198,
            "name": "Xal Thak"
          },
          {
            "activityIndex": 6,
            "activityId": 1199,
            "name": "Slaver Camp"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1404,
            "name": "Camp Silken Snare"
          },
          {
            "activityIndex": 2,
            "activityId": 1406,
            "name": "The Vile Pavilion"
          },
          {
            "activityIndex": 3,
            "activityId": 1407,
            "name": "Camp Merciful Reduction"
          },
          {
            "activityIndex": 4,
            "activityId": 1408,
            "name": "Tsonashap Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 1409,
            "name": "The Graceful Dominator"
          },
          {
            "activityIndex": 6,
            "activityId": 1410,
            "name": "Camp Crystal Abattoir"
          },
          {
            "activityIndex": 7,
            "activityId": 1412,
            "name": "Telvanni Acquisition Camp"
          },
          {
            "activityIndex": 8,
            "activityId": 1496,
            "name": "Hei-Halai"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 289,
            "name": "Suril's Journal"
          },
          {
            "activityIndex": 2,
            "activityId": 290,
            "name": "The Right Mattock for the Job"
          },
          {
            "activityIndex": 3,
            "activityId": 291,
            "name": "Dust's Shadow"
          },
          {
            "activityIndex": 4,
            "activityId": 292,
            "name": "Remember Me"
          },
          {
            "activityIndex": 5,
            "activityId": 293,
            "name": "Fair Argonian Maiden"
          },
          {
            "activityIndex": 6,
            "activityId": 294,
            "name": "A Shallow Pool"
          },
          {
            "activityIndex": 7,
            "activityId": 295,
            "name": "Freedom's Price"
          },
          {
            "activityIndex": 8,
            "activityId": 296,
            "name": "A Mother's Nursery Rhyme"
          },
          {
            "activityIndex": 9,
            "activityId": 297,
            "name": "The Ruby Necklace"
          },
          {
            "activityIndex": 10,
            "activityId": 298,
            "name": "On the Knahaten Flu"
          },
          {
            "activityIndex": 11,
            "activityId": 167,
            "name": "Invocation of Azura"
          },
          {
            "activityIndex": 12,
            "activityId": 168,
            "name": "Modern Heretics"
          },
          {
            "activityIndex": 13,
            "activityId": 179,
            "name": "Monomyth: The Heart of the World"
          },
          {
            "activityIndex": 14,
            "activityId": 180,
            "name": "Nine Commands of the Eight Divines"
          },
          {
            "activityIndex": 15,
            "activityId": 181,
            "name": "Gods and Worship In Tamriel"
          },
          {
            "activityIndex": 16,
            "activityId": 182,
            "name": "Vivec and Mephala"
          },
          {
            "activityIndex": 17,
            "activityId": 200,
            "name": "Ancient Scrolls of the Dwemer XI"
          },
          {
            "activityIndex": 18,
            "activityId": 201,
            "name": "Antecedents of Dwemer Law"
          },
          {
            "activityIndex": 19,
            "activityId": 202,
            "name": "Dwarven Automatons"
          },
          {
            "activityIndex": 20,
            "activityId": 248,
            "name": "The Firmament"
          },
          {
            "activityIndex": 21,
            "activityId": 249,
            "name": "The Pig Children"
          },
          {
            "activityIndex": 22,
            "activityId": 250,
            "name": "Ruminations on the Elder Scrolls"
          },
          {
            "activityIndex": 23,
            "activityId": 251,
            "name": "Sithis"
          },
          {
            "activityIndex": 24,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 25,
            "activityId": 254,
            "name": "Darkest Darkness"
          },
          {
            "activityIndex": 26,
            "activityId": 255,
            "name": "The Doors of Oblivion, Part 1"
          },
          {
            "activityIndex": 27,
            "activityId": 256,
            "name": "The Doors of Oblivion, Part 2"
          },
          {
            "activityIndex": 28,
            "activityId": 257,
            "name": "On Oblivion"
          },
          {
            "activityIndex": 29,
            "activityId": 258,
            "name": "Spirit of the Daedra"
          },
          {
            "activityIndex": 30,
            "activityId": 259,
            "name": "Varieties of Daedra, Part 1"
          },
          {
            "activityIndex": 31,
            "activityId": 260,
            "name": "Varieties of Daedra, Part 2"
          },
          {
            "activityIndex": 32,
            "activityId": 1505,
            "name": "Arx Corinium: First Seed Report"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 349,
            "name": "The Atronach"
          },
          {
            "activityIndex": 2,
            "activityId": 350,
            "name": "The Shadow"
          },
          {
            "activityIndex": 3,
            "activityId": 351,
            "name": "The Serpent"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 666,
            "name": "Sanguine's Demesne"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1403,
            "name": "Xal Haj-Ei Shrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1411,
            "name": "Hatchling's Crown"
          },
          {
            "activityIndex": 3,
            "activityId": 1413,
            "name": "Weeping Wamasu Falls"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1502,
    "name": "Solstice",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 7314,
            "name": "The Stirk Fellowship"
          },
          {
            "activityIndex": 2,
            "activityId": 7294,
            "name": "The Regent of Sunport"
          },
          {
            "activityIndex": 3,
            "activityId": 7318,
            "name": "The Passages Beneath"
          },
          {
            "activityIndex": 4,
            "activityId": 7295,
            "name": "The Writhing Wall"
          },
          {
            "activityIndex": 5,
            "activityId": 7296,
            "name": "The Gift of Death"
          },
          {
            "activityIndex": 6,
            "activityId": 7322,
            "name": "Crossing the Wall"
          },
          {
            "activityIndex": 7,
            "activityId": 7284,
            "name": "The Worm Turns"
          },
          {
            "activityIndex": 8,
            "activityId": 7329,
            "name": "Hunt for the Great Mage"
          },
          {
            "activityIndex": 9,
            "activityId": 7285,
            "name": "The Deep Tombs of Xul-Haj"
          },
          {
            "activityIndex": 10,
            "activityId": 7317,
            "name": "The Gates of Mor Naril"
          },
          {
            "activityIndex": 11,
            "activityId": 7286,
            "name": "The Final Dark"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2805,
            "name": "Sunport"
          },
          {
            "activityIndex": 2,
            "activityId": 2808,
            "name": "Tarnur Mine"
          },
          {
            "activityIndex": 3,
            "activityId": 2811,
            "name": "Broken Light Temple"
          },
          {
            "activityIndex": 4,
            "activityId": 2812,
            "name": "Shor's Stand"
          },
          {
            "activityIndex": 5,
            "activityId": 2813,
            "name": "Corelanya Manor"
          },
          {
            "activityIndex": 6,
            "activityId": 2814,
            "name": "Everlasting Fair"
          },
          {
            "activityIndex": 7,
            "activityId": 2815,
            "name": "Shell-Tide Village"
          },
          {
            "activityIndex": 8,
            "activityId": 2826,
            "name": "Caterwaul Cove"
          },
          {
            "activityIndex": 9,
            "activityId": 2827,
            "name": "Ashbound Hall"
          },
          {
            "activityIndex": 10,
            "activityId": 2828,
            "name": "Aldwilne Citadel"
          },
          {
            "activityIndex": 11,
            "activityId": 2830,
            "name": "Xor-Hist"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4410,
            "name": "West Solstice Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 4459,
            "name": "East Solstice Grand Adventurer"
          },
          {
            "activityIndex": 3,
            "activityId": 4477,
            "name": "Savior of Solstice"
          },
          {
            "activityIndex": 4,
            "activityId": 4407,
            "name": "Solstice Master Explorer"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2850,
            "name": "Sunport Docks Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2851,
            "name": "Western Bay Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2852,
            "name": "Shor's Stand Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2853,
            "name": "Vale of Revelry Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2854,
            "name": "Corelanya Manor Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2855,
            "name": "Shell-Tide Village Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2861,
            "name": "Sunport Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2877,
            "name": "Gristmung Hold Camp Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2878,
            "name": "Mor Naril Camp Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2879,
            "name": "Xor-Hist Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2880,
            "name": "Caterwaul Cove Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2881,
            "name": "Grand Juncture Pass Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 2882,
            "name": "Stone Cove Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 2894,
            "name": "Rampart Camp Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2817,
            "name": "Carapace Cavern"
          },
          {
            "activityIndex": 2,
            "activityId": 2818,
            "name": "Tainted Leel"
          },
          {
            "activityIndex": 3,
            "activityId": 2819,
            "name": "Vale of Revelry"
          },
          {
            "activityIndex": 4,
            "activityId": 2832,
            "name": "Lair of the Black Worm"
          },
          {
            "activityIndex": 5,
            "activityId": 2833,
            "name": "Sea and Sword Lodge"
          },
          {
            "activityIndex": 6,
            "activityId": 2834,
            "name": "Xul-Katama"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 569,
            "name": "In a high tower watching over the docks of the blighted grotto."
          },
          {
            "activityIndex": 2,
            "activityId": 570,
            "name": "At the end of a winding wooden path around the Sommelier's tent."
          },
          {
            "activityIndex": 3,
            "activityId": 571,
            "name": "Hidden high in a haunted haven of Hadolids."
          },
          {
            "activityIndex": 4,
            "activityId": 572,
            "name": "Watching over the sunken entrance to a tainted village."
          },
          {
            "activityIndex": 5,
            "activityId": 564,
            "name": "Resting on the shore beneath a once-radiant temple."
          },
          {
            "activityIndex": 6,
            "activityId": 565,
            "name": "Casting its gaze over the favorite fishing spot of local Nords."
          },
          {
            "activityIndex": 7,
            "activityId": 566,
            "name": "Meditating in the mountains with an everlasting view."
          },
          {
            "activityIndex": 8,
            "activityId": 567,
            "name": "Half-buried under the abandoned Warm-Stone Village."
          },
          {
            "activityIndex": 9,
            "activityId": 568,
            "name": "In the half-sunken ritual site ruins south of Sunport."
          },
          {
            "activityIndex": 10,
            "activityId": 579,
            "name": "At the end of the long way through the ruins of Oozt-Tzel."
          },
          {
            "activityIndex": 11,
            "activityId": 580,
            "name": "Tucked away on the highest floor of a crumbling lodge."
          },
          {
            "activityIndex": 12,
            "activityId": 587,
            "name": "On a beat and broken path leading to a perilous plunge."
          },
          {
            "activityIndex": 13,
            "activityId": 578,
            "name": "At the viaduct's end among living statues in an evil garden."
          },
          {
            "activityIndex": 14,
            "activityId": 573,
            "name": "Atop a pristine waterfall, looking west to a seaside station."
          },
          {
            "activityIndex": 15,
            "activityId": 574,
            "name": "A wall-top beacon among the broken shards of Coldharbour."
          },
          {
            "activityIndex": 16,
            "activityId": 575,
            "name": "In grim and grinning company across the bay from Mor Naril."
          },
          {
            "activityIndex": 17,
            "activityId": 576,
            "name": "Among skeletal remains at the end of a seabound path."
          },
          {
            "activityIndex": 18,
            "activityId": 577,
            "name": "Basking with a seaside view not far from Xul-Katama."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2869,
            "name": "North Siege Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 2870,
            "name": "Sunport Siege Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 2871,
            "name": "Central Siege Camp"
          },
          {
            "activityIndex": 4,
            "activityId": 2872,
            "name": "Warm-Stone Siege Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 2873,
            "name": "South Siege Camp"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2820,
            "name": "Shrine of Vakkan"
          },
          {
            "activityIndex": 2,
            "activityId": 2821,
            "name": "Ruins of Tuniria"
          },
          {
            "activityIndex": 3,
            "activityId": 2822,
            "name": "Tidewash Strand"
          },
          {
            "activityIndex": 4,
            "activityId": 2823,
            "name": "Soulcaller's Haunt"
          },
          {
            "activityIndex": 5,
            "activityId": 2824,
            "name": "Lair of Wo-Xeeth"
          },
          {
            "activityIndex": 6,
            "activityId": 2825,
            "name": "Zyv-Elehk Ritual Site"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2804,
            "name": "Warm-Stone Village"
          },
          {
            "activityIndex": 2,
            "activityId": 2842,
            "name": "The Gates of Mor Naril"
          },
          {
            "activityIndex": 3,
            "activityId": 2863,
            "name": "Swencoast Cottage"
          },
          {
            "activityIndex": 4,
            "activityId": 2864,
            "name": "Tidal Fishing Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 2865,
            "name": "Xi-Tak Ruins"
          },
          {
            "activityIndex": 6,
            "activityId": 2866,
            "name": "Sanguine Islet"
          },
          {
            "activityIndex": 7,
            "activityId": 2890,
            "name": "Coldharbour's Shattered Jaws"
          },
          {
            "activityIndex": 8,
            "activityId": 2891,
            "name": "Leviathan's End"
          },
          {
            "activityIndex": 9,
            "activityId": 2892,
            "name": "Bismuth Grotto"
          },
          {
            "activityIndex": 10,
            "activityId": 2893,
            "name": "Xaht Jeel Pier"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 280,
            "name": "The Order of the Black Worm"
          },
          {
            "activityIndex": 2,
            "activityId": 899,
            "name": "The Lay of Firsthold"
          },
          {
            "activityIndex": 3,
            "activityId": 165,
            "name": "The Dreamstride"
          },
          {
            "activityIndex": 4,
            "activityId": 1465,
            "name": "Exegesis of Merid-Nunda"
          },
          {
            "activityIndex": 5,
            "activityId": 167,
            "name": "Invocation of Azura"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2816,
            "name": "Deetra Grotto"
          },
          {
            "activityIndex": 2,
            "activityId": 2831,
            "name": "Calindvale Gardens"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2862,
            "name": "Tide-Born Foundry"
          },
          {
            "activityIndex": 2,
            "activityId": 2888,
            "name": "Salt-Air Station"
          },
          {
            "activityIndex": 3,
            "activityId": 2889,
            "name": "Fellowship Forge"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1133,
    "name": "Southern Elsweyr",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6401,
            "name": "The Dragon's Lair"
          },
          {
            "activityIndex": 2,
            "activityId": 6409,
            "name": "Reformation"
          },
          {
            "activityIndex": 3,
            "activityId": 6394,
            "name": "Uneasy Alliances"
          },
          {
            "activityIndex": 4,
            "activityId": 6399,
            "name": "Order of the New Moon"
          },
          {
            "activityIndex": 5,
            "activityId": 6403,
            "name": "The Pride of Alkosh"
          },
          {
            "activityIndex": 6,
            "activityId": 6404,
            "name": "The Dragonguard"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2186,
            "name": "Senchal"
          },
          {
            "activityIndex": 2,
            "activityId": 2187,
            "name": "South Guard Ruins"
          },
          {
            "activityIndex": 3,
            "activityId": 2188,
            "name": "Black Heights"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2626,
            "name": "Welcome to Pellitine"
          },
          {
            "activityIndex": 2,
            "activityId": 2559,
            "name": "Southern Elsweyr Master Explorer"
          },
          {
            "activityIndex": 3,
            "activityId": 2617,
            "name": "Pellitine's Pride and Joy"
          },
          {
            "activityIndex": 4,
            "activityId": 2566,
            "name": "Pellitine Master Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2178,
            "name": "Senchal Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2179,
            "name": "South Guard Ruins Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2182,
            "name": "Western Plains Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2183,
            "name": "Black Heights Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2184,
            "name": "Pridehome Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2185,
            "name": "Dragonguard Sanctum Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2189,
            "name": "Moonlit Cove"
          },
          {
            "activityIndex": 2,
            "activityId": 2190,
            "name": "Forsaken Citadel"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 448,
            "name": "Overlooking the coast, southeast of Doomstone Keep"
          },
          {
            "activityIndex": 2,
            "activityId": 449,
            "name": "Lurking inside a burned ruin in west Senchal"
          },
          {
            "activityIndex": 3,
            "activityId": 450,
            "name": "Where water falls in the Western Plains"
          },
          {
            "activityIndex": 4,
            "activityId": 451,
            "name": "Where falling water meets the natural arch east of Black Heights"
          },
          {
            "activityIndex": 5,
            "activityId": 452,
            "name": "Across a rope bridge in Moonlit Cove"
          },
          {
            "activityIndex": 6,
            "activityId": 453,
            "name": "Within the lower tunnels of the Forsaken Citadel"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2194,
            "name": "Shrine of the Reforged"
          },
          {
            "activityIndex": 2,
            "activityId": 2195,
            "name": "Ri'Atahrashi's Training Ground"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2197,
            "name": "Zazaradi's Quarry and Mine"
          },
          {
            "activityIndex": 2,
            "activityId": 2198,
            "name": "Pridehome"
          },
          {
            "activityIndex": 3,
            "activityId": 2199,
            "name": "Doomstone Keep"
          },
          {
            "activityIndex": 4,
            "activityId": 2200,
            "name": "The Forgotten Mane"
          },
          {
            "activityIndex": 5,
            "activityId": 2202,
            "name": "Purring Rock"
          },
          {
            "activityIndex": 6,
            "activityId": 2216,
            "name": "Khenarthi's Arch"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 296,
            "name": "A Mother's Nursery Rhyme"
          },
          {
            "activityIndex": 2,
            "activityId": 298,
            "name": "On the Knahaten Flu"
          },
          {
            "activityIndex": 3,
            "activityId": 359,
            "name": "Pirates of the Abecean"
          },
          {
            "activityIndex": 4,
            "activityId": 361,
            "name": "A Nereid Stole My Husband"
          },
          {
            "activityIndex": 5,
            "activityId": 1414,
            "name": "Varieties of Faith: The Khajiit"
          },
          {
            "activityIndex": 6,
            "activityId": 1434,
            "name": "The Moon Cats and their Dance"
          },
          {
            "activityIndex": 7,
            "activityId": 1438,
            "name": "The Eagle and the Cat"
          },
          {
            "activityIndex": 8,
            "activityId": 1439,
            "name": "Elven Eyes, Elven Spies"
          },
          {
            "activityIndex": 9,
            "activityId": 1441,
            "name": "Master Zoaraym's Tale, Part 1"
          },
          {
            "activityIndex": 10,
            "activityId": 1442,
            "name": "Master Zoaraym's Tale, Part 2"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2191,
            "name": "Fur-Forge Cove"
          },
          {
            "activityIndex": 2,
            "activityId": 2192,
            "name": "Cat's-Claw Station"
          },
          {
            "activityIndex": 3,
            "activityId": 2243,
            "name": "Dragonguard Armory"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 41,
    "name": "Stonefalls",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3585,
            "name": "Legacy of the Ancestors"
          },
          {
            "activityIndex": 2,
            "activityId": 3587,
            "name": "Delaying the Daggers"
          },
          {
            "activityIndex": 3,
            "activityId": 3588,
            "name": "City Under Siege"
          },
          {
            "activityIndex": 4,
            "activityId": 3615,
            "name": "Wake the Dead"
          },
          {
            "activityIndex": 5,
            "activityId": 3616,
            "name": "Rending Flames"
          },
          {
            "activityIndex": 6,
            "activityId": 3734,
            "name": "Restoring the Guardians"
          },
          {
            "activityIndex": 7,
            "activityId": 3735,
            "name": "The Death of Balreth"
          },
          {
            "activityIndex": 8,
            "activityId": 3584,
            "name": "The Coral Heart"
          },
          {
            "activityIndex": 9,
            "activityId": 3632,
            "name": "Breaking Fort Virak"
          },
          {
            "activityIndex": 10,
            "activityId": 3633,
            "name": "Evening the Odds"
          },
          {
            "activityIndex": 11,
            "activityId": 3634,
            "name": "The General's Demise"
          },
          {
            "activityIndex": 12,
            "activityId": 3695,
            "name": "Aggressive Negotiations"
          },
          {
            "activityIndex": 13,
            "activityId": 3696,
            "name": "Saving the Son"
          },
          {
            "activityIndex": 14,
            "activityId": 3826,
            "name": "Climbing the Spire"
          },
          {
            "activityIndex": 15,
            "activityId": 3837,
            "name": "Opening the Portal"
          },
          {
            "activityIndex": 16,
            "activityId": 3868,
            "name": "Sadal's Final Defeat"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 271,
            "name": "Fort Arand"
          },
          {
            "activityIndex": 2,
            "activityId": 274,
            "name": "Vivec's Antlers"
          },
          {
            "activityIndex": 3,
            "activityId": 275,
            "name": "Starved Plain"
          },
          {
            "activityIndex": 4,
            "activityId": 151,
            "name": "Davon's Watch"
          },
          {
            "activityIndex": 5,
            "activityId": 277,
            "name": "Hrogar's Hold"
          },
          {
            "activityIndex": 6,
            "activityId": 280,
            "name": "Othrenis"
          },
          {
            "activityIndex": 7,
            "activityId": 281,
            "name": "Sathram Plantation"
          },
          {
            "activityIndex": 8,
            "activityId": 284,
            "name": "Brothers of Strife"
          },
          {
            "activityIndex": 9,
            "activityId": 285,
            "name": "Heimlyn Keep"
          },
          {
            "activityIndex": 10,
            "activityId": 289,
            "name": "Kragenmoor"
          },
          {
            "activityIndex": 11,
            "activityId": 304,
            "name": "Lukiul Uxith"
          },
          {
            "activityIndex": 12,
            "activityId": 273,
            "name": "Senie"
          },
          {
            "activityIndex": 13,
            "activityId": 319,
            "name": "Sulfur Pools"
          },
          {
            "activityIndex": 14,
            "activityId": 323,
            "name": "Iliath Temple"
          },
          {
            "activityIndex": 15,
            "activityId": 314,
            "name": "Ebonheart"
          },
          {
            "activityIndex": 16,
            "activityId": 325,
            "name": "Tormented Spire"
          },
          {
            "activityIndex": 17,
            "activityId": 305,
            "name": "Ash Mountain"
          },
          {
            "activityIndex": 18,
            "activityId": 168,
            "name": "Fort Virak"
          },
          {
            "activityIndex": 19,
            "activityId": 2923,
            "name": "Shrine of Hircine"
          },
          {
            "activityIndex": 20,
            "activityId": 2925,
            "name": "Shrine of Lamae Bal"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 593,
            "name": "Stonefalls Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 368,
            "name": "Crow's Wood Conqueror"
          },
          {
            "activityIndex": 3,
            "activityId": 379,
            "name": "Crow's Wood Group Event"
          },
          {
            "activityIndex": 4,
            "activityId": 477,
            "name": "Stonefalls Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 449,
            "name": "Davon's Watch Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 450,
            "name": "Othrenis Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 451,
            "name": "Fort Arand Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 452,
            "name": "Ebonheart Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 453,
            "name": "Vivec's Antlers Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 454,
            "name": "Brothers of Strife Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 459,
            "name": "Hrogar's Hold Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 462,
            "name": "Fort Virak Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 463,
            "name": "Iliath Temple Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 465,
            "name": "Sathram Plantation Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 466,
            "name": "Kragenmoor Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 467,
            "name": "Ashen Road Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 634,
            "name": "Sulfur Pools Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 643,
            "name": "Senie Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 554,
            "name": "Inner Sea Armature"
          },
          {
            "activityIndex": 2,
            "activityId": 555,
            "name": "Mephala's Nest"
          },
          {
            "activityIndex": 3,
            "activityId": 556,
            "name": "Softloam Cavern"
          },
          {
            "activityIndex": 4,
            "activityId": 632,
            "name": "Emberflint Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 692,
            "name": "Hightide Hollow"
          },
          {
            "activityIndex": 6,
            "activityId": 693,
            "name": "Sheogorath's Tongue"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 7,
            "name": "Watching lions swim to shore."
          },
          {
            "activityIndex": 2,
            "activityId": 8,
            "name": "Near Bal Foyen's gate."
          },
          {
            "activityIndex": 3,
            "activityId": 9,
            "name": "Staging an attack on Arand."
          },
          {
            "activityIndex": 4,
            "activityId": 10,
            "name": "A lady on a cliff, beyond Sulfur Pools."
          },
          {
            "activityIndex": 5,
            "activityId": 11,
            "name": "Among mushrooms, high above Lukiul Uxith."
          },
          {
            "activityIndex": 6,
            "activityId": 12,
            "name": "Among pools of fire, above Vivec's Wayshrine."
          },
          {
            "activityIndex": 7,
            "activityId": 13,
            "name": "South on the Ashen Road, where lava flows."
          },
          {
            "activityIndex": 8,
            "activityId": 14,
            "name": "Tucked away on a grotto's mantel."
          },
          {
            "activityIndex": 9,
            "activityId": 15,
            "name": "On a hillside behind a plantation."
          },
          {
            "activityIndex": 10,
            "activityId": 16,
            "name": "Left to rust beside ancient arms."
          },
          {
            "activityIndex": 11,
            "activityId": 17,
            "name": "Used to strike flames underground."
          },
          {
            "activityIndex": 12,
            "activityId": 18,
            "name": "Listening to the Spinner's whispers."
          },
          {
            "activityIndex": 13,
            "activityId": 19,
            "name": "Where a fiery tide rises."
          },
          {
            "activityIndex": 14,
            "activityId": 20,
            "name": "Found in soft dirt by daggers."
          },
          {
            "activityIndex": 15,
            "activityId": 21,
            "name": "Discovering a taste for madness."
          },
          {
            "activityIndex": 16,
            "activityId": 22,
            "name": "Drowned in the south by a clever bird."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 758,
            "name": "Daen Seeth Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 1036,
            "name": "Zabamat Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 1037,
            "name": "Varanis Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1183,
            "name": "Strifeswarm Hive"
          },
          {
            "activityIndex": 2,
            "activityId": 1184,
            "name": "The Matron's Clutch"
          },
          {
            "activityIndex": 3,
            "activityId": 1185,
            "name": "Shivering Shrine"
          },
          {
            "activityIndex": 4,
            "activityId": 1186,
            "name": "Cave of Memories"
          },
          {
            "activityIndex": 5,
            "activityId": 1187,
            "name": "Shipwreck Strand"
          },
          {
            "activityIndex": 6,
            "activityId": 1392,
            "name": "The Brahma's Grove"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1274,
            "name": "Still-Water's Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1276,
            "name": "Strifeswarm Kwama Mine"
          },
          {
            "activityIndex": 3,
            "activityId": 1278,
            "name": "Stonefang Isle"
          },
          {
            "activityIndex": 4,
            "activityId": 1280,
            "name": "Dagger's Point Invasion Camp"
          },
          {
            "activityIndex": 5,
            "activityId": 1281,
            "name": "Davenas Farm"
          },
          {
            "activityIndex": 6,
            "activityId": 1283,
            "name": "Greymist Falls"
          },
          {
            "activityIndex": 7,
            "activityId": 1284,
            "name": "Steamlake Encampment"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 311,
            "name": "Ancestors and the Dunmer (Abridged)"
          },
          {
            "activityIndex": 2,
            "activityId": 317,
            "name": "Mottos of the Dunmeri Great Houses"
          },
          {
            "activityIndex": 3,
            "activityId": 319,
            "name": "Varieties of Faith: The Dark Elves"
          },
          {
            "activityIndex": 4,
            "activityId": 364,
            "name": "Guide to the Ebonheart Pact"
          },
          {
            "activityIndex": 5,
            "activityId": 320,
            "name": "Varieties of Faith: The Nords"
          },
          {
            "activityIndex": 6,
            "activityId": 315,
            "name": "Argonians Among Us"
          },
          {
            "activityIndex": 7,
            "activityId": 316,
            "name": "Nords of Skyrim"
          },
          {
            "activityIndex": 8,
            "activityId": 312,
            "name": "The Brothers of Strife"
          },
          {
            "activityIndex": 9,
            "activityId": 313,
            "name": "The Great Houses and Their Uses"
          },
          {
            "activityIndex": 10,
            "activityId": 318,
            "name": "Varieties of Faith: The Argonians"
          },
          {
            "activityIndex": 11,
            "activityId": 193,
            "name": "Ancient Scrolls of the Dwemer I-A"
          },
          {
            "activityIndex": 12,
            "activityId": 195,
            "name": "Ancient Scrolls of the Dwemer II"
          },
          {
            "activityIndex": 13,
            "activityId": 196,
            "name": "Ancient Scrolls of the Dwemer III"
          },
          {
            "activityIndex": 14,
            "activityId": 157,
            "name": "Triumphs of a Monarch, Ch. 3"
          },
          {
            "activityIndex": 15,
            "activityId": 158,
            "name": "Triumphs of a Monarch, Ch. 6"
          },
          {
            "activityIndex": 16,
            "activityId": 159,
            "name": "Triumphs of a Monarch, Ch. 10"
          },
          {
            "activityIndex": 17,
            "activityId": 156,
            "name": "Jorunn the Skald-King"
          },
          {
            "activityIndex": 18,
            "activityId": 155,
            "name": "The Illusion of Death"
          },
          {
            "activityIndex": 19,
            "activityId": 153,
            "name": "Galerion the Mystic"
          },
          {
            "activityIndex": 20,
            "activityId": 160,
            "name": "Trials of Saint Alessia"
          },
          {
            "activityIndex": 21,
            "activityId": 154,
            "name": "Great Harbingers of the Companions"
          },
          {
            "activityIndex": 22,
            "activityId": 164,
            "name": "Boethiah's Proving"
          },
          {
            "activityIndex": 23,
            "activityId": 163,
            "name": "Aedra and Daedra"
          },
          {
            "activityIndex": 24,
            "activityId": 275,
            "name": "History of the Fighters Guild Pt. 1"
          },
          {
            "activityIndex": 25,
            "activityId": 274,
            "name": "Frontier, Conquest"
          },
          {
            "activityIndex": 26,
            "activityId": 273,
            "name": "Ayleid Inscriptions Translated"
          },
          {
            "activityIndex": 27,
            "activityId": 173,
            "name": "The Anuad Paraphrased"
          },
          {
            "activityIndex": 28,
            "activityId": 175,
            "name": "Monomyth: Dragon God & Missing God"
          },
          {
            "activityIndex": 29,
            "activityId": 183,
            "name": "With Regards to the Ebony Blade"
          },
          {
            "activityIndex": 30,
            "activityId": 276,
            "name": "History of the Fighters Guild Pt. 2"
          },
          {
            "activityIndex": 31,
            "activityId": 277,
            "name": "Origin of the Mages Guild"
          },
          {
            "activityIndex": 32,
            "activityId": 174,
            "name": "The Lunar Lorkhan"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 468,
            "name": "The Lady"
          },
          {
            "activityIndex": 2,
            "activityId": 469,
            "name": "The Lover"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 338,
            "name": "Crow's Wood"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1277,
            "name": "Armature's Upheaval"
          },
          {
            "activityIndex": 2,
            "activityId": 1279,
            "name": "Steamfont Cavern"
          },
          {
            "activityIndex": 3,
            "activityId": 1282,
            "name": "Magmaflow Overlook"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 19,
    "name": "Stormhaven",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3412,
            "name": "A Dangerous Dream"
          },
          {
            "activityIndex": 2,
            "activityId": 2556,
            "name": "False Accusations"
          },
          {
            "activityIndex": 3,
            "activityId": 2552,
            "name": "Army at the Gates"
          },
          {
            "activityIndex": 4,
            "activityId": 2564,
            "name": "Two Sides to Every Coin"
          },
          {
            "activityIndex": 5,
            "activityId": 2566,
            "name": "Life of the Duchess"
          },
          {
            "activityIndex": 6,
            "activityId": 2567,
            "name": "The Safety of the Kingdom"
          },
          {
            "activityIndex": 7,
            "activityId": 2576,
            "name": "Tracking Sir Hughes"
          },
          {
            "activityIndex": 8,
            "activityId": 736,
            "name": "The Flame of Dissent"
          },
          {
            "activityIndex": 9,
            "activityId": 737,
            "name": "Retaking Firebrand Keep"
          },
          {
            "activityIndex": 10,
            "activityId": 467,
            "name": "Sir Hughes' Fate"
          },
          {
            "activityIndex": 11,
            "activityId": 1536,
            "name": "Fire in the Fields"
          },
          {
            "activityIndex": 12,
            "activityId": 1529,
            "name": "Azura's Guardian"
          },
          {
            "activityIndex": 13,
            "activityId": 1541,
            "name": "A Prison of Sleep"
          },
          {
            "activityIndex": 14,
            "activityId": 499,
            "name": "Pursuing the Shard"
          },
          {
            "activityIndex": 15,
            "activityId": 2495,
            "name": "The Signet Ring"
          },
          {
            "activityIndex": 16,
            "activityId": 2496,
            "name": "Evidence Against Adima"
          },
          {
            "activityIndex": 17,
            "activityId": 2497,
            "name": "Saving Hosni"
          },
          {
            "activityIndex": 18,
            "activityId": 1633,
            "name": "The Return of the Dream Shard"
          },
          {
            "activityIndex": 19,
            "activityId": 1639,
            "name": "Another Omen"
          },
          {
            "activityIndex": 20,
            "activityId": 1437,
            "name": "General Godrun's Orders"
          },
          {
            "activityIndex": 21,
            "activityId": 1346,
            "name": "Ending the Ogre Threat"
          },
          {
            "activityIndex": 22,
            "activityId": 3637,
            "name": "Godrun's Dream"
          },
          {
            "activityIndex": 23,
            "activityId": 521,
            "name": "Azura's Aid"
          },
          {
            "activityIndex": 24,
            "activityId": 575,
            "name": "Vaermina's Gambit"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 84,
            "name": "Aphren's Hold"
          },
          {
            "activityIndex": 2,
            "activityId": 85,
            "name": "Shinji's Scarp"
          },
          {
            "activityIndex": 3,
            "activityId": 82,
            "name": "Dro-Dara Plantation"
          },
          {
            "activityIndex": 4,
            "activityId": 236,
            "name": "Soulshriven Tower"
          },
          {
            "activityIndex": 5,
            "activityId": 129,
            "name": "Farangel's Landing"
          },
          {
            "activityIndex": 6,
            "activityId": 130,
            "name": "Pariah Abbey"
          },
          {
            "activityIndex": 7,
            "activityId": 131,
            "name": "Wind Keep"
          },
          {
            "activityIndex": 8,
            "activityId": 132,
            "name": "Dreughside"
          },
          {
            "activityIndex": 9,
            "activityId": 133,
            "name": "Cumberland's Watch"
          },
          {
            "activityIndex": 10,
            "activityId": 138,
            "name": "at-Tura Estate"
          },
          {
            "activityIndex": 11,
            "activityId": 139,
            "name": "Koeglin Lighthouse"
          },
          {
            "activityIndex": 12,
            "activityId": 140,
            "name": "Steelheart Moorings"
          },
          {
            "activityIndex": 13,
            "activityId": 142,
            "name": "Firebrand Keep"
          },
          {
            "activityIndex": 14,
            "activityId": 136,
            "name": "Moonlit Maw"
          },
          {
            "activityIndex": 15,
            "activityId": 144,
            "name": "Nurin Farm"
          },
          {
            "activityIndex": 16,
            "activityId": 234,
            "name": "Vanne Farm"
          },
          {
            "activityIndex": 17,
            "activityId": 239,
            "name": "Alcaire Keep"
          },
          {
            "activityIndex": 18,
            "activityId": 240,
            "name": "Koeglin Village"
          },
          {
            "activityIndex": 19,
            "activityId": 241,
            "name": "Windridge Cave"
          },
          {
            "activityIndex": 20,
            "activityId": 87,
            "name": "Weeping Giant"
          },
          {
            "activityIndex": 21,
            "activityId": 1724,
            "name": "Friendship Gate"
          },
          {
            "activityIndex": 22,
            "activityId": 1905,
            "name": "Hammerdeath Arena"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 57,
            "name": "Stormhaven Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 714,
            "name": "Bonesnap Ruins Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 1054,
            "name": "Bonesnap Ruins Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 472,
            "name": "Stormhaven Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 394,
            "name": "Koeglin Village Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 395,
            "name": "Alcaire Castle Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 396,
            "name": "Firebrand Keep Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 397,
            "name": "Wind Keep Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 398,
            "name": "Dro-Dara Plantation Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 399,
            "name": "Soulshriven Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 400,
            "name": "Pariah Abbey Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 576,
            "name": "Weeping Giant Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 827,
            "name": "Wayrest Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 833,
            "name": "Bonesnap Ruins Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 416,
            "name": "Portdun Watch"
          },
          {
            "activityIndex": 2,
            "activityId": 417,
            "name": "Koeglin Mine"
          },
          {
            "activityIndex": 3,
            "activityId": 418,
            "name": "Pariah Catacombs"
          },
          {
            "activityIndex": 4,
            "activityId": 419,
            "name": "Farangel's Delve"
          },
          {
            "activityIndex": 5,
            "activityId": 420,
            "name": "Bearclaw Mine"
          },
          {
            "activityIndex": 6,
            "activityId": 421,
            "name": "Norvulk Ruins"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 195,
            "name": "On Koeglin's crown."
          },
          {
            "activityIndex": 2,
            "activityId": 196,
            "name": "Atop the stairs of Newgate."
          },
          {
            "activityIndex": 3,
            "activityId": 197,
            "name": "Beside the henge of Nightmare Crag."
          },
          {
            "activityIndex": 4,
            "activityId": 198,
            "name": "At the foot of Wind Keep's falls."
          },
          {
            "activityIndex": 5,
            "activityId": 199,
            "name": "Before a breach in Aphren's wall."
          },
          {
            "activityIndex": 6,
            "activityId": 200,
            "name": "Atop the soulless tower."
          },
          {
            "activityIndex": 7,
            "activityId": 201,
            "name": "In the monster's pantry."
          },
          {
            "activityIndex": 8,
            "activityId": 202,
            "name": "Where the giant's tears fall."
          },
          {
            "activityIndex": 9,
            "activityId": 203,
            "name": "Camped in sight of the eastern gate."
          },
          {
            "activityIndex": 10,
            "activityId": 204,
            "name": "Delve deep with the bear's claw."
          },
          {
            "activityIndex": 11,
            "activityId": 205,
            "name": "Locked behind Farangel's iron bars."
          },
          {
            "activityIndex": 12,
            "activityId": 206,
            "name": "Mind your manners outside Steelheart."
          },
          {
            "activityIndex": 13,
            "activityId": 207,
            "name": "Explore the ruins north of Wind's Keep."
          },
          {
            "activityIndex": 14,
            "activityId": 208,
            "name": "Comb the abbey's catacombs."
          },
          {
            "activityIndex": 15,
            "activityId": 209,
            "name": "West of Firebrand, deep beneath the tower."
          },
          {
            "activityIndex": 16,
            "activityId": 210,
            "name": "Explore the ruins of broken marrow."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 808,
            "name": "Gavaudon Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 807,
            "name": "Alcaire Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 813,
            "name": "Menevia Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1219,
            "name": "Spider Nest"
          },
          {
            "activityIndex": 2,
            "activityId": 1220,
            "name": "Mudcrab Beach"
          },
          {
            "activityIndex": 3,
            "activityId": 1222,
            "name": "Dreugh Waters"
          },
          {
            "activityIndex": 4,
            "activityId": 1223,
            "name": "Abandoned Farm"
          },
          {
            "activityIndex": 5,
            "activityId": 1225,
            "name": "Scrag's Larder"
          },
          {
            "activityIndex": 6,
            "activityId": 1226,
            "name": "Ancient Altar"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1350,
            "name": "Supernal Dreamers Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1351,
            "name": "Nightmare Crag"
          },
          {
            "activityIndex": 3,
            "activityId": 1352,
            "name": "Cave of Dreams"
          },
          {
            "activityIndex": 4,
            "activityId": 1353,
            "name": "Shrine to Azura"
          },
          {
            "activityIndex": 5,
            "activityId": 1354,
            "name": "Cumberland Falls"
          },
          {
            "activityIndex": 6,
            "activityId": 1355,
            "name": "Stonechewer Goblin Camp"
          },
          {
            "activityIndex": 7,
            "activityId": 1358,
            "name": "Travelers' Rest"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 22,
            "name": "Once"
          },
          {
            "activityIndex": 2,
            "activityId": 23,
            "name": "Founding of the Spirit Wardens"
          },
          {
            "activityIndex": 3,
            "activityId": 24,
            "name": "The Knightly Orders of High Rock"
          },
          {
            "activityIndex": 4,
            "activityId": 25,
            "name": "The Bretons: Mongrels or Paragons?"
          },
          {
            "activityIndex": 5,
            "activityId": 26,
            "name": "Sacred Rites of the Stonechewers"
          },
          {
            "activityIndex": 6,
            "activityId": 27,
            "name": "Orcs: The Vermin Among Us"
          },
          {
            "activityIndex": 7,
            "activityId": 28,
            "name": "Our Calling, Our Pledge"
          },
          {
            "activityIndex": 8,
            "activityId": 29,
            "name": "To Dream Beyond Dreams"
          },
          {
            "activityIndex": 9,
            "activityId": 30,
            "name": "Tower of Adamant"
          },
          {
            "activityIndex": 10,
            "activityId": 31,
            "name": "Wayrest, Jewel of the Bay"
          },
          {
            "activityIndex": 11,
            "activityId": 165,
            "name": "The Dreamstride"
          },
          {
            "activityIndex": 12,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 13,
            "activityId": 161,
            "name": "The All-Beneficent King Fahara'jad"
          },
          {
            "activityIndex": 14,
            "activityId": 176,
            "name": "Monomyth: Lorkhan and Satakal"
          },
          {
            "activityIndex": 15,
            "activityId": 177,
            "name": "Monomyth: \"Shezarr's Song\""
          },
          {
            "activityIndex": 16,
            "activityId": 178,
            "name": "Monomyth: The Myth of Aurbis"
          },
          {
            "activityIndex": 17,
            "activityId": 197,
            "name": "Ancient Scrolls of the Dwemer V"
          },
          {
            "activityIndex": 18,
            "activityId": 198,
            "name": "Ancient Scrolls of the Dwemer VI"
          },
          {
            "activityIndex": 19,
            "activityId": 199,
            "name": "Ancient Scrolls of the Dwemer X"
          },
          {
            "activityIndex": 20,
            "activityId": 233,
            "name": "Arcana Restored"
          },
          {
            "activityIndex": 21,
            "activityId": 234,
            "name": "Liminal Bridges"
          },
          {
            "activityIndex": 22,
            "activityId": 235,
            "name": "Magic from the Sky"
          },
          {
            "activityIndex": 23,
            "activityId": 236,
            "name": "Manual of Spellcraft"
          },
          {
            "activityIndex": 24,
            "activityId": 237,
            "name": "The Old Ways"
          },
          {
            "activityIndex": 25,
            "activityId": 238,
            "name": "On the Detachment of the Sheath"
          },
          {
            "activityIndex": 26,
            "activityId": 239,
            "name": "Reality and Other Falsehoods"
          },
          {
            "activityIndex": 27,
            "activityId": 240,
            "name": "Guild Memo on Soul-Trapping"
          },
          {
            "activityIndex": 28,
            "activityId": 243,
            "name": "Before the Ages of Man: Dawn Era"
          },
          {
            "activityIndex": 29,
            "activityId": 244,
            "name": "Before the Ages of Man: Merethic Era"
          },
          {
            "activityIndex": 30,
            "activityId": 245,
            "name": "Ebony Blade History"
          },
          {
            "activityIndex": 31,
            "activityId": 246,
            "name": "Noxiphilic Sanguivoria"
          },
          {
            "activityIndex": 32,
            "activityId": 247,
            "name": "A Werewolf's Confession"
          },
          {
            "activityIndex": 33,
            "activityId": 191,
            "name": "Wayrest Sewers: A Short History"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 803,
            "name": "The Tower"
          },
          {
            "activityIndex": 2,
            "activityId": 804,
            "name": "The Mage"
          },
          {
            "activityIndex": 3,
            "activityId": 805,
            "name": "The Lord"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 297,
            "name": "Bonesnap Ruins"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1356,
            "name": "Hammerdeath Workshop"
          },
          {
            "activityIndex": 2,
            "activityId": 1357,
            "name": "Fisherman's Island"
          },
          {
            "activityIndex": 3,
            "activityId": 1359,
            "name": "Windridge Warehouse"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 534,
    "name": "Stros M'Kai",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 4466,
            "name": "The Broken Spearhead"
          },
          {
            "activityIndex": 2,
            "activityId": 4431,
            "name": "Buried Secrets"
          },
          {
            "activityIndex": 3,
            "activityId": 4454,
            "name": "Innocent Scoundrel"
          },
          {
            "activityIndex": 4,
            "activityId": 4344,
            "name": "Like Moths to a Candle"
          },
          {
            "activityIndex": 5,
            "activityId": 4476,
            "name": "Tip of the Spearhead"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 797,
            "name": "Saintsport"
          },
          {
            "activityIndex": 2,
            "activityId": 806,
            "name": "Bthzark"
          },
          {
            "activityIndex": 3,
            "activityId": 817,
            "name": "Port Hunding"
          },
          {
            "activityIndex": 4,
            "activityId": 819,
            "name": "The Grave"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 415,
            "name": "Famed Recruiter"
          },
          {
            "activityIndex": 2,
            "activityId": 491,
            "name": "Stros M'Kai Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 818,
            "name": "Port Hunding Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 822,
            "name": "Sandy Grotto Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 823,
            "name": "Saintsport Wayshrine"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 173,
            "name": "Across the water from the western wall."
          },
          {
            "activityIndex": 2,
            "activityId": 174,
            "name": "The mouth of the Grave stands open."
          },
          {
            "activityIndex": 3,
            "activityId": 175,
            "name": "Crashed through a Saintsport roof."
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1300,
            "name": "Rash Merchant's Plummet"
          },
          {
            "activityIndex": 2,
            "activityId": 1301,
            "name": "Dogeater Goblin Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 1302,
            "name": "Pillar of the Singing Sun"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 204,
            "name": "Guylaine's Dwemer Architecture"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1011,
    "name": "Summerset",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6096,
            "name": "The Queen's Decree"
          },
          {
            "activityIndex": 2,
            "activityId": 6112,
            "name": "A Pearl of Great Price"
          },
          {
            "activityIndex": 3,
            "activityId": 6132,
            "name": "Buried Memories"
          },
          {
            "activityIndex": 4,
            "activityId": 6142,
            "name": "The Tower Sentinels"
          },
          {
            "activityIndex": 5,
            "activityId": 6109,
            "name": "The Dreaming Cave"
          },
          {
            "activityIndex": 6,
            "activityId": 6113,
            "name": "Lost in Translation"
          },
          {
            "activityIndex": 7,
            "activityId": 6125,
            "name": "A Necessary Alliance"
          },
          {
            "activityIndex": 8,
            "activityId": 6126,
            "name": "The Crystal Tower"
          },
          {
            "activityIndex": 9,
            "activityId": 6153,
            "name": "A New Alliance"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1999,
            "name": "Alinor"
          },
          {
            "activityIndex": 2,
            "activityId": 1992,
            "name": "Shimmerene"
          },
          {
            "activityIndex": 3,
            "activityId": 2003,
            "name": "Lillandril"
          },
          {
            "activityIndex": 4,
            "activityId": 1993,
            "name": "Direnni Acropolis"
          },
          {
            "activityIndex": 5,
            "activityId": 1994,
            "name": "Russafeld"
          },
          {
            "activityIndex": 6,
            "activityId": 1995,
            "name": "Sil-Var-Woad"
          },
          {
            "activityIndex": 7,
            "activityId": 1996,
            "name": "Rellenthil"
          },
          {
            "activityIndex": 8,
            "activityId": 1997,
            "name": "Cey-Tarn Keep"
          },
          {
            "activityIndex": 9,
            "activityId": 1998,
            "name": "Ebon Stadmont"
          },
          {
            "activityIndex": 10,
            "activityId": 2000,
            "name": "Sea Keep"
          },
          {
            "activityIndex": 11,
            "activityId": 2001,
            "name": "Illumination Academy"
          },
          {
            "activityIndex": 12,
            "activityId": 2002,
            "name": "Corgrad Wastes"
          },
          {
            "activityIndex": 13,
            "activityId": 2054,
            "name": "Ceporah Tower"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2209,
            "name": "Summerset Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 2099,
            "name": "Relics of Summerset"
          },
          {
            "activityIndex": 3,
            "activityId": 2096,
            "name": "Karnwasten Group Event"
          },
          {
            "activityIndex": 4,
            "activityId": 2095,
            "name": "Sunhold Group Event"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2004,
            "name": "King's Haven Pass Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2005,
            "name": "Shimmerene Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2006,
            "name": "Sil-Var-Woad Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2007,
            "name": "Russafeld Heights Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2008,
            "name": "Cey-Tarn Keep Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2009,
            "name": "Ebon Stadmont Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2034,
            "name": "Alinor Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2035,
            "name": "Lillandril Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2036,
            "name": "Eastern Pass Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2037,
            "name": "The Crystal Tower Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2027,
            "name": "Eldbur Ruins Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2065,
            "name": "Sunhold Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 2070,
            "name": "Veyond Wyte Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 2055,
            "name": "Artaeum Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2010,
            "name": "King's Haven Pass"
          },
          {
            "activityIndex": 2,
            "activityId": 2012,
            "name": "Eton Nir Grotto"
          },
          {
            "activityIndex": 3,
            "activityId": 2013,
            "name": "Archon's Grove"
          },
          {
            "activityIndex": 4,
            "activityId": 2014,
            "name": "Tor-Hame-Khard"
          },
          {
            "activityIndex": 5,
            "activityId": 2015,
            "name": "Wasten Coraldale"
          },
          {
            "activityIndex": 6,
            "activityId": 2056,
            "name": "Traitor's Vault"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 406,
            "name": "Overlooking the Oleander Coast Winery"
          },
          {
            "activityIndex": 2,
            "activityId": 407,
            "name": "Among a nest of stone eggs east of Cey-Tarn Keep"
          },
          {
            "activityIndex": 3,
            "activityId": 408,
            "name": "On a tiny peninsula beneath the Cathedral of Webs"
          },
          {
            "activityIndex": 4,
            "activityId": 409,
            "name": "Along the beach north of Karnwasten"
          },
          {
            "activityIndex": 5,
            "activityId": 410,
            "name": "At a camp across a narrow plank walkway"
          },
          {
            "activityIndex": 6,
            "activityId": 411,
            "name": "In the mouth of the falls overlooking Shimmerene"
          },
          {
            "activityIndex": 7,
            "activityId": 412,
            "name": "At the ruins of the Keep of the Eleven Forces"
          },
          {
            "activityIndex": 8,
            "activityId": 413,
            "name": "Along the sun's path toward dusk"
          },
          {
            "activityIndex": 9,
            "activityId": 414,
            "name": "South of Russafeld, Where the mossy archer's aim flies true"
          },
          {
            "activityIndex": 10,
            "activityId": 415,
            "name": "Under Sea Keep's towering fortifications"
          },
          {
            "activityIndex": 11,
            "activityId": 416,
            "name": "Among the shanties in Karnwasten's cove"
          },
          {
            "activityIndex": 12,
            "activityId": 417,
            "name": "High above the heart of Sunhold"
          },
          {
            "activityIndex": 13,
            "activityId": 418,
            "name": "Stuffed in a barrel by Goblins in King Haven's Pass"
          },
          {
            "activityIndex": 14,
            "activityId": 419,
            "name": "Overlooking a sun kissed path in Eton Nir Grotto"
          },
          {
            "activityIndex": 15,
            "activityId": 420,
            "name": "At the mouth of the falls in Archon's Grove"
          },
          {
            "activityIndex": 16,
            "activityId": 421,
            "name": "In the caverns of Tor-Hame-Khard"
          },
          {
            "activityIndex": 17,
            "activityId": 422,
            "name": "Near an angler's favorite fishing spot in Wasten Coraldale"
          },
          {
            "activityIndex": 18,
            "activityId": 423,
            "name": "Looming over the center of the Traitor's Vault"
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2016,
            "name": "Direnni Abyssal Geyser"
          },
          {
            "activityIndex": 2,
            "activityId": 2038,
            "name": "Sil-Var-Woad Abyssal Geyser"
          },
          {
            "activityIndex": 3,
            "activityId": 2049,
            "name": "Rellenthil Abyssal Geyser"
          },
          {
            "activityIndex": 4,
            "activityId": 2058,
            "name": "Corgrad Abyssal Geyser"
          },
          {
            "activityIndex": 5,
            "activityId": 2059,
            "name": "Welenkin Abyssal Geyser"
          },
          {
            "activityIndex": 6,
            "activityId": 2071,
            "name": "Sunhold Abyssal Geyser"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2019,
            "name": "Graveld's Hideaway"
          },
          {
            "activityIndex": 2,
            "activityId": 2020,
            "name": "Keelsplitter's Nest"
          },
          {
            "activityIndex": 3,
            "activityId": 2021,
            "name": "Gryphon Run"
          },
          {
            "activityIndex": 4,
            "activityId": 2022,
            "name": "The Queen's Hatchery"
          },
          {
            "activityIndex": 5,
            "activityId": 2023,
            "name": "Welenkin Cove"
          },
          {
            "activityIndex": 6,
            "activityId": 2024,
            "name": "Indrik Frolic"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2028,
            "name": "Cathedral of Webs"
          },
          {
            "activityIndex": 2,
            "activityId": 2029,
            "name": "Alinor Docks"
          },
          {
            "activityIndex": 3,
            "activityId": 2030,
            "name": "Ald Mora Ruins"
          },
          {
            "activityIndex": 4,
            "activityId": 2031,
            "name": "Gryphon Aerie"
          },
          {
            "activityIndex": 5,
            "activityId": 2032,
            "name": "Keep of the Eleven Forces"
          },
          {
            "activityIndex": 6,
            "activityId": 2033,
            "name": "Garden of the Sacred Numbers"
          },
          {
            "activityIndex": 7,
            "activityId": 2052,
            "name": "Eldbur Ruins"
          },
          {
            "activityIndex": 8,
            "activityId": 2063,
            "name": "Dusk Keep"
          },
          {
            "activityIndex": 9,
            "activityId": 2069,
            "name": "Alaxon'ald"
          },
          {
            "activityIndex": 10,
            "activityId": 2073,
            "name": "Colosseum of the Old Ways"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 33,
            "name": "The Story of Princess Eselde"
          },
          {
            "activityIndex": 2,
            "activityId": 162,
            "name": "Ayrenn: The Unforeseen Queen"
          },
          {
            "activityIndex": 3,
            "activityId": 236,
            "name": "Manual of Spellcraft"
          },
          {
            "activityIndex": 4,
            "activityId": 237,
            "name": "The Old Ways"
          },
          {
            "activityIndex": 5,
            "activityId": 243,
            "name": "Before the Ages of Man: Dawn Era"
          },
          {
            "activityIndex": 6,
            "activityId": 244,
            "name": "Before the Ages of Man: Merethic Era"
          },
          {
            "activityIndex": 7,
            "activityId": 575,
            "name": "Legend of the Ghost Snake"
          },
          {
            "activityIndex": 8,
            "activityId": 900,
            "name": "Varieties of Faith: The High Elves"
          },
          {
            "activityIndex": 9,
            "activityId": 906,
            "name": "Fang of the Sea Vipers"
          },
          {
            "activityIndex": 10,
            "activityId": 910,
            "name": "Thalmor Handbill"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2017,
            "name": "Sunhold"
          },
          {
            "activityIndex": 2,
            "activityId": 2018,
            "name": "Karnwasten"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2025,
            "name": "Shimmerene Dockworks"
          },
          {
            "activityIndex": 2,
            "activityId": 2026,
            "name": "Augury Basin"
          },
          {
            "activityIndex": 3,
            "activityId": 2053,
            "name": "Artaeum Craftworks"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1286,
    "name": "The Deadlands",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6723,
            "name": "The Celestial Palanquin"
          },
          {
            "activityIndex": 2,
            "activityId": 6724,
            "name": "Destruction Incarnate"
          },
          {
            "activityIndex": 3,
            "activityId": 6707,
            "name": "The Durance Vile"
          },
          {
            "activityIndex": 4,
            "activityId": 6708,
            "name": "Born of Grief"
          },
          {
            "activityIndex": 5,
            "activityId": 6699,
            "name": "Deadlight"
          },
          {
            "activityIndex": 6,
            "activityId": 6700,
            "name": "Against All Hope"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2423,
            "name": "Ardent Hope"
          },
          {
            "activityIndex": 2,
            "activityId": 2430,
            "name": "Wretched Spire"
          },
          {
            "activityIndex": 3,
            "activityId": 2529,
            "name": "Fargrave"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3190,
            "name": "Welcome to Fargrave"
          },
          {
            "activityIndex": 2,
            "activityId": 3208,
            "name": "Deadlands Grand Adventurer"
          },
          {
            "activityIndex": 3,
            "activityId": 3137,
            "name": "Deadlands Master Explorer"
          },
          {
            "activityIndex": 4,
            "activityId": 3197,
            "name": "Bane of the Havocrels"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2415,
            "name": "Raging Coast Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2416,
            "name": "The Blood Pit Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2417,
            "name": "Ardent Hope Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2418,
            "name": "Wretched Spire Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2419,
            "name": "False Martyrs' Folly Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2420,
            "name": "Annihilarch's Summit Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2541,
            "name": "Wounded Crossing Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2542,
            "name": "The Scourshales Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2526,
            "name": "Fargrave Outskirts Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2543,
            "name": "Fargrave Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2540,
            "name": "The Shambles Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2425,
            "name": "The Brandfire Reformatory"
          },
          {
            "activityIndex": 2,
            "activityId": 2429,
            "name": "False Martyrs' Folly"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 496,
            "name": "Atop a natural bridge cut in half, north of the Raging Coast."
          },
          {
            "activityIndex": 2,
            "activityId": 497,
            "name": "In a deep pit below a toiling foundry."
          },
          {
            "activityIndex": 3,
            "activityId": 498,
            "name": "Looming over a small camp in the shadow of Annihilarch's Summit."
          },
          {
            "activityIndex": 4,
            "activityId": 499,
            "name": "Resting atop the sharp teeth of a dead giant in the Shambles."
          },
          {
            "activityIndex": 5,
            "activityId": 500,
            "name": "Cradled within an altar inside the Brandfire Reformatory."
          },
          {
            "activityIndex": 6,
            "activityId": 501,
            "name": "On a ledge overlooking green pools inside False Martyrs' Folly."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2427,
            "name": "The Abomination Cradle"
          },
          {
            "activityIndex": 2,
            "activityId": 2424,
            "name": "Den of the Unmaker"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2531,
            "name": "The Tempest Engine"
          },
          {
            "activityIndex": 2,
            "activityId": 2532,
            "name": "Traitor's Ascent"
          },
          {
            "activityIndex": 3,
            "activityId": 2533,
            "name": "Charnel Pulpit"
          },
          {
            "activityIndex": 4,
            "activityId": 2534,
            "name": "Chantry of the Moon Reiver"
          },
          {
            "activityIndex": 5,
            "activityId": 2535,
            "name": "Ravaged Crossing"
          },
          {
            "activityIndex": 6,
            "activityId": 2536,
            "name": "Skein Row"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 29,
            "name": "To Dream Beyond Dreams"
          },
          {
            "activityIndex": 2,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 3,
            "activityId": 226,
            "name": "Myths of Sheogorath, Volume 1"
          },
          {
            "activityIndex": 4,
            "activityId": 253,
            "name": "The Book of Daedra"
          },
          {
            "activityIndex": 5,
            "activityId": 257,
            "name": "On Oblivion"
          },
          {
            "activityIndex": 6,
            "activityId": 259,
            "name": "Varieties of Daedra, Part 1"
          },
          {
            "activityIndex": 7,
            "activityId": 260,
            "name": "Varieties of Daedra, Part 2"
          },
          {
            "activityIndex": 8,
            "activityId": 579,
            "name": "Dark Ruins"
          },
          {
            "activityIndex": 9,
            "activityId": 1468,
            "name": "I was Summoned by a Mortal"
          },
          {
            "activityIndex": 10,
            "activityId": 1473,
            "name": "Oath of a Dishonored Clan"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2523,
            "name": "Stormwright's Cleft"
          },
          {
            "activityIndex": 2,
            "activityId": 2524,
            "name": "The Razorworks"
          },
          {
            "activityIndex": 3,
            "activityId": 2525,
            "name": "Forgotten Feretory"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1207,
    "name": "The Reach",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6550,
            "name": "The Despot of Markarth"
          },
          {
            "activityIndex": 2,
            "activityId": 6551,
            "name": "Blood of the Reach"
          },
          {
            "activityIndex": 3,
            "activityId": 6547,
            "name": "The Study of Souls"
          },
          {
            "activityIndex": 4,
            "activityId": 6548,
            "name": "The Awakening Darkness"
          },
          {
            "activityIndex": 5,
            "activityId": 6554,
            "name": "The Dark Heart"
          },
          {
            "activityIndex": 6,
            "activityId": 6566,
            "name": "A Feast of Souls"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2290,
            "name": "Markarth"
          },
          {
            "activityIndex": 2,
            "activityId": 2291,
            "name": "Karthwasten"
          },
          {
            "activityIndex": 3,
            "activityId": 2296,
            "name": "Arkthzand Great Lift"
          },
          {
            "activityIndex": 4,
            "activityId": 2301,
            "name": "Nalzthdbar Great Lift"
          },
          {
            "activityIndex": 5,
            "activityId": 2304,
            "name": "Understone Keep"
          },
          {
            "activityIndex": 6,
            "activityId": 2307,
            "name": "Reachwind Depths"
          },
          {
            "activityIndex": 7,
            "activityId": 2308,
            "name": "Arena: Vateshran Hollows"
          },
          {
            "activityIndex": 8,
            "activityId": 2309,
            "name": "Wildspear Clan Camp"
          },
          {
            "activityIndex": 9,
            "activityId": 2310,
            "name": "Valthume"
          },
          {
            "activityIndex": 10,
            "activityId": 2311,
            "name": "Lost Valley Redoubt"
          },
          {
            "activityIndex": 11,
            "activityId": 2313,
            "name": "Cinder-Heart Clan Camp"
          },
          {
            "activityIndex": 12,
            "activityId": 2319,
            "name": "Shadefeather Clan Camp"
          },
          {
            "activityIndex": 13,
            "activityId": 2320,
            "name": "Black-Moon Clan Camp"
          },
          {
            "activityIndex": 14,
            "activityId": 2333,
            "name": "Nchuand-Zel"
          },
          {
            "activityIndex": 15,
            "activityId": 2334,
            "name": "Library of Arkthzand"
          },
          {
            "activityIndex": 16,
            "activityId": 2335,
            "name": "Bthar-Zel"
          },
          {
            "activityIndex": 17,
            "activityId": 2337,
            "name": "Nighthollow Keep"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2942,
            "name": "Welcome to the Reach"
          },
          {
            "activityIndex": 2,
            "activityId": 2854,
            "name": "The Reach Master Explorer"
          },
          {
            "activityIndex": 3,
            "activityId": 2957,
            "name": "The Reach Grand Adventurer"
          },
          {
            "activityIndex": 4,
            "activityId": 2958,
            "name": "Master of Storms"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2314,
            "name": "North Markarth Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2315,
            "name": "Karthwasten Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2316,
            "name": "Briar Rock Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2317,
            "name": "Rebel's Retreat Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2318,
            "name": "Lost Valley Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2340,
            "name": "Druadach Mountains Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2345,
            "name": "Markarth Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2341,
            "name": "Arkthzand Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2342,
            "name": "Nighthollow Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2293,
            "name": "Briar Rock Ruins"
          },
          {
            "activityIndex": 2,
            "activityId": 2312,
            "name": "Gloomreach"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 472,
            "name": "Hidden in the rubble of a Karthwasten canyon"
          },
          {
            "activityIndex": 2,
            "activityId": 473,
            "name": "At the brink of a timeworn aqueduct near Lost Valley Redoubt"
          },
          {
            "activityIndex": 3,
            "activityId": 474,
            "name": "On the lip of a broken bridge, north of Ghostlight Grotto"
          },
          {
            "activityIndex": 4,
            "activityId": 475,
            "name": "Beneath Nighthollow Keep, obscured by a watery void"
          },
          {
            "activityIndex": 5,
            "activityId": 476,
            "name": "On an ancient stone overlook in Briar Rock Ruins"
          },
          {
            "activityIndex": 6,
            "activityId": 477,
            "name": "Atop a massive rock, surrounded by eggs in Gloomreach"
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2297,
            "name": "Ragnvald Ritual Site"
          },
          {
            "activityIndex": 2,
            "activityId": 2298,
            "name": "Witchborne Ritual Site"
          },
          {
            "activityIndex": 3,
            "activityId": 2302,
            "name": "Harrowed Haunt Ritual Site"
          },
          {
            "activityIndex": 4,
            "activityId": 2303,
            "name": "Reachwind Ritual Site"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2292,
            "name": "Four Skull Lookout"
          },
          {
            "activityIndex": 2,
            "activityId": 2336,
            "name": "Sentinel Point"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2299,
            "name": "Deep Folk Crossing"
          },
          {
            "activityIndex": 2,
            "activityId": 2300,
            "name": "Rebel's Retreat"
          },
          {
            "activityIndex": 3,
            "activityId": 2305,
            "name": "Bthardamz"
          },
          {
            "activityIndex": 4,
            "activityId": 2321,
            "name": "Hroldan Ring"
          },
          {
            "activityIndex": 5,
            "activityId": 2344,
            "name": "Ghostlight Grotto"
          },
          {
            "activityIndex": 6,
            "activityId": 2346,
            "name": "Mistgloom Thicket"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 11,
            "name": "The Werewolf's Hide"
          },
          {
            "activityIndex": 2,
            "activityId": 34,
            "name": "Bloodfiends of Rivenspire"
          },
          {
            "activityIndex": 3,
            "activityId": 43,
            "name": "Living with Lycanthropy"
          },
          {
            "activityIndex": 4,
            "activityId": 50,
            "name": "A Life Barbaric and Brutal"
          },
          {
            "activityIndex": 5,
            "activityId": 316,
            "name": "Nords of Skyrim"
          },
          {
            "activityIndex": 6,
            "activityId": 320,
            "name": "Varieties of Faith: The Nords"
          },
          {
            "activityIndex": 7,
            "activityId": 475,
            "name": "The Crown of Freydis"
          },
          {
            "activityIndex": 8,
            "activityId": 477,
            "name": "All About Giants"
          },
          {
            "activityIndex": 9,
            "activityId": 689,
            "name": "Clans of the Reach: A Guide"
          },
          {
            "activityIndex": 10,
            "activityId": 695,
            "name": "Thenephan's Mysteries of Mead"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2294,
            "name": "Druadach Redoubt"
          },
          {
            "activityIndex": 2,
            "activityId": 2306,
            "name": "Red Eagle Redoubt"
          },
          {
            "activityIndex": 3,
            "activityId": 2343,
            "name": "Philosopher's Cradle"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 103,
    "name": "The Rift",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3919,
            "name": "Beneath the Stone"
          },
          {
            "activityIndex": 2,
            "activityId": 3920,
            "name": "Unearthed"
          },
          {
            "activityIndex": 3,
            "activityId": 3974,
            "name": "Storming the Hall"
          },
          {
            "activityIndex": 4,
            "activityId": 3977,
            "name": "To Vernim Woods"
          },
          {
            "activityIndex": 5,
            "activityId": 3928,
            "name": "Dangerous Union"
          },
          {
            "activityIndex": 6,
            "activityId": 3957,
            "name": "Gift of the Worm"
          },
          {
            "activityIndex": 7,
            "activityId": 3968,
            "name": "Through the Shroud"
          },
          {
            "activityIndex": 8,
            "activityId": 4225,
            "name": "To Nimalten"
          },
          {
            "activityIndex": 9,
            "activityId": 4153,
            "name": "Concealed Weapons"
          },
          {
            "activityIndex": 10,
            "activityId": 4286,
            "name": "Pinepeak Caverns"
          },
          {
            "activityIndex": 11,
            "activityId": 3978,
            "name": "Tomb Beneath the Mountain"
          },
          {
            "activityIndex": 12,
            "activityId": 4147,
            "name": "The Shackled Guardian"
          },
          {
            "activityIndex": 13,
            "activityId": 4139,
            "name": "Shattered Hopes"
          },
          {
            "activityIndex": 14,
            "activityId": 4164,
            "name": "A Giant in Smokefrost Peaks"
          },
          {
            "activityIndex": 15,
            "activityId": 3927,
            "name": "In His Wake"
          },
          {
            "activityIndex": 16,
            "activityId": 4135,
            "name": "Pulled Under"
          },
          {
            "activityIndex": 17,
            "activityId": 4186,
            "name": "Securing the Pass"
          },
          {
            "activityIndex": 18,
            "activityId": 4188,
            "name": "Stomping Sinmur"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 437,
            "name": "Shor's Stone"
          },
          {
            "activityIndex": 2,
            "activityId": 478,
            "name": "Vernim Woods"
          },
          {
            "activityIndex": 3,
            "activityId": 479,
            "name": "Boulderfall Pass"
          },
          {
            "activityIndex": 4,
            "activityId": 595,
            "name": "Pinepeak Cavern"
          },
          {
            "activityIndex": 5,
            "activityId": 601,
            "name": "Nimalten"
          },
          {
            "activityIndex": 6,
            "activityId": 616,
            "name": "Fallowstone Hall"
          },
          {
            "activityIndex": 7,
            "activityId": 617,
            "name": "Northwind Mine"
          },
          {
            "activityIndex": 8,
            "activityId": 593,
            "name": "Honrich Tower"
          },
          {
            "activityIndex": 9,
            "activityId": 626,
            "name": "Taarengrav"
          },
          {
            "activityIndex": 10,
            "activityId": 438,
            "name": "Skald's Retreat"
          },
          {
            "activityIndex": 11,
            "activityId": 476,
            "name": "Treva's Farm"
          },
          {
            "activityIndex": 12,
            "activityId": 627,
            "name": "Trolhetta"
          },
          {
            "activityIndex": 13,
            "activityId": 654,
            "name": "Forelhost"
          },
          {
            "activityIndex": 14,
            "activityId": 668,
            "name": "Lost Prospect"
          },
          {
            "activityIndex": 15,
            "activityId": 673,
            "name": "Geirmund's Hall"
          },
          {
            "activityIndex": 16,
            "activityId": 695,
            "name": "Riften"
          },
          {
            "activityIndex": 17,
            "activityId": 696,
            "name": "Fullhelm Fort"
          },
          {
            "activityIndex": 18,
            "activityId": 798,
            "name": "Ivarstead"
          },
          {
            "activityIndex": 19,
            "activityId": 1445,
            "name": "Frostmoon Farmstead"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 603,
            "name": "The Rift Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 371,
            "name": "Lion's Den Group Event"
          },
          {
            "activityIndex": 3,
            "activityId": 374,
            "name": "Lion's Den Conqueror"
          },
          {
            "activityIndex": 4,
            "activityId": 481,
            "name": "Rift Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 655,
            "name": "Riften Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 656,
            "name": "Skald's Retreat Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 657,
            "name": "Trolhetta Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 659,
            "name": "Trolhetta Summit Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 705,
            "name": "Honrich Tower Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 709,
            "name": "Fallowstone Hall Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 710,
            "name": "Northwind Mine Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 711,
            "name": "Geirmund's Hall Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 712,
            "name": "Taarengrav Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 713,
            "name": "Nimalten Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 714,
            "name": "Ragged Hills Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 715,
            "name": "Fullhelm Fort Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 787,
            "name": "Broken Helm Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 791,
            "name": "Fort Greenwall"
          },
          {
            "activityIndex": 3,
            "activityId": 793,
            "name": "Faldar's Tooth"
          },
          {
            "activityIndex": 4,
            "activityId": 794,
            "name": "Avanchnzel"
          },
          {
            "activityIndex": 5,
            "activityId": 795,
            "name": "Snapleg Cave"
          },
          {
            "activityIndex": 6,
            "activityId": 796,
            "name": "Shroud Hearth Barrow"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 71,
            "name": "Braced against wind near the mine."
          },
          {
            "activityIndex": 2,
            "activityId": 72,
            "name": "Be Shor to search all over the stone."
          },
          {
            "activityIndex": 3,
            "activityId": 73,
            "name": "Nearly discovered by a mauled stablehand."
          },
          {
            "activityIndex": 4,
            "activityId": 74,
            "name": "Cultists' prize near Ragged Hills."
          },
          {
            "activityIndex": 5,
            "activityId": 75,
            "name": "Scour the crags near Avanchnzel."
          },
          {
            "activityIndex": 6,
            "activityId": 76,
            "name": "South where worms swarm the barrow."
          },
          {
            "activityIndex": 7,
            "activityId": 77,
            "name": "A prospect found."
          },
          {
            "activityIndex": 8,
            "activityId": 78,
            "name": "Walk above the clouds."
          },
          {
            "activityIndex": 9,
            "activityId": 79,
            "name": "Stay alert between Riften and Greenwall."
          },
          {
            "activityIndex": 10,
            "activityId": 80,
            "name": "Clank of gears and hiss of steam."
          },
          {
            "activityIndex": 11,
            "activityId": 81,
            "name": "Guarded by bears in the hollow."
          },
          {
            "activityIndex": 12,
            "activityId": 82,
            "name": "Deep in the roots of the tooth."
          },
          {
            "activityIndex": 13,
            "activityId": 83,
            "name": "Where green grows in the fort's wall."
          },
          {
            "activityIndex": 14,
            "activityId": 84,
            "name": "Take a shrouded approach."
          },
          {
            "activityIndex": 15,
            "activityId": 85,
            "name": "Tread carefully and don't break a leg."
          },
          {
            "activityIndex": 16,
            "activityId": 86,
            "name": "Protected by wraiths in a beast's den."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 799,
            "name": "Ragged Hills Dolmen"
          },
          {
            "activityIndex": 2,
            "activityId": 800,
            "name": "Stony Basin Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 801,
            "name": "Smokefrost Peaks Dolmen"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1206,
            "name": "Hunter Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1207,
            "name": "Troll Cave"
          },
          {
            "activityIndex": 3,
            "activityId": 1208,
            "name": "Frozen Ruins"
          },
          {
            "activityIndex": 4,
            "activityId": 1209,
            "name": "Angarvunde Mound"
          },
          {
            "activityIndex": 5,
            "activityId": 1210,
            "name": "Giant Camp"
          },
          {
            "activityIndex": 6,
            "activityId": 1211,
            "name": "Wisplight Glen"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1425,
            "name": "Linele Skullcarver's Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 1426,
            "name": "Three Tribes Camp"
          },
          {
            "activityIndex": 3,
            "activityId": 1427,
            "name": "Autumnshade Clearing"
          },
          {
            "activityIndex": 4,
            "activityId": 1429,
            "name": "Mammoth Ridge"
          },
          {
            "activityIndex": 5,
            "activityId": 1430,
            "name": "Honeystrand Hill"
          },
          {
            "activityIndex": 6,
            "activityId": 1431,
            "name": "Grethel's Vigil"
          },
          {
            "activityIndex": 7,
            "activityId": 1433,
            "name": "Jenedusil's Claw"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 206,
            "name": "Dwemer Inquiries Volume I"
          },
          {
            "activityIndex": 2,
            "activityId": 207,
            "name": "Dwemer Inquiries Volume II"
          },
          {
            "activityIndex": 3,
            "activityId": 208,
            "name": "Dwemer Inquiries Volume III"
          },
          {
            "activityIndex": 4,
            "activityId": 209,
            "name": "Ancient Scrolls of the Dwemer IV"
          },
          {
            "activityIndex": 5,
            "activityId": 222,
            "name": "The Homilies of Blessed Almalexia"
          },
          {
            "activityIndex": 6,
            "activityId": 223,
            "name": "The Legendary Scourge"
          },
          {
            "activityIndex": 7,
            "activityId": 224,
            "name": "The Lusty Argonian Maid, Vol. 1"
          },
          {
            "activityIndex": 8,
            "activityId": 225,
            "name": "The Lusty Argonian Maid, Vol. 2"
          },
          {
            "activityIndex": 9,
            "activityId": 226,
            "name": "Myths of Sheogorath, Volume 1"
          },
          {
            "activityIndex": 10,
            "activityId": 227,
            "name": "Myths of Sheogorath, Volume 2"
          },
          {
            "activityIndex": 11,
            "activityId": 228,
            "name": "The Red Book of Riddles"
          },
          {
            "activityIndex": 12,
            "activityId": 230,
            "name": "16 Accords of Madness, Vol. VI"
          },
          {
            "activityIndex": 13,
            "activityId": 231,
            "name": "Crow and Raven: Three Short Fables"
          },
          {
            "activityIndex": 14,
            "activityId": 232,
            "name": "Wabbajack"
          },
          {
            "activityIndex": 15,
            "activityId": 269,
            "name": "Proper-Life: Three Chants"
          },
          {
            "activityIndex": 16,
            "activityId": 270,
            "name": "Song of the Askelde Men"
          },
          {
            "activityIndex": 17,
            "activityId": 271,
            "name": "The Warrior's Charge"
          },
          {
            "activityIndex": 18,
            "activityId": 272,
            "name": "Words of the Wind"
          },
          {
            "activityIndex": 19,
            "activityId": 689,
            "name": "Clans of the Reach: A Guide"
          },
          {
            "activityIndex": 20,
            "activityId": 690,
            "name": "Rivers of Profit in Riften"
          },
          {
            "activityIndex": 21,
            "activityId": 691,
            "name": "Touch of the Worm's Tongue"
          },
          {
            "activityIndex": 22,
            "activityId": 692,
            "name": "Songs of the Return, Volume 5"
          },
          {
            "activityIndex": 23,
            "activityId": 693,
            "name": "The Road to Sovngarde"
          },
          {
            "activityIndex": 24,
            "activityId": 694,
            "name": "Unexpected Allies"
          },
          {
            "activityIndex": 25,
            "activityId": 695,
            "name": "Thenephan's Mysteries of Mead"
          },
          {
            "activityIndex": 26,
            "activityId": 696,
            "name": "The Wandering Skald"
          },
          {
            "activityIndex": 27,
            "activityId": 697,
            "name": "Songs of the Return, Volume 27"
          },
          {
            "activityIndex": 28,
            "activityId": 698,
            "name": "Songs of the Return, Volume 49"
          },
          {
            "activityIndex": 29,
            "activityId": 2293,
            "name": "Josef the Intolerant"
          }
        ]
      },
      {
        "completionType": 12,
        "label": "Mundus Stones",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 688,
            "name": "The Steed"
          },
          {
            "activityIndex": 2,
            "activityId": 694,
            "name": "The Apprentice"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 756,
            "name": "Lion's Den"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1428,
            "name": "Smokefrost Vigil"
          },
          {
            "activityIndex": 2,
            "activityId": 1432,
            "name": "Eldbjorg's Hideaway"
          },
          {
            "activityIndex": 3,
            "activityId": 1434,
            "name": "Trollslayer's Gully"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 849,
    "name": "Vvardenfell",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5803,
            "name": "Divine Conundrum"
          },
          {
            "activityIndex": 2,
            "activityId": 5880,
            "name": "Divine Inquiries"
          },
          {
            "activityIndex": 3,
            "activityId": 5888,
            "name": "Divine Delusions"
          },
          {
            "activityIndex": 4,
            "activityId": 5893,
            "name": "Divine Intervention"
          },
          {
            "activityIndex": 5,
            "activityId": 5902,
            "name": "Divine Disaster"
          },
          {
            "activityIndex": 6,
            "activityId": 5905,
            "name": "Divine Restoration"
          },
          {
            "activityIndex": 7,
            "activityId": 6003,
            "name": "Divine Blessings"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1753,
            "name": "Gnisis"
          },
          {
            "activityIndex": 2,
            "activityId": 1760,
            "name": "Vos"
          },
          {
            "activityIndex": 3,
            "activityId": 1762,
            "name": "Tel Aruhn"
          },
          {
            "activityIndex": 4,
            "activityId": 1763,
            "name": "Sadrith Mora"
          },
          {
            "activityIndex": 5,
            "activityId": 1766,
            "name": "Suran"
          },
          {
            "activityIndex": 6,
            "activityId": 1767,
            "name": "Balmora"
          },
          {
            "activityIndex": 7,
            "activityId": 1785,
            "name": "Seyda Neen"
          },
          {
            "activityIndex": 8,
            "activityId": 1801,
            "name": "Vassir-Didanat Mine"
          },
          {
            "activityIndex": 9,
            "activityId": 1800,
            "name": "Ald'ruhn"
          },
          {
            "activityIndex": 10,
            "activityId": 1891,
            "name": "Veloth Ancestral Tomb"
          },
          {
            "activityIndex": 11,
            "activityId": 1890,
            "name": "Urshilaku Camp"
          },
          {
            "activityIndex": 12,
            "activityId": 1892,
            "name": "Zainab Camp"
          },
          {
            "activityIndex": 13,
            "activityId": 1893,
            "name": "Erabenimsun Camp"
          },
          {
            "activityIndex": 14,
            "activityId": 1911,
            "name": "Molag Mar"
          },
          {
            "activityIndex": 15,
            "activityId": 1912,
            "name": "Vivec City"
          },
          {
            "activityIndex": 16,
            "activityId": 1795,
            "name": "Ahemmusa Camp"
          },
          {
            "activityIndex": 17,
            "activityId": 1987,
            "name": "Dreloth Ancestral Tomb"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1867,
            "name": "Morrowind Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 1712,
            "name": "Ancestral Tombs Hunter"
          },
          {
            "activityIndex": 3,
            "activityId": 1826,
            "name": "Strider Caravaner"
          },
          {
            "activityIndex": 4,
            "activityId": 1882,
            "name": "Morrowind Master Angler"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1761,
            "name": "West Gash Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1765,
            "name": "Urshilaku Camp Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 1774,
            "name": "Gnisis Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 1775,
            "name": "Ald'ruhn Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 1776,
            "name": "Balmora Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 1777,
            "name": "Seyda Neen Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 1778,
            "name": "Suran Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 1779,
            "name": "Molag Mar Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 1780,
            "name": "Tel Branora Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 1781,
            "name": "Vivec City Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 1782,
            "name": "Nchuleftingth Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 1783,
            "name": "Tel Mora Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 1784,
            "name": "Sadrith Mora Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 1907,
            "name": "Valley of the Wind Wayshrine"
          },
          {
            "activityIndex": 15,
            "activityId": 1961,
            "name": "Vivec Temple Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1754,
            "name": "Khartag Point"
          },
          {
            "activityIndex": 2,
            "activityId": 1755,
            "name": "Ashalmawia"
          },
          {
            "activityIndex": 3,
            "activityId": 1756,
            "name": "Zainsipilu"
          },
          {
            "activityIndex": 4,
            "activityId": 1757,
            "name": "Matus-Akin Egg Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 1758,
            "name": "Pulk"
          },
          {
            "activityIndex": 6,
            "activityId": 1759,
            "name": "Nchuleft"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 382,
            "name": "At a small shrine where the road forks."
          },
          {
            "activityIndex": 2,
            "activityId": 383,
            "name": "On an isle facing the Sea of Ghosts."
          },
          {
            "activityIndex": 3,
            "activityId": 384,
            "name": "On a Dwemer overhang, above a river of lava."
          },
          {
            "activityIndex": 4,
            "activityId": 385,
            "name": "On an outcropping overlooking a grisly scene."
          },
          {
            "activityIndex": 5,
            "activityId": 386,
            "name": "In a hollow stump on the wetlands."
          },
          {
            "activityIndex": 6,
            "activityId": 387,
            "name": "Withheld at customs and stored in the yard."
          },
          {
            "activityIndex": 7,
            "activityId": 388,
            "name": "In a stump on the northern shore of Lake Amaya."
          },
          {
            "activityIndex": 8,
            "activityId": 389,
            "name": "In the heart of crumbling Daedric ruins."
          },
          {
            "activityIndex": 9,
            "activityId": 390,
            "name": "On a stranded rock in a river of lava."
          },
          {
            "activityIndex": 10,
            "activityId": 391,
            "name": "Beneath the Dwarven bridge."
          },
          {
            "activityIndex": 11,
            "activityId": 392,
            "name": "On a treacherous path overlooking a sea of fire."
          },
          {
            "activityIndex": 12,
            "activityId": 393,
            "name": "Heaped onto a cart of stone left on a precarious perch."
          },
          {
            "activityIndex": 13,
            "activityId": 394,
            "name": "Nestled with glittering treasures where the red crystals glow."
          },
          {
            "activityIndex": 14,
            "activityId": 395,
            "name": "Hidden deep within a shrine to the Prince of Corruption."
          },
          {
            "activityIndex": 15,
            "activityId": 396,
            "name": "Where cliff-striders bask under golden rays in their den."
          },
          {
            "activityIndex": 16,
            "activityId": 397,
            "name": "On an islet in the subterranean lake."
          },
          {
            "activityIndex": 17,
            "activityId": 398,
            "name": "In a cozy bandit’s den."
          },
          {
            "activityIndex": 18,
            "activityId": 399,
            "name": "In the deepest depths of a subterranean Dwemer ruin."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1768,
            "name": "Nilthog's Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 1769,
            "name": "Sulipund Grange"
          },
          {
            "activityIndex": 3,
            "activityId": 1770,
            "name": "Shipwreck Cove"
          },
          {
            "activityIndex": 4,
            "activityId": 1771,
            "name": "Missir-Dadalit Egg Mine"
          },
          {
            "activityIndex": 5,
            "activityId": 1772,
            "name": "Dubdil Alar Tower"
          },
          {
            "activityIndex": 6,
            "activityId": 1773,
            "name": "Salothan's Council"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1913,
            "name": "Yasammidin"
          },
          {
            "activityIndex": 2,
            "activityId": 1914,
            "name": "Ashalmimilkala"
          },
          {
            "activityIndex": 3,
            "activityId": 1915,
            "name": "Shrine of Azura"
          },
          {
            "activityIndex": 4,
            "activityId": 1916,
            "name": "Holamayan Monastery"
          },
          {
            "activityIndex": 5,
            "activityId": 1917,
            "name": "Ald Sotha"
          },
          {
            "activityIndex": 6,
            "activityId": 1918,
            "name": "Hanud Tower"
          },
          {
            "activityIndex": 7,
            "activityId": 1919,
            "name": "Aleft"
          },
          {
            "activityIndex": 8,
            "activityId": 1920,
            "name": "Falensarano Ruins"
          },
          {
            "activityIndex": 9,
            "activityId": 1966,
            "name": "Valenvaryon"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 166,
            "name": "The House of Troubles"
          },
          {
            "activityIndex": 2,
            "activityId": 167,
            "name": "Invocation of Azura"
          },
          {
            "activityIndex": 3,
            "activityId": 182,
            "name": "Vivec and Mephala"
          },
          {
            "activityIndex": 4,
            "activityId": 188,
            "name": "The Art of Kwama Egg Cooking"
          },
          {
            "activityIndex": 5,
            "activityId": 313,
            "name": "The Great Houses and Their Uses"
          },
          {
            "activityIndex": 6,
            "activityId": 319,
            "name": "Varieties of Faith: The Dark Elves"
          },
          {
            "activityIndex": 7,
            "activityId": 479,
            "name": "On Stepping Lightly"
          },
          {
            "activityIndex": 8,
            "activityId": 570,
            "name": "The Living Gods"
          },
          {
            "activityIndex": 9,
            "activityId": 572,
            "name": "Kwama Mining for Fun and Profit"
          },
          {
            "activityIndex": 10,
            "activityId": 578,
            "name": "Sanctioned Murder"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1786,
            "name": "Nchuleftingth"
          },
          {
            "activityIndex": 2,
            "activityId": 1787,
            "name": "Forgotten Wastes"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1796,
            "name": "Marandus"
          },
          {
            "activityIndex": 2,
            "activityId": 1797,
            "name": "Randas Ancestral Tomb"
          },
          {
            "activityIndex": 3,
            "activityId": 1798,
            "name": "Zergonipal"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1443,
    "name": "West Weald",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 7071,
            "name": "Paths of Chaos"
          },
          {
            "activityIndex": 2,
            "activityId": 7072,
            "name": "Seeds of Suspicion"
          },
          {
            "activityIndex": 3,
            "activityId": 7073,
            "name": "Relics of the Three Princes"
          },
          {
            "activityIndex": 4,
            "activityId": 7074,
            "name": "King Nantharion's Gambit"
          },
          {
            "activityIndex": 5,
            "activityId": 7075,
            "name": "The Untraveled Road"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2718,
            "name": "Skingrad"
          },
          {
            "activityIndex": 2,
            "activityId": 2729,
            "name": "Vashabar"
          },
          {
            "activityIndex": 3,
            "activityId": 2732,
            "name": "Rustwall Estate"
          },
          {
            "activityIndex": 4,
            "activityId": 2734,
            "name": "The Outcast Inn"
          },
          {
            "activityIndex": 5,
            "activityId": 2736,
            "name": "Feldagard Keep"
          },
          {
            "activityIndex": 6,
            "activityId": 2738,
            "name": "Ontus"
          },
          {
            "activityIndex": 7,
            "activityId": 2739,
            "name": "Weatherleah Estate"
          },
          {
            "activityIndex": 8,
            "activityId": 2740,
            "name": "Valente Vineyards"
          },
          {
            "activityIndex": 9,
            "activityId": 2737,
            "name": "Sutch"
          },
          {
            "activityIndex": 10,
            "activityId": 2759,
            "name": "Wendir"
          },
          {
            "activityIndex": 11,
            "activityId": 2785,
            "name": "Ostumir"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 3972,
            "name": "Gold Road Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 3951,
            "name": "Gold Road Master Explorer"
          },
          {
            "activityIndex": 3,
            "activityId": 4053,
            "name": "Glass Sky Defender"
          },
          {
            "activityIndex": 4,
            "activityId": 3968,
            "name": "Gold Road Partaker"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2772,
            "name": "Skingrad City Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2773,
            "name": "Skingrad Vineyards Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2774,
            "name": "Vashabar Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2775,
            "name": "Ontus Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2776,
            "name": "Sutch Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2777,
            "name": "North Hook Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2778,
            "name": "Trader's Luck Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2781,
            "name": "Fall's Path Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2796,
            "name": "Wildburn's Edge Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2797,
            "name": "Ostumir Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2798,
            "name": "Centurion's Watch Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2799,
            "name": "Valente Vineyards Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 2802,
            "name": "Feldagard Keep Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 2803,
            "name": "Three Points Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2723,
            "name": "Haldain Lumber Camp"
          },
          {
            "activityIndex": 2,
            "activityId": 2724,
            "name": "Fyrelight Cave"
          },
          {
            "activityIndex": 3,
            "activityId": 2725,
            "name": "Nonungalo"
          },
          {
            "activityIndex": 4,
            "activityId": 2726,
            "name": "Varen's Watch"
          },
          {
            "activityIndex": 5,
            "activityId": 2727,
            "name": "Legion's Rest"
          },
          {
            "activityIndex": 6,
            "activityId": 2728,
            "name": "Fort Colovia"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 546,
            "name": "On the steps of a vineyard near wildburn's edge."
          },
          {
            "activityIndex": 2,
            "activityId": 547,
            "name": "Outside the grate upriver of Varen's Watch."
          },
          {
            "activityIndex": 3,
            "activityId": 548,
            "name": "Overlooking the gorge beside the Skingrad castle bridge."
          },
          {
            "activityIndex": 4,
            "activityId": 549,
            "name": "Atop an overgrown citadel northwest of Ostumir's ruin."
          },
          {
            "activityIndex": 5,
            "activityId": 550,
            "name": "Where Ayleids once looked down upon the river Strid."
          },
          {
            "activityIndex": 6,
            "activityId": 551,
            "name": "Gazing down upon wheat fields from Centurion's Rise."
          },
          {
            "activityIndex": 7,
            "activityId": 552,
            "name": "Up top on Rock Bottom."
          },
          {
            "activityIndex": 8,
            "activityId": 553,
            "name": "In the rubble of a collapsed mine in sight of Leftwheal."
          },
          {
            "activityIndex": 9,
            "activityId": 554,
            "name": "Wedged in a stump at Deserter's Lagoon."
          },
          {
            "activityIndex": 10,
            "activityId": 555,
            "name": "Tucked in a cave amid the wildburn west of Hoperoot."
          },
          {
            "activityIndex": 11,
            "activityId": 556,
            "name": "Resting on Silorn treasures down a blind alley in the north."
          },
          {
            "activityIndex": 12,
            "activityId": 557,
            "name": "In the maw of a mighty skull. Look up in Leftwheal."
          },
          {
            "activityIndex": 13,
            "activityId": 558,
            "name": "On a platform overlooking the Legion's Rest central cavern."
          },
          {
            "activityIndex": 14,
            "activityId": 559,
            "name": "On a wildgrown bridge high above a Fyrelight stream."
          },
          {
            "activityIndex": 15,
            "activityId": 560,
            "name": "Displayed at the end of a hall in Nonungalo's ancient maze."
          },
          {
            "activityIndex": 16,
            "activityId": 561,
            "name": "Carted to the top of the battlements at Fort Colovia."
          },
          {
            "activityIndex": 17,
            "activityId": 562,
            "name": "South at Haldain Lumber Camp, beneath Ayleid boughs."
          },
          {
            "activityIndex": 18,
            "activityId": 563,
            "name": "Pulled to a tower's top near the middle of Varen's Watch."
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2780,
            "name": "Ostumir Mirrormoor Mosaic"
          },
          {
            "activityIndex": 2,
            "activityId": 2782,
            "name": "Sutch Mirrormoor Mosaic"
          },
          {
            "activityIndex": 3,
            "activityId": 2783,
            "name": "Colovia Mirrormoor Mosaic"
          },
          {
            "activityIndex": 4,
            "activityId": 2784,
            "name": "Silorn Mirrormoor Mosaic"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2741,
            "name": "Fall's Glade"
          },
          {
            "activityIndex": 2,
            "activityId": 2742,
            "name": "Lake Olo"
          },
          {
            "activityIndex": 3,
            "activityId": 2743,
            "name": "Fortune's Bluff"
          },
          {
            "activityIndex": 4,
            "activityId": 2744,
            "name": "Centurion's Rise"
          },
          {
            "activityIndex": 5,
            "activityId": 2745,
            "name": "Broken Path Cave"
          },
          {
            "activityIndex": 6,
            "activityId": 2746,
            "name": "Frontier's Cradle"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2733,
            "name": "Gray's Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 2756,
            "name": "Rock Bottom Caverns"
          },
          {
            "activityIndex": 3,
            "activityId": 2757,
            "name": "Sanguine's Shrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2764,
            "name": "Fort Hastrel"
          },
          {
            "activityIndex": 5,
            "activityId": 2766,
            "name": "Eaglerock Ruins"
          },
          {
            "activityIndex": 6,
            "activityId": 2767,
            "name": "Meridia's Shrine"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 57,
            "name": "Varieties of Faith, The Forebears"
          },
          {
            "activityIndex": 2,
            "activityId": 180,
            "name": "Nine Commands of the Eight Divines"
          },
          {
            "activityIndex": 3,
            "activityId": 213,
            "name": "The Cleansing of the Fane"
          },
          {
            "activityIndex": 4,
            "activityId": 235,
            "name": "Magic from the Sky"
          },
          {
            "activityIndex": 5,
            "activityId": 278,
            "name": "Eulogy for Emperor Varen"
          },
          {
            "activityIndex": 6,
            "activityId": 358,
            "name": "The Humor of Wood Elves"
          },
          {
            "activityIndex": 7,
            "activityId": 360,
            "name": "The Wedding Feast: A Memoir"
          },
          {
            "activityIndex": 8,
            "activityId": 1415,
            "name": "Varieties of Faith: The Wood Elves"
          },
          {
            "activityIndex": 9,
            "activityId": 1420,
            "name": "Ayleid Survivals in Valenwood"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2730,
            "name": "Silorn"
          },
          {
            "activityIndex": 2,
            "activityId": 2731,
            "name": "Leftwheal Trading Post"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2720,
            "name": "Leftwheal Granary"
          },
          {
            "activityIndex": 2,
            "activityId": 2721,
            "name": "Singer's Outpost"
          },
          {
            "activityIndex": 3,
            "activityId": 2722,
            "name": "Deserter's Lagoon"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 1160,
    "name": "Western Skyrim",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 6467,
            "name": "The Gathering Storm"
          },
          {
            "activityIndex": 2,
            "activityId": 6476,
            "name": "Dark Clouds Over Solitude"
          },
          {
            "activityIndex": 3,
            "activityId": 6462,
            "name": "Danger in the Holds"
          },
          {
            "activityIndex": 4,
            "activityId": 6466,
            "name": "The Vampire Scholar"
          },
          {
            "activityIndex": 5,
            "activityId": 6456,
            "name": "The Gray Host"
          },
          {
            "activityIndex": 6,
            "activityId": 6464,
            "name": "Greymoor Rising"
          },
          {
            "activityIndex": 7,
            "activityId": 6481,
            "name": "Daughter of the Wolf"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2204,
            "name": "Solitude"
          },
          {
            "activityIndex": 2,
            "activityId": 2205,
            "name": "Morthal"
          },
          {
            "activityIndex": 3,
            "activityId": 2206,
            "name": "Karthwatch"
          },
          {
            "activityIndex": 4,
            "activityId": 2207,
            "name": "Dragon Bridge"
          },
          {
            "activityIndex": 5,
            "activityId": 2208,
            "name": "Kilkreath Temple"
          },
          {
            "activityIndex": 6,
            "activityId": 2209,
            "name": "Mor Khazgur"
          },
          {
            "activityIndex": 7,
            "activityId": 2210,
            "name": "The Silver Cormorant"
          },
          {
            "activityIndex": 8,
            "activityId": 2225,
            "name": "Karthald Great Lift"
          },
          {
            "activityIndex": 9,
            "activityId": 2227,
            "name": "Hjaalmarch Great Lift"
          },
          {
            "activityIndex": 10,
            "activityId": 2228,
            "name": "Eastern Great Lift"
          },
          {
            "activityIndex": 11,
            "activityId": 2259,
            "name": "Coastal Giant Camp"
          },
          {
            "activityIndex": 12,
            "activityId": 2260,
            "name": "Karthald Giant Camp"
          },
          {
            "activityIndex": 13,
            "activityId": 2261,
            "name": "Kilkreath Giant Camp"
          },
          {
            "activityIndex": 14,
            "activityId": 2262,
            "name": "Highland Giant Camp"
          },
          {
            "activityIndex": 15,
            "activityId": 2281,
            "name": "Deepwood Giant Camp"
          },
          {
            "activityIndex": 16,
            "activityId": 2328,
            "name": "Mor Khazgur Giant Camp"
          },
          {
            "activityIndex": 17,
            "activityId": 2217,
            "name": "Dusktown"
          },
          {
            "activityIndex": 18,
            "activityId": 2218,
            "name": "Greymoor Keep"
          },
          {
            "activityIndex": 19,
            "activityId": 2219,
            "name": "The Lightless Hollow"
          },
          {
            "activityIndex": 20,
            "activityId": 2224,
            "name": "Dark Moon Grotto"
          },
          {
            "activityIndex": 21,
            "activityId": 2229,
            "name": "Lightless Hollow Great Lift"
          },
          {
            "activityIndex": 22,
            "activityId": 2230,
            "name": "Dark Moon Grotto Great Lift"
          },
          {
            "activityIndex": 23,
            "activityId": 2232,
            "name": "Greymoor Cavern Great Lift"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2713,
            "name": "Western Skyrim Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 2669,
            "name": "An Instrumental Triumph"
          },
          {
            "activityIndex": 3,
            "activityId": 2714,
            "name": "Labyrinthian Group Event"
          },
          {
            "activityIndex": 4,
            "activityId": 2715,
            "name": "Nchuthnkarst Group Event"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2236,
            "name": "Kilkreath Temple Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 2237,
            "name": "Morthal Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 2238,
            "name": "Mor Khazgur Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 2240,
            "name": "Dragon Bridge Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 2241,
            "name": "Southern Watch Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 2242,
            "name": "Frozen Coast Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 2244,
            "name": "Solitude Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 2275,
            "name": "Solitude Docks Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 2278,
            "name": "Deepwood Vale Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 2347,
            "name": "Giant's Coast Wayshrine"
          },
          {
            "activityIndex": 11,
            "activityId": 2348,
            "name": "Northern Watch Wayshrine"
          },
          {
            "activityIndex": 12,
            "activityId": 2220,
            "name": "Dusktown Wayshrine"
          },
          {
            "activityIndex": 13,
            "activityId": 2221,
            "name": "Greymoor Keep Wayshrine"
          },
          {
            "activityIndex": 14,
            "activityId": 2222,
            "name": "Lightless Hollow Wayshrine"
          },
          {
            "activityIndex": 15,
            "activityId": 2223,
            "name": "Dark Moon Grotto Wayshrine"
          },
          {
            "activityIndex": 16,
            "activityId": 2286,
            "name": "Dwarven Run Wayshrine"
          },
          {
            "activityIndex": 17,
            "activityId": 2287,
            "name": "Grotto Falls Wayshrine"
          },
          {
            "activityIndex": 18,
            "activityId": 2288,
            "name": "Deep Overlook Wayshrine"
          },
          {
            "activityIndex": 19,
            "activityId": 2289,
            "name": "Western Greymoor Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2211,
            "name": "Frozen Coast"
          },
          {
            "activityIndex": 2,
            "activityId": 2212,
            "name": "Shadowgreen"
          },
          {
            "activityIndex": 3,
            "activityId": 2213,
            "name": "Chillwind Depths"
          },
          {
            "activityIndex": 4,
            "activityId": 2214,
            "name": "Dragonhome"
          },
          {
            "activityIndex": 5,
            "activityId": 2233,
            "name": "Midnight Barrow"
          },
          {
            "activityIndex": 6,
            "activityId": 2234,
            "name": "The Scraps"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 454,
            "name": "At the top of a waterfall in the Lightless Hollow"
          },
          {
            "activityIndex": 2,
            "activityId": 455,
            "name": "Tucked in the Dwarven ruins south of Dark Moon Grotto"
          },
          {
            "activityIndex": 3,
            "activityId": 456,
            "name": "Near the outer walls of Greymoor Keep"
          },
          {
            "activityIndex": 4,
            "activityId": 457,
            "name": "Where a storm is brewing east of Dusktown"
          },
          {
            "activityIndex": 5,
            "activityId": 458,
            "name": "At the top of the Circle of Champions' tower"
          },
          {
            "activityIndex": 6,
            "activityId": 459,
            "name": "Close to Storm-Hawk's Altar near Solitude"
          },
          {
            "activityIndex": 7,
            "activityId": 460,
            "name": "Near Jarl Olfwenn's Hall"
          },
          {
            "activityIndex": 8,
            "activityId": 461,
            "name": "At a henge south of Morthal"
          },
          {
            "activityIndex": 9,
            "activityId": 462,
            "name": "By the Dragon's Belly"
          },
          {
            "activityIndex": 10,
            "activityId": 463,
            "name": "Near an altar close to Hunter's House"
          },
          {
            "activityIndex": 11,
            "activityId": 464,
            "name": "Within Labyrinthian's burial mound"
          },
          {
            "activityIndex": 12,
            "activityId": 465,
            "name": "Overlooking the crescent pool in Nchuthnkarst"
          },
          {
            "activityIndex": 13,
            "activityId": 466,
            "name": "Through the Frostvenom Spiders' nest in Chillwind Depths"
          },
          {
            "activityIndex": 14,
            "activityId": 467,
            "name": "Near the cliffside altar in Dragonhome"
          },
          {
            "activityIndex": 15,
            "activityId": 468,
            "name": "Among the crags of the Frozen Coast"
          },
          {
            "activityIndex": 16,
            "activityId": 469,
            "name": "By the Wispmother's pond in Midnight Barrow"
          },
          {
            "activityIndex": 17,
            "activityId": 470,
            "name": "On one of the highest precipices in the Shadowgreen"
          },
          {
            "activityIndex": 18,
            "activityId": 471,
            "name": "In a junk heap rotunda in the Scraps"
          }
        ]
      },
      {
        "completionType": 8,
        "label": "World Events",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2252,
            "name": "Old Karth Ritual Site"
          },
          {
            "activityIndex": 2,
            "activityId": 2253,
            "name": "Black Morass Ritual Site"
          },
          {
            "activityIndex": 3,
            "activityId": 2254,
            "name": "Giant's Coast Ritual Site"
          },
          {
            "activityIndex": 4,
            "activityId": 2255,
            "name": "Chilblain Peak Ritual Site"
          },
          {
            "activityIndex": 5,
            "activityId": 2257,
            "name": "Hailstone Valley Ritual Site"
          },
          {
            "activityIndex": 6,
            "activityId": 2258,
            "name": "Northern Watch Ritual Site"
          },
          {
            "activityIndex": 7,
            "activityId": 2266,
            "name": "Gloomforest Ritual Site"
          },
          {
            "activityIndex": 8,
            "activityId": 2267,
            "name": "Dwarf's Bane Ritual Site"
          },
          {
            "activityIndex": 9,
            "activityId": 2268,
            "name": "Miner's Lament Ritual Site"
          },
          {
            "activityIndex": 10,
            "activityId": 2269,
            "name": "Nightstone Ritual Site"
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2245,
            "name": "Hordrek's Hunting Grounds"
          },
          {
            "activityIndex": 2,
            "activityId": 2247,
            "name": "Circle of Champions"
          },
          {
            "activityIndex": 3,
            "activityId": 2246,
            "name": "Ysmgar's Beach"
          },
          {
            "activityIndex": 4,
            "activityId": 2248,
            "name": "Shademother's Haven"
          },
          {
            "activityIndex": 5,
            "activityId": 2249,
            "name": "Vampire Feeding Grounds"
          },
          {
            "activityIndex": 6,
            "activityId": 2250,
            "name": "Colossus Charging Station"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2322,
            "name": "Lendoran Ruin"
          },
          {
            "activityIndex": 2,
            "activityId": 2323,
            "name": "Storm-Hawk's Altar"
          },
          {
            "activityIndex": 3,
            "activityId": 2324,
            "name": "Sword's Point Watchtower"
          },
          {
            "activityIndex": 4,
            "activityId": 2325,
            "name": "Wolf's Eye Lighthouse"
          },
          {
            "activityIndex": 5,
            "activityId": 2326,
            "name": "Darkrise Overlook"
          },
          {
            "activityIndex": 6,
            "activityId": 2327,
            "name": "Gloomstalker Village"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 41,
            "name": "House Ravenwatch Proclamation"
          },
          {
            "activityIndex": 2,
            "activityId": 316,
            "name": "Nords of Skyrim"
          },
          {
            "activityIndex": 3,
            "activityId": 320,
            "name": "Varieties of Faith: The Nords"
          },
          {
            "activityIndex": 4,
            "activityId": 471,
            "name": "The Brothers' War"
          },
          {
            "activityIndex": 5,
            "activityId": 474,
            "name": "Orcs of Skyrim"
          },
          {
            "activityIndex": 6,
            "activityId": 475,
            "name": "The Crown of Freydis"
          },
          {
            "activityIndex": 7,
            "activityId": 477,
            "name": "All About Giants"
          },
          {
            "activityIndex": 8,
            "activityId": 479,
            "name": "On Stepping Lightly"
          },
          {
            "activityIndex": 9,
            "activityId": 693,
            "name": "The Road to Sovngarde"
          },
          {
            "activityIndex": 10,
            "activityId": 696,
            "name": "The Wandering Skald"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2215,
            "name": "Labyrinthian"
          },
          {
            "activityIndex": 2,
            "activityId": 2251,
            "name": "Nchuthnkarst"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 2283,
            "name": "Hunter's House"
          },
          {
            "activityIndex": 2,
            "activityId": 2284,
            "name": "Dragon's Belly"
          },
          {
            "activityIndex": 3,
            "activityId": 2285,
            "name": "Parasite's Cave"
          }
        ]
      }
    ]
  },
  {
    "zoneId": 684,
    "name": "Wrothgar",
    "completionTypes": [
      {
        "completionType": 1,
        "label": "Priority Quests",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 5450,
            "name": "Invitation to Orsinium"
          },
          {
            "activityIndex": 2,
            "activityId": 5329,
            "name": "For King and Glory"
          },
          {
            "activityIndex": 3,
            "activityId": 5318,
            "name": "The Hidden Harvest"
          },
          {
            "activityIndex": 4,
            "activityId": 5447,
            "name": "A King-Sized Problem"
          },
          {
            "activityIndex": 5,
            "activityId": 5458,
            "name": "In the Name of the King"
          },
          {
            "activityIndex": 6,
            "activityId": 5326,
            "name": "Quarry Conundrum"
          },
          {
            "activityIndex": 7,
            "activityId": 5441,
            "name": "The Hand of Morkul"
          },
          {
            "activityIndex": 8,
            "activityId": 5337,
            "name": "A Question of Succession"
          },
          {
            "activityIndex": 9,
            "activityId": 5348,
            "name": "To Save a Chief"
          },
          {
            "activityIndex": 10,
            "activityId": 5468,
            "name": "The Anger of a King"
          },
          {
            "activityIndex": 11,
            "activityId": 5349,
            "name": "The King's Gambit"
          },
          {
            "activityIndex": 12,
            "activityId": 5481,
            "name": "Blood on a King's Hands"
          },
          {
            "activityIndex": 13,
            "activityId": 5494,
            "name": "Long Live the King"
          }
        ]
      },
      {
        "completionType": 2,
        "label": "Points of Interest",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1534,
            "name": "Paragon's Remembrance"
          },
          {
            "activityIndex": 2,
            "activityId": 1537,
            "name": "Honor's Rest"
          },
          {
            "activityIndex": 3,
            "activityId": 1540,
            "name": "Sorrow"
          },
          {
            "activityIndex": 4,
            "activityId": 1542,
            "name": "Fharun Stronghold"
          },
          {
            "activityIndex": 5,
            "activityId": 1544,
            "name": "Frostbreak Fortress"
          },
          {
            "activityIndex": 6,
            "activityId": 1546,
            "name": "Graystone Quarry"
          },
          {
            "activityIndex": 7,
            "activityId": 1558,
            "name": "Bonerock Cavern"
          },
          {
            "activityIndex": 8,
            "activityId": 1559,
            "name": "Morkul Stronghold"
          },
          {
            "activityIndex": 9,
            "activityId": 1560,
            "name": "Shatul Range"
          },
          {
            "activityIndex": 10,
            "activityId": 1561,
            "name": "Exile's Barrow"
          },
          {
            "activityIndex": 11,
            "activityId": 1563,
            "name": "Frozen Fleet"
          },
          {
            "activityIndex": 12,
            "activityId": 1566,
            "name": "Orsinium"
          },
          {
            "activityIndex": 13,
            "activityId": 1619,
            "name": "Friendship Gate"
          },
          {
            "activityIndex": 14,
            "activityId": 1662,
            "name": "Merchant's Gate"
          },
          {
            "activityIndex": 15,
            "activityId": 1671,
            "name": "Arena: Maelstrom"
          }
        ]
      },
      {
        "completionType": 3,
        "label": "Featured Achievements",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1328,
            "name": "Wrothgar Grand Adventurer"
          },
          {
            "activityIndex": 2,
            "activityId": 1324,
            "name": "Wrothgar Master Relic Hunter"
          },
          {
            "activityIndex": 3,
            "activityId": 1238,
            "name": "Old Orsinium Group Event"
          },
          {
            "activityIndex": 4,
            "activityId": 1235,
            "name": "Rkindaleft Group Event"
          }
        ]
      },
      {
        "completionType": 4,
        "label": "Wayshrines",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1569,
            "name": "Siege Road Wayshrine"
          },
          {
            "activityIndex": 2,
            "activityId": 1570,
            "name": "Frostbreak Ridge Wayshrine"
          },
          {
            "activityIndex": 3,
            "activityId": 1571,
            "name": "Trader's Road Wayshrine"
          },
          {
            "activityIndex": 4,
            "activityId": 1572,
            "name": "Orsinium Wayshrine"
          },
          {
            "activityIndex": 5,
            "activityId": 1573,
            "name": "Shatul Wayshrine"
          },
          {
            "activityIndex": 6,
            "activityId": 1574,
            "name": "Great Bay Wayshrine"
          },
          {
            "activityIndex": 7,
            "activityId": 1575,
            "name": "Two Rivers Wayshrine"
          },
          {
            "activityIndex": 8,
            "activityId": 1576,
            "name": "Icy Shore Wayshrine"
          },
          {
            "activityIndex": 9,
            "activityId": 1577,
            "name": "Morkul Plain Wayshrine"
          },
          {
            "activityIndex": 10,
            "activityId": 1670,
            "name": "Merchant's Gate Wayshrine"
          }
        ]
      },
      {
        "completionType": 5,
        "label": "Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1536,
            "name": "Watcher's Hold"
          },
          {
            "activityIndex": 2,
            "activityId": 1541,
            "name": "Thukhozod's Sanctum"
          },
          {
            "activityIndex": 3,
            "activityId": 1552,
            "name": "Argent Mine"
          },
          {
            "activityIndex": 4,
            "activityId": 1554,
            "name": "Nikolvara's Kennel"
          },
          {
            "activityIndex": 5,
            "activityId": 1556,
            "name": "Zthenganaz"
          },
          {
            "activityIndex": 6,
            "activityId": 1557,
            "name": "Coldperch Cavern"
          }
        ]
      },
      {
        "completionType": 7,
        "label": "Skyshards",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 353,
            "name": "Beneath the ruined aqueduct."
          },
          {
            "activityIndex": 2,
            "activityId": 354,
            "name": "West of the cliff jumper's falls."
          },
          {
            "activityIndex": 3,
            "activityId": 355,
            "name": "Smuggled away in Shipwreck Cove."
          },
          {
            "activityIndex": 4,
            "activityId": 356,
            "name": "On a stonecutter's scaffold."
          },
          {
            "activityIndex": 5,
            "activityId": 357,
            "name": "A seaside view from the cliffs of Morkul."
          },
          {
            "activityIndex": 6,
            "activityId": 358,
            "name": "Above the ancient barrow."
          },
          {
            "activityIndex": 7,
            "activityId": 359,
            "name": "Lost cargo on a frozen freighter."
          },
          {
            "activityIndex": 8,
            "activityId": 360,
            "name": "Atop the frozen waterfall."
          },
          {
            "activityIndex": 9,
            "activityId": 361,
            "name": "Overlooking the ice-bound Centurion."
          },
          {
            "activityIndex": 10,
            "activityId": 362,
            "name": "Caught in the webs of the old city."
          },
          {
            "activityIndex": 11,
            "activityId": 363,
            "name": "Washed down river by Dwarven boilers."
          },
          {
            "activityIndex": 12,
            "activityId": 364,
            "name": "Surrounded by silver."
          },
          {
            "activityIndex": 13,
            "activityId": 365,
            "name": "An unusual egg for harpies."
          },
          {
            "activityIndex": 14,
            "activityId": 366,
            "name": "Pried from a necromancer's cold, dead hands."
          },
          {
            "activityIndex": 15,
            "activityId": 367,
            "name": "Kept as a prize in the cold Dwarf tomb."
          },
          {
            "activityIndex": 16,
            "activityId": 368,
            "name": "In a subterranean spider oasis."
          },
          {
            "activityIndex": 17,
            "activityId": 369,
            "name": "Amidst the crumbling gargoyles."
          }
        ]
      },
      {
        "completionType": 9,
        "label": "Striking Locales",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1539,
            "name": "Poacher's Encampment"
          },
          {
            "activityIndex": 2,
            "activityId": 1545,
            "name": "Unfinished Dolmen"
          },
          {
            "activityIndex": 3,
            "activityId": 1547,
            "name": "King-Chief's Throne"
          },
          {
            "activityIndex": 4,
            "activityId": 1548,
            "name": "The Accursed Nursery"
          },
          {
            "activityIndex": 5,
            "activityId": 1549,
            "name": "The Mad Ogre's Altar"
          },
          {
            "activityIndex": 6,
            "activityId": 1550,
            "name": "Nyzchaleft Falls"
          }
        ]
      },
      {
        "completionType": 10,
        "label": "Group Bosses",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1578,
            "name": "Aqueduct Rock"
          },
          {
            "activityIndex": 2,
            "activityId": 1579,
            "name": "Grudge-Rock Falls"
          },
          {
            "activityIndex": 3,
            "activityId": 1580,
            "name": "Shipwreck Cove"
          },
          {
            "activityIndex": 4,
            "activityId": 1581,
            "name": "Forlorn Watchtower"
          },
          {
            "activityIndex": 5,
            "activityId": 1582,
            "name": "Jehanna Docks"
          },
          {
            "activityIndex": 6,
            "activityId": 1583,
            "name": "Torug's Arch"
          }
        ]
      },
      {
        "completionType": 11,
        "label": "Mages Guild Books",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 165,
            "name": "The Dreamstride"
          },
          {
            "activityIndex": 2,
            "activityId": 187,
            "name": "Civility and Etiquette: Wood Orcs I"
          },
          {
            "activityIndex": 3,
            "activityId": 223,
            "name": "The Legendary Scourge"
          },
          {
            "activityIndex": 4,
            "activityId": 249,
            "name": "The Pig Children"
          },
          {
            "activityIndex": 5,
            "activityId": 281,
            "name": "Return to Orsinium"
          }
        ]
      },
      {
        "completionType": 13,
        "label": "Public Dungeons",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1535,
            "name": "Old Orsinium"
          },
          {
            "activityIndex": 2,
            "activityId": 1562,
            "name": "Rkindaleft"
          }
        ]
      },
      {
        "completionType": 14,
        "label": "Group Delves",
        "activities": [
          {
            "activityIndex": 1,
            "activityId": 1667,
            "name": "Malacath Statue"
          },
          {
            "activityIndex": 2,
            "activityId": 1668,
            "name": "Boreal Forge"
          },
          {
            "activityIndex": 3,
            "activityId": 1669,
            "name": "Morkuldin Forge"
          }
        ]
      }
    ]
  }
]
