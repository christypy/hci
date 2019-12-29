!(function ($) {

	document.documentElement.style.overflowY = 'hidden';

	var Rhythm = function (element, options) {

		this.options = options;
		this.element = $(element);
		this.targetBtn = $('#target-btn');
		this.sizey = 2; // 背景由小變大
		this.scroe = 0; // 分數
		this.number = null; // 目標數
		this.sound = null; // 控制音樂
		this.num = 0; // 分數
		this.sy = 10; // Y軸速度

		this.init(this.element);
	}

	// 初始化
	Rhythm.prototype.init = function (element) {
		var _self = this;
		var gameNum = 5; //五秒倒數
		var startGame = function () {
			$('.startGame').css(
				'background-image', 'url(./images/down' + gameNum + '.png)'
			);
			gameNum--;
			if (gameNum == -1) {
				$('.startGame').hide();
				var _scroeH = '<div id="score" class="score">分數：<span>' + _self.scroe + '</span></div>',
					_countdowmH = ' <div class="countdown">' + _self.options.Countdown + '</div>';
				element.append(_scroeH).append(_countdowmH);
				_self.cuntdown();
				startGame = null;
			}
			setTimeout(startGame, 1000)
		}
		startGame();
	}

	//遊戲開始
	Rhythm.prototype.start = function () {
		var _self = this;

		var startAuto = function () {
			_self.move();
			if (_self.options.Countdown == 1) {

				if (_self.scroe < 20) {
					var _html = '<a href="javascript:;" class="close">x</a>' + '<p>請加把勁</p>' + '<P>你獲得</P>'  + '<P>'+ _self.scroe + '分</P>';
					
				} else if (_self.scroe > 20 && _self.scroe < 40) {
					var _html = '<a href="javascript:;" class="close">x</a>' + '<p>Wow</p>' + '<P>恭喜你</P>' + '<P >獲得' + _self.scroe + '分</P>';

				} else if(_self.scroe >40) {
					var _html = '<a href="javascript:;" class="close">x</a>' + '<p>你超厲害的</p>' + '<P>恭喜你</P>' + '<P >獲得' + _self.scroe + '分</P>';

				}
				$('.msg').html(_html).show();

				$('.mask').show();

				$('.msg').on('click', 'a.close', function (event) {
					$(this).parent().html('').hide();
					$('.mask').hide();
					window.location = window.location;
				});
				_self.start = null;
				this.sound.pause();
			}
			setTimeout(startAuto, _self.options.startT)
		}
		startAuto()

	}

	//隨機選擇軌道
	Rhythm.prototype.randoms = function () {
		var _self = this;
		_self.num++;
		_self.number = (1 + Math.random() * (4 - 1)).toFixed(0);
		var track = $('.track' + _self.number);
		var _html = '<div class="target" data-action="' + _self.number + '" id="target' + _self.num + '" ></div>';
		track.append(_html);
		return _self.num;
	}

	//目標落下
	Rhythm.prototype.move = function () {
		var _self = this;
		var idNum = _self.randoms();
		var y = 0; //y軸
		var size = 0; //y軸
		var thisH = $('.btn' + _self.number).offset().top,
			btnH = _self.targetBtn.find('.btn').height() / 2;

		var time = setInterval(function () {
			y += _self.sy;
			size += _self.sizey;
			$('#target' + idNum).css({
				'top': y + 'px',
				'background-size': size + '%'
			});
			if (y > thisH + btnH) {
				var shorT = setTimeout(function () {
					$('#target' + idNum).remove();
					shorT = null;
				}, 200)
				clearInterval(time);
			}
			time = null;
		}, _self.options.speed)

	}

	// 绑定事件
	Rhythm.prototype.events = function () {
		var _self = this;
		var touchStatus = false,
			u = navigator.userAgent;
		console.log('u', u)
		if (u.indexOf('iPhone') > -1 || u.indexOf('iPod') > -1 || u.indexOf('Android') > -1) {
			touchStatus = true;
		}
		var Eventfun = function () {
			console.log('evntfun start')
			var _left = $(this);
			var index = _left.index() + 1;
			var subTarget = $('.track' + index).find('.target');
			subTarget.each(function (page, elem) {
				if ($(elem).offset().top > _left.offset().top - _left.height() / 2 - 30) {
					_left.addClass('btnHigh');
					$(elem).remove();
					$('.track' + index).addClass('trackHigh');
					setTimeout(function () {
						_left.removeClass('btnHigh');
						$('.track' + index).removeClass('trackHigh');
						
					}, 100)
					_self.scroe++;
					$('#score').find('span').html(_self.scroe);
				}
			})
		}
		if (touchStatus) {

			_self.targetBtn.on('touchstart', '.btn', Eventfun);


		} else {
			_self.targetBtn.on('click', '.btn', Eventfun);
		}
		_self.music();
	}

	$(document).keydown(function (event) {
		switch (event.keyCode) {
			case 68:
				$('#d1')[0].play()
				$('#target-btn').get(0).click();
				$('.btn').get(0).click();
				// console.log('按下了D');
				return;
			case 70:
				$('#d2')[0].play()
				$('#target-btn').get(0).click();
				$('.btn2').get(0).click();
				// console.log('按下了F');
				return;
			case 74:
				$('#d3')[0].play()

				$('#target-btn').get(0).click();
				$('.btn3').get(0).click();
				// console.log('按下了J');
				return;
			case 75:
				$('#d4')[0].play()

				$('#target-btn').get(0).click();
				$('.btn4').get(0).click();

				// console.log('按下了K');
				return;

		}

	});


	//音樂
	Rhythm.prototype.music = function () {
		var _self = this;
		this.sound = new Howl({
			urls: [_self.options.musicUrl]
		}).play();
	}

	//倒數計時開始
	Rhythm.prototype.cuntdown = function () {
		var _self = this;
		_self.start();
		_self.events();
		var _CountdownT = function () {
			_self.options.Countdown--;

			if (_self.options.Countdown == -1) {
				_CountdownT = null;
			} else {
				$('.countdown').html(_self.options.Countdown);
			}
			setTimeout(_CountdownT, 1000)
		};
		_CountdownT();
	}

	$.fn.Rhythm = function (options) {

		
		var element = this;
		var opts = $.extend({}, $.fn.Rhythm.defaults, options);
		return this.each(function () {
			new Rhythm(this, options);
		})
	}


	$.fn.Rhythm.defaults = {
		musicUrl: '', //音樂
		speed: 100, //下落速度
		startT: 1000, //目標出現時間
		Countdown: 60 //遊戲長度
	};

}(Zepto))