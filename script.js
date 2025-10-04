//  PROGRAMME : Gestion d'école (POO JavaScript)

// Classes utilisées : personne, étudiant, professeur, salle


// =============================================================
//  Classe Personne
// =============================================================
class personne {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  // --- Méthodes ---
  sePresenter() {
    console.log(`Je m'appelle ${this.nom} et j'ai ${this.age} ans`);
  }
}


// =============================================================
//  Classe Étudiant (hérite de Personne)
// =============================================================
class etudiant extends personne {
  constructor(nom, age, niv) {
    super(nom, age);
    this.niv = niv;
    this.notes = []; // Tableau des notes de l’étudiant
  }

  // --- Attributs statiques ---
  static nbEtudiants = 0;

  // --- Méthodes d'instance ---
  
  // Setter : ajoute une note au tableau
  set ajoutNote(note) {
    this.notes.push(parseFloat(note));
    console.log(`Note ajoutée avec succès </br>`);
  }

  // Getter : calcule la moyenne des notes
  get moyenne() {
    let som = 0;
    for (let i = 0; i < this.notes.length; i++) {
      som += this.notes[i];
    }
    return som / this.notes.length;
  }
}


// =============================================================
//  Classe Professeur (hérite de Personne)
// =============================================================
class professeur extends personne {
  constructor(nom, age, matiere) {
    super(nom, age);
    this.matiere = matiere;
  }

  // --- Méthodes ---
  noter(etudiant, note) {
    // etudiant est un objet
    console.log(findIndexEtudiant("ok"));
    etudiant.ajoutNote = note;
    console.log(`Note : ${note} donnée à ${etudiant.nom}</br>`);
  }
}


// =============================================================
//  Classe Salle
// =============================================================
class salle {
  constructor(nom) {
    this.nom = nom;
    this.etudiants = [];
    this.prof = "Aucun"; // Par défaut
  }

  // --- Attributs statiques ---
  static nbSalle = 0;

  // --- Méthodes ---
  
  // Ajout d’un étudiant dans la salle
  ajoutEtudiant(Etudiant) {
    if (Etudiant instanceof etudiant) {
      this.etudiants.push(Etudiant);
      console.log(`${Etudiant.nom} ajouté dans la salle : ${this.nom} </br>`);
    } else {
      console.log("L'étudiant doit être un objet !");
    }
  }

  // Affectation d’un professeur à la salle
  affecterProf(prof) {
    if (prof instanceof professeur) {
      this.prof = prof;
      document.write(`Le prof : ${prof.nom} est affecté à la salle : ${this.nom}</br>`);
    }
  }

  // Affichage des informations de la salle
  afficherSalle() {
    document.write(`
      Salle : ${this.nom} </br>
      Professeur : ${this.prof.nom} </br>
      Étudiants :
    `);

    for (let i = 0; i < this.etudiants.length; i++) {
      document.write(this.etudiants[i].nom + "</br>");
    }
  }
}


// =============================================================
//  INITIALISATION DU DOM
// =============================================================

// --- Inputs Étudiant ---
let nomInput = document.getElementById("nom");
let ageInput = document.getElementById("age");
let nivInput = document.getElementById("niveau");

// --- Formulaire Étudiant ---
let formEtudiant = document.getElementById("formEtudiant");
let etudiantSub = document.querySelector(".etudiantSub");
let nbEtudiantContainer = document.getElementById("nbEtudiants");
let noterEtudiantSelect = document.getElementById("selectEtudiant");

// --- Formulaire Classe ---
let formClasse = document.getElementById("formClasse");
let nomClasseInput = document.getElementById("nomClasse");
let classCardContainer = document.querySelector(".classCardContainer");
let selectClass = document.getElementById("selectClass");
let nbSalleCont = document.getElementById("nbClasse");

// --- Formulaire Professeur ---
let formProf = document.getElementById("formProf");
let nomProfInput = document.getElementById("nomProf");
let selectProfClass = document.getElementById("selectProfClass");
let ageProf = document.getElementById("ageProf");
let matiereProf = document.getElementById("matiere");
let nbProfsCont = document.getElementById("nbProfs");

// --- Formulaire Notation Étudiant ---
let noteEtudiantForm = document.getElementById("formNote");
let noteEtudiantInput = document.getElementById("note");
let selectEtudiant = document.getElementById("selectEtudiant");


// =============================================================
// ÉVÉNEMENTS ET GESTION DU DOM
// =============================================================

// --- Ajout d’un professeur ---
let newProf;

formProf.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  // Création d’un nouvel objet professeur
  newProf = new professeur(
    nomProfInput.value,
    ageProf.value,
    matiereProf.value
  );

  // Rafraîchissement de l’affectation
  refreshProfAssign(newProf.nom, selectProfClass.value);

  formProf.reset();

  // Gestion du nombre de profs
  professeur.nbProf++;
  nbProfsCont.innerHTML = professeur.nbProf;
});


// --- Ajout d’une note à un étudiant ---
noteEtudiantForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let selectedEtudiant = selectEtudiant.value;
  let index = findIndexEtudiant(selectedEtudiant);

  etuTab[index].ajoutNote = noteEtudiantInput.value;
  refreshMoyenne(etuTab[index]);

  noteEtudiantForm.reset();
});


