var scroller=jQuery.browser.webkit ? "body": "html";

/* modernize */
function modernize() {
	// placeholder
	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function() {
			$(this).watermark($(this).attr('placeholder'));
		});
	}
}


/* input only Number  */
function inputNumber(block) {
	$('input', block).keypress(function(e) {
		if (e.which >= 47 && e.which <= 57 ){}
		else return false;
	});

	$('input', block).keyup(function() {
		$inputNum = $(this);
		if ($inputNum.val == '' || $inputNum.val() == 0) {
			$inputNum.val('1');
		}
	});
}
function circleCanvas(){
	if($('.canvas-cirlce').length>0){
			var point = 0;
			$('.section-9-item-circle').each(function(){
				var element = $(this).find('.canvas-cirlce');
				var percent = $(this).find('.canvas-cirlce').attr('value');
				$(this).find('.canvas-cirlce').knob({
					'fgColor':"#f9c311",
					'bgColor':"#fff",
					'thickness':.05,
					'max':mas[point],
					'readOnly':true,
					'displayInput':true,
					'dynamicDraw': true,
					'width':125,
					'height':125
				});

				point++;

				$({value: 0}).animate({ value: percent }, {
		            duration: 1500,
		            easing: 'swing',
		            progress: function () {
		            	element.val(Math.ceil(this.value)).trigger('change');
		            }
	            });
			});
	}
}
function animated(){
	if($(window).width()>1024){
		var waypoint = new Waypoint({
		  element: $('.box'),
		  handler: function(direction) {
		   	this.element.addClass('fadeInUp');
		  },
		  offset: '60%'
		});
		var waypoint = new Waypoint({
		  element: $('.box2'),
		  handler: function(direction) {
		   	this.element.addClass('fadeInUp');
		  },
		  offset: '70%'
		});
		var waypoint = new Waypoint({
		  element: $('.section-9'),
		  handler: function(direction) {
		  	if($('.section-9-item-circle div input').is('.canvas-cirlce')){

		  	}else{
		  		circleCanvas();
		  	}
		  },
		  offset: '40%'
		})
	}
}
function removeTitleVideo(){
	$(document).on('click','.vjs-big-play-button',function(){
		$('.section-4 .section-title').fadeOut();
	});
}


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

    var datePickerTimer = null;

	$('.datepicker').datepicker($.extend({
			onSelect: function(dateText, inst) {
				$('.choseDate').val(dateText);
				setTimeout(
					function(){
						searchInDatepicker();
						if($('.ui-datepicker-current-day').is('.no-concert') || $('.ui-datepicker-current-day').is('.maybe-concert')){
							$('.ui-datepicker-current-day .sorry-date-text').addClass('active');
							clearTimeout(datePickerTimer);
							datePickerTimer = setTimeout(
								function(){
									$('.ui-datepicker-current-day .sorry-date-text').removeClass('active');
								},
								2000);
						}
					},
					0);
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

function showHideHeight(){
	var heightBasic=0;
	if($('.show-all-audio-list').is('.active')){
		$('.audio-list li').each(function(){
			heightBasic+=$(this).height()+parseInt($(this).css('margin-bottom'));
		});
		$('.audio-list').height(heightBasic);
	}
	else{
		$('.audio-list li.show').each(function(){
			heightBasic+=$(this).height()+parseInt($(this).css('margin-bottom'));
		});
		$('.audio-list').height(heightBasic);
	}
}

function showHideAudioList(){

	showHideHeight();

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
	        var next = $('.audio-list ol li.playing').next();
	        if (!next.length) next = $('.audio-list ol li').first();
	        next.addClass('playing').siblings().removeClass('playing');
	        audio.load($('a', next).attr('data-src'));
	        audio.play();
      	},*/
      	updatePlayhead: function(percent) {
      		var percent=percent*100;
      		$('.progress').css({'width':percent+'%'});
      		$('.playing  .audio-list-button .playing-line').css({'height':percent+'%'});
      	}
    });

    // Load in the first track
    var audio = a[0];
        first = $('.audio-list ol a').attr('data-src');
    $('.audio-list ol li').first().addClass('playing');
    audio.load(first);

    // Load in a track on click
    $(document).on('click','.audio-list ol li',function(e) {
      e.preventDefault();
      $('.playing  .audio-list-button .playing-line').removeAttr('style');
      $(this).addClass('playing').siblings().removeClass('playing');
      audio.load($('a', this).attr('data-src'));
      audio.play();
    });

    $(document).on('click','.play-pause .prev, .play-pause .next',function(){
    	$('.audiojs').removeClass('error loading playing');
    	$('.playing  .audio-list-button .playing-line').removeAttr('style');
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
    	/*if(index>3 && !$('.show-all-audio-list').is('.active')){
    		$('.show-all-audio-list').click();
    	}
    	if(index<4 && $('.show-all-audio-list').is('.active')){
    		$('.show-all-audio-list').click();
    	}*/
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

function showHideTextAudioList(){
	$(document).on('click','.show-all-audio-list',function(){
		if($(this).is('.active')){
			
			$('.text-audio-list').slideUp(300);
			$(this).text('ПОСМОТРЕТЬ ПОЛНЫЙ РЕПЕРТУАР').removeClass('active');
		}
		else{
			$('.text-audio-list').slideDown(300);
			$(this).text('СВЕРНУТЬ СПИСОК').addClass('active');
		}
	});
};

function searchInDatepicker(){
	var error = $('<div class="sorry-date-text">Извините дата занята</div>');
	var callUs = $('<div class="sorry-date-text">Перезвоните нам</div>')

	var mounth = $('.ui-datepicker-calendar tr:nth-child(2) td').data('month');
	//console.log(mounth);
	var indexElem = null;

	for(var i=0;i<calendar.length;i++){
		if(mounth == calendar[i].mounthNum){
			indexElem = i;
			break;
		}
	}

	if(indexElem!= null){
		for(var i=0;i<calendar[indexElem].mounthDays.length;i++){
			var date = calendar[indexElem].mounthDays[i].dayNum;

			if(calendar[indexElem].mounthDays[i].dayType=='sorry'){
				$('.ui-datepicker-calendar td:not(.ui-state-disabled)').eq(date-1).addClass('no-concert').prepend(error);
			}
			else if(calendar[indexElem].mounthDays[i].dayType=='maybe'){
				$('.ui-datepicker-calendar td:not(.ui-state-disabled)').eq(date-1).addClass('maybe-concert').prepend(callUs);
			}
		}
	}
};

function sinhTableWithCalendar(){

	var timerId = null;

	searchInDatepicker();

	$(document).on('click','.ui-datepicker-next, .ui-datepicker-prev',function(){
		clearTimeout(timerId);
		timerId = setTimeout(
			function(){
				searchInDatepicker();
			},300									
		);
	});
};

function addTableElems(){

	for(var i=0;i<table.length;i++){
		var date = '<tr><td>'+table[i].dayNum+' '+table[i].mounthName+'</td>';
		var time = '<td>'+table[i].times+'</td>';
		var town = '<td>'+table[i].town+'</td>';
		var place = '<td>'+table[i].place+'</td></tr>';
		var tr = date+time+town+place;
		$('.section-twelfth-table-wrap tbody').append(tr);
	}

};

/* DOCUMENT READY  */
$(document).ready(function() {
	$(".fancybox").fancybox();
	$(".fancybox-video").fancybox({
		maxWidth	: 1280,
		maxHeight	: 720,
		padding:0,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	modernize();
	if($(window).width()<=1024){circleCanvas();}
	animated();
	removeTitleVideo();

	inputNums();
	datepickerInit();
	toggleSlide();
	audioInit();
	//showHideAudioList();

	showHideTextAudioList();

	sinhTableWithCalendar();
	addTableElems();

});

$(window).load(function(){


});

$(window).resize(function() {
	if($(window).width()>767){
		$('.section-tenth-item-body').removeAttr('style');
		$('.section-tenth-item-title').removeClass('active');
	}

	//showHideHeight();
});

$(window).scroll(function(){


});
