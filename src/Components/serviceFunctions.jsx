export const API_KEY = 'AIzaSyB-x1SwWq9bDSdaj_BBwmE83VCATWfNkcU'
    

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
        thumbnails: "https://yt3.googleusercontent.com/7-zEe8SeUX5KPncXBLjgWINwWD6OLQuSy4whjPOoTVsufPR-fGFjR8egyBn9sAFtQPntbXQnBKk=s800-c-k-c0xffffffff-no-rj-mo",
        customUrl: '@redgroup'
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
        thumbnails: "https://yt3.googleusercontent.com/ytc/AMLnZu9K44a6ao-Tv-6ib3oY_-1RIen0nlNE_NwlsdL3=s800-c-k-c0xffffffff-no-rj-mo",
        customUrl: "@ulbitv"
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



export const findGetChannel = async (nameChannel, nameGroup) => {
    const urlSearh = new URL('https://youtube.googleapis.com/youtube/v3/search');
    urlSearh.searchParams.set('q', nameChannel);
    urlSearh.searchParams.set('part', 'snippet');
    urlSearh.searchParams.set('type', 'channel');
    urlSearh.searchParams.set('key', API_KEY);
    urlSearh.searchParams.set('maxResults', 1);
    let response = await fetch(urlSearh);
    console.log(response);
    if(response.status === 403) {
        console.log('keys be lose')
        return;
    }
    let json = await response.json();
    let foundChannel = json.items[0];
    if (!foundChannel) return;

    const urlChannel = new URL('https://youtube.googleapis.com/youtube/v3/channels');
    urlChannel.searchParams.set('part', 'snippet');
    urlChannel.searchParams.set('id', foundChannel.id.channelId);
    urlChannel.searchParams.set('key', API_KEY);
    urlChannel.searchParams.set('maxResults', 1);
    let responseChannel = await fetch(urlChannel);
    console.log(responseChannel);
    if(responseChannel.status === 403) {
        console.log('keys be lose')
        return;
    }
    let jsonChannel = await responseChannel.json();
    let channel = jsonChannel.items[0];

     const newObject = {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnails: 'https://yt3.googleusercontent.com' + new URL(channel.snippet.thumbnails.high.url).pathname,
        customUrl: channel.snippet.customUrl,
    };

    const mainDB = indexedDB.open('main',1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readwrite');
        const channels = transaction.objectStore('store');
        const request = channels.get(nameGroup);
        request.onsuccess = () => {
           const oldValues =  request.result;
           let haveDuble = oldValues.find((item) => {
            return item.id === newObject.id;
           });
           if(haveDuble) {
            console.log(`error, double of channel "${newObject.title}"`)
            return};
           channels.put([...oldValues, newObject], nameGroup )
        }
    }
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

//block parse videos

const getString = (chuncText, start, end) => {
	const from = chuncText.indexOf(start)
	const to = chuncText.indexOf(end, from)

	return chuncText.substring(from, to).replace(start, '')
}

const parseVideo = (text, channelTitle) => {
	const title = getString(
		text,
		'"title":{"runs":[{"text":"',
		'"}],"accessibility":'
	);

	const videoId = getString(
		text,
		':{"videoId":"',
		'\",\"watchEndpointSupportedOnesieConfig'
	);

    const duration = JSON.parse(getString(
		text,
		'"lengthText":',
		',"viewCountText"'
	)).simpleText;

    const publishedAt = getString(
		text,
		'"publishedTimeText":{"simpleText":"',
		'"},"lengthText"'
	);

	const thumbnail = getString(
        text, 
        `","thumbnail":{"thumbnails":[{"url":"`, 
        '","width"');

	return { title, videoId, thumbnail, duration, publishedAt, channelTitle }
}

export const getVideos = async (channels, setVideos, filterPeriod, dateStart = new Date()) => {
    let videos = [];
    for(let channel of channels) {
        let responseVideos = await fetch(`http://localhost:8010/proxy/${channel.customUrl}/videos`);
        if (!responseVideos.ok) {
            throw new Error(`Error! status: ${responseVideos.status}`);
        }
        let pageVideos = await responseVideos.text();
        let arrayVideos = pageVideos.split('","thumbnail":{"thumbnails":[{"url":"');
        arrayVideos.forEach((item) => {
            try{
                let video = parseVideo(item, channel.title);
                videos.push(video);
            } catch(err){
                console.log(err);
            }
            
        })
        
    }
    // const sortVideos = videos?.sort((a, b) => a < b ? 1 : -1 );
    setVideos(videos) ;
    return true;
}
            