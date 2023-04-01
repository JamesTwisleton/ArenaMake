import { Router } from "https://deno.land/x/oak/mod.ts";
import { 
    addSheet, 
    getSheets,
    getSheet,
    updateSheet,
    deleteSheet,
    getEnabledSheetsCount
} from "./controllers/sheets.ts"; // Import controller methods

const router = new Router();

// Implement routes
router
    .post("/api/sheet", addSheet) // Add a sheet
    .get("/api/sheet/:id", getSheet) // Get one sheet
    .put("/api/sheet/:id", updateSheet) // Update a sheet
    .delete("/api/sheet/:id", deleteSheet) // Delete a sheet
    .get("/api/sheets", getSheets) // Get all sheets
    .get("/api/sheets/enabled/count", getEnabledSheetsCount); // Get incomplete sheet count

export default router;