#!/usr/bin/env bash
# Confirms the public anon key cannot write. Run after any schema change.
# Usage: NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... scripts/check-rls.sh
set -u
: "${NEXT_PUBLIC_SUPABASE_URL:?set NEXT_PUBLIC_SUPABASE_URL}"
: "${NEXT_PUBLIC_SUPABASE_ANON_KEY:?set NEXT_PUBLIC_SUPABASE_ANON_KEY}"
URL="$NEXT_PUBLIC_SUPABASE_URL"
KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY"
fail=0

expect_denied() { # name, http_code
  if [[ "$2" =~ ^(401|403)$ ]]; then echo "ok    $1 denied ($2)"; else echo "FAIL  $1 returned $2"; fail=1; fi
}

code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$URL/rest/v1/opportunities" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"title":"rls-check","org":"x","url":"https://example.com","category":"other"}')
expect_denied "anon insert opportunities" "$code"

code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$URL/rest/v1/event_covers" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"event_id":"1","image_url":"https://example.com/x.png"}')
expect_denied "anon insert event_covers" "$code"

code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$URL/storage/v1/object/event-covers/rls-check.png" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY" -H 'Content-Type: image/png' --data-binary 'x')
expect_denied "anon upload event-covers" "$code"

# admins must be unreadable: expect an empty array, not rows.
body=$(curl -s "$URL/rest/v1/admins?select=email" -H "apikey: $KEY" -H "Authorization: Bearer $KEY")
if [[ "$body" == "[]" ]]; then echo "ok    anon cannot read admins"; else echo "FAIL  admins readable: $body"; fail=1; fi

# unpublished rows must be invisible.
body=$(curl -s "$URL/rest/v1/opportunities?published=eq.false&select=id" -H "apikey: $KEY" -H "Authorization: Bearer $KEY")
if [[ "$body" == "[]" ]]; then echo "ok    anon cannot read unpublished"; else echo "FAIL  unpublished visible: $body"; fail=1; fi

exit $fail
