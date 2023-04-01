# ArenaMake
A webapp to manage DND player sheets
## Prerequisites
* [Deno](https://deno.land)
* [VSCode](https://code.visualstudio.com)
* [Thunder Client extension for VSCode](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

## Getting started
* Create a `.env` file in the project directory, in the same format as [.env.example](.env.example)
* [Import](https://github.com/rangav/thunder-client-support#how-to-import-a-collection) the [Thunder Client collection](thunder-collection_ArenaMake.json)

* Start the project:

    ```
    deno run --allow-net --allow-read server.ts
    ```
* Use Thunder Client to try out the endpoints

## TODO
* tests for the other endpoints
* schema validation
* auth 
* frontend:
  * probably forking off [DarylBuckle/dnd-character-sheets
](https://github.com/DarylBuckle/dnd-character-sheets) to begin with
  * The idea is to be able to go to https://arenamake.app/s/your-sheet-name and see a DND character sheet. All fields editable and synchronised automatically on change by client or server.
