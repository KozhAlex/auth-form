export const emailValidation = email => {
    if (email.trim() === '') {
        return 'Email is required';
    }
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    ) {
        return null;
    }
    return 'Пожалуйста, введите правильный email';
};

export const passwordValidation = password => {
    if (password.trim() === '') {
        return 'Необходимо ввести пароль';
    }
    if (password.length < 6) {
        return 'Длина пароля должна превышать 5 символов';
    }
};
