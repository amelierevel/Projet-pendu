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
    // -> On incrémente le compteur de partie
    gamesCount++;

    // -> On masque le 1er écran et on affiche le 2e écran
    document.getElementById('container-start').style.display = 'none';
    document.getElementById('container-game').style.display = 'flex';

    // -> On appelle la fonction "findWordFunction" pour définir le mot à trouver
    findWordFunction();
}


//----------Fonctions qui seront appelées à divers moments
// -> On déclare la fonction "findWordFunction" qui définit le mot à trouver 
function findWordFunction(){
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







//Au clic sur le btn "Proposer cette lettre" 
// -> Récupération de la lettre proposée par l'utilisateur (userLetter)
// -> Parcourir tous les caractères du mot wordToFind, si userLetter est présente dans le mot alors l'afficher sinon incrémenter le compteur de tentatives et afficher un élément au pendu
// -> Si le compteur de tentatives atteint la valeur max (pendu complet), alors afficher "Perdu" et incrémenter le compteur de défaites
// -> Si le mot est complètement reconstitué, alors afficher "Gagné" et incrémenter le compteur de victoires
letterGuessBtn.addEventListener('click', function () {
    document.getElementById('errorMessage').innerHTML = '';
    let userLetter = document.getElementById('letterGuess').value;
    if (!isNaN(userLetter) || userLetter.length != 1) {
        document.getElementById('errorMessage').innerHTML = 'Veuillez entrer une lettre';
        document.getElementById('letterGuess').value = '';
    } else {
        lettersTry.push(userLetter);
        document.getElementById('lettersTry').innerHTML = document.getElementById('lettersTry').innerHTML + userLetter + ' - ';

        document.getElementById('letterGuess').value = '';

        let letterFound = false;
        let wordWrite = '';
        let idLetter;

        for (a = 0; a < wordToFind.length; a++) {
            idLetter = 'letter' + (a + 1);
            if (userLetter == wordToFind[a]) {
                document.getElementById(idLetter).innerHTML = wordToFind[a];
                letterFound = true;
            }
            wordWrite = wordWrite + document.getElementById(idLetter).innerHTML;
        }
        
        if (!letterFound) {
            tryCount++;
            console.log(tryCount);
            if (tryCount > 0 && tryCount <= 10) {
                document.getElementById('hanged').src = 'assets/img/pendu' + tryCount + '.svg';
            }
        }
        if (tryCount == 4) {
            document.getElementById('userDefeatsCountShown').innerHTML = gamesCount - userVictoriesCount;
            document.getElementById('computerVictoriesCountShown').innerHTML = gamesCount - userVictoriesCount;
           
            document.getElementById('announcement-result-game').innerHTML = 'Perdu !';
            document.getElementById('hanged').style.display = 'none';
            document.getElementById('play-new-game').style.display = 'block';
            //Suppression de la class hanged-position pour permettre au contenu d'être centré
            document.getElementById('hanged-space').classList.remove('hanged-position');
        }

        if (wordWrite == wordToFind) {
            userVictoriesCount++;
            document.getElementById('userVictoriesCountShown').innerHTML = userVictoriesCount;
            document.getElementById('computerDefeatsCountShown').innerHTML = userVictoriesCount;

            document.getElementById('announcement-result-game').innerHTML = 'Gagné !!';
            document.getElementById('hanged').style.display = 'none';
            document.getElementById('play-new-game').style.display = 'block';
            //Suppression de la class hanged-position pour permettre au contenu d'être centré
            document.getElementById('hanged-space').classList.remove('hanged-position');
        }
    }
});


//Appel de la fonction resetGame au clic sur le btn "Rejouer"
document.getElementById('play-new-game').addEventListener('click', resetGameFunction);

//Fonction resetGameFunction qui réinitialise le jeu et relance un nouveau mot à trouver 
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





//Améliorations à ajouter :
// - check que letter est pas déjà dans tableau pour éviter de reparcourir boucle et interdire de proposer 2 fois la même lettre
// - voir pour methode indexOf (ou similaire qui récupère toutes les occurences) pour éviter boucle
// - bloquer le rechargement de la page quand on appuie sur touche "Entrée" dans form de proposition de lettre


