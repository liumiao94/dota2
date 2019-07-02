/* 鏂伴椈鍒嗛〉妯″潡
	*@parma coverAction 
	*@parma swiper.js 璋冪敤鎻掍欢
	*@parma API '/service/internationalBattlepass2017' 璋冪敤濂栭噾鏁�
	*create by zhangzhibin|yangdezuan 20180625
 */


var coverAction = function(){
	//Dom
	var J_treasureBox = $('#j_video_navbar');

	// IE11浠ヤ笅
	var isIE11 = function() {
		if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) <= 10) {
			return false;
		} else {
			return true;
		}
	}();
	// 鍒ゆ柇鏄惁鏄墜鏈�
	var is_mobile = function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "Windows CE", "BlackBerry");
		var flag = false;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }
		}
		return flag;
	}();

	return  {
		Init: function () {
			this.ResetMobile(); //鍒ゆ柇鏄惁鏄Щ鍔ㄧ
			this.RenderPrize(); //濂栭噾姹�
			this.RenderTreasureBox(); //鑻遍泟妯″潡
			this.MakVideo() //鎾斁video
		},
		ResetMobile: function(){
			if(is_mobile){
				$('.banner video').remove();
				$('body').addClass('m-app');
				$('.play-btn').remove();
			}
		},
		RenderPrize: function(){
			 $.get('/service/internationalBattlepass2017', function(data) {
				$('.money').text('$' + data);
			});
		},
		RenderTreasureBox: function(){
			var mySwiper_treasure;
			var pau = 0; //鎺у埗瑙嗛鏆傚仠
			if(isIE11){
				mySwiper_treasure = new Swiper ('.swiper-container01', {
					direction: 'horizontal', // 鍨傜洿鍒囨崲閫夐」
					loop: false, // 寰幆妯″紡閫夐」
					followFinger : false, //绂佺敤鎷栧姩鍔ㄧ敾
					speed: 300,
					mousewheel: false, //榧犳爣婊戣疆婊戝姩
					on: {
						init: function() {
							var _index = this.activeIndex;
							J_treasureBox.find('li').eq(this.activeIndex).addClass('active').siblings('li').removeClass('active');
							if (is_mobile) return false;
							setTimeout(function(){
								$('.swiper-slide-sub:eq('+_index+') video').get(0).play();
							}, 1000);
						},
						slideChangeTransitionStart: function() {
							var _index = this.activeIndex;
							J_treasureBox.find('li').eq(this.activeIndex).addClass('active').siblings('li').removeClass('active');
							if (is_mobile) return false;
							$('.swiper-slide-sub:eq('+_index+') video').get(0).play();
							$('.swiper-slide-sub:eq('+pau+') video').get(0).pause();
							pau = _index;
						}
					}
				});
			} else {
				mySwiper_treasure = new Swiper('.swiper-container01',{
					speed: 300,
					followFinger : false,
					onFirstInit: function(swiper){
						var _index = swiper.activeIndex;
						J_treasureBox.find('li').eq(_index).addClass('active').siblings('li').removeClass('active');
						if (is_mobile) return false;
						setTimeout(function(){
							$('.swiper-slide-sub').eq(_index).find('video').get(0).play();
						}, 1000);
					
					},
					onSlideChangeStart: function(swiper) {
						var _index = swiper.activeIndex;
						J_treasureBox.find('li').eq(_index).addClass('active').siblings('li').removeClass('active');
						if (is_mobile) return false;
						$('.swiper-slide-sub:eq('+_index+') video').get(0).play();
						$('.swiper-slide-sub:eq('+pau+') video').get(0).pause();
						pau = _index;
					},
				});

			}


			// 鑻遍泟鍒囨崲
			J_treasureBox.on('click', 'li', function() {
				var that = $(this);
				var _index = that.index();
				that.addClass('active').siblings('li').removeClass('active');

				if(isIE11){
					mySwiper_treasure.slideTo(_index, 300, true);
				}else{
					mySwiper_treasure.swipeTo(_index, 300, true);
				}
			});
		},
		MakVideo: function(){
			var play_btn = $('.play-btn');
			var dunVideo = document.getElementById('dunVideo');
			var close = $('.close');
			var btn_hover = $('.btn-hover');

			play_btn.click(function(){
				dunVideo.play();
				$('.mak').show();
			});
			btn_hover.hover(function(){
				play_btn.css('opacity', 1)
			}, function(){
				play_btn.css('opacity', 0)
			});
			close.click(function(){
				dunVideo.pause();
				$('.mak').hide();
			});
		}
	}
};

$(function() {
	new coverAction().Init();
});