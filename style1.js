 function Sommaire(container){
  this.container = container; // Container dans lequel se trouve notre texte
  this.uls = [document.createElement('ul')]; // On stock les <ul> dans lequel on va placer nos <li>
  this.buildStructure();
};
// Permet de construire la structure de notre sommaire
Sommaire.prototype.buildStructure = function(){
  // On récupère tous les titres du contenu
  var titles = this.container.querySelectorAll('h2, h3, h4, h5');
  var lastLvl = 0
  for(var i = 0; i < titles.length; i++){
    var title = titles[i];
    var lvl = parseInt(title.tagName.replace('H', '')) - 1; // Niveau du titre, 1:h2 2:h3....
    // Ooops on a sauté plus d'un niveau
    if(lvl - lastLvl > 1){
      throw "Erreur dans la structure des titres, Saut d'un h" + (lastLvl + 1) + " vers h" + (lvl + 1);
    }
    var lastLvl = lvl;
    // On crée le <li> qui va contenir notre titre
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = title.textContent;
    li.appendChild(a);
    // On a un <ul> parent ?
    if(!this.uls[lvl - 1]){
      var ul = document.createElement('ul');
      this.uls[lvl - 1] = ul;
      this.uls[lvl - 2].lastChild.appendChild(ul);
    }
    this.uls[lvl] = null; // Ce niveau n'a pas de <ul> enfant
    this.uls[lvl - 1].appendChild(li); // On place notre <li> dans le <ul> parent
    this.bindScroll(a, title); // On ajoute l'event sur le lien
  }
};
// Au clic sur le a on scroll vers le titre
Sommaire.prototype.bindScroll = function(a, title) {
  a.addEventListener('click', function(e){
    e.preventDefault();
    document.body.scrollTop = title.offsetTop;
  });
}
// Ajoute le sommaire à l'élément passé en paramètre
Sommaire.prototype.appendTo = function(element){
  element.appendChild(this.uls[0]);
};
// Exemple d'utilisation
var s = new Sommaire(document.querySelector('.container'));
s.appendTo(document.querySelector('#sommaire'));