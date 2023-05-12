let images = document.querySelectorAll(".hot");
let current=0;

const rightarrow=document.querySelector('.rightarrow')
const leftarrow=document.querySelector('.leftarrow')

function slider(){
    for(let i=0;i<images.length;i++){
        images[i].classList.add('opacity0');
    }
    images[current].classList.remove('opacity0');
    if(current+1===images.length){
        current=0;
    }
    else{
        current++;
    }

    setTimeout("slider()",5000);
}
window.onload=slider;
// document.querySelector('.rightarrow').onclick=function(){
//     if (current-1===-1){
//         current=images.length-1;
//     }
//     else{
//         current--;
//     }
//     slider();
// };
// document.querySelector('.leftarrow').onclick=function (){
//     if (current+1===images.length){
//         current=0;
//     }
//     else{
//         current++;
//     }
//     slider();
// };
// document.addEventListener('keyup', function(event){
//     if(event.key==="ArrowRight"){
//         if (current-1===-1){
//             current=images.length-1;
//         }
//         else{
//             current--;
//         }
//         slider();
//     }
//     else if(event.key==="ArrowLeft"){
//         if (current+1===images.length){
//             current=0;
//         }
//         else{
//             current++;
//         }
//         slider();
//     }
//
//
// });