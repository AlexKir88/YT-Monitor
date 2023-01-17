export const API_KEY = [
    'AIzaSyBhOuuC0gOEvTyNXcYAx5SEFCt0xFw-YwQ',
    'AIzaSyD3P-54FcONK98IvAkc-U2K-va7KrlsvWc',
    'AIzaSyBGhjGT88pmeiwRImhEuufQDxAecgZQKZY',
    'AIzaSyCIp4PmyP8a6NZlKP7ijRP6wmEo19qGdGA',
    'AIzaSyCuafXwM2F2ojfxbZBiLqX1dF84OYKmUio'
];
let RandomIndexKeyAPI = () => {
    const index = Math.random().toString(API_KEY.length);
    return Number(index[5]);
}

export const dayPreInMonth = () => {
    const currentDate = new Date();
    const lastDayPreMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),0,0,0,0,0).getDate()
    return lastDayPreMonth ;
}


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

export const getChannels = async (group, setChannels, setVideos, filterPeriod) => {
    const mainDB = indexedDB.open('main', 1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readonly');
        const groups = transaction.objectStore('store');
        const request = groups.get(group);
        request.onsuccess = () => {
            const channels = request.result;
            setChannels(channels);
            getVideos(channels, setVideos, filterPeriod);  
        }
    }
}

export const deleteChannel = (id, nameGroup) => {
   const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readwrite');
        const channels = transaction.objectStore('store');
        const request = channels.get(nameGroup);
        request.onsuccess = () => {
           const oldValues =  request.result;
           const newValue = oldValues.filter(item => {
            return item.id !== id;
           })
           channels.put(newValue, nameGroup )
        }
    }
}



export const findGetChannel = async (nameChannel, nameTheme, counter = 0) => {

    
    let keyAPI = API_KEY[RandomIndexKeyAPI()];
    const url = new URL('https://youtube.googleapis.com/youtube/v3/search');
    url.searchParams.set('q', nameChannel);
    url.searchParams.set('type', 'channel');
    url.searchParams.set('key', keyAPI );
    url.searchParams.set('maxResults', 1);
    let response = await fetch(url);
    console.log(response);
    if(response.status === 403) {
        if (counter > (API_KEY.length + 1) * 3) {
            console.log('key limit');
            return;
        }
        findGetChannel(nameChannel, nameTheme, counter++);
        return;
    }
    let json = await response.json();
    let channel = json.items[0];
    if (!channel) return;
    
    const urlChannel = new URL('https://youtube.googleapis.com/youtube/v3/channels');
    urlChannel.searchParams.set('part', 'snippet');
    urlChannel.searchParams.set('id', channel.id.channelId);
    urlChannel.searchParams.set('key', keyAPI);
    let responseChannel = await fetch(urlChannel);
    

    if(responseChannel.status === 403) {
        if (counter > (API_KEY.length + 1) * 3) {
            console.log('key limit');
            return;
        }
        findGetChannel(nameChannel, nameTheme, counter++);
        return;
    }

    console.log(responseChannel);
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
            const groups = transaction.objectStore('store');
            groups.add(defaultChannels,'Default')
            console.log('create object Default');
        }
    }
}
export const createGroup = (nameGroup) => {
    const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = () => {
        const db = mainDB.result;
        const transaction = db.transaction('store',"readwrite");
        const groups = transaction.objectStore('store');
        const request = groups.add([], nameGroup);
        request.onsuccess = () => {
            console.log(`create object ${nameGroup}`);
        }
        request.onerror = (err) => {
            console.log(err);
        }
    }
    mainDB.onerror = (err) => {
        console.log(err);
    }
}

export const getGroups = (setGroups) => {
    const mainDB = indexedDB.open('main',1);
        mainDB.onsuccess = (event) => {
            const db = mainDB.result;
            const transaction = db.transaction("store","readonly");
            const groups = transaction.objectStore("store");
            const request = groups.getAllKeys();
            request.onsuccess = () => {
                let response = request.result;
                setGroups(response);
            }
        }
}
export const deleteGroup = (nameGroup) => {
    const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = (event) => {
        const db = mainDB.result;
        const transaction = db.transaction("store","readwrite");
        const groups = transaction.objectStore("store");
        groups.delete(nameGroup);
    }
}

export const getVideos = async (channels, setVideos, filterPeriod, dateStart = new Date()) => {
    //if(channels = ?prevChannels)
    //counter not work, may be cause async await
    let indexKeyAPI = RandomIndexKeyAPI();
    console.log(indexKeyAPI);

    const currentDate = new Date(new Date().setHours(0,0,0,0));
    const publishedAfter = new Date(currentDate.setDate(currentDate.getDate() - filterPeriod)).toISOString();
    let videos = [];
    for(let item of channels) {
        const urlVideos = new URL(' https://youtube.googleapis.com/youtube/v3/search');
        // urlVideos.searchParams.append('part', "contentDetails");
        urlVideos.searchParams.set('part', 'snippet'); 
        urlVideos.searchParams.set('channelId',item.id);
        urlVideos.searchParams.set('eventType','none');
        urlVideos.searchParams.set('maxResults',10);
        urlVideos.searchParams.set('type','video');
        urlVideos.searchParams.set('key', API_KEY[indexKeyAPI] );
        urlVideos.searchParams.set('publishedAfter', publishedAfter);
        // urlVideos.searchParams.append('pageToken', 'pageToken');
        let responseVideos = await fetch(urlVideos);
        if(responseVideos.status === 403) {
            if ( new Date() - dateStart > 10000) {
                alert('API key quota exceeded');
                return false;
            }
            await getVideos(channels, setVideos, filterPeriod, dateStart);
            return false;
        }
        let jsonVideos = await responseVideos.json();
        jsonVideos?.items?.forEach(element => {
            videos.push({
                videoId: element.id.videoId,
                thumbnails: element.snippet.thumbnails.high.url,
                publishedAt: element.snippet.publishedAt,
                channelTitle: element.snippet.channelTitle,
                title: element.snippet.title,
                // duration: element.contentDetails.duration,
            })
        });

        console.log(responseVideos);
        console.log(item.title);           
    }
    const sortVideos = videos?.sort((a, b) =>  new Date(b.publishedAt) - +new Date(a.publishedAt));
    setVideos(sortVideos) ;
    return true;
}
            