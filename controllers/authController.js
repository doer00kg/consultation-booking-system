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