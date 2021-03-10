// Не знаю нужно ли это было, но я сделал подхватывание кол-ва товаров из input, и поставил его по умолчанию на 1. А так же он не может быть меньше 1.

// by Oleg Semenchuk

let buyBtn = document.querySelectorAll('.product-box__btn'),
	filterInputs = document.querySelectorAll('.select-control'),
	productCards = document.querySelectorAll('.product-box__item'),
	cartCount = document.getElementById('cart'),
	cartSum = document.getElementById('price-sum'),
	confirmBtn = document.querySelector('.btn-check'),
	cartCounter = 0,
	priceCounter = 0;

confirmBtn.addEventListener('click', () => {
	document.body.insertAdjacentHTML('beforeend','<div id="pop-up" style="padding: 10px;z-index:999;background-color: #ffffff;position: absolute; left: 50%; top: 50%;transform: translate(-50%, -50%);"><input id="user-name" style="display:block" type="text" placeholder="Имя" /><input id="user-email" type="email" placeholder="Почта" /><button id="confirmation-button" style="display:block; margin-top:5px;">Отправить</button></div>');
	document.getElementById('confirmation-button').addEventListener('click', () => {
		let userName = document.getElementById('user-name').value,
			userEmail = document.getElementById('user-email').value;
		if(userName.trim().length > 0 && userEmail.trim().length > 0) {
			alert('Спасибо за покупку!');
			document.getElementById('pop-up').remove();

			priceCounter = 0;
			cartCounter = 0;

			cartSum.innerHTML = 'XXX';
			cartCount.innerHTML = 'XXX';
		} else {
			alert('Какое-то из полей пустое или в нём только пробелы!');
		}
	});
});

function filterProducts() {
	let sort = filterInputs[0].value, 
		price = filterInputs[1].value;

	for(let i = 0; i < productCards.length; i++) {
		let productSort = productCards[i].getAttribute('sort'),
			productPrice = parseInt(productCards[i].querySelector('p').innerHTML);
		

		if(sort == 0 && price == 0) {
			productCards[i].style.display = 'flex';
		} else {
			productCards[i].style.display = 'none';
			if(productSort == sort && productPrice <= price) {
				productCards[i].style.display = 'flex';
			} else if (sort == 0 && productPrice <= price) {
				productCards[i].style.display = 'flex';
			} else if (price == 0 && productSort == sort) {
				productCards[i].style.display = 'flex';
			}
		}
	}
}

for(let i = 0; i < filterInputs.length; i++) {
	filterInputs[i].addEventListener('change', function() {
		filterProducts();
	});
}

for(let i = 0; i < buyBtn.length; i++) {
	buyBtn[i].addEventListener('click', function() {
		let buyWrapper = this.parentNode,
			price = parseInt(buyWrapper.querySelector('p').innerHTML),
			orderCount = parseInt(buyWrapper.querySelector('.qty__item').value);
		
		priceCounter = priceCounter + (price * orderCount);
		cartCounter = cartCounter + orderCount;

		cartSum.innerHTML = priceCounter;
		cartCount.innerHTML = cartCounter;
	});
}