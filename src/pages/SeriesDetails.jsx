import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getWatchProviders } from "../services/tmdb";
import "./SeriesDetails.css"

function SeriesDetails(){
    const { id } = useParams();
    const navigate = useNavigate()
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inList, setlnList] = useState(false);
    const [providers, setProviders] = useState([])

    const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b"

    useEffect(() => {
        async function fetchSeries() {
            try{
                setLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`
                );
                if(!response.ok) throw new Error("Erro ao buscar a serie")
                    const data = await response.json();
                setSeries(data)

                const provs = await getWatchProviders(id)
                setProviders(provs)

                const savedList = JSON.parse(localStorage.getItem("mySeriesList")) || [];
                setlnList(savedList.some((item) => item.id === data.id))
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }

        fetchSeries()
    }, [id])

    function toggleMyList(){
        const savedList = JSON.parse(localStorage.getItem("mySeriesList")) || []

        if(inList){
            const updatedList = savedList.filter((item) => item.id !== series.id)
            localStorage.setItem("mySeriesList", JSON.stringify(updatedList))
            setlnList(false)
        }else{
            savedList.push(series)
            localStorage.setItem("mySeriesList", JSON.stringify(savedList))
            setlnList(true)
        }
    }

    if(loading) return <p>Carregando...</p>
    if(error) return <p>Erro: {error}</p>
    if(!series) return <p>Nenhuma serie encontrada</p>

    return(
        <div className="series-details">
            <div className="series-banner"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
        backgroundSize: "cover", backgroundPosition: "top center",}}
            >
                <div className="series-banner-overlay">
                    <div className="buttons-botao">
                        <button onClick={() => navigate(-1)}>Voltar</button>
                        <button onClick={() => navigate("/my-series")}>Ver minha lista</button>
                        <button onClick={toggleMyList}>{inList ? "Remover da lista" : "Adicionar á lista"}</button>
                    </div>
                    <div className="series-infosss">
                    <h1>{series.name}</h1>
                    <p className="overview"><strong>Sinopse:</strong> {series.overview || "Sem sinopse disponivel."}</p>
                    <div className="series-extra">
                    <p><strong>Data de lançamento:</strong> {series.first_air_date}</p>
                    <p><strong>Números de temporadas:</strong> {series.number_of_seasons}</p>
                    <p><strong>Números de episódios:</strong> {series.number_of_episodes}</p>
                    <p><strong>Nota:</strong> {series.vote_average}/10</p>
                    {providers.length > 0 && (
                        <div className="providers">
                            <h3>Disponivel em:</h3>
                            <div className="provider-logos">
                                {providers.map((p) => (
                                    <div className="provider-item">
                                    <img key={p.provider_id} 
                                    src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                                    alt={p.provider_name}
                                    title={p.provider_name}/>
                                    <span key={p.provider_id}>{p.provider_name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeriesDetails;