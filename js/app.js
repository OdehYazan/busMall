'use strict';
let rounds = 0;
let roundsEl = document.getElementById('rounds');
let lImg = document.getElementById('leftImg');
let mImg = document.getElementById('middleImg');
let rImg = document.getElementById('rightImg');
let ulEl = document.getElementById('results');
let btnDiv = document.getElementById('btnDiv');
let leftImgIndex;
let middleImgIndex;
let rightImgIndex;
let maxRounds =5;
let btnEl = document.createElement('button');
// let MaxRounds =prompt('Please enter rounds number ');

let images =['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg','breakfast.jpg'];

let products = [];

function ProductImg(source) {
  this.source = 'img/'+source;
  this.productName = source.split('.')[0];
  this.times = [];
  this.clicks = 0;
  this.views = 0;
  products.push(this);

}

for (let i = 0; i<images.length;i++){
  new ProductImg(images[i]);
}

function randomImageIndex(){
  return Math.floor(Math.random() *images.length);
}

function render(){
  leftImgIndex = randomImageIndex();
  middleImgIndex = randomImageIndex();
  rightImgIndex = randomImageIndex();

  while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex){
    leftImgIndex = randomImageIndex();

  }
  while(middleImgIndex === rightImgIndex){
    middleImgIndex = randomImageIndex();
  }
  lImg.setAttribute('src', products[leftImgIndex].source);
  products[leftImgIndex].views++;

  mImg.setAttribute('src', products[middleImgIndex].source);
  products[middleImgIndex].views++;

  rImg.setAttribute('src', products[rightImgIndex].source);
  products[rightImgIndex].views++;

  roundsEl.textContent = rounds;

}
render();

lImg.addEventListener('click',clicksFun);
mImg.addEventListener('click',clicksFun);
rImg.addEventListener('click',clicksFun);
// btnDiv.addEventListener('click',clicksFun);


function clicksFun(event){
  rounds++;
  if (rounds<=maxRounds){
    if(event.target.id ==='leftImg'){
      products[leftImgIndex].clicks++;
    }
    else if (event.target.id ==='middleImg'){
      products[middleImgIndex].clicks++;
    }
    else{
      products[rightImgIndex].clicks++;
    }
    render();

  }
  else {
    btnDiv.appendChild(btnEl);
    btnEl.textContent = 'View Results';
    btnEl.addEventListener('click',resultsFun);

    lImg.removeEventListener('click',clicksFun);
    mImg.removeEventListener('click',clicksFun);
    rImg.removeEventListener('click',clicksFun);

  }

}




function resultsFun(){
  let liEl;
  for (let i = 0; i < products.length; i++) {
    liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${products[i].productName} had ${products[i].clicks} votes, and was seen ${products[i].views} times.`;
    btnEl.removeEventListener('click',resultsFun);
  }


}
