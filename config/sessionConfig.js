import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./prismaClient.js"; // Import your Prisma client

const sessionConfig = session({
  secret: process.env.SESSION_SECRET, // Replace with a secure key in production
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // Check for expired sessions every 2 minutes
    dbRecordIdIsSessionId: true, // Use Prisma Session ID as the Session ID
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
});

export default sessionConfig;
