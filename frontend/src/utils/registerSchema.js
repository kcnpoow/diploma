import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(20, 'В имени может быть максимум 32 символа')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Пожалуйста, введите корректную почту')
    .required('Обязательное поле'),
  newPassword: Yup.string()
    .min(8, 'Пароль должен содержать как минимум 8 символов')
    .max(32, 'Длина пароля не должен превышать 32 символов')
    .required('Обязательное поле'),
});

export default registerSchema;
