"use strict";
const NOMBREDECALAGEPOSSIBLE = 25;
const A_ASCII_CODE = 'a'.charCodeAt(0);
const Z_ASCII_CODE = 'z'.charCodeAt(0);
const ALPHABETCLAIR = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const NOMBRE_ALPHABET = 26;
var alphabetChiffre = [];
var nombreDecalageChoisi = 0;
var btnChiffre = document.getElementById('btn_chiffre');
var btnDechiffre = document.getElementById('btn_dechiffre');
var btnReset = document.getElementById('btn_reset');
var txtMessage = document.getElementById('message');
var selectAtteributeNombreDecallage = document.getElementById('select-nombreDecallage');
var lblResultat = document.getElementById('txt_res');
//document.getElementById('txt_res').innerHTML = "Velo";

for(var i=0; i<NOMBREDECALAGEPOSSIBLE; i++){
   var opt = document.createElement('option');
   opt.value = (i+1).toString();
   opt.innerHTML = (i+1).toString();
   opt.onselect = function(res) {
      console.log(res);
   }
   selectAtteributeNombreDecallage.appendChild(opt);
}

btnChiffre.onclick = () =>{
   var message = txtMessage.value.trim();
   var resultat = ChiffrerOrDechiffreMessage(message, ALPHABETCLAIR, alphabetChiffre);
   lblResultat.innerHTML = resultat;
   console.log(resultat);
};

btnDechiffre.onclick = () =>{
   var message = txtMessage.value.trim();
   var resultat = ChiffrerOrDechiffreMessage(message, alphabetChiffre, ALPHABETCLAIR);
   lblResultat.innerHTML = resultat;
   console.log(lblResultat);
};

selectAtteributeNombreDecallage.addEventListener("change", () =>{
   nombreDecalageChoisi =parseInt(selectAtteributeNombreDecallage.value, 0);
   genererAlphabetChiffrer(nombreDecalageChoisi);
}, false);

btnReset.addEventListener('click', () =>{
   txtMessage.value = '';
   selectAtteributeNombreDecallage.selectedIndex = 0;
}, false);

function genererAlphabetChiffrer(nombreDecalageChoisi) {
   alphabetChiffre = [];
   ALPHABETCLAIR.map((_, index) => {
      var lettreChiffre = index + A_ASCII_CODE - nombreDecalageChoisi;
      if(lettreChiffre < A_ASCII_CODE){
         lettreChiffre += NOMBRE_ALPHABET;
      }
      alphabetChiffre.push(String.fromCharCode(lettreChiffre));
   //  console.log(String.fromCharCode(lettreChiffre));
   });
}

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
   txtMessage.value = '';
   return resultat;
}


