# Test Credentials — BankPrep

Auth: Emergent-managed Google OAuth. No password credentials.

**Admin flow**: First user to log in (or any email in `ADMIN_EMAILS` env var) becomes admin and can access Question Bank.

**Testing agent should**: create a mock user + session directly in MongoDB using the playbook in `/app/auth_testing.md`.

- Collection `users`: `user_id`, `email`, `name`, `is_admin`, `target_exam`
- Collection `user_sessions`: `user_id`, `session_token`, `expires_at`
- Auth: cookie `session_token` OR header `Authorization: Bearer <token>`
