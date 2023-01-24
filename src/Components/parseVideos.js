import { calkTimeIndex } from "./dateFunction";

const getString = (chuncText, start, end) => {
	const from = chuncText.indexOf(start)
	const to = chuncText.indexOf(end, from)
	return chuncText.substring(from, to).replace(start, '')
}

export const parseVideo = (text, channelTitle) => {
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

    const timeIndex = calkTimeIndex(publishedAt);

	return { title, videoId, thumbnail, duration, publishedAt, channelTitle, timeIndex }
}