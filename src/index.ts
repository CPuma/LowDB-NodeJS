import app from "./app";
import { createConnection } from "./database";

createConnection();
app.listen(3000, () => {
  console.log("Server on port ", 3000);
});
