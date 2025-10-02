import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SeriesCard from "./SeriesCard";
import "./SearchResults.css"

function SearchResults(){
    const location = useLocation();
    const navigate = useNavigate();

    const results = location.state?.results || [];

    return(
        <div className="search-resultsa">
            <h1>Resultados da Busca</h1>
            {results.length > 0 ? (
                <div className="results-grid-card">
                    {results.map((series) => (
                        <SeriesCard key={series.id} series={series}/>
                    ))}
                </div>
            ) : (
                <p>Nenhuma resultada encontrado.</p>
            )}

            <button className="back-button-inicio" onClick={() => navigate("/")}>Voltar ao inicio</button>
        </div>
    )
}

export default SearchResults