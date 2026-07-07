import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectToDB } from "./config/database.js";

async function bootstrap() {
  await connectToDB();

  app.listen(env.server.port, () => {
    console.log(`Server running on ${env.server.port}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
