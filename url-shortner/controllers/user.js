import { User } from "../models/user.js"
import { setUser } from "../utils/auth.js";

export async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body
    await User.create({ name, email, password });

    return res.redirect('/');
}

export async function handleUserLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password });
    if (!user) {
        res.render('login', { error: 'Invalid username or password' })
    } else {
        const token = setUser(user);
        res.cookie('token', token);
        return res.redirect('/');
    }

    // return res.json({ token });
}

export async function handleUserLogout(req, res) {
    res.clearCookie('token');
    return res.redirect('/login');
}