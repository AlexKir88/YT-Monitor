export const API_KEY = 'AIzaSyD16sUtw8kVdxoqx2oHmF6MXPC_prak5Ok';

const defaultChannels= [
    {
        id:"UCdpPBwKPriPIP2eyP9a1C6g",
        title: "RED Group (default value, not posible delete!)",
        description: `htmllessons.ru - Интерактивные курсы #1 по созданию сайтов,  наша главная цель — подготовить профессионалов.
            Обучение идет таким образом, чтобы максимально дать вам первый толчок в IT-индустрии. Далее после изучения наших курсов, вы будете готовы работать по данной профессии, будь то IT-компания или фриланс. Сделайте шаг к успешной карьере!

            На данном канала, Вы найдете обучающие уроки по разработке, дизайну и маркетингу. А так же большие плейлисты с разработкой реальных проектов с 0.
            https://redlinks.space/
            Подписывайся и следи за нами!`,
        checked: true,
        mayDelete: false
    },
    {
        id:"UCDzGdB9TTgFm8jRXn1tBdoA",
        title: 'Ulbi TV (default value, not posible delete!)',
        description: `Привет друзья!) Меня зовут Ульби Тимур. Я fullstack разработчик)
            На моем канале будут размещаться видео уроки посвященные программированию, здесь вы найдете много полезного по разным темам, javascript, backend, frontend, базы данных, алгоритмы и многое другое!)

            Telegram канал для общения - https://t.me/ulbi_tv

            Поддержать меня и мой канал вы можете по ссылкам ниже.

            Patreon/boosty - https://boosty.to/ulbitv

            Qiwi кошелек - http://qiwi.com/n/BODYE821​
            Яндекс деньги - https://yoomoney.ru/to/4100116193037469  `,
        checked: true,
        mayDelete: false
    },

]

export const getChannels = (theme) => {
    //remake on indexedDB
    if (localStorage.length < 1) {
        return defaultChannels;
    }
    let arrayChannels = [];
    for (let i = 0; i<localStorage.length; i++ ){
        let key = localStorage.key(i);
        let obj = JSON.parse(localStorage.getItem(key));
        arrayChannels.push(obj);
    }     
    return arrayChannels;
}

export const deleteChannel = (id) => {
   localStorage.removeItem(id) ;
}



export const findGetChannel = async (nameChannel) => {
            
    const url = new URL('https://youtube.googleapis.com/youtube/v3/search');
    url.searchParams.set('q', nameChannel);
    url.searchParams.set('type', 'channel');
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('maxResults', 1);
    let response = await fetch(url);
    if(response.status !== 200) {
        alert('error request');
        return
    }

    let json = await response.json();
    let channel = json.items[0];
    if (!channel){
        return;
    }

    const urlChannel = new URL('https://youtube.googleapis.com/youtube/v3/channels');
    urlChannel.searchParams.set('part', 'snippet,contentDetails,statistics');
    urlChannel.searchParams.set('id', channel.id.channelId);
    urlChannel.searchParams.set('key', API_KEY);
    let responseChannel = await fetch(urlChannel);
    let jsonChannel = await responseChannel.json();
    const channelDada = jsonChannel.items[0];
    localStorage.setItem(channelDada.id, JSON.stringify({
        id: channelDada.id,
        title: channelDada.snippet.title,
        description: channelDada.snippet.description ,
        checked: true,
        mayDelete: true
    }));
}

export const createStorage = () => {
    const mainDB = indexedDB.open('main',1);
    let firstTime = false;
    mainDB.onupgradeneeded = () => {
        firstTime = true;
        const resultDB = mainDB.result;
        console.log('create DB');
        const store = resultDB.createObjectStore('store');
        console.log(`create ${store.name}`);
        resultDB.onversionchange = () => {
            
        }
    }
    mainDB.onsuccess = () => {
        console.log('open DB');
        if(firstTime) {
            const transaction = mainDB.result.transaction('store','readwrite');
            const themes = transaction.objectStore('store');
            themes.add(defaultChannels,'Default')
            console.log('create object default');
        }
    }
}
export const createTheme = (nameTheme) => {
    const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = () => {
        const db = mainDB.result;
        const transaction = db.transaction('store',"readwrite");
        const themes = transaction.objectStore('store');
        const request = themes.add([], nameTheme);
        request.onsuccess = () => {
            console.log(`create object ${nameTheme}`);
        }
        request.onerror = (err) => {
            console.log(err);
        }
    }
    mainDB.onerror = (err) => {
        console.log(err);
    }
}
export const getThemes = () => {
    const mainDB = indexedDB.open('main',1);
        mainDB.onsuccess = () => {
            const db = mainDB.result;
            const transaction = db.transaction("store","readonly");
            const themes = transaction.objectStore("store");
            const request = themes.getAllKeys();
            request.onsuccess = () => {
                console.log(request.result + 'request.onsuccess 3')
            }
            console.log(window.result + 'mainDB.onsuccess 2');
        }
    console.log(window.result + 'mainDB 1');
}
// const urlVideos = new URL(' https://youtube.googleapis.com/youtube/v3/search');
            // urlVideos.searchParams.set('part', 'snippet');
            // urlVideos.searchParams.set('channelId',json.items[0].id.channelId);
            // urlVideos.searchParams.set('eventType','none');
            // urlVideos.searchParams.set('maxResults',100);
            // urlVideos.searchParams.set('type','video');
            // urlVideos.searchParams.set('key', API_KEY);
            // urlVideos.searchParams.set('publishedAfter', "2022-11-18T09:33:46Z");
            // urlVideos.searchParams.set('pageToken', 'pageToken');
            // let responseVideos = await fetch(urlVideos);
            // let jsonVideos = await responseVideos.json();
            // // console.log(urlVideos.toString());
            // // console.log(jsonVideos.items[+jsonVideos.items.length - 1].snippet.publishedAt);
            // jsonVideos.items.forEach(element => {
            //     console.log(element.snippet.publishedAt);
            // });           
            