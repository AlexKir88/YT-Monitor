import { parseVideo } from "./parseVideos";
import { defaultChannels } from "./defoultData";
import { API_KEY } from "./privatData";
import { sendInTlg } from "./privatData";
import { calkTimeIndexFromDate } from "./dateFunction";

export const getChannels = async (group, setChannels, setVideos, filterPeriod, dispathIsLoading) => {
    const mainDB = indexedDB.open('main', 1);
    mainDB.onsuccess = () => {
        const transaction = mainDB.result.transaction('store','readonly');
        const groups = transaction.objectStore('store');
        const request = groups.get(group);
        request.onsuccess = () => {
            const channels = request.result;
            if(!channels) return;
            setChannels(channels);
            getVideos(channels, setVideos, dispathIsLoading); 
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
    // console.log(response);
   if (response.status == 403) {
        alert('Превышен суточный лимит запросов через API youtube.');
        sendInTlg('/403 limit API youtube /');
        return false;
    }
    let json = await response.json();
    let foundChannel = json.items[0];
    if (!foundChannel) return false;

    const urlChannel = new URL('https://youtube.googleapis.com/youtube/v3/channels');
    urlChannel.searchParams.set('part', 'snippet');
    urlChannel.searchParams.set('id', foundChannel.id.channelId);
    urlChannel.searchParams.set('key', API_KEY);
    urlChannel.searchParams.set('maxResults', 1);
    let responseChannel = await fetch(urlChannel);
    // console.log(responseChannel);
    if (responseChannel.status == 403) {
        alert('Превышен суточный лимит запросов через API youtube.');
        sendInTlg('/403 limit API youtube /');
        return false;
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
    return true;
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

export const getVideos = async (channels, setVideos, dispathIsLoading) => {
    let videos = [];
    for(let channel of channels) {
        let channelsVideos = [];

        let cashChannelVideo = sessionStorage.getItem(channel.customUrl);

        if (!cashChannelVideo) {
            channelsVideos = await requestVideosParseProxy(channel);
            if(!channelsVideos.length) {
                channelsVideos = await requestVideosAPIYoutube(channel);
            }
            sessionStorage.setItem(channel.customUrl, JSON.stringify(channelsVideos));
        } else {
            channelsVideos = JSON.parse(cashChannelVideo);
        }
        videos.push(...channelsVideos);
    }
    
    const sortVideos = videos?.sort((a, b) => a.timeIndex > b.timeIndex ? 1 : -1 );
    setVideos(sortVideos) ;
    dispathIsLoading();
    return true;
}

async function requestVideosParseProxy(channel) {
    let thisChannelsVideos = [];
    let responseVideos;
            
    // limited proxy
    const proxyAgent = 'https://cors-anywhere.herokuapp.com';
    responseVideos = await fetch(`${proxyAgent}/youtube.com/${channel.customUrl}/videos`);

    //local
    // responseVideos = await fetch(`http://localhost:8010/proxy/${channel.customUrl}/videos`);
    
    if (responseVideos.status == 403) {
        if ((localStorage.id  == 2.293)) {
            const question ='Данный сайт является демонстрационным и имеет ограничение 50 запросов в час. Перейти для продления на https://cors-anywhere.herokuapp.com/corsdemo?';
            let res = window.confirm(question);
            if(res) {
                // let pageProxy = document.createElement('a');
                // pageProxy.href = 'https://cors-anywhere.herokuapp.com/corsdemo?';
                // pageProxy.target = '_blank';
                // pageProxy.click();
                window.location.href = 'https://cors-anywhere.herokuapp.com/corsdemo?';
            }
        }
        sendInTlg('/429 hourly proxy limit reached/');
        return thisChannelsVideos;
    }
    
    if (!responseVideos.ok) {
        
        throw new Error(`Error! status: ${responseVideos.status}`);
    }
    let pageVideos = await responseVideos.text();

    let arrayVideos = pageVideos.split('","thumbnail":{"thumbnails":[{"url":"');
    arrayVideos.forEach((item) => {
        try{
            let video = parseVideo(item, channel.title);
            thisChannelsVideos.push(video);
        } catch(err){
            // console.log(err);
        }
    })
    return thisChannelsVideos;
}

async function requestVideosAPIYoutube(item, pageToken) {
    let channelsVideosYT = [];
    const currentDate = new Date(new Date().setHours(0,0,0,0));
    const publishedAfter = new Date(currentDate.setMonth(currentDate.getMonth() - 3)).toISOString();
        const urlVideos = new URL(' https://youtube.googleapis.com/youtube/v3/search');
        urlVideos.searchParams.set('part', 'snippet'); 
        urlVideos.searchParams.set('channelId',item.id);
        urlVideos.searchParams.set('eventType','none');
        urlVideos.searchParams.set('maxResults',50);
        urlVideos.searchParams.set('type','video');
        urlVideos.searchParams.set('key', API_KEY );
        urlVideos.searchParams.set('publishedAfter', publishedAfter);
        pageToken && urlVideos.searchParams.set('pageToken', pageToken);
        let responseVideos = await fetch(urlVideos);
        if (responseVideos.status == 403) {
            alert('Превышен лимит запросов через API youtube.');
            sendInTlg('/403 limit API youtube /');
            return channelsVideosYT;
        }
        let jsonVideos = await responseVideos.json();
        jsonVideos?.items?.forEach(element => {
            channelsVideosYT.push({
                videoId: element.id.videoId,
                thumbnail: element.snippet.thumbnails.high.url,
                publishedAt: new Date(element.snippet.publishedAt).toLocaleDateString('ru'),
                channelTitle: element.snippet.channelTitle,
                title: element.snippet.title,
                timeIndex: calkTimeIndexFromDate(element.snippet.publishedAt),
            })
        });
        // let nextPageToken = jsonVideos.nextPageToken;
        // if (nextPageToken) {
        //     let nextPageVideos = await requestVideosAPIYoutube(item, nextPageToken);
        //     channelsVideosYT.push(...nextPageVideos);
        // }
        // console.log(responseVideos);
                 
    return channelsVideosYT;
}

