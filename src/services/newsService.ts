import axios from "axios";
import { NewsArticle } from "../types/advisory";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

export const fetchFarmingNews = async (): Promise<NewsArticle[]> => {
    if (!NEWS_API_KEY) {
        console.error("News API Key is missing!");
        return [];
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: "agriculture India OR farming India OR crop prices India OR kisan scheme",
                sortBy: "publishedAt",
                language: "en", // Simplified for now, can be 'hi' if available but NewsAPI is limited for Hindi in free tier
                apiKey: NEWS_API_KEY,
                pageSize: 10,
            },
        });

        if (response.data.status === "ok") {
            return response.data.articles.filter((article: any) =>
                article.title && article.urlToImage // Basic filtering
            ).map((article: any) => ({
                title: article.title,
                description: article.description || "No description available.",
                url: article.url,
                urlToImage: article.urlToImage,
                source: { name: article.source.name },
                publishedAt: article.publishedAt
            }));
        }
        return [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
