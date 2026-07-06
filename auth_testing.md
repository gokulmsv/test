# Auth Testing Playbook — Emergent Google OAuth

Auth uses cookie `session_token` (httpOnly, secure, samesite=none) OR `Authorization: Bearer <token>` header.

## Create test user + session
```bash
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'admin.test.' + Date.now() + '@example.com',
  name: 'Admin Test User',
  picture: '',
  is_admin: true,
  target_exam: 'IBPS PO',
  current_streak: 0, best_streak: 0, last_test_date: null,
  created_at: new Date().toISOString()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
  created_at: new Date().toISOString()
});
print('SESSION_TOKEN=' + sessionToken);
print('USER_ID=' + userId);
"
```

## Test API
```bash
curl -X GET "$BACKEND/api/auth/me" -H "Authorization: Bearer $SESSION_TOKEN"
curl -X GET "$BACKEND/api/questions" -H "Authorization: Bearer $SESSION_TOKEN"
```

## Browser test
```python
await page.context.add_cookies([{
    "name": "session_token", "value": "YOUR_SESSION_TOKEN",
    "domain": "your-app.com", "path": "/",
    "httpOnly": True, "secure": True, "sameSite": "None"
}])
```

## Cleanup
```bash
mongosh --eval "use('test_database'); db.users.deleteMany({email: /admin\\.test\\./}); db.user_sessions.deleteMany({session_token: /test_session/});"
```
