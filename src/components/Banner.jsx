import React from "react";
import "./SeriesBanner.css"

function SeriesBanner({ series }){
    const imageUrl = `https://image.tmdb.org/t/p/original${series.backdrop_path}`

    return(
        <header className="series-banner"
        style={{ backgroundImage: `url(${imageUrl})`}}>
            <div className="series-banner-content">
                <h1>{series.name}</h1>
                <p>{series.overview}</p>
            </div>
        </header>
    )
}

export default SeriesBanner;