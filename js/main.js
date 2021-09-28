$(document).ready(() => {
  	$('#submit').click(() => {
		$('.error-input').hide();
		let loader = $('#loader');

		let name = $('#name');
		name.css('border-color','rgb(185, 145, 80)');
		let adress = $('#adress');		
		adress.css('border-color','rgb(185, 145, 80)');
		let phone = $('#phone');
		phone.css('border-color','rgb(185, 145, 80)');
		let hasError = false;

		if (!name.val()) {
			name.siblings('.error-input').show();
			name.css('border-color','red');
			hasError = true;
		}
		if (!adress.val()) {
			adress.siblings('.error-input').show();
			adress.css('border-color','red');
			hasError = true;
		}
		if (!phone.val()) {
			phone.siblings('.error-input').show();
			phone.css('border-color','red');
			hasError = true;
		}
	  	if (!hasError) {
			loader.css('display', 'flex');
	  		$.ajax({
		  		method: "POST",
		  		url: 'https://itlogia.ru/test/checkout',
		  		data: { name: name.val(), adress: adress.val(), phone: phone.val()}
		  	})
		  	.done(function(message) {
		  		loader.hide();
		  		if (message.success) {
		  			$('#order-form > div').remove();
		  			$('#order-form').prepend('<div>Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!</div>');
		  			$('#order-form > div').addClass('notification');
		  			$('#order-container').css('align-items', 'center');
		  			$('#order-image > img').css('bottom', '-215px');
		  		} else {
		  			alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
		  		}
		  	});
	  	}
  	});
});