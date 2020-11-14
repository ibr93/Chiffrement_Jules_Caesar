"use strict";
const A_ASCII_CODE = 'a'.charCodeAt(0); // code ASCII de la lettre a
const Z_ASCII_CODE = 'z'.charCodeAt(0); // code ASCII de la lettre z
const ALPHABETCLAIR = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; // Dictionnaire de l'alphabet clair
const NOMBRE_ALPHABET = 26; // nombre de lettre de l'alphabet
var alphabetChiffre = []; //Dictionnaire de de l'alphabet chiffré
var btnChiffre = document.getElementById('btn_chiffre'); //recuperation de la balise button avec l'Id btn_chiffré
var btnDechiffre = document.getElementById('btn_dechiffre'); //recuperation de la balise button avec l'Id btn_dechiffré
var btnReset = document.getElementById('btn_reset');//recuperation de la balise button avec l'Id btn_reset
var txtMessage = document.getElementById('message'); //recuperation de la balise textbox avec l'Id message
var txtDecallage = document.getElementById('decallage'); //recuperation de la balise input avec l'Id decallage
var lblResultat = document.getElementById('txt_res'); //recuperation de la balise textbox avec l'Id txt_res

genererAlphabetChiffrer(1); // generation d'un decallage a 1 chiffre au chargement de la page

btnChiffre.onclick = () =>{ // creation d'un ecouteur des evenements clique sur le bouton chiffre
   var message = txtMessage.value.trim(); //upprimer les espaces du début et de la fin de la valeur de saisie
   lblResultat.value = "";
   var resultat = ChiffrerOrDechiffreMessage(message, ALPHABETCLAIR, alphabetChiffre);
   lblResultat.value = resultat;
   console.log(resultat);
};

btnDechiffre.onclick = () =>{ // creation d'un ecouteur des evenements clique sur le bouton dechiffre
   var message = txtMessage.value.trim();
   lblResultat.value = "";
   var resultat = ChiffrerOrDechiffreMessage(message, alphabetChiffre, ALPHABETCLAIR);
   lblResultat.value = resultat;
   console.log(resultat);
};

txtDecallage.addEventListener("change", () =>{ // creation d'un ecouteur d'evenement sur les changement du chiffre de decallage
//   console.log(txtDecallage.value);
   genererAlphabetChiffrer(txtDecallage.value); // initiation ou reinitialisation du tableau chiffré
}, false);

btnReset.addEventListener('click', () =>{ // creation d'un ecouteur des evenements clique sur le bouton effacer
   txtMessage.value = '';
   lblResultat.value = '';
}, false);

/**
*  Cette fonction permet de generer un alphabet chiffré
*  Elle prend en parametre un entier correspondant au nombre de decallage saisi par l'utilisateur
*  Et remplis le dictionnaire de l'alphabet chiffré
*/
function genererAlphabetChiffrer(nombreDecalageChoisi) {
   alphabetChiffre = []; // reinitialialisation du dictionnaire chiffré
   ALPHABETCLAIR.map((_, index) => { // nous iterons les element du dictionnaire de
      var lettreChiffre = index + A_ASCII_CODE - nombreDecalageChoisi; // calcul du decallage des lettres
      if(lettreChiffre < A_ASCII_CODE) {
         lettreChiffre += NOMBRE_ALPHABET;
      }
      alphabetChiffre.push(String.fromCharCode(lettreChiffre)); // insetion de la corresponce chiffré de le ième lettre du dictionnaire claire
   });
}

/**
*
*/
function ChiffrerOrDechiffreMessage(message, dicoEnClair, dicoChiffrer){
   var array_message = Array.from(message);
   var resultat = '';
   array_message = array_message
      .filter(p => p.toLowerCase() === ' ' || (p.toLowerCase().charCodeAt() >=A_ASCII_CODE &&  p.toLowerCase().charCodeAt() <= Z_ASCII_CODE))
      .map(p => {
         let isLowerCase;
         let temp;
         if(p === ' '){
            temp = p;
         }else {
            temp = dicoChiffrer[dicoEnClair.indexOf(p.toLowerCase())];
            p == p.toLowerCase() ? isLowerCase = true : isLowerCase = false;
            if(!isLowerCase){
               temp = temp.toUpperCase();
            }
         }

      resultat += temp;
   });
 //  txtMessage.value = '';
   return resultat;
}
