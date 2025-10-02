import { useState, useEffect } from "react";
import { getMyList, removeFromMyList } from "../services/myList";
import { useNavigate } from "react-router-dom";
import "./MySeriesList.css"

function MySeriesList(){
    const [myList, setMyList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setMyList(getMyList())
    }, [])

    function handleRemove(seriesld){
        removeFromMyList(seriesld);
        setMyList((prevList) => prevList.filter((s) => s.id !== seriesld))
    }

    return(
        <div className="My-list-container">
            <h1>Minha Lista</h1>
            {myList.length === 0 ? (
                <p>Sua lista está vazia</p>
            ) : (
                <div className="my-list-grid">
                    {myList.map((series) => (
                        <div key={series.id} className="my-list-card">
                            <img 
                            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} 
                            alt={series.name} />
                            <h3>{series.name}</h3>
                            <button onClick={() => navigate(`/series/${series.id}`)}>Informações</button>
                            <button onClick={() => handleRemove(series.id)}>Remover</button>
                        </div>
                    ))}
                </div>
            )}

            <button className="back-button-list" onClick={() => navigate("/")}>Voltar ao inicio</button>
        </div>
    )
}

export default MySeriesList