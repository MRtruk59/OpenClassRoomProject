export function AjoutListenerAvis () {
    const pieceElement = document.querySelector(".fiches article button");
    for(let i = 0; i < pieceElement.length; i++){
        pieceElement[i].addEventListener("click", async function(event){
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();
            const Element = event.target.parentElement;
            const avisElement = document.createElement("p");
            
            for(let i = 0; avis.length; i++){
                avisElement.innerHTML += `<b>${avis[i].utilisateur}</b> ${avis[i].commentaire}`;
            }
           Element.appendChild(avisElement);

        })
    }
}