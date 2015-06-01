
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

function showHideAudioList(){

	var heightBasic=0;
	$('.audio-list li.show').each(function(){
		heightBasic+=$(this).height()+parseInt($(this).css('margin-bottom'));
	});
	$('.audio-list').height(heightBasic);

	$(document).on('click','.show-all-audio-list',function(){
		if($(this).is('.active')){
			var height=0;
			$('.audio-list li.show').each(function(){
				height+=$(this).height()+parseInt($(this).css('margin-bottom'));
			});
			$('.audio-list').height(height);
			$(this).text('ПОСМОТРЕТЬ ПОЛНЫЙ РЕПЕРТУАР').removeClass('active');
		}
		else{
			var height=0;
			$('.audio-list li').each(function(){
				height+=$(this).height()+parseInt($(this).css('margin-bottom'));
			});
			$('.audio-list').height(height);
			$(this).text('СВЕРНУТЬ СПИСОК').addClass('active');
		}
	});
};

function audioInit(){

	var a = audiojs.createAll({
      /*trackEnded: function() {
        var next = $('ol li.playing').next();
        if (!next.length) next = $('ol li').first();
        next.addClass('playing').siblings().removeClass('playing');
        audio.load($('a', next).attr('data-src'));
        audio.play();
      }*/
    });
    
    // Load in the first track
    var audio = a[0];
        first = $('.audio-list ol a').attr('data-src');
    $('.audio-list ol li').first().addClass('playing');
    audio.load(first);

    // Load in a track on click
    $(document).on('click','.audio-list ol li',function(e) {
      e.preventDefault();
      $(this).addClass('playing').siblings().removeClass('playing');
      audio.load($('a', this).attr('data-src'));
      audio.play();
    });

    $(document).on('click','.play-pause .prev, .play-pause .next',function(){
    	$('.audiojs').removeClass('error playing');
    	var index = $('.audio-list ol li.playing').index();
    	if($(this).is('.prev')){
    		index-=1;
    		if(index<0){
    			index = $('.audio-list ol li').length-1;
    		}
    	}
    	else if($(this).is('.next')){
    		index+=1;
    		if(index > $('.audio-list ol li').length-1){
    			index = 0;
    		}
    	}
    	if(index>3 && !$('.show-all-audio-list').is('.active')){
    		$('.show-all-audio-list').click();
    	}
    	if(index<4 && $('.show-all-audio-list').is('.active')){
    		$('.show-all-audio-list').click();
    	}
    	$('.audio-list ol li').removeClass('playing');
    	$('.audio-list ol li').eq(index).addClass('playing');
    	var sourse = $('.audio-list ol li').eq(index).find('a').data('src');
    	audio.load(sourse);
    	audio.play();
    });

    $(document).on('click','.audio-wrap-line',function(e){
    	var pos = e.offsetX;
    	var width = $('.audio-wrap-line').width();
    	var hoverWidth = (100*pos)/width;
    	if(hoverWidth < 10){
    		$('.audio-wrap-sound-icon').addClass('active');
    		hoverWidth = 0;
    	}
    	else{
    		$('.audio-wrap-sound-icon').removeClass('active');
    	}
    	$('.audio-wrap-line-hover').css({'width':hoverWidth+'%'});
    	audio.setVolume(hoverWidth/100);

    });

    $(document).on('click','.audio-wrap-sound-icon',function(){
    	if($(this).is('.active')){
    		$(this).removeClass('active');
    		$('.audio-wrap-line-hover').css({'width':'100%'});
    		audio.setVolume(1);
    	}
    	else{
    		$(this).addClass('active');
    		$('.audio-wrap-line-hover').css({'width':'0%'});
    		audio.setVolume(0);
    	}
    });
		
};

$(document).ready(function(){

	inputNums();
	datepickerInit();
	toggleSlide();
	audioInit();
	showHideAudioList();
});

$(window).resize(function(){

	if($(window).width()>767){
		$('.section-tenth-item-body').removeAttr('style');
		$('.section-tenth-item-title').removeClass('active');
	}

});