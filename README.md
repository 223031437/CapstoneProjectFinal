# Terra & Bloom — Nail & Beauty Salon

Two zips, two projects: a Spring Boot backend and a React frontend, wired
together over REST.

## Run the backend

1. Unzip `nail-and-beauty-salon-backend.zip`.
2. Make sure MySQL is running locally. The app auto-creates the
   `nail-beautysalondb` schema on first boot.
3. Credentials come from env vars, with local-dev defaults baked in:
   - `MYSQL_HOST` (default `localhost`)
   - `MYSQL_USER` (default `root`)
   - `MYSQL_PASSWORD` (default is whatever was already in
     `application.properties` — please rotate it if this repo is ever
     made public, since it was previously hardcoded in source)
   - `ALLOWED_ORIGINS` — comma-separated CORS origins, defaults to
     `http://localhost:3000,http://127.0.0.1:3000`
4. Run it (`./mvnw spring-boot:run` or via your IDE). It serves on
   `http://localhost:8080/nail-beautySalon`.

## Run the frontend

1. Unzip `nail-and-beauty-salon-frontend.zip`.
2. `npm install`
3. `npm start` — opens on `http://localhost:3000`.
4. It talks to the backend via `REACT_APP_API_URL`, set in `.env`
   (defaults to `http://localhost:8080/nail-beautySalon`, matching the
   backend's context path above). Edit `.env` if your backend runs
   elsewhere.

Pages: Home, Services, Products, Team, Book a ritual, Contact, and a
`/admin` staff dashboard (no login — treat as internal-only for now) for
managing bookings, team, services and products.

## What was fixed on the backend

The original code had a few things that would have kept the frontend
from actually working, now fixed:

- **`Service.java` wouldn't compile** — `getId()/setId()` referenced a
  field that didn't exist. Removed.
- **No CORS config** — added `config/WebConfig.java` so the React app's
  origin is allowed to call the API at all.
- **Domain classes had no way to receive JSON** — `Employee`, `Customer`,
  `Service`, `Product`, `Appointment`, `Contact`, `Inquiry`, and `Address`
  only exposed a private `Builder`, with no setters and no
  Jackson-visible constructor. Every `create`/`update` request would have
  silently failed to populate the object. Added `@JsonCreator`
  constructors to each so incoming JSON actually binds to the entity.
- **`Inquiry.Builder.setMessage()` was a no-op** — it never assigned the
  field. Fixed.
- **Read-by-id used `@PostMapping` instead of `@GetMapping`** in
  `EmployeeController`, `ProductController`, `AppointmentController`.
  Fixed to `@GetMapping` for correctness.
- **`ContactController` and `InquiryController` had no "list all"
  endpoint** even though the service layer already supported it. Added
  `GET /contact/all` and `GET /inquiry`.
- DB credentials moved to env vars (`MYSQL_USER`/`MYSQL_PASSWORD`)
  instead of being hardcoded, with the previous values kept as fallback
  defaults so local dev still works unmodified.

### Known limitation, left as-is

`Contact`'s `@Id` is the `Address` entity itself (a composite key), so
`GET /contact/{id}` and `DELETE /contact/{id}` can't bind a URL segment
into a full `Address` without a custom Spring converter. The frontend
avoids those two routes and only uses `create`, `update`, and the new
`getAll`. Worth revisiting if you need per-contact lookup later.

Also not wired into the UI: the `Customer` entity/endpoints exist on the
backend but nothing in the frontend uses them yet — there was no natural
flow for it in this build (no login/auth exists anywhere in the app).

## What was built on the frontend

The original React app was just a placeholder (`App.js` imported
components that didn't exist, no API calls anywhere). Rebuilt from
scratch:

- A small design system (`src/styles/tokens.css`, `global.css`) — warm
  cream/clay/sage palette with a "Fraunces + Inter" pairing, in the
  spirit of the reference site's calm wellness-studio look, with an
  original arch-shaped motif standing in for photography (none was
  supplied).
- A `fetch`-based API layer (`src/api/`) for every backend entity used —
  no axios, since it wasn't available in the offline build environment;
  plain `fetch` needs no extra dependency.
- Pages: Home, Services, Products, Team, Book a ritual, Contact (with an
  inquiry form), and an Admin dashboard (Bookings / Team / Services /
  Products tabs, each with add + delete, appointments also get status
  updates).
- Removed the unused `bootstrap`/`react-bootstrap` dependencies since the
  new design doesn't use them.

## If you want to go further

- Add real auth in front of `/admin` — right now it's an unprotected
  route.
- Swap the arch-motif placeholders for real studio photography.
- Wire up `Customer` records if you want guests to have accounts.
