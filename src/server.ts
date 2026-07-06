import "dotenv/config";

import app from './app.js';
import { env } from "./config/env.js";
import { createDatabase } from "./config/database.js";


try{
  await createDatabase(env.database.url)
  const PORT = env.server.port || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..🚀`)
  });
}catch(err){
  console.error(err)
  process.exit(1)
};

