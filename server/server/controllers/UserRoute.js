const getUser = (req, res) => {
    res.send("I am the get User route");
  };
const createUser = async (req, res) => {
  try {
      if (!req.body) {
          return res.status(400).json({ error: "Request body is missing" });
      }

      const { _id, email, password_hash, name, contact_info } = req.body;

      if (!_id || !email || !password_hash || !name || !contact_info) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const existingUser = await User.findById(_id);
      if (existingUser) {
          return res.status(409).json({ error: "User with this ID already exists" });
      }

      const newUser = new User({
          _id,
          auth_info: {
              email,
              password_hash,
          },
          name,
          contact_info,
      });

      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
    getUser,
    createUser,
  };