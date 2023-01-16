export const API_KEY = [
    'AIzaSyBhOuuC0gOEvTyNXcYAx5SEFCt0xFw-YwQ',
    'AIzaSyD3P-54FcONK98IvAkc-U2K-va7KrlsvWc',
];


const defaultChannels= [
    {
        id:"UCdpPBwKPriPIP2eyP9a1C6g",
        title: "RED Group",
        description: `htmllessons.ru - Интерактивные курсы #1 по созданию сайтов,  наша главная цель — подготовить профессионалов.
            Обучение идет таким образом, чтобы максимально дать вам первый толчок в IT-индустрии. Далее после изучения наших курсов, вы будете готовы работать по данной профессии, будь то IT-компания или фриланс. Сделайте шаг к успешной карьере!

            На данном канала, Вы найдете обучающие уроки по разработке, дизайну и маркетингу. А так же большие плейлисты с разработкой реальных проектов с 0.
            https://redlinks.space/
            Подписывайся и следи за нами!`,
    },
    {
        id:"UCDzGdB9TTgFm8jRXn1tBdoA",
        title: 'Ulbi TV',
        description: `Привет друзья!) Меня зовут Ульби Тимур. Я fullstack разработчик)
            На моем канале будут размещаться видео уроки посвященные программированию, здесь вы найдете много полезного по разным темам, javascript, backend, frontend, базы данных, алгоритмы и многое другое!)

            Telegram канал для общения - https://t.me/ulbi_tv

            Поддержать меня и мой канал вы можете по ссылкам ниже.

            Patreon/boosty - https://boosty.to/ulbitv

            Qiwi кошелек - http://qiwi.com/n/BODYE821​
            Яндекс деньги - https://yoomoney.ru/to/4100116193037469  `,
    },

]

export const getChannels = async (theme, setChannels, setVideos, filterPeriod) => {
    const mainDB = indexedDB.open('main', 1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readonly');
        const themes = transaction.objectStore('store');
        const request = themes.get(theme);
        request.onsuccess = () => {
            const channels = request.result;
            setChannels(channels);
            getVideos(channels, setVideos, filterPeriod);
        }
    }
}

export const deleteChannel = (id, nameTheme) => {
   const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readwrite');
        const channels = transaction.objectStore('store');
        const request = channels.get(nameTheme);
        request.onsuccess = () => {
           const oldValues =  request.result;
           const newValue = oldValues.filter(item => {
            return item.id !== id;
           })
           channels.put(newValue, nameTheme )
        }
    }
}




export const findGetChannel = async (nameChannel, nameTheme) => {
    const url = new URL('https://youtube.googleapis.com/youtube/v3/search');
    url.searchParams.set('q', nameChannel);
    url.searchParams.set('type', 'channel');
    url.searchParams.set('key', API_KEY[1] );
    url.searchParams.set('maxResults', 1);
    let response = await fetch(url);
    console.log(response);
    if(response.status === 403) {
        console.log('oops');
        return;
    }
    let json = await response.json();
    let channel = json.items[0];
    if (!channel) return;
    localStorage.setItem('requestCount', +localStorage.getItem('requestCount') + 1);
    const urlChannel = new URL('https://youtube.googleapis.com/youtube/v3/channels');
    urlChannel.searchParams.set('part', 'snippet,contentDetails,statistics');
    urlChannel.searchParams.set('id', channel.id.channelId);
    urlChannel.searchParams.set('key',API_KEY[1]);
    let responseChannel = await fetch(urlChannel);
    console.log(responseChannel);

    if(responseChannel.status === 403) {
        console.log('oops') 
        return; 
    }
    let jsonChannel = await responseChannel.json();
    const channelDada = jsonChannel.items[0];

     const newObject = {
        id: channelDada.id,
        title: channelDada.snippet.title,
        description: channelDada.snippet.description ,
    };

    const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readwrite');
        const channels = transaction.objectStore('store');
        const request = channels.get(nameTheme);
        request.onsuccess = () => {
           const oldValues =  request.result;
           channels.put([...oldValues, newObject], nameTheme )
        }
    }
    localStorage.setItem('requestCount', +localStorage.getItem('requestCount') + 1);
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
        if(firstTime) {
            const transaction = mainDB.result.transaction('store','readwrite');
            const themes = transaction.objectStore('store');
            themes.add(defaultChannels,'Default')
            console.log('create object Default');
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

export const getThemes = (setThemes) => {
    const mainDB = indexedDB.open('main',1);
        mainDB.onsuccess = (event) => {
            const db = mainDB.result;
            const transaction = db.transaction("store","readonly");
            const themes = transaction.objectStore("store");
            const request = themes.getAllKeys();
            request.onsuccess = () => {
                let response = request.result;
                setThemes(response);
            }
        }
}
export const deleteTheme = (nameTheme) => {
    const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = (event) => {
        const db = mainDB.result;
        const transaction = db.transaction("store","readwrite");
        const themes = transaction.objectStore("store");
        themes.delete(nameTheme);
    }
}

export const getVideos = async (channels, setVideos, filterPeriod, KeyAPI ) => {
    const currentDate = new Date();
    const publishedAfter = new Date(currentDate.setDate(currentDate.getDate() - filterPeriod)).toISOString();
    let videos = [];
    for(let item of channels) {
        const urlVideos = new URL(' https://youtube.googleapis.com/youtube/v3/search');
        urlVideos.searchParams.set('part', 'snippet');
        urlVideos.searchParams.set('channelId',item.id);
        urlVideos.searchParams.set('eventType','none');
        urlVideos.searchParams.set('maxResults',1);
        urlVideos.searchParams.set('type','video');
        urlVideos.searchParams.set('key', API_KEY[1] );
        urlVideos.searchParams.set('publishedAfter', publishedAfter);
        // urlVideos.searchParams.append('pageToken', 'pageToken');
        let responseVideos = await fetch(urlVideos);
        if(responseVideos.status === 403) {
            console.log('oops')
            return;
        }
        localStorage.setItem('requestCount', +localStorage.getItem('requestCount') + 1)
        let jsonVideos = await responseVideos.json();
        jsonVideos?.items?.forEach(element => {
            videos.push({
                videoId: element.id.videoId,
                thumbnails: element.snippet.thumbnails.high.url,
                publishedAt: element.snippet.publishedAt,
                channelTitle: element.snippet.channelTitle,
                title: element.snippet.title
            })
        });
        console.log(responseVideos);
        console.log(item.title);           
    }
    const sortVideos = videos?.sort((a, b) =>  new Date(b.publishedAt) - +new Date(a.publishedAt));
    setVideos(sortVideos) ;
}
            