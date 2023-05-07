const filterBox = document.querySelectorAll('.box')


document.querySelector('nav').addEventListener('click',event=>{
    if (event.target.tagName!=='LI') return false;
    let filterClass = event.target.dataset['f'];
   filterBox.forEach((element)=>{

       element.classList.remove('hide');


        if (!element.classList.contains(filterClass)&& filterClass!=='all') {
            element.classList.add('hide');


        }
    });
})


