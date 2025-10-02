const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getGenres() {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=pt-BR`)
    const data = await response.json();
    return data.genres;
}

export async function getSeriesByGenre(genreld) {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreld}&language=pt-BR`)
    const data = await response.json()
    return data.results;
}

export async function getWatchProviders(seriesld) {
    try{
        const response = await fetch(`${BASE_URL}/tv/${seriesld}/watch/providers?api_key=${API_KEY}&language=pt-BR`)
        const data = await response.json();
        return data.results?.BR?.flatrate || [];
    }catch(error){
        console.error("Erro ao buscar provedores", error);
        return [];
    }
}

export const getPopularSeries = async () => {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`)
    return res.json();
}

export const getTopRatedSeries = async () => {
    const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR`)
    return res.json();
}

export const getOnTheAirSeries = async () => {
    const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=pt-BR`)
    return res.json();
}

export const searchSeries = async (query) => {
    const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=pt-BR&query=${query}`)
    return res.json();
}

export const getSeriesDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=pt-BR`)
    return res.json();
}

export async function getSeriesVideos(id) {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=pt-BR`
    );
    return await response.json();
}