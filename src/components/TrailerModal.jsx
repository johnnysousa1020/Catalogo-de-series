import React from "react";
import "./TrailerModal.css"

function TrailerModal({ trailerKey, onClose }){
    if(!trailerKey)return null;

    return(
        <div className="modal-overlay-trailer" onClick={onClose}>
            <div className="modal-content-trailer" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn-trailer" onClick={onClose}>X</button>
                <iframe 
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}`} 
                title="Trailer"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default TrailerModal;