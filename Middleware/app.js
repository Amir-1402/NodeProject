const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// הגדרת תיקייה סטטית
app.use(express.static(path.join(__dirname, "assets")));

// נתוני דוגמא
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// מסלול לקבלת כל המוצרים
app.get("/products", (req, res) => {
  res.json(products);
});

// מסלול לקבלת מוצר ספציפי לפי ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "מוצר לא נמצא" });
  }
  res.json(product);
});

// מסלול לקבלת משתמשים עם אפשרות סינון לפי גיל
app.get("/users", (req, res) => {
  const { age } = req.query;
  if (age) {
    const filteredUsers = users.filter((user) => user.age >= parseInt(age));
    return res.json(filteredUsers);
  }
  res.json(users);
});

// טיפול במסלולים לא קיימים - דף 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("\n- **Example of work**\n");
  console.log("Go to **http://localhost:3000/** to open the **home page**.");
  console.log("Click the **About button** to go to the **/about** **page**.");
  console.log("Click the **Contact button** to go to the **/contact page.**");
  console.log(
    "Go to **http://localhost:3000/products** to see a **list of products**."
  );
  console.log(
    "Go to **http://localhost:3000/products/1** to see details of a **specific product**."
  );
  console.log(
    "Go to **http://localhost:3000/users?age=30** to see **users over 30**."
  );
  console.log(
    "Enter an invalid URL, such as **http://localhost:3000/unknown**, to see a custom **404 page.**"
  );
});
