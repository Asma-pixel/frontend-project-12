export default {
  translation: {
    navBar: {
      title: 'My chat',
    },
    notFoundPage: {
      text: 404,
    },
    generalErrors: {
      network: 'Ошибка сети',
      unknown: 'Неизвестная ошибка',
    },
    loginPage: {
      title: 'Войти',
      btn: 'Войти',
      signupTitle: 'Нет аккаунта?',
      signupLink: 'Регистрация',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      errors: {
        userNotFound: 'Неверное имя или пароль',
      },
    },
    signupPage: {
      title: 'Регистрация',
      btn: 'Зарегистрироваться',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      errors: {
        emptyField: 'Обязательное поле',
        incorrectLengthUsername: 'От 3 до 20 символов',
        toShortPassword: 'Не менее 6-и символов',
        passwordsNotEqual: 'Пароли не совпадают',
        userExists: 'Такой пользователь уже существует',
      },
    },
    chat: {
      channelsTitle: 'Каналы',
      removeChannel: 'Удалить',
      renameChannel: 'Переименовать',
      sendMessagePlaceholder: 'Введите сообщение...',
      countMessages_one: '{{count}} сообщение',
      countMessages_few: '{{count}} cooбщения',
      countMessages_many: '{{count}} сообщений',
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        canselBtn: 'Отменить',
        addBtn: 'Отправить',
      },
      renameChannel: {
        title: 'Переименовать канал',
        canselBtn: 'Отменить',
        renameBtn: 'Отправить',
      },
      removeChannel: {
        title: 'Удалить канал',
        canselBtn: 'Отменить',
        deleteBtn: 'Удалить',
      },
    },

  },
};
