import { parseVideo } from "./parseVideos";
import { defaultChannels } from "./defoultData";
import { API_KEY } from "./privatData";

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
    // console.log(response);
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
    // console.log(responseChannel);
    if(responseChannel.status === 403) {
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

export const getVideos = async (channels, setVideos, ) => {
    let videos = [];
    for(let channel of channels) {
        let responseVideos;
        // if(window.navigation.currentEntry.url.includes('http://localhost:300')) {
        //     responseVideos = await fetch(`http://localhost:8010/proxy/${channel.customUrl}/videos`);
        // } else {
        //     responseVideos = await fetch(`https://www.youtube.com/${channel.customUrl}/videos`, {
        //         headers: {
        //             "Access-Control-Allow-Origin": "no-cors"
        //         },
        //     });
        // }

        responseVideos = await fetch(`https://www.youtube.com/${channel.customUrl}/videos`, {
            mode: "no-cors",
        });
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
                // console.log(err);
            }
        })
        
    }
    const sortVideos = videos?.sort((a, b) => a.timeIndex > b.timeIndex ? 1 : -1 );
    setVideos(sortVideos) ;
    return true;
}
            