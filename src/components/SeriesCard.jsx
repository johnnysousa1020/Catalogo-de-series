import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getSeriesVideos } from "../services/tmdb";
import TrailerModal from "./TrailerModal";
import { addToMyList, removeFromMyList, islnMyList } from "../services/myList";
import "./SeriesCard.css"


function SeriesCard({ series }) {
    const navigate = useNavigate();
    const [trailerKey, setTrailerKey] = useState(null)
    const [inList, setlnList] = useState(false);

    const IMG_URL = "https://image.tmdb.org/t/p/w500"

    useEffect(() => {
        setlnList(islnMyList(series.id))
    }, [series.id]);
    
    async function handleTrailer() {
        const data = await getSeriesVideos(series.id);
        const trailer = data.results.find((video) => video.type === "Trailer");
        if(trailer){
            setTrailerKey(trailer.key)
        }else{
            alert("Trailer não encontrado.");
        }
    }

    function handleMyList(){
        if(inList){
            removeFromMyList(series.id)
            setlnList(false)
        }else{
            addToMyList(series)
            setlnList(true)
        }
    }

    return(
        <div className="series-card">
             <img src={`${IMG_URL}${series.poster_path}`} 
             alt={series.name} />
             <p className="series-titles">{series.name}</p>
            <div className="series-buttons">
                <button className="btn-trailer" onClick={handleTrailer}>Trailer</button>
                <button className="btn-info" onClick={() => navigate(`/series/${series.id}`)}>Info</button>
            </div>
                <div className="botao-lista">
                <button className="btn-add" onClick={handleMyList}>{inList ? "Remover da lista" : "Minha lista"}</button>
                </div>

                <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)}/>
        </div>
    )
}

export default SeriesCard;