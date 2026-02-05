import http from "http";
import dotenv from 'dotenv';
dotenv.config();
import app from "./app";
import { connectMongoDB, disconnectMongoDB } from "./config/mongodb";
import ENV from "./utils/validateEnv";


const port = ENV.PORT;

const server = http.createServer(app);

async function startServer() {
  try {
    await connectMongoDB();

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();


async function shutdown(signal: string) {
  try {
    await disconnectMongoDB();

    server.close(() => {
      process.exit(0);
    });
  } catch (error) {
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);