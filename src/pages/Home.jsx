import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularSeries, getTopRatedSeries, getOnTheAirSeries, searchSeries, getGenres, getSeriesByGenre } from "../services/tmdb";
import SeriesRow from "../components/SeriesRow"
import Banner from "../components/Banner"
import SeriesBanner from "../components/Banner";

function Home() {
    const [search, setSearch] = useState("")
    const [bannerSeries, setBannerSeries] = useState(null)
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelecttedGenre] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBanner() {
            const data = await getPopularSeries()
            if(data.results.length > 0){
                const random = data.results[Math.floor(Math.random() * data.results.length)]
            setBannerSeries(random)
            }
        }

        async function fetchGenres() {
            const genresData = await getGenres();
            setGenres(genresData)
        }

        fetchGenres();
        fetchBanner();
    }, [])

    const hadleSearch = async(e) => {
        e.preventDefault();
        if(!search)return;
        const data = await searchSeries(search);
        navigate("/search-results", { state: { results: data.results || [] }})
    }

    const handleGenreChange = async (e) => {
        const genreld = e.target.value;
        setSelecttedGenre(genreld)

        if(genreld){
            const data = await getSeriesByGenre(genreld);
            navigate("/search-results", { state: { results: data || [] }})
        }
    }

    return(
        <div className="home">
            {bannerSeries && <SeriesBanner series={bannerSeries}/>}
            <div className="genre-filter">
            <select 
            value={selectedGenre}
            onChange={handleGenreChange}>
                <option value="">Filtara por genero</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>
            </div>
            <form onSubmit={hadleSearch}>
                <input 
                type="text"
                placeholder="Buscar séies..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
                <>
                <SeriesRow title="Populares" fetchData={getPopularSeries}/>
                <SeriesRow title="Mais bem avaliadas" fetchData={getTopRatedSeries}/>
                <SeriesRow title="Em exibição" fetchData={getOnTheAirSeries}/>
                </>
            </div>
    )
}

export default Home;