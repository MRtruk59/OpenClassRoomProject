import { AjoutListenerAvis } from "./avis.json";

const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
const pieces = await reponse.json();

function genererPieces(pieces){
    for(let i = 0; i < pieces.length; i++){
        const article = pieces[i];
        const sectionFiches = document.querySelector(".fiches");
        const piecesElements = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € ${article.prix < 35 ? "€" : "€€€"}`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(Aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de déscription pour le moment";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock":"En rupture de stock";
        const boutonAvis = document.createElement("button");
        boutonAvis.dataset.id = article.id;
        boutonAvis.textContent = "Afficher Avis";

        sectionFiches.appendChild(piecesElements);
        piecesElements.appendChild(imageElement);
        piecesElements.appendChild(nomElement);
        piecesElements.appendChild(prixElement);
        piecesElements.appendChild(categorieElement);
        piecesElements.appendChild(descriptionElement);
        piecesElements.appendChild(stockElement);
        piecesElements.appendChild(boutonAvis);
    }
    ajoutListenersAvis();
}
genererPieces(pieces);

//Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click",function(){
    const piecesTriees = Array.from(pieces);
    piecesTriees.sort(function(a,b){
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesTriees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees)
})

const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click",function(){
    const piecesTriees = Array.from(pieces);
    piecesTriees.sort(function(a,b){
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesTriees);
})

const boutonNoDesc = document.querySelector(".btn-nodesc");
boutonNoDesc.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].prix >= 35){
        noms.splice(i,1);
    }
}

const pElement = document.createElement("p");
pElement.innerText = "Pièces abordables :";

const abordablesElements = document.createElement("ul");

for(let i = 0; i < noms.length; i++){
    const abordableElement = document.createElement("li");
    abordableElement.innerText = noms[i];
    abordablesElements.appendChild(abordableElement);
}
document.querySelector(".abordables").appendChild(pElement).appendChild(abordablesElements);

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

const pElementDisponible = document.createElement("p");
pElementDisponible.innerText = "Pièces Disponibles :";

const disponiblesElements = document.createElement("ul");

for(let i = 0; i < nomsDisponibles.length; i++){
    const disponibleElement = document.createElement("li");
    disponibleElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElements.appendChild(disponibleElement);
}
document.querySelector(".disponibles").appendChild(pElementDisponible).appendChild(disponiblesElements);

const inputMax = document.querySelector("#prix-max");
inputMax.addEventListener("input",function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputMax.value;
    });
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesFiltrees);
});
