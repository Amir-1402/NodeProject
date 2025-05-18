const bcrypt = require("bcrypt");
const data = require("./data");

function addUser(name, email, password, age, city) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    age,
    city,
    isActive: true,
  };
  data.users.push(newUser);
  return newUser;
}

function updatePassword(userId, newPassword) {
  const user = data.users.find((u) => u.id === userId);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  return { success: true, message: "Password updated" };
}

function login(email, password) {
  const user = data.users.find((u) => u.email === email);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (isMatch) {
    return { success: true, message: "Login successful", user };
  } else {
    return { success: false, message: "Incorrect password" };
  }
}

module.exports = {
  addUser,
  updatePassword,
  login,
};
