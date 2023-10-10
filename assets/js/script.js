//----------Au chargement de la page 
// --> On masque les éléments qui ne doivent pas être visibles : le 2ème écran et le btn "Rejouer"
document.getElementById('container-game').style.display = 'none';
document.getElementById('play-new-game').style.display = 'none';

// --> On déclare et initialise les différentes variables qui seront utiles au jeu 
// -> un tableau contenant la liste +/- exhaustive des mots qui pourront être trouvés pour le jeu
let wordsList = ['bonjour', 'chat', 'poule'];
// -> le compteur de partie et de victoires de l'utilisateur (les défaites de l'utilisateur et victoires/défaites de l'ordinateur pourront être déduites à partir de ces 2 variables)
let gamesCount = 0;
let userVictoriesCount = 0;
// -> un compteur d'essai
let tryCount = 0;
// -> un tableau vide qui contiendra les lettres proposées par l'utilisateur
let lettersTry = [];

// --> On déclare la variable "wordToFind". On lui affectera une valeur quand une partie sera initiée.
let wordToFind;

// -> On affiche le nombre de victoires/défaites de l'utilisateur et de l'ordinateur dans les éléments html dédiés
document.getElementById('userVictoriesCountShown').innerHTML = userVictoriesCount;
//le nombre de défaites de l'utilisateur équivaut à la différence entre le nombre de parties jouées et le nombre de victoires de l'utilisateur
document.getElementById('userDefeatsCountShown').innerHTML = gamesCount - userVictoriesCount;
//le nombre de victoires de l'ordinateur correspond au nombre de défaites de l'utilisateur (on utilise donc le même calcul)
document.getElementById('computerVictoriesCountShown').innerHTML = gamesCount - userVictoriesCount;
//le nombre de défaites de l'ordinateur correspond au nombre de victoires de l'utilisateur
document.getElementById('computerDefeatsCountShown').innerHTML = userVictoriesCount;


//----------Au clic sur le btn "Jouer" du 1er écran on appelle la fonction "startGameFunction"
document.getElementById('startGame').addEventListener('click', startGameFunction);

// --> On déclare la fonction "startGameFunction" qui initialise la 1ère partie (masque le 1er écran, affiche le 2e écran et définit le mot à trouver)
function startGameFunction() {
    // -> On masque le 1er écran et on affiche le 2e écran
    document.getElementById('container-start').style.display = 'none';
    document.getElementById('container-game').style.display = 'flex';

    // -> On appelle la fonction "findWordFunction" pour définir le mot à trouver
    findWordFunction();
}


//----------Au clic sur le btn "Proposer cette lettre" on appelle la fonction "checkLetterFunction"
letterGuessBtn.addEventListener('click', checkLetterFunction);

