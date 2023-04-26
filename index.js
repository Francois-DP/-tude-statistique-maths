function skipMainPage(){
    const element = document.getElementById("sommaire");
    element.scrollIntoView({behavior: "smooth"});
}

document.getElementById("scroll").addEventListener("click", ()=>{skipMainPage()})