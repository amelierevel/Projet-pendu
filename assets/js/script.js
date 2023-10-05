//Masquer les formulaires qui seront utiliser pour jouer une fois la partie démarrée
document.getElementById('container-game').style.display = 'none';

//Déclaration du tableau contenant la liste des mots qui pourront être trouvés pour le jeu
let wordsList = ['bonjour', 'chat', 'poule'];

//Initialisation du compteur de victoires (victoriesCount) et de défaites (defeatsCount)
let gamesCount = 0;
let victoriesCount = 0;
let defeatsCount = 0;


let wordToFind;
let tryCount;
let lettersTry = [];

//Au clic sur le btn "Jouer" 
// -> Initialisation du compteur de tentatives (max = 10) (tryCount)
// -> Choix aléatoire du mot qui sera à trouver (wordToFind) et afficher son nombre de lettre
// -> Masquer le btn "Jouer" et Afficher les formulaires pour permettre à l'utilisateur de jouer
let startGameBtn = document.getElementById('startGame');
startGameBtn.addEventListener('click', function () {
    document.getElementById('userVictoriesCountShown').innerHTML = victoriesCount;
    document.getElementById('userDefeatsCountShown').innerHTML = defeatsCount;
    document.getElementById('computerVictoriesCountShown').innerHTML = gamesCount - defeatsCount;
    document.getElementById('computerDefeatsCountShown').innerHTML = gamesCount - victoriesCount;
    gamesCount++;
    tryCount = 0;
    wordToFind = wordsList[Math.round(Math.random() * (wordsList.length - 1))];
    // console.log(wordToFind);
    for (i = 1; i <= wordToFind.length; i++) {
        document.getElementById('wordToFindSpace').innerHTML = document.getElementById('wordToFindSpace').innerHTML + '<div id="letter' + i + '">_</div>';
    }
    document.getElementById('container-start').style.display = 'none';
    document.getElementById('container-game').style.display = 'flex';
});

//Au clic sur le btn "Proposer cette lettre" 
// -> Récupération de la lettre proposée par l'utilisateur (userLetter)
// -> Parcourir tous les caractères du mot wordToFind, si userLetter est présente dans le mot alors l'afficher sinon incrémenter le compteur de tentatives et afficher un élément au pendu
// -> Si le compteur de tentatives atteint la valeur max (pendu complet), alors afficher "Perdu" et incrémenter le compteur de défaites
// -> Si le mot est complètement reconstitué, alors afficher "Gagné" et incrémenter le compteur de victoires
letterGuessBtn.addEventListener('click', function () {
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
            // console.log(wordWrite);
        }
        if (!letterFound) {
            tryCount++;
            if (tryCount > 0 && tryCount <= 10) {
                document.getElementById('hanged').src = 'assets/img/pendu' + tryCount + '.svg';
                // document.getElementById('hanged').innerHTML = '<img src="assets/img/pendu' + tryCount + '.svg">';
            }
        }
        if (tryCount == 10) {
            alert('Perdu');
            defeatsCount++;
            document.getElementById('userDefeatsCountShown').innerHTML = defeatsCount;
        }

        if (wordWrite == wordToFind) {
            alert('Gagné !!');
            victoriesCount++;
        }
    }
});









//Améliorations à ajouter :
// - check que letter est pas déjà dans tableau pour éviter de reparcourir boucle
// - voir pour methode indexOf (ou similaire qui récupère toutes les occurences) pour éviter boucle


