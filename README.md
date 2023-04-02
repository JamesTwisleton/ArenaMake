# ArenaMake
A webapp to manage DND player sheets. Currently mostly a CRUD API only...check out the [Figma](https://www.figma.com/file/aSFJhuZY0e484BVgcQgRgm?node-id=0%3A1&comments-enabled=1&viewer=1&locale=en)!
## Prerequisites
* [Deno](https://deno.land)
* [Docker](https://www.docker.com/products/docker-desktop/)
* A rest client to make requests ([RapidAPI](https://paw.cloud/), [Postman](https://www.postman.com/downloads/).etc)


## Local development
* Create a `.env` file in the `app` directory, in the same format as [.env.example](app/.env.example)

* In the `app` directory
  ```
  docker compose -f docker-compose.yml build && docker compose up
  ```
* See the frontend, or lack thereof, on http://localhost:8000
* Use the following links to see example API requests.
  * [Add sheet](https://paw.pt/hJBBBboa)
  * [Get sheet](https://paw.pt/hJBCaUEz)
  * [Update sheet](https://paw.pt/hJBCjcGg)
  * [Delete sheet](https://paw.pt/hJBCoB3f)
  
  Replace `https://arenamake-z76ei6qi4a-nw.a.run.app` with `localhost:8000` to run these requests against your local environment.

## TODO

* tests for the other endpoints
* schema validation
* auth 
* frontend:
  * probably forking off [DarylBuckle/dnd-character-sheets
](https://github.com/DarylBuckle/dnd-character-sheets) to begin with
  * The idea is to be able to go to https://arenamake.app/s/your-sheet-name and see a DND character sheet. All fields editable and synchronised automatically on change by client or server.
