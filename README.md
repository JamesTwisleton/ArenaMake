# ArenaMake

### Prerequisites
Deno CLI

Start the project:

```
deno run --allow-net --allow-read server.ts
```

`POST localhost:3000/api/todos`
```
{
  "title": "Todo 1",
  "complete": false,
  "todoId": 1
}
```