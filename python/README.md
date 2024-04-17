```
modal config set-environment jotta
```

```
poetry run modal deploy router.py
```

```
curl -X "POST" \
  "https://wantpinow-jotta--router-app.modal.run/chat/stream" \
  -H 'accept: text/event-stream' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ROUTER_AUTH_TOKEN}" \
  -d "{\"messages\": [{\"role\": \"user\", \"content\": \"What is your name?\"}], \"model\": \"gpt-3.5-turbo\"}" \
  --no-buffer
```

```
curl -X "GET" \
 "https://wantpinow-jotta--router-app.modal.run/process?text=foobar" \
 -H "accept: application/json" \
 -H "Authorization: Bearer ${ROUTER_AUTH_TOKEN}"
```
