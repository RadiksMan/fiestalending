
function inputNums(){
	$(".input-number").keydown(function (e) {
	    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
	        (e.keyCode == 65 && e.ctrlKey === true) || 
	        (e.keyCode >= 35 && e.keyCode <= 39)) {
	             return;
	    }
	    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        e.preventDefault();
	    }
	});
}

function datepickerInit(){

	$.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

	$('.datepicker').datepicker($.extend({
			onSelect: function(dateText, inst) {
				$('.choseDate').val(dateText);
			}
	    },
	     $.datepicker.regional['ru']
	   ));

}

function toggleSlide(){

	$(document).on('click','.section-tenth-item-title', function(){
		if($(window).width()<768){


			if(!$(this).parents('.section-tenth-item').is('.active')){
				$(this).parents('.section-tenth-wrap').find('.section-tenth-item').removeClass('active');
				$(this).parents('.section-tenth-item').addClass('active');
				$(this).parent().find('.section-tenth-item-body').slideDown(300);
			}
			else{
				$(this).parents('.section-tenth-item').removeClass('active');
			}
			$(this).parents('.section-tenth-wrap').find('.section-tenth-item:not(.active)').find('.section-tenth-item-body').slideUp(300);
		}
	});
}

$(document).ready(function(){

	inputNums();
	datepickerInit();
	toggleSlide();

});

$(window).resize(function(){

	if($(window).width()>767){
		$('.section-tenth-item-body').removeAttr('style');
		$('.section-tenth-item-title').removeClass('active');
	}

});