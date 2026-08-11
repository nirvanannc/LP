# Connect Dr. Soni's Instagram (Auto-Import Feed)

The website already shows an **Insights from Dr. Soni** section. Right now it displays
tasteful placeholder posts. Once you connect the clinic's Instagram, the section will
**automatically show real posts** and stay fresh on its own.

## What the site does
- Public visitors always hit our own cached endpoint `GET /api/instagram/feed` — never Instagram directly (fast + private).
- A protected job calls `POST /api/instagram/sync` every 30–60 min to pull new posts into our database.
- You can mark specific posts as **Featured**; the homepage shows featured posts (or the latest, if none are featured).
- Until it's connected, the section gracefully falls back to the curated placeholder posts. Nothing breaks.

## What we need from you (one-time Meta setup)
Uses **Instagram API with Instagram Login** — works with a **Business or Creator** Instagram account and does NOT need a linked Facebook Page. No Meta App Review is required for your own account (Standard Access).

1. Go to https://developers.facebook.com/apps/ → **Create app** → type **Business**.
2. Add product **Instagram → API setup with Instagram Login**.
3. Copy the **Instagram App ID** and **Instagram App Secret**.
4. Under Business Login settings, add the OAuth redirect URI (we'll provide the exact URL for the live domain).
5. Authorize the clinic's Instagram professional account and generate a **long-lived access token** (valid ~60 days; we refresh it automatically).
6. Note the **Instagram user id** (from `/me?fields=user_id,username`).

Then send us these three values and we'll drop them into the server's `.env`:

```
INSTAGRAM_ACCESS_TOKEN=<long-lived token>
INSTAGRAM_USER_ID=<your instagram professional account id>
INSTAGRAM_ADMIN_TOKEN=<any secret string of your choice, protects the sync endpoint>
```

## After connecting
- Trigger a first import:
  `curl -X POST -H "Authorization: Bearer <INSTAGRAM_ADMIN_TOKEN>" <site>/api/instagram/sync`
- Feature a post:
  `curl -X PATCH -H "Authorization: Bearer <INSTAGRAM_ADMIN_TOKEN>" -H "Content-Type: application/json" -d '{"featured":true}' <site>/api/instagram/media/<media_id>/feature`
- Set a scheduled job (cron) to run the sync every 30 minutes so the feed stays fresh.

## Manual option (if you prefer not to use the API)
You can also just send us the images/videos + captions and we'll place them directly in
`/app/frontend/src/data/insights.js` (supports `type: "video"` too). Either way works.

Note: the token/secret live ONLY on the server — never in the browser. Show only posts you're happy to display publicly.
