const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

app.use(express.json());

// app.get("/:id", async (req, res, next) => {
//   console.log("first");
//   res.json({ msg: "HELLO" });
// });

// app.post("/register", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const hashed = await bcrypt.hash(password, 12);
//     await prisma.user.create({
//       data: { username, password: hashed },
//     });
//     res.status(200).json({ msg: "register SUCCESS" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ msg: "FAIL" });
//   }
// });

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // const check = await bcrypt.compare(password, hashed);
    // console.log(check);
    const foundUser = await prisma.user.findUniqueOrThrow({
      where: { username },
    });
    const isMatched = await bcrypt.compare(password, foundUser.password);
    console.log(foundUser);
    if (isMatched) {
      res.status(200).json({ msg: "Login SUCCESS" });
    } else {
      throw "password kuy";
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Login FAIL" });
  }
});

app.listen(8080, () => {
  console.log("run on port 8080");
});
