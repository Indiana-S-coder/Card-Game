const userSchema = require("../models/user.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../util/verify");


const Auth = redisClient.fetchRepository(userSchema);
(async () => {
    await Auth.createIndex();
})();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw "incomplete details";
    }

    const user = await Auth.search().where("email").eq( email ).return.first();

    if (!user) {
      throw "No such user found!";
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      throw "Invalid credentials";
    }

    delete user.password;

    const token = createToken(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw "Incomplete details";

    const existingUser = await Auth.search().where("email").eq(email).return.first();
    if (existingUser) throw "Account already exists!/nPlease Login!!!";

    const hashedPass = await bcrypt.hash(password, 5);
    const user = await Auth.createEntity({ email, password: hashedPass, name });

    delete user.password;
    const token = createToken(user);
	await Auth.save(user);

    return res
      .status(200)
      .json({ msg: "Account Successfully created", details: user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.verifyUser = async (req, res) => {
  return res.status(200).json({user:req.user})
}