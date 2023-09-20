//Masquer les formulaires qui seront utiliser pour jouer une fois la partie démarrée
placeToPlay.style.display = 'none';

//Déclaration du tableau contenant la liste des mots qui pourront être trouvés pour le jeu
let wordsList = ['bonjour', 'chat', 'poule'];

//Initialisation du compteur de victoires (victoriesCount) et de défaites (defeatsCount)
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
    tryCount = 0;
    wordToFind = wordsList[Math.round(Math.random() * (wordsList.length - 1))];
    console.log(wordToFind);
    for (i = 1; i <= wordToFind.length; i++) {
        document.getElementById('wordToFindSpace').innerHTML = document.getElementById('wordToFindSpace').innerHTML + '<div id="letter' + i + '">_</div>';
    }
    startGameBtn.style.display = 'none';
    placeToPlay.style.display = 'block';
});

//Au clic sur le btn "Proposer cette lettre" 
// -> Récupération de la lettre proposée par l'utilisateur (userLetter)
// -> Parcourir tous les caractères du mot wordToFind, si userLetter est présente dans le mot alors l'afficher sinon incrémenter le compteur de tentatives et afficher un élément au pendu
// -> Si le compteur de tentatives atteint la valeur max (pendu complet), alors afficher "Perdu" et incrémenter le compteur de défaites
// -> Si le mot est complètement reconstitué, alors afficher "Gagné" et incrémenter le compteur de victoires
letterGuessBtn.addEventListener('click', function () {
    let userLetter = document.getElementById('letterGuess').value;
    lettersTry.push(userLetter);
    document.getElementById('lettersTry').innerHTML = document.getElementById('lettersTry').innerHTML + userLetter + ' - ';

    document.getElementById('letterGuess').value = '';

    for (a = 0; a < wordToFind.length; a++) {
        if (userLetter == wordToFind[a]) {
            let idLetter = 'letter' + (a + 1);
            document.getElementById(idLetter).innerHTML = wordToFind[a];
        } else {
            //le else n'est pas bon car il compte une erreur par lettre fausse dans le mot (soit mot de 4 lettres, 1 bonne et 3 fausses -> perd 3 vies)
            tryCount++;
            if (tryCount > 0 && tryCount <= 10) {
                document.getElementById('hanged').innerHTML = '<img src="assets/img/pendu' + tryCount + '.svg">';
            }
        }
    }
    

});


//Au clic sur le btn "Proposer un mot"
// -> Récupération du mot proposé par l'utilisateur (userWord)
// -> Si userWord == wordToFind alors afficher "Gagné" et incrémenter le compteur de victoires, sinon incrémenter le compteur de tentatives et afficher un élément au pendu
// -> Si le compteur de tentatives atteint la valeur max (pendu complet), alors afficher "Perdu" et incrémenter le compteur de défaites







// Pas utilisé
// for (letterValue of wordToFind) {
    //         let idLetter = 'letter' + (wordToFind.indexOf(letterValue) + 1);
    //         if (userLetter == letterValue) {
    //             document.getElementById(idLetter).innerHTML = letterValue;
    //             tryCount--;
    //         }else{
    //         }
    //     }
    //     tryCount++;
    //     if(tryCount > 0 && tryCount <= 10){
    //         document.getElementById('hanged').innerHTML = '<img src="assets/img/pendu' + tryCount + '.svg">';
    //     }