const jwt = require('jsonwebtoken');
const SECRET_KEY = "secret123";
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // перевірка
    if (!email || !password) {
      return res.status(400).json({ message: "Всі поля обов'язкові" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Пароль мінімум 6 символів" });
    }

    // чи існує користувач
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Користувач вже існує" });
    }

    // хешування
    const hashedPassword = await bcrypt.hash(password, 10);

    // створення
    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Користувач створений", user });

  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email і пароль обов'язкові" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Користувача не знайдено" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Невірний пароль" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Авторизація успішна",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Помилка сервера" });
  }
};