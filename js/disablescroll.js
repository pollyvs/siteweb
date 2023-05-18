const body=document.body;
const popup=document.querySelectorAll('.forhover');
const popupArea=document.querySelectorAll('.popup_area');
function disableScroll(){
    let pagePosition=window.scrollY;
    body.classList.add('disable-scroll');
    body.dataset.position=pagePosition;
    body.style.top=-pagePosition+'px';
}
function  enableScroll(){
    let pagePosition=parseInt(body.dataset.position,10);
    body.style.top='auto';
    body.classList.remove('disable-scroll');
    window.scroll({top:pagePosition});
    body.removeAttribute('data-position');
}

popup.forEach(elem=>{
    elem.addEventListener('click',(e)=>{
        disableScroll()

    })


});

popupArea.forEach(elem=>{
    elem.addEventListener('click',(e)=>{
        enableScroll()

    })


});