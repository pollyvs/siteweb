let slides = document.querySelectorAll(".slide-single");
let slider=[];
const rightarrow=document.querySelector('.rightarrow')
const leftarrow=document.querySelector('.leftarrow')
console.log(slides);
for (let i=0;i<slides.length;i++){
    slider[i]=slides[i].src;
    slides[i].remove();
}
console.log(slider);

let step = 0; //какую картинку показывать (1 2 3 или 4)
let offset = 0; //смещение изображения

function draw(){
    let img=document.createElement('img');
    img.src=slider[step];
    img.classList.add('slide-single');
    img.style.left=offset*400+100+'px';

    document.querySelector('#slider').appendChild(img);

    if (step+1===slider.length){
        step=0;
    }
    else{
        step++;
    }
    offset=1;

}

function left(){
    rightarrow.onclick=null;
    let slides2=document.querySelectorAll('.slide-single');
    let offset2=0;
    for (let i=0;i<slides2.length;i++){
        slides2[i].style.left=offset2*400+100-400+'px';
        offset2++;
    }
    setTimeout(function (){
        slides2[0].remove();
        draw();
        rightarrow.onclick=left;
    },1000);

}



draw();draw();
rightarrow.onclick=left;
