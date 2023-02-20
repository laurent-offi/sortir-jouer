// Déclaration du tableau d'objets représentant les jeux de société
const jeux = [
    { nom: 'Attrape Rêves', image: './assets/medias/attrape_reves.png', mécanisme: 'Stratégie', langue: 'Français', âge: '4+', durée: '15mn', joueur: '2-4' },
    { nom: 'Colt Express', image: './assets/medias/colt_express.png', mécanisme: 'Stratégie', langue: 'Français', âge: '10+', durée: '40mn', joueur: '2-6' },
    { nom: 'Oriflamme', image: './assets/medias/oriflamme.png', mécanisme: 'Stratégie', langue: 'Français', âge: '10+', durée: '20mn', joueur: '3-5' },
    { nom: 'Skull', image: './assets/medias/skull.png', mécanisme: 'Stratégie', langue: 'Français', âge: '10+', durée: '30mn', joueur: '3-6' },
    { nom: 'The Crew', image: './assets/medias/the_crew.png', mécanisme: 'Coopératif', langue: 'Français', âge: '10+', durée: '20mn', joueur: '3-5' }
];

// Définition de la fonction qui crée le tableau HTML des jeux de société
function creerTableau(jeux) {
    const table = document.getElementById('tableau_jeux');
    table.innerHTML = '';

    for (let i = 0; i < jeux.length; i++) {
        const ligne = `
            <tr>
                <td><input class="Checkbox" type="checkbox"></td>
                <td class="Nom">${jeux[i].nom}</td>
                <td class="Image"><img src="${jeux[i].image}" height="100"></td>
                <td class="Mécanisme">${jeux[i].mécanisme}</td>
                <td class="Langue">${jeux[i].langue}</td>
                <td class="Âge">${jeux[i].âge}</td>
                <td class="Durée">${jeux[i].durée}</td>
                <td class="Joueur">${jeux[i].joueur}</td>
                <td class="Action">${jeux[i].action}</td>
            </tr>
        `;

        table.innerHTML += ligne;
    }
}

creerTableau(jeux);

// Cette fonction récupère les éléments cochés dans le tableau et les ajoute à un autre tableau pour affichage
function tableau_selection() {
    const checkboxList = document.getElementsByClassName("Checkbox");
    const nameList = document.getElementsByClassName("Nom");
    const imageList = document.getElementsByClassName("Image");
    const mechanismList = document.getElementsByClassName("Mécanisme");
    const languageList = document.getElementsByClassName("Langue");
    const ageList = document.getElementsByClassName("Âge");
    const durationList = document.getElementsByClassName("Durée");
    const playerList = document.getElementsByClassName("Joueur");

    let i = 0;
    let s = "";

    while (i < checkboxList.length) {
        if (checkboxList[i].checked == true) {
            s +=
                "<tr>" +
                "<td>" +
                checkboxList[i].innerHTML +
                "</td>" +
                "<td>" +
                nameList[i].innerHTML +
                "</td>" +
                "<td>" +
                imageList[i].innerHTML +
                "</td>" +
                "<td>" +
                mechanismList[i].innerHTML +
                "</td>" +
                "<td>" +
                languageList[i].innerHTML +
                "</td>" +
                "<td>" +
                ageList[i].innerHTML +
                "</td>" +
                "<td>" +
                durationList[i].innerHTML +
                "</td>" +
                "<td>" +
                playerList[i].innerHTML +
                "</td>" +
                "</tr>";
        }
        i = i + 1;
    }

    document.getElementById("tableau_resultat").innerHTML = s;
}

// Cette fonction efface le contenu du tableau de résultats
function tableau_deselection() {
    document.getElementById("tableau_resultat").innerHTML = "";
}

const API_URL = "https://172.16.14.139:5001/api/TodoItems";

// Cette fonction utilise fetch pour récupérer les éléments de l'API et les afficher dans un tableau
function getItems() {
    fetch(API_URL, { method: "GET", mode: "cors" })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => _creationtableau(data))
        .catch((error) => console.error("Unable to get items.", error));
}

// Cette fonction crée un tableau HTML avec des données fournies en paramètre
function _creationtableau(data) {
    const table = document.getElementById("tableau_jeux");
    table.innerHTML = "";
    data.forEach((jeux) => {
        const ligne = `<tr>
          <td><input class="Checkbox" type="checkbox"></td>
          <td class="Nom">${jeux.nom_jeux_plateaux}</td>
          <td class="Image"><img src="${jeux.image_jeux_plateaux}" height="100"></td>
          <td class="Mécanisme">${jeux.mecanisme_jeux_plateaux}</td>
          <td class="Langue">${jeux.langue_jeux_plateaux}</td>
          <td class="Âge">${jeux.age_jeux_plateaux}</td>
          <td class="Durée">${jeux.duree_jeux_plateaux}</td>
          <td class="Joueur">${jeux.nb_joueur_plateaux}</td>
          <td class="Action">${jeux.action_jeux_plateaux}</td>
        </tr>`;
        table.innerHTML += ligne;
    });
}

getItems();