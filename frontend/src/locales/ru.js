export default {
  translation: {
    navBar: {
      title: 'Hexlet Chat',
      logoutBtn: 'Выйти',
    },
    notFoundPage: {
      text: 404,
    },
    generalErrors: {
      network: 'Ошибка соеденения',
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
        userNotFound: 'Неверные имя пользователя или пароль',
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
        toShortPassword: 'Не менее 6 символов',
        passwordsNotEqual: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },
    },
    chat: {
      channelsTitle: 'Каналы',
      addChannelSpan: '+',
      editChannel: 'Управление каналом',
      removeChannel: 'Удалить',
      renameChannel: 'Переименовать',
      sendMessagePlaceholder: 'Введите сообщение...',
      sendMessageAriaLabel: 'Новое сообщение',
      sendMessageBtn: 'Отправить',
      countMessages_zero: '{{count}} сообщений',
      countMessages_one: '{{count}} сообщение',
      countMessages_few: '{{count}} сообщения',
      countMessages_many: '{{count}} сообщений',
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        label: 'Имя канала',
        canselBtn: 'Отменить',
        addBtn: 'Отправить',
      },
      renameChannel: {
        title: 'Переименовать канал',
        label: 'Имя канала',
        canselBtn: 'Отменить',
        renameBtn: 'Отправить',
      },
      removeChannel: {
        title: 'Удалить канал',
        body: 'Уверены?',
        canselBtn: 'Отменить',
        deleteBtn: 'Удалить',
      },
      errors: {
        emptyField: 'Обязательное поле',
        incorrectFieldLenth: 'От 3 до 20 символов',
        notUniqueField: 'Должно быть уникальным',
      },
    },
    toast: {
      addChannelSuccess: 'Канал создан',
      deleteChannelSuccess: 'Канал удалён',
      renameChannelSuccess: 'Канал переименован',
    },
  },
};
