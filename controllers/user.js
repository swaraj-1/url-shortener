const User = require('../models/users')
const {v4: uuidv4} = require('uuid')
const{ setUser } = require('../service/auth')

// Create and Save a new User
async function handleUserSignUp(req, res) {
    const { name, email, password, role } = req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    await User.create({
        name,
        email,
        password,
        role,
        // Add any additional fields here, e.g., role, etc. if required. For simplicity, we'll keep it simple.
    })
    // Create a new User
    //const newUser = new User({ name, email, password });
    //await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
    
}

async function handleUserLogIn(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = setUser(user)
    // Set session cookie
    res.cookie('session', token, {httpOnly:false});
    return res.redirect('/')
}

async function handleUserLogOut(req, res) {
    // Clear session cookie
    res.clearCookie('session');
    res.status(200);
    return res.redirect('/login')
}


module.exports = {
    handleUserSignUp,
    handleUserLogIn,
    handleUserLogOut,
 }
