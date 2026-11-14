// CRUD WITHOUT DATABASE

let users = [
  { id: 1, name: "Ayaan", age: 26 },
  { id: 2, name: "Fatima", age: 29 },
  { id: 3, name: "Zubeyr", age: 20 },
];

export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getOnuserInfo = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json("User not found");
  res.json(user);
};

export const createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.params.name,
    age: req.params.age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name || user.name;
  user.age = req.params.name || user.age;
  res.json(user);
};

export const deleteUser = () => {
  const deleteUser = users.find((u) => u.id != req.params.id);
  res.send("User deleted");
};
