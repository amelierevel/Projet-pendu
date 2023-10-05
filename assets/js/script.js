//Masquer les formulaires qui seront utiliser pour jouer une fois la partie démarrée
document.getElementById('container-game').style.display = 'none';

//Déclaration du tableau contenant la liste des mots qui pourront être trouvés pour le jeu
let wordsList = ['bonjour', 'chat', 'poule'];

//Initialisation du compteur de victoires (victoriesCount) et de défaites (defeatsCount)
let gamesCount = 0;
let userVictoriesCount = 0;


let wordToFind;
let tryCount;
let lettersTry = [];

//Au clic sur le btn "Jouer" 
// -> Initialisation du compteur de tentatives (max = 10) (tryCount)
// -> Choix aléatoire du mot qui sera à trouver (wordToFind) et afficher son nombre de lettre
// -> Masquer le btn "Jouer" et Afficher les formulaires pour permettre à l'utilisateur de jouer
let startGameBtn = document.getElementById('startGame');
startGameBtn.addEventListener('click', function () {
    document.getElementById('userVictoriesCountShown').innerHTML = userVictoriesCount;
    document.getElementById('userDefeatsCountShown').innerHTML = gamesCount - userVictoriesCount;
    document.getElementById('computerVictoriesCountShown').innerHTML = gamesCount - userVictoriesCount;
    document.getElementById('computerDefeatsCountShown').innerHTML = userVictoriesCount;
    gamesCount++;
    lettersTry = [];
    document.getElementById('lettersTry').innerHTML = '';
    tryCount = 0;
    document.getElementById('hanged').src = 'assets/img/pendu' + tryCount + '.svg';
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
            // console.log(wordWrite);
        }
        if (!letterFound) {
            tryCount++;
            if (tryCount > 0 && tryCount <= 10) {
                document.getElementById('hanged').src = 'assets/img/pendu' + tryCount + '.svg';
                // document.getElementById('hanged').innerHTML = '<img src="assets/img/pendu' + tryCount + '.svg">';
            }
        }
        if (tryCount == 2) {
            document.getElementById('userDefeatsCountShown').innerHTML = gamesCount - userVictoriesCount;
            document.getElementById('computerVictoriesCountShown').innerHTML = gamesCount - userVictoriesCount;
            // alert('Perdu');
            document.getElementById('container-game').style.display = 'none';
            document.querySelector('h1').innerHTML = 'Perdu !!'
            document.getElementById('container-start').style.display = 'flex';
            document.getElementById('wordToFindSpace').innerHTML = '';
        }

        if (wordWrite == wordToFind) {
            userVictoriesCount++;
            document.getElementById('userVictoriesCountShown').innerHTML = userVictoriesCount;
            document.getElementById('computerDefeatsCountShown').innerHTML = userVictoriesCount;
            // alert('Gagné !!');
            document.getElementById('container-game').style.display = 'none';
            document.querySelector('h1').innerHTML = 'Gagné !!'
            document.getElementById('container-start').style.display = 'flex';
            document.getElementById('wordToFindSpace').innerHTML = '';
        }
    }
});








//Améliorations à ajouter :
// - check que letter est pas déjà dans tableau pour éviter de reparcourir boucle
// - voir pour methode indexOf (ou similaire qui récupère toutes les occurences) pour éviter boucle


