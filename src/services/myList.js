export function getMyList(){
    const savedList = localStorage.getItem("mySeriesList");
    return savedList ? JSON.parse(savedList) : [];
}

export function addToMyList(series){
    const list = getMyList()
    const alreadyExists = list.some((s) => s.id === series.id);
    if(!alreadyExists){
    list.push(series);
    localStorage.setItem("mySeriesList", JSON.stringify(list))
    }
}

export function removeFromMyList(seriesld){
    const list = getMyList();
    const updatedList = list.filter((s) => s.id !== seriesld);
    localStorage.setItem("mySeriesList", JSON.stringify(updatedList));
}

export function islnMyList(seriesld){
    const list = getMyList();
    return list.some((s) => s.id === seriesld)
}