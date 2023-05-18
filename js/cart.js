document.addEventListener('DOMContentLoaded', () => {
const productsBtn=document.querySelectorAll('.tocart')
const productsBtnPop=document.querySelectorAll('.tocartforp')
const cartProductsList=document.querySelector('.cart-content_list');
const cart=document.querySelector('.cart');
const cartQuantity=document.querySelector('.cart_quantity');
const fullPrice=document.querySelector('.fullPrice');
let price=0;
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
let productArray = [];
// рандомный айди элемента для взаимодействия с корзиной и продуктом
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
// на всякий удаление пробелов между ценой но мб потом удалю
const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};
// из строки без пробелов к строке с пробелами
const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

//суммирование цен
const plusFullPrice=(currentPrice)=>{
    return price+=currentPrice;
};
//отнимание цены после удаление из корзины
const minusFullPrice=(currentPrice)=>{
    return price-=currentPrice;
};

const printFullPrice=()=>{
    fullPrice.textContent=`${normalPrice(price)} р.`;
};

const minusModalPrice=(currentPrice)=>{
    return modalprice-=currentPrice;

}
const printModalPrice=()=>{

    orderModalPrice.textContent=`${normalPrice(modalprice)} р.`;
}

//получение числа и выведение в коризну
const printQuantity=()=>{
    let length=cartProductsList.querySelector('.simplebar-content').children.length;
    cartQuantity.textContent=length;
    if (length>0){
        cart.classList.add('active');
    }
    else{
        cart.classList.remove('active');
    }
};
//внутренняя разметка корзины
const generateCartProduct=(img,title,price,id)=>{
    return `
		<li class="cart-content_item">
			<article class="cart-content_product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product_img">
				<div class="cart-product_text">
					<h3 class="cart-product-title">${title}</h3>
					<span class="cart-product-price">${normalPrice(price)} р.</span>
				</div>
				<button class="cart-product-delete" aria-label="Удалить товар"></button>
			</article>
		</li>
	`;

}

const deleteProducts=(productParent)=>{
    let id=productParent.querySelector('.cart-product').dataset.id;
    let currentPrice=parseInt(productParent.querySelector('.cart-product-price').textContent);





    minusFullPrice(currentPrice);
    printFullPrice();


    productParent.remove();
    printQuantity();
    updateStorage();

}
//добавление в корзину обычных продуктов
productsBtn.forEach(element=>{
    element.closest('.product').setAttribute('data-id',randomId());
    element.addEventListener('click',(e)=>{

        let self=e.currentTarget;
        let parent=self.closest('.product');
        let id=parent.dataset.id;
        let img=parent.querySelector('img').getAttribute('src');
        let title= parent.querySelector('.label').textContent;

        let priceNumber = parseInt(parent.querySelector('.price').textContent);


        plusFullPrice(priceNumber);
        console.log(price);
        printFullPrice();
        cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img,title,priceNumber,id));
        printQuantity();
        updateStorage();
        self.disabled=true;
    });
});
// добавление в корзину из попапа
productsBtnPop.forEach(element2=>{
    element2.closest('.popup_content').setAttribute('data-id',randomId());
    element2.addEventListener('click',(e1)=>{

        let self=e1.currentTarget;
        let parent=self.closest('.popup_content');
        let id=parent.dataset.id;
        let img=parent.querySelector('img').getAttribute('src');
        console.log(img);
        let title= parent.querySelector('.popup_title').textContent;

        let priceNumber = parseInt(parent.querySelector('.price').textContent);


        plusFullPrice(priceNumber);
        console.log(price);
        printFullPrice();
        cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img,title,priceNumber,id));
        printQuantity();
        updateStorage();
        self.disabled=true;
    });
});

cartProductsList.addEventListener('click',(e)=>{
    if (e.target.classList.contains('cart-product-delete')){
        console.log("clocked");
        deleteProducts(e.target.closest('.cart-content_item'));
    }
})

//открытие по кнопке наших продуктов
let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
    if (flag == 0) {
        orderModalOpenProd.classList.add('open');
        orderModalList.style.display = 'block';
        flag = 1;
    } else {
        orderModalOpenProd.classList.remove('open');
        orderModalList.style.display = 'none';
        flag = 0;
    }
});

const generateModalProduct = (img, title, price, id) => {
    return `
		<li class="order-modal__item">
			<article class="order-modal__product order-product" data-id="${id}">
				<img src="${img}" alt="" class="order-product__img">
				<div class="order-product__text">
					<h3 class="order-product__title">${title}</h3>
					<span class="order-product__price">${normalPrice(price)}</span>
				</div>
				<button class="order-product__delete">Удалить</button>
			</article>
		</li>
	`;
};

const modal=new GraphModal({
    isOpen: (modal) => {
        orderModalList.innerHTML = '';
        console.log('opened');
        let array = cartProductsList.querySelector('.simplebar-content').children;
        let fullprice = fullPrice.textContent;
        let length = array.length;

        document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
        document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;

        for (item of array) {
            console.log(item)
            let img = item.querySelector('.cart-product_img').getAttribute("src");
            let title = item.querySelector('.cart-product-title').textContent;
            let priceString = priceWithoutSpaces(item.querySelector('.cart-product-price').textContent);
            let id = item.querySelector('.cart-product').dataset.id;

            orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));

            let obj = {};
            obj.title = title;
            obj.price = priceString;
            productArray.push(obj);
        }

        console.log(productArray)
    },
    isClose: () => {
        console.log('closed');
    }
});

const countSumm = () => {
    document.querySelectorAll('.cart-content_item').forEach(el => {
        price += parseInt((el.querySelector('.cart-product-price').textContent));
    });
};

const initialState = () => {
    if (localStorage.getItem('products') !== null) {
        cartProductsList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');
        printQuantity();
        countSumm();
        printFullPrice();


        document.querySelectorAll('.cart-content_product').forEach(el => {
            let id = el.dataset.id;
            console.log(id)

        });
    }
};

initialState();

const updateStorage = () => {
    let parent = cartProductsList.querySelector('.simplebar-content');
    let html = parent.innerHTML;
    html = html.trim();

    if (html.length) {
        localStorage.setItem('products', html);
    } else {
        localStorage.removeItem('products');
    }
};


document.querySelector('.modal').addEventListener('click', (e) => {



    if (e.target.classList.contains('order-product__delete')) {

        let id = e.target.closest('.order-modal__product').dataset.id;
        let cartProduct = document.querySelector(`.cart-content_product[data-id="${id}"]`).closest('.cart-content_item');
        let cartPrice =  parseInt(cartProduct.querySelector('.cart-product-price').textContent);
        let orderModalPrice= priceWithoutSpaces(document.querySelector('.order-modal__summ span').textContent);
        let orderModalQuantity = parseInt(document.querySelector('.order-modal__quantity span').textContent);
        let modalquantity=orderModalQuantity-1;
        let modalprice=parseInt(orderModalPrice)-parseInt(cartPrice);
        document.querySelector('.order-modal__summ span').textContent=`${normalPrice(modalprice)} р`;
        document.querySelector('.order-modal__quantity span').textContent=`${(modalquantity)} шт`;

        console.log(modalprice);
        deleteProducts(cartProduct);
        e.target.closest('.order-modal__product').remove();
    }
});

});