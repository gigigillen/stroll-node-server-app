import * as dao from './dao.js';


export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => { };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

const updateUser = async (req, res) => {
  const currentUser = req.session["currentUser"];
  
  if (!currentUser) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  
  const userId = currentUser._id;  // Get the userId from the session
  const status = await dao.updateUser(userId, req.body);
  const updatedUser = await dao.findUserById(userId);  // Fetch updated user info

  // Update session with the latest user data
  req.session["currentUser"] = updatedUser;
  
  res.json(updatedUser);  // Return the updated user
};

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };


  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later. From server." });
    }
  };


  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };


  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser)
  };


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
