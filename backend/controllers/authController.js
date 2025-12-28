const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: "User already exists or database error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, users[0].password_hash);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: users[0].username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};