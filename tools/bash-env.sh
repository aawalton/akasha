
set -o pipefail

[ -S /dev/stdin ] && exec 0</dev/null

[ -f "$HOME/.secrets.env" ] && . "$HOME/.secrets.env"

true