// --- Ajout d’une classe ---
let newClasse = new salle("Default");

formClasse.addEventListener("submit", function (e) {
  e.preventDefault();

  addClasse(newClasse);
  console.log(`Classe ${nomClasseInput.value} ajoutée`);

  formClasse.reset();

  salle.nbSalle++;
  nbSalleCont.innerHTML = salle.nbSalle;
});

  
// =============================================================
//  GESTION DES ÉTUDIANTS & CLASSES
// =============================================================

// --- Variables globales ---
let etu;               // Objet étudiant courant
let etuTab = [];       // Tableau global contenant tous les étudiants


// =============================================================
// AJOUT D'ÉTUDIANT (Événement Formulaire)
// =============================================================
formEtudiant.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche l’actualisation automatique de la page

  // Création d’un nouvel objet étudiant avec les valeurs du formulaire
  etu = new etudiant(nomInput.value, ageInput.value, nivInput.value);

  // Ajoute l'étudiant dans le tableau global
  etuTab.push(etu);

  // Appel de la fonction d’ajout dans le DOM
  addEtudiant(etu);

  // Réinitialisation du formulaire
  formEtudiant.reset();

  // Incrémentation et affichage du nombre total d’étudiants
  etudiant.nbEtudiants++;
  nbEtudiantContainer.innerHTML = etudiant.nbEtudiants;
});


// =============================================================
//  FONCTION addEtudiant()
// Ajoute dynamiquement un étudiant dans la classe et dans le DOM
// =============================================================
function addEtudiant(etu) {
  // Présentation dans la console
  etu.sePresenter();

  // Récupère le nom de la classe sélectionnée
  let nomClasse = selectClass.value;

  // Ajoute l'étudiant à la classe correspondante (objet "salle")
  newClasse.ajoutEtudiant(etu);

  // --- Affichage dans la liste (UL) ---
  let newLi = `<li>${etu.nom}</li>`;
  let liContainer = document.getElementById(`${nomClasse}Li`);
  liContainer.insertAdjacentHTML("beforeend", newLi);

  // --- Ajout dans le tableau HTML (TR) ---
  let newtr = `
    <tr class="text-muted" id="${etu.nom}tr">
      <td>${etu.nom}</td>
      <td>${etu.age}</td>
      <td>${etu.niv}</td>
      <td>${etu.moyenne}</td>
    </tr>
  `;
  let tableEtudiants = document.getElementById(nomClasse);
  tableEtudiants.insertAdjacentHTML("beforeend", newtr);

  // --- Ajout de l'étudiant dans la liste déroulante pour notation ---
  let newOption = `<option value="${etu.nom}">${etu.nom}</option>`;
  selectEtudiant.insertAdjacentHTML("beforeend", newOption);
}


// =============================================================
//  FONCTION addClasse()
// Crée dynamiquement une carte de classe dans le DOM
// =============================================================
function addClasse(nomClasse) {
  // Affecte le nom à la classe (objet "salle")
  if(nomClasseInput.value==""){
    nomClasseInput.value = "IGGLIA1";
  }
  nomClasse.nom = nomClasseInput.value;

  // Structure de la carte HTML de la salle
  let newClasseCard = `
    <div class="card card-ui p-4 mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h3 class="h6 mb-1">🏫 Salle ${nomClasse.nom}</h3>
          <p class="text-muted small mb-0">
            Informations affichées en direct après chaque action.
          </p>
        </div>
        <div class="text-end">
          <small class="text-muted">Prof assigné</small>
          <div id="${nomClasse.nom}Prof" class="fw-bold">Aucun</div>
        </div>
      </div>

      <hr>

      <div class="salle-panel mb-3">
        <h4 class="h6 mb-2">Liste des étudiants</h4>
        <!-- UL à remplir dynamiquement -->
        <ul id="${nomClasse.nom}Li" class="list-unstyled mb-0 small text-muted"></ul>
      </div>

      <!-- Tableau dynamique des étudiants -->
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Âge</th>
              <th>Niveau</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody id="${nomClasse.nom}">
            <!-- Étudiants insérés ici -->
          </tbody>
        </table>
      </div>

      <div class="mt-3 d-flex gap-2 flex-wrap">
        <div class="me-auto">
          <small class="text-muted">Statistiques globales</small>
        </div>
        <div>
          <span class="stat-badge" id="statEtudiants">0</span>
          <span class="stat-badge" id="statProfs">0</span>
        </div>
      </div>
    </div>
  `;

  // --- Ajout des options dans les selects ---
  let newOption = `<option value="${nomClasse.nom}">${nomClasse.nom}</option>`;
  selectClass.insertAdjacentHTML("beforeend", newOption);
  selectProfClass.insertAdjacentHTML("beforeend", newOption);

  // --- Insertion de la carte dans le conteneur principal ---
  classCardContainer.insertAdjacentHTML("beforeend", newClasseCard);
}


