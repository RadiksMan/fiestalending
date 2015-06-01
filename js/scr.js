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

});

$(window).load(function(){


});

$(window).resize(function() {

});

$(window).scroll(function(){


});
