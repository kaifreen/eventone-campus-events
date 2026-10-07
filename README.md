# EventOne — Next.js + TypeScript + Local JSON API

This version is intentionally **data-driven**.

## Run

```bash
npm install
npm run dev
```

Open:

`http://localhost:3000`

## Data flow

The UI does **not** hard-code event data.

```text
data/events.json
        ↓
Next.js server API
        ↓
GET /api/events
        ↓
React components
        ↓
UI
```

For a single event:

```text
data/events.json
        ↓
GET /api/events/[id]
        ↓
app/events/[id]/page.tsx
        ↓
UI
```

## Change data

Edit:

```text
data/events.json
```

For example, change:

```json
"title": "Tech Fest 2026"
```

to:

```json
"title": "AI Innovation Fest 2026"
```

Save the file and refresh the page. The UI will read the new value through `/api/events`.

You can also change:
- event title
- category
- status
- date
- time
- location
- description
- image
- attendees
- organizer
- tags
- hero title/text/image
- statistics
- categories

## API endpoints

### All data

`GET /api/events`

Returns:

```json
{
  "site": {},
  "stats": {},
  "categories": [],
  "events": []
}
```

### One event

`GET /api/events/tech-fest-2026`

Returns that event only.

## Maintainability

- JSON is the single content source.
- API access is isolated in `app/api`.
- File reading is isolated in `lib/events.ts`.
- TypeScript interfaces are in `types/event.ts`.
- UI components don't contain event records.
- Dynamic `[id]` routing avoids separate hard-coded pages.
- `cache: "no-store"` ensures development changes in JSON are fetched fresh.

## Important production note

For this assignment, local JSON + Next.js API is a good architecture.

For a real multi-user production app, replace the JSON repository with a database/CMS while keeping the same API contract. The UI can remain mostly unchanged.