// =============================================================
//  FONCTION findIndexEtudiant()
// Recherche un étudiant dans le tableau global via son nom
// =============================================================
function findIndexEtudiant(findNom) {
  for (let i = 0; i < etuTab.length; i++) {
    if (findNom === etuTab[i].nom) {
      return i;
    }
  }
}


// =============================================================
//  FONCTION refreshMoyenne()
// Met à jour dynamiquement la moyenne d’un étudiant dans le tableau
// =============================================================
function refreshMoyenne(etudiant) {
  // Récupère directement la ligne du tableau correspondant à l'étudiant
  const row = document.getElementById(`${etudiant.nom}tr`);

  // Vérifie si la ligne existe
  if (!row) {
    console.warn(`Ligne non trouvée pour ${etudiant.nom}`);
    return;
  }

  // Met à jour la cellule "Moyenne" (4e cellule du <tr>)
  row.cells[3].innerText = etudiant.moyenne.toFixed(2);

  // Petit effet visuel (feedback de mise à jour)
  row.cells[3].classList.add("updated");
  setTimeout(() => row.cells[3].classList.remove("updated"), 600);
}


// =========================================
// FONCTION refreshProfAssign()
// Met à jour le nom du professeur assigné à une classe
// =================================
function refreshProfAssign(nomProf, nomClasse) {
  let container = document.getElementById(`${nomClasse}Prof`);
  container.innerHTML = nomProf;
}




window.addEventListener("DOMContentLoaded", () => {
  console.log("🧱 Initialisation des données par défaut...");

  // --- 1️⃣ Création d’une salle par défaut ---
  const salleDemo = new salle("Demo");
  addClasse(salleDemo); // Ajout de la salle dans le DOM
  salle.nbSalle++;
  nbSalleCont.innerHTML = salle.nbSalle;

  // --- 2️⃣ Création d’un professeur par défaut ---
  const profDemo = new professeur("M. Dupont", 35, "Mathématiques");
  refreshProfAssign(profDemo.nom, salleDemo.nom);
  professeur.nbProf = 1;
  nbProfsCont.innerHTML = professeur.nbProf;

  // --- 3️⃣ Création de quelques étudiants par défaut ---
  const etu1 = new etudiant("Alice", 19, "L1");
  const etu2 = new etudiant("Benoit", 21, "L1");
  const etu3 = new etudiant("Chloé", 20, "L1");

  // Ajout des étudiants dans le tableau global
  etuTab.push(etu1, etu2, etu3);

  // Ajout des étudiants **dans la salle Demo** et dans le DOM
  addEtudiantToSalle(etu1, salleDemo);
  addEtudiantToSalle(etu2, salleDemo);
  addEtudiantToSalle(etu3, salleDemo);

  // --- 4️⃣ Ajout de quelques notes ---
  etu1.ajoutNote = 12;
  etu1.ajoutNote = 14;

  etu2.ajoutNote = 9;
  etu2.ajoutNote = 10;
  etu2.ajoutNote = 13;

  etu3.ajoutNote = 16;
  etu3.ajoutNote = 17;

  // Rafraîchissement des moyennes
  refreshMoyenne(etu1);
  refreshMoyenne(etu2);
  refreshMoyenne(etu3);

  // --- 5️⃣ Mise à jour du compteur d’étudiants ---
  etudiant.nbEtudiants = etuTab.length;
  nbEtudiantContainer.innerHTML = etudiant.nbEtudiants;

  console.log("✅ Données de démonstration créées avec succès !");
});

// --- Nouvelle fonction pour ajouter un étudiant dans une salle spécifique ---
function addEtudiantToSalle(etu, salleObj) {
  etu.sePresenter();

  // Ajoute dans l'objet salle
  salleObj.ajoutEtudiant(etu);

  // Ajout dans la liste HTML (UL)
  let liContainer = document.getElementById(`${salleObj.nom}Li`);
  liContainer.insertAdjacentHTML("beforeend", `<li>${etu.nom}</li>`);

  // Ajout dans le tableau HTML
  let tableEtudiants = document.getElementById(salleObj.nom);
  let newtr = `
    <tr class="text-muted" id="${etu.nom}tr">
      <td>${etu.nom}</td>
      <td>${etu.age}</td>
      <td>${etu.niv}</td>
      <td>${etu.moyenne}</td>
    </tr>
  `;
  tableEtudiants.insertAdjacentHTML("beforeend", newtr);

  // Ajout dans le select pour noter
  selectEtudiant.insertAdjacentHTML(
    "beforeend",
    `<option value="${etu.nom}">${etu.nom}</option>`
  );
}


  /*//test 
  
  //ajouter une note aà Safidy 
  let mahefa = new professeur("mahefa", 20 , "JS");
  let safidy = new etudiant("safidy", 18 , "L1");
  let andria = new etudiant("andria", 17 , "L1");

  
  mahefa.noter(safidy, 20);
  mahefa.noter(safidy, 15);
  document.write(`moyenne :${safidy.moyenne} </br>`);
  
  //salle
  let iggl = new salle("Iggl");
  iggl.ajoutEtudiant(andria);
  iggl.ajoutEtudiant(safidy);
  iggl.affecterProf(mahefa);
  iggl.afficherSalle();*/
  
