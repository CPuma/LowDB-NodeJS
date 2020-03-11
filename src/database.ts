import low, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Task } from "./models/tasks";

interface Database {
  tasks: Array<Task>;
}
const adapter = new FileSync<Database>("db.json");
let db: LowdbSync<Database>;
export const createConnection = () => {
  db = low(adapter);
  db.defaults({ tasks: [] }).write();
};

export const getConnection = () => db;
