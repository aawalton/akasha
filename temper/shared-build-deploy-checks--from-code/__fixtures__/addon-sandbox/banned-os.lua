-- synthetic fixture — project #7209
-- Hand-authored to trigger the `os` namespace stripped-member family of the
-- banned-symbol scanner. `os.execute` and `os.exit` are stripped under the
-- ESO sandbox; `os.time` is available (Update-15 re-add) and would not flag.
local rc = os.execute("ls")
os.exit(0)
