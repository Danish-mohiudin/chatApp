import User from '../models/userModel.js'
export const register = async (req, res, next) => {
  try {
    const { fullName, username, password, gender, profile } = req.body;
    const user = new User({ fullName, username, password, gender, profile });
    await user.save();
    res.status(201).json(user);
    
  } catch (error) {
    
  }
}

export const login = (req, res, next) => {
  res.send("hello i am login route");
};

