const bcrypt = require("bcryptjs");

const password = "123456";

const hashed = "$2a$12$X4nKwc9E41EQPJ.DWPt8ou4y3mCrbkgsOPxMyKtxW1Mx7T1c/0KA6";

const hashPassword = async () => {
  //   const hashed = await bcrypt.hash(password, 12);
  //   console.log(hashed);
  const isMatch = await bcrypt.compare(password, hashed);
  console.log(isMatch);
};

const pass = hashed.slice(0, 32);

console.log(pass);

hashPassword();