// --> On déclare la fonction "checkLetterFunction" qui récupère la valeur saisie par l'utilisateur et vérifie qu'elle correspond bien à une lettre et que cette lettre est présente ou non dans le mot à trouver (si oui on affiche la lettre si non on incrémente le pendu)
function checkLetterFunction() {
    // -> On vide le message d'erreur
    document.getElementById('errorMessage').innerHTML = '';
    
    // -> On déclare une variable "userLetter" qui stocke la valeur saisie par l'utilisateur
    let userLetter = document.getElementById('letterGuess').value;

    // -> On vérifie que la valeur saisie par l'utilisateur est correcte (1 lettre)
    //si "userLetter" est un nombre (n'est pas (!) pas un nombre(isNaN)) ou si la longueur de "userLetter" n'est pas égal à 1 alors...
    if (!isNaN(userLetter) || userLetter.length != 1) {
        //on affiche un message d'erreur et on réinitialise le champ de saisie (on définit une valeur vide dans l'input)
        document.getElementById('errorMessage').innerHTML = 'Veuillez entrer une lettre';
        document.getElementById('letterGuess').value = '';
    //sinon... (dans le cas où il n'y a pas d'erreur)
    } else {
        //on ajoute la lettre de l'utilisateur au tableau "lettersTry" et on affiche cette lettre dans l'élément html prévu pour que l'utilisateur puisse voir ses tentatives
        lettersTry.push(userLetter);
        document.getElementById('lettersTry').innerHTML = document.getElementById('lettersTry').innerHTML + userLetter + ' - ';

        //on réinitialise le champ de saisie (on définit une valeur vide dans l'input)
        document.getElementById('letterGuess').value = '';

        //on déclare et initialise les variables qui seront utiles pour la suite :
        // - letterFound -> variable booléenne, fausse quand la lettre n'est pas trouvée et vraie quand la lettre est trouvée)
        // - wordWrite -> variable qui contiendra le mot construit au fur et à mesure par l'utilisateur
        // - idLetter -> variable qui contiendra le nom de l'id des lettres 
        let letterFound = false;
        let wordWrite = '';
        let idLetter;

        // -> On boucle sur le mot pour comparer la lettre de l'utilisateur avec chaque lettre du mot à trouver une par une
        //pour un nombre "a" allant de 0 à la longueur du mot à trouver avec un pas de 1...
        for (a = 0; a < wordToFind.length; a++) {
            //on attribut la valeur de l'id à "idLetter" 
            idLetter = 'letter' + (a + 1);
            //si la lettre de l'utilisateur est la même que la lettre "a" du mot à trouver (au 1er tour on compare la 1ère lettre du mot, au 2ème tour on compare la 2ème lettre du mot, etc.) alors...
            if (userLetter == wordToFind[a]) {
                //on affiche la lettre dans l'élément html dont l'id est "idLetter" et on définit que la lettre a été trouvé 
                document.getElementById(idLetter).innerHTML = wordToFind[a];
                letterFound = true;
            }
            //on attribue la valeur de "wordWrite" + la valeur de chaque élément html "lettre" pour construire le mot de l'utilisateur
            wordWrite = wordWrite + document.getElementById(idLetter).innerHTML;
            console.log(wordWrite);
        }
        
        // -> Si la lettre n'est pas trouvée alors on incrémente le compteur d'erreur
        if (!letterFound) {
            tryCount++;
            //si le compteur d'erreur est bien compris entre 0 et 10 (10 erreurs étant le max pour afficher le pendu complet) alors on affiche l'image du pendu correspondant au nombre d'erreurs de l'utilisateur
            if (tryCount > 0 && tryCount <= 10) {
                document.getElementById('hanged').src = 'assets/img/pendu' + tryCount + '.svg';
            }

            //Si le compteur d'erreur atteint 10 alors la partie est perdue
            if (tryCount == 10) {
                //on affiche les défaites de l'utilisateur et victoires de l'ordinateur
                document.getElementById('userDefeatsCountShown').innerHTML = gamesCount - userVictoriesCount;
                document.getElementById('computerVictoriesCountShown').innerHTML = gamesCount - userVictoriesCount;
                //on affiche le résultat "Perdu", on masque le pendu et on affiche le bouton rejouer
                document.getElementById('announcement-result-game').innerHTML = 'Perdu !';
                document.getElementById('hanged').style.display = 'none';
                document.getElementById('play-new-game').style.display = 'block';
                //on supprime la class hanged-position pour permettre au contenu d'être centré (cf. css)
                document.getElementById('hanged-space').classList.remove('hanged-position');
            }
        }

        // -> Si le mot reconstruit par l'utilisateur correspond au mot à trouver alors...
        if (wordWrite == wordToFind) {
            //on incrémente le nombre de victoires de l'utilisateur
            userVictoriesCount++;
            //on affiche les victoires de l'utilisateur et défaites de l'ordinateur
            document.getElementById('userVictoriesCountShown').innerHTML = userVictoriesCount;
            document.getElementById('computerDefeatsCountShown').innerHTML = userVictoriesCount;
            //on affiche le résultat "Gagné", on masque le pendu et on affiche le bouton rejouer
            document.getElementById('announcement-result-game').innerHTML = 'Gagné !!';
            document.getElementById('hanged').style.display = 'none';
            document.getElementById('play-new-game').style.display = 'block';
            //on supprime la class hanged-position pour permettre au contenu d'être centré (cf. css)
            document.getElementById('hanged-space').classList.remove('hanged-position');
        }
    }
}


//----------Au clic sur le btn "Rejouer" on appelle la fonction "resetGameFunction" 
document.getElementById('play-new-game').addEventListener('click', resetGameFunction);


//----------Fonctions qui seront appelées à divers moments
// -> On déclare la fonction "findWordFunction" qui définit le mot à trouver 
function findWordFunction(){
    // -> On incrémente le compteur de partie
    gamesCount++;

    // -> On affecte à "wordToFind" un mot choisit aléatoirement dans le tableau de mots. 
    //la fonction "Math.random()..." retourne une valeur aléatoire entre 0 et la longueur du tableau. "Math.round()" permet d'arrondir cette valeur à l'entier le plus proche.
    wordToFind = wordsList[Math.round(Math.random() * (wordsList.length - 1))];
    
    // -> On affiche un nombre de "_" correspondant au nombre de lettres contenues dans le mot à trouver
    //pour un nombre "i" allant de 1 à x (nombre correspondant à la longueur du mot à trouver) avec un pas de 1...
    for (i = 1; i <= wordToFind.length; i++) {
        //...on écrit dans l'élément html dédié, le contenu de l'élément auquel on ajoute une div dont l'id contient le nombre "i". Ainsi si le mot à trouver contient 3 lettres, la boucle fera 3 tour (i=1, i=2, i=3) et la div#wordToFindSpace contiendra 3 "_" (div#letter1, div#letter2, div#letter3). Cela permettra d'identifier plus facilement les div à remplir en cas de bonne proposition
        document.getElementById('wordToFindSpace').innerHTML = document.getElementById('wordToFindSpace').innerHTML + '<div id="letter' + i + '">_</div>';
    }

}


// -> On déclare la fonction "resetGameFunction" qui réinitialise le jeu et relance un nouveau mot à trouver 
function resetGameFunction(){
    document.getElementById('announcement-result-game').innerHTML = '';
    document.getElementById('play-new-game').style.display = 'none';
    tryCount = 0;
    document.getElementById('hanged').style.display = 'block';
    document.getElementById('hanged').src = 'assets/img/pendu' + tryCount + '.svg';
    document.getElementById('wordToFindSpace').innerHTML = '';
    document.getElementById('lettersTry').innerHTML = '';
    lettersTry = [];
    startGameFunction();
}