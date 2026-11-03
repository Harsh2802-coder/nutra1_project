const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Signup failed" });
//   }
// };
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, adminToken } = req.body;

    // 1️⃣ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Admin token validation
    if (role === "admin") {
      if (!process.env.ADMIN_SECRET_TOKEN) {
        return res.status(500).json({
          message: "Admin secret not configured on server",
        });
      }

      if (adminToken !== process.env.ADMIN_SECRET_TOKEN) {
        return res.status(403).json({ message: "Invalid admin token" });
      }
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup Error:", err); // 🔥 VERY IMPORTANT
    res.status(500).json({ message: "Signup failed" });
  }
};


// LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       role: user.role,
//       name: user.name,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };
exports.login = async (req, res) => {
  const { email, password, role, adminToken } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (role === "admin") {
    if (
      user.role !== "admin" ||
      adminToken !== process.env.ADMIN_SECRET_TOKEN
    ) {
      return res.status(403).json({ message: "Admin access denied" });
    }
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role, name: user.name });
};

