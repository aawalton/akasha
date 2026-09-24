local _G = _G
local setmetatable = setmetatable
local type = type
local insert = table.insert
local match = string.match

local function passedOver(held) return held end
local function measured() return 0, 0 end
local function denied() return false end

local function unmodelledAs(_, key)
  if type(key) ~= "string" or match(key, "^%u") == nil then return nil end
  if match(key, "^Get%u") ~= nil then return measured end
  if match(key, "^Is%u") ~= nil or match(key, "^Has%u") ~= nil then return denied end
  return passedOver
end

local Animation = setmetatable({}, { __index = unmodelledAs })
local Timeline = setmetatable({}, { __index = unmodelledAs })

local function animationOn(control)
  return setmetatable({ uiControl = control }, { __index = Animation })
end

function Animation:GetAnimatedControl() return self.uiControl end
function Animation:SetAnimatedControl(control) self.uiControl = control end

local function timeline()
  return setmetatable({ uiAnimations = {}, uiHandlers = {}, uiProgress = 0 }, { __index = Timeline })
end

local function finished(self, progress)
  self.uiProgress = progress
  local stopped = self.uiHandlers.OnStop
  if stopped ~= nil then stopped(self, true) end
  return self
end

function Timeline:InsertAnimation(_, control)
  local made = animationOn(control)
  insert(self.uiAnimations, made)
  return made
end
Timeline.InsertAnimationFromVirtual = Timeline.InsertAnimation
function Timeline:GetNumAnimations() return #self.uiAnimations end
function Timeline:GetAnimation(which) return self.uiAnimations[which] end
function Timeline:GetFirstAnimation() return self.uiAnimations[1] end
function Timeline:GetLastAnimation() return self.uiAnimations[#self.uiAnimations] end
function Timeline:ApplyAllAnimationsToControl(control)
  for _, one in ipairs(self.uiAnimations) do one.uiControl = control end
end
function Timeline:SetHandler(event, handler) self.uiHandlers[event] = handler end
function Timeline:GetHandler(event) return self.uiHandlers[event] end
function Timeline:IsPlaying() return false end
function Timeline:IsPlayingBackward() return false end
function Timeline:GetProgress() return self.uiProgress end
function Timeline:SetProgress(progress) self.uiProgress = progress end
function Timeline:GetFullProgress() return self.uiProgress end
function Timeline:PlayForward() return finished(self, 1) end
function Timeline:PlayFromStart() return finished(self, 1) end
function Timeline:PlayInstantlyToEnd() return finished(self, 1) end
function Timeline:PlayBackward() return finished(self, 0) end
function Timeline:PlayFromEnd() return finished(self, 0) end
function Timeline:PlayInstantlyToStart() return finished(self, 0) end
function Timeline:Stop() return self end

local AnimationManager = {}

function AnimationManager:CreateTimeline() return timeline() end
function AnimationManager:CreateTimelineFromVirtual() return timeline() end
function AnimationManager:CreateSimpleAnimation(_, control)
  local made = timeline()
  return made:InsertAnimation(nil, control), made
end

_G.ANIMATION_MANAGER = AnimationManager

function _G.GetAnimationManager() return AnimationManager end
