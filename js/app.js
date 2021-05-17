/* eslint-disable no-var */
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
let maxRounds = 10;
let index = [];
let btnEl = document.createElement('button');
// let MaxRounds =prompt('Please enter rounds number ');

let images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg', 'breakfast.jpg'];

let products = [];
let imagesName = [];
let productClicks = [];
let productViews = [];

function ProductImg(source) {
  this.source = 'img/' + source;
  this.productName = source.split('.')[0];
  this.times = [];
  this.clicks = 0;
  this.views = 0;
  products.push(this);
  imagesName.push(this.productName);

}

for (let i = 0; i < images.length; i++) {
  new ProductImg(images[i]);
}

function randomImageIndex() {
  leftImgIndex = Math.floor(Math.random() * images.length);
  middleImgIndex = Math.floor(Math.random() * images.length);
  rightImgIndex = Math.floor(Math.random() * images.length);
  while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex || index.includes(leftImgIndex) || index.includes(middleImgIndex) || index.includes(rightImgIndex)) {
    leftImgIndex = Math.floor(Math.random() * images.length);
    middleImgIndex = Math.floor(Math.random() * images.length);
    rightImgIndex = Math.floor(Math.random() * images.length);
  }
  index.length = 0;
  index.push(leftImgIndex, middleImgIndex, rightImgIndex);
  console.log(index);
}
// for (let i = 0 ;i < index.length; i++){
//   while(index[i]===leftImgIndex ){
//   leftImgIndex = Math.floor(Math.random() *images.length);
//   } while (index[i]===middleImgIndex ){
//     middleImgIndex = Math.floor(Math.random() *images.length);
//   }
//   while(index[i]===middleImgIndex)
// }




function render() {


  randomImageIndex();

  // for (let i = 0 ;i < index.length; i++){
  // while (leftImgIndex === middleImgIndex || leftImgIndex === rightImgIndex ||middleImgIndex === rightImgIndex || index.includes(leftImgIndex) || index.includes(middleImgIndex) || index.includes(rightImgIndex)){

  //   randomImageIndex();

  // }




  lImg.setAttribute('src', products[leftImgIndex].source);
  products[leftImgIndex].views++;

  mImg.setAttribute('src', products[middleImgIndex].source);
  products[middleImgIndex].views++;

  rImg.setAttribute('src', products[rightImgIndex].source);
  products[rightImgIndex].views++;

  roundsEl.textContent = rounds;
  // index.length=0;
  //  index.push(leftImgIndex,middleImgIndex,rightImgIndex);
  // console.log(index);
}

render();

lImg.addEventListener('click', clicksFun);
mImg.addEventListener('click', clicksFun);
rImg.addEventListener('click', clicksFun);
// btnDiv.addEventListener('click',clicksFun);


function clicksFun(event) {
  rounds++;
  if (rounds <= maxRounds) {
    if (event.target.id === 'leftImg') {
      products[leftImgIndex].clicks++;
    }
    else if (event.target.id === 'middleImg') {
      products[middleImgIndex].clicks++;
    }
    else {
      products[rightImgIndex].clicks++;
    }
    // index.length=0;
    render();

  }
  else {
    btnDiv.appendChild(btnEl);
    btnEl.textContent = 'View Results';

    btnEl.addEventListener('click', resultsFun);

    lImg.removeEventListener('click', clicksFun);
    mImg.removeEventListener('click', clicksFun);
    rImg.removeEventListener('click', clicksFun);

  }

}




function resultsFun() {
  let liEl;
  for (let i = 0; i < products.length; i++) {
    liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${products[i].productName} had ${products[i].clicks} votes, and was seen ${products[i].views} times.`;
    productClicks.push(products[i].clicks);
    productViews.push(products[i].views);


    btnEl.removeEventListener('click', resultsFun);
  }
  charRender();


}
function charRender() {

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imagesName,
      datasets: [{
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }, {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgb(230 180 58 / 66%)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

