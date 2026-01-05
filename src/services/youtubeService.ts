import axios from "axios";
import { Video } from "../types/advisory";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const fetchFarmingVideos = async (): Promise<Video[]> => {
    if (!YOUTUBE_API_KEY) {
        console.error("YouTube API Key is missing!");
        return [];
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                part: "snippet",
                q: "Indian farming techniques organic government schemes",
                type: "video",
                maxResults: 6,
                regionCode: "IN",
                key: YOUTUBE_API_KEY,
            },
        });

        return response.data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
        }));
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};
