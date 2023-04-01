import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts"; // Import our router

const PORT = 3000;
const app = new Application();

app.use(router.routes()); // Implement our router
app.use(router.allowedMethods()); // Allow router HTTP methods

console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });