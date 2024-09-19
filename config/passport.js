import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "./prismaClient.js";

// Local strategy for logging in
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Use Prisma to find the user by username
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user (store user ID in the session)
passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

// Deserialize user (retrieve user information from the session)
passport.deserializeUser(async (id, done) => {
  try {
    // Use Prisma to find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
