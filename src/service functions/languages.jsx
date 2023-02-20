let langBrowser = window.navigator.language;
export let defoultLang = () => {
    if (langBrowser.startsWith('ru')) return RU;
    return EN;
}

export const EN = {
    id: 'EN',
    buttonVideo: 'Videos',
    buttonSubscribes: 'Subscribes',
    buttonGroups: 'Groups',
    buttonAbout: 'About',
    buttonDay: 'day',
    buttonWeek: 'week',
    buttonMonth: 'month',
    buttonMonth3: '3 months',
    buttonYear: 'year',
    buttonAll: 'all',
    noVideo: 'No videos',
    buttonClearDB: 'clear DB',
    placeholderSearch: '  Search channel...',
    pressEnter: 'Press enter',
    inputName: '  input name group...',
    pressEnterGroup: 'Press "Enter" for add group',
    defaultGroup: 'Default',
    about: ` This project aims to simplify the management of YouTube subscriptions.The number of subscriptions can be large and have different topics.
    Therefore, the user has a chance to miss an important video.This service allows you to create groups of channels in the "Groups" section.
    The list of channels for the selected group is filled in the "Subscriptions" section.\r
    Important! The service is tied to a specific device and browser, so it does not require authorization,
    but you will not be able to access your data online from another device.
    You can also leave your feedback or describe the problem in the form below. Be sure to leave your contact information for feedback.`,
    buttonSend: 'Send',
    Feedback: 'Feedback',
    placeholderName: '  name...',
    placeholderContact: '  telephone, email, anything...',
    placeholderContent: '   Describe you problem or offer...',
}

export const RU = {
    id: 'RU',
    buttonVideo: 'Видео',
    buttonSubscribes: 'Подписки',
    buttonGroups: 'Группы',
    buttonAbout: 'О нас',
    buttonDay: 'день',
    buttonWeek: 'неделя',
    buttonMonth: 'месяц',
    buttonMonth3: '3 месяца',
    buttonYear: 'год',
    buttonAll: 'все',
    noVideo: 'Нет видео',
    buttonClearDB: 'очистить БД',
    placeholderSearch: '  Поиск канала...',
    pressEnter: 'Нажмите "Enter"',
    inputName: '  введите имя группы...',
    pressEnterGroup: 'Нажмите "Enter" для добавления группы',
    defaultGroup: 'Главная',
    about: ` Данный проект призван упростить менеджмент подписок YouTube. Количество подписок может быть велико и иметь разную тематику.
    Поэтому у пользователя появляется шанс пропустить важное видео. Данный сервис дает возможность создавать группы каналов в разделе "Группы".
    Cписок каналов для выбранной группы, заполняется в разделе "Подписки".
    Важно! Сервис привязан к конкретному устройству и браузеру, поэтому не требует авторизации,
    но и получить онлайн доступ к своим данным с другого устройства вы не сможете. 
    Вы также можете оставить свой отзыв или описать проблему в форме ниже. Обязательно оставьте свои контактные данные для обратной связи.`,
    buttonSend: 'Отправить',
    Feedback: 'Обратная связь',
    placeholderName: '  имя...',
    placeholderContact: '  телефон, email, что угодно...',
    placeholderContent: '   Опишите вашу проблему или предложение...',
}