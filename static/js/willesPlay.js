$(function() {
	var last_percentage = 0;
	var currentTime = $('.timebar .currentTime'); //当前时间
	var duration = $('.timebar .duration'); //总时间
	var progress = $('.timebar .progress-bar'); //进度条
	var volumebar = $('.volumeBar .volumewrap').find('.progress-bar');

	// playPause.on('click', function() {
	// 	playControl();
	// });
	// $('.playContent').on('click', function() {
	// 	playControl();
	// }).hover(function() {
	// 	$('.turnoff').stop().animate({
	// 		'right': 0
	// 	}, 500);
	// }, function() {
	// 	$('.turnoff').stop().animate({
	// 		'right': -40
	// 	}, 500);
	// });

	// $(window).keyup(function(event){
	// 	event = event || window.event;
	// 		if(event.keyCode == 32)playControl();
	// 		if(event.keyCode == 27){
	// 		$('.fullScreen').removeClass('cancleScreen');
	// 		$('#willesPlay .playControll').css({
	// 			'bottom': -48
	// 		}).removeClass('fullControll');
	// 		};
	// 	event.preventDefault();
	// });
	
	
	//全屏
	// $('.fullScreen').on('click', function() {
	// 	if ($(this).hasClass('cancleScreen')) {
	// 		if (document.exitFullscreen) {
	// 			document.exitFullscreen();
	// 		} else if (document.mozExitFullScreen) {
	// 			document.mozExitFullScreen();
	// 		} else if (document.webkitExitFullscreen) {
	// 			document.webkitExitFullscreen();
	// 		}
	// 		$(this).removeClass('cancleScreen');
	// 		$('#willesPlay .playControll').css({
	// 			'bottom': -48
	// 		}).removeClass('fullControll');
	// 	} else {
	// 		if (playVideo[0].requestFullscreen) {
	// 			playVideo[0].requestFullscreen();
	// 		} else if (playVideo[0].mozRequestFullScreen) {
	// 			playVideo[0].mozRequestFullScreen();
	// 		} else if (playVideo[0].webkitRequestFullscreen) {
	// 			playVideo[0].webkitRequestFullscreen();
	// 		} else if (playVideo[0].msRequestFullscreen) {
	// 			playVideo[0].msRequestFullscreen();
	// 		}
	// 		$(this).addClass('cancleScreen');
	// 		$('#willesPlay .playControll').css({
	// 			'left': 0,
	// 			'bottom': 0
	// 		}).addClass('fullControll');
	// 	}
	// 	return false;
	// });
	//音量
	// $('.volume').on('click', function(e) {
	// 	e = e || window.event;
	// 	$('.volumeBar').toggle();
	// 	e.stopPropagation();
	// });
	// $('.volumeBar').on('click mousewheel DOMMouseScroll', function(e) {
	// 	e = e || window.event;
	// 	volumeControl(e);
	// 	e.stopPropagation();
	// 	return false;
	// });
	$('.timebar .progress').mousedown(function(e) {
		e = e || window.event;
		updatebar(e.pageX);
	});

	function forward(angle) {
		$.ajax ({
			type: 'GET',
			url: '/forward',
			data: {'angle': angle},
			success: function(_callback){$('#text').text(_callback);}
		});
	}

	function backward(angle) {
		$.ajax ({
			type: 'GET',
			url: '/backward',
			data: {'angle': angle},
			success: function(_callback){$('#text').text(_callback);}
		});
	}

	var updatebar = function(x) {
		var positions = x - progress.offset().left; //Click pos
		var percentage = 100 * positions / $('.timebar .progress').width();
		var angle = percentage - last_percentage;
		//Check within range
		if (angle > 0) {
			forward(angle);
		}
		if (angle < 0) {
			backward(-angle);
		}

		last_percentage = percentage;
		progress.css('width', percentage + '%');
		
	};

	//关灯
	$('.btnLight').click(function(e) {
		e = e || window.event;
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('body').append('<div class="overlay"></div>');
			$('.overlay').css({
				'position': 'absolute',
				'width': 100 + '%',
				'height': $(document).height(),
				'background': '#000',
				'opacity': 1,
				'top': 0,
				'left': 0,
				'z-index': 999
			});
			$('.playContent').css({
				'z-index': 1000
			});
			$('.playControll').css({
				'bottom': -48,
				'z-index': 1000
			});

			$('.playContent').hover(function() {
				$('.playControll').stop().animate({
					'height': 48,
				},500);
			}, function() {
				setTimeout(function() {
					$('.playControll').stop().animate({
						'height': 0,
					}, 500);
				}, 2000)
			});
		} else {
			$(this).addClass('on');
			$('.overlay').remove();
			$('.playControll').css({
				'bottom': 0,
			});
		}
		e.stopPropagation();
		e.preventDefault();
	});
});

//秒转时间
function formatSeconds(value) {
	value = parseInt(value);
	var time;
	if (value > -1) {
		hour = Math.floor(value / 3600);
		min = Math.floor(value / 60) % 60;
		sec = value % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			time = day + "day " + hour + ":";
		} else time = hour + ":";
		if (min < 10) {
			time += "0";
		}
		time += min + ":";
		if (sec < 10) {
			time += "0";
		}
		time += sec;
	}
	return time;
}