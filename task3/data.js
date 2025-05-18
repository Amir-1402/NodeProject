const bcrypt = require("bcrypt");

const data = {
  products: [
    { id: 1, name: "4070TI", price: 2500 },
    { id: 2, name: "4060Super", price: 1800 },
    { id: 3, name: "I7CPU", price: 1700 },
    { id: 4, name: "I5CPU", price: 1000 },
    { id: 5, name: "32GBRAM", price: 1000 },
    { id: 6, name: "PC_Case", price: 250 },
    { id: 7, name: "PC_AIO", price: 850 },
    { id: 8, name: "PC_Fans", price: 50 },
    { id: 9, name: "PowerSupply", price: 400 },
    { id: 10, name: "PC_RGBCASE", price: 450 },
  ],
  users: [
    {
      id: 1,
      name: "Mohammad Zaaroura",
      email: "Zaaroura@gmail.com",
      password: bcrypt.hashSync("Zaaroura123", 10),
      age: 20,
      city: "Nof-Hagalil",
      isActive: true,
    },
    {
      id: 2,
      name: "Amir-Fahmawi",
      email: "Fahmawi@gmail.com",
      password: bcrypt.hashSync("Fahmawi123", 10),
      age: 23,
      city: "Haifa",
      isActive: true,
    },
    {
      id: 3,
      name: "jack Zaaroura",
      email: "Jack@gmail.com",
      password: bcrypt.hashSync("jack123", 10),
      age: 28,
      city: "Nazareth",
      isActive: false,
    },
    {
      id: 4,
      name: "Mickel Khoury",
      email: "Khoury@gmail.com",
      password: bcrypt.hashSync("Khoury123", 10),
      age: 32,
      city: "Acre",
      isActive: true,
    },
  ],
};

module.exports = data;
