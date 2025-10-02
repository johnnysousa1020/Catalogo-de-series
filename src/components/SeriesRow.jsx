import React, { useEffect, useState, useRef } from "react";
import SeriesCard from "./SeriesCard"
import "./SeriesRow.css"

function SeriesRow({ title, fetchData, series }){
    const [items, setltems] = useState([])
    const rowRef = useRef(null)

    useEffect(() => {
        if(fetchData){
            fetchData().then((data) => setltems(data.results || []))
        }
    }, [fetchData])

    const scrollLeft = () => {
        rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        rowRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }

    return(
        <div className="series-row">
            <h2 className="series-title">{title}</h2>
            <div className="series-container">
                <button className="scroll-btn left" onClick={scrollLeft}>←</button>
                <div className="series-scroll" ref={rowRef}>
                {(series || items).map((s) => (
                    <SeriesCard key={s.id} series={s}/>
                ))}
                </div>
                <button className="scroll-btn right" onClick={scrollRight}>→</button>
            </div>
        </div>
    )
}

export default SeriesRow;