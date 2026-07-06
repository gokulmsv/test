# BankPrep — Banking Exam Mock Test Platform

## Problem statement
Build a banking exam prep platform (like Testbook/Oliveboard) with auth, question bank (admin-managed), mock test engine (timer, palette, negative marking), AI-powered explanations via Claude, and analytics dashboard.

## Architecture
- **Backend**: FastAPI + MongoDB, `/api` prefix, cookie-based auth via Emergent Google OAuth
- **Frontend**: React 19 + shadcn/ui + Recharts + Tailwind, sidebar layout
- **AI**: Claude Sonnet 4.5 via `emergentintegrations` (Emergent LLM key)
- **Storage**: Emergent Object Storage for question images

## Users
- **Student** (default): takes mock tests, views analytics, chats with AI tutor
- **Admin** (first user or ADMIN_EMAILS): manages question bank

## What's implemented (Feb 2026)
- Auth: Emergent Google Login, session cookies, `/api/auth/me`, `/api/auth/logout`
- Questions CRUD (admin) + **CSV or JSON bulk import** + **image upload via Emergent Object Storage** (`/api/upload` → `image_path`; base64 `image_data` still supported as fallback)
- Public image serving via `/api/files/{path}` (unguessable UUID acts as ACL)
- Test engine: create with `full` / `section` / **`adaptive` (weighted by per-topic weakness from history)**, palette (answered/marked/not-visited), overall timer with auto-submit, negative marking, per-question time, section-wise per-section timers (equal split), locks section on timeout
- Results: score, accuracy, section-wise chart, per-question review with image preview
- AI explanations via Claude Sonnet 4.5 with SSE streaming + non-streaming fallback + Mongo cache + follow-up chat
- Analytics: streak, best streak, weekly line chart, subject radar, GitHub-style heatmap
- Profile, theme (light/dark), 20 seed questions across 5 subjects

## Backlog
- P2: Emergent Object Storage integration for large images (currently base64 inline; storage init returns 400 in this pod)
- P2: Weighted question selection based on user weakness
- P2: Bulk question import (CSV parser — currently JSON only)
- P2: Leaderboard / peer comparison
- P2: Push notifications for daily streak
