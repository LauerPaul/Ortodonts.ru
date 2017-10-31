// If logStatus = true - console log all actions
var logStatus = true,

// Application logic
app = {
	init: function(){
		app.developer('load', 'app.init()', 'Загрузка основной функции.');
		app.data_js();
	},
	developer: function(action, func, text, log_status = logStatus){
		// LOG DEVELOPER MODE
		if(log_status){
			var time_format = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
			console.log('('+ time_format +') ' + action + ' - ' + func + ' - ' + text);
		}
	},
	data_js: function(){
		app.developer('load', 'app.data_js()', 'Загрузка основной функции data-js-init.');
		jQuery(document).ready(function($) {
			// Data init js
			if($(document).find('[data-js-init]').length > 0){
				app.developer('init', 'app.data()', 'Инициализация data-js-init.');
				for (var i = 0; i < $(document).find('[data-js-init]').length; i++) {
					if (typeof(eval($($('[data-js-init]')[i]).attr('data-js-init')+'.init')) !== 'undefined') {
						var this_ = $($('[data-js-init]')[i]);
						eval($($('[data-js-init]')[i]).attr('data-js-init')).init(this_);
						app.developer('init', 'app.data()', 'Инициализация data-js-init - '+$($('[data-js-init]')[i]).attr('data-js-init')+'.init()');
					}else{
						app.developer('!!! ERROR !!!', 'app.data()', 'Инициализация - функция '+$($('[data-js-init]')[i]).attr('data-js-init')+'.init() не найдена.');
					}
				}
			}
		});
	}
}

function global_function(obj, func = function(){}, call_back = false){
	app.developer('new Object', 'global_function()', 'Создание нового объекта.');
	if(logStatus) console.log(obj);
	var this_ = this;
	this_.obj = obj;
	this_.func = func;
	this_.call_back = call_back;
	this_.mouse_over = function(func_ = this_.func){
		app.developer('load method Object', 'global_function() - .mouse_over', 'Вызов метода объекта.');
		$(this_.obj).mouseover(function(event){
			app.developer('mouseover', 'global_function()', 'Событие наведения курсора на объект.');
			// if(logStatus) console.log(this);
			func_(this);
		});
	};
	this_.mouse_out = function(func_ = this_.func){
		app.developer('load method Object', 'global_function() - .mouse_out', 'Вызов метода объекта.');
		$(this_.obj).mouseout(function(event){
			app.developer('mouseout', 'global_function()', 'Событие ухода курсора из объекта.');
			// if(logStatus) console.log(this);
			func_(this);
		});
	};
}
/*___________-----------------------------------------------------------------------------_________________*/



$(document).ready(function($) {
	app.init();
	$("img.lazy").lazyload();
});

var wow = {
	init: function(){
		new WOW().init();
	}
},
FeedBackButton = function(){
	$(document).scroll(function(){
		var bodyTop = $('body').scrollTop(),
			topSection = $('.topSection').offset().top,
			btnContact = $('.button-contact');
		
		if(bodyTop > topSection){
			btnContact.addClass('visible');
		}
		else{
			btnContact.removeClass('visible');
		}
	});
},

indexPage = {
	init: function(){
		app.developer('load', 'indexPage.init()', 'Вызов функции объекта.');
		var bodyTop,
			aboutTop = $('.about-section-index').offset().top,
			feedBackSection = $('.faq-section-index').offset().top,
			btnContact = $('.button-contact');

		$(document).ready(function(){
			indexPage.services();
		}).scroll(function(){
			bodyTop = $('body').scrollTop();
			
			if(bodyTop > aboutTop && bodyTop < feedBackSection){
				btnContact.addClass('visible');
			}
			else{
				btnContact.removeClass('visible');
			}
		});
	},
	services: function(){
		app.developer('load', 'indexPage.services()', 'Вызов функции объекта.');
		var item_name = 'section.services-section-index .service-case',
			services_item = $(document).find(item_name);
			if(services_item.length > 0){
			var hover_item = new global_function($(item_name));
			
			// FUNCTION ON MOUSEOVER
			var func_hover = function addClassHover(this_){
				$(item_name).addClass('opacity');
				$(this_).removeClass('opacity');
			}		
			// FUNCTION ON MOUSEOUT
			var func_out = function addClassHover(this_){
				$(item_name).removeClass('opacity');
			}			
			
			hover_item.mouse_over(func_hover);
			hover_item.mouse_out(func_out);
		}
	},
	scroll_contacts: function(){
		app.developer('click', 'indexPage.scroll_contacts()', 'Вызов функции объекта.');
		var feedBackSection = $('.feedback-section'),
			feedTop = feedBackSection.offset().top,
			feedPaddingTop = feedBackSection.css('padding-top')
		$('body').animate({scrollTop: feedTop + parseInt(feedPaddingTop) - 20}, 1000);
	},
	scroll_down: function(){
		app.developer('click', 'indexPage.scroll_down()', 'Вызов функции объекта.');
		var aboutTop = $('.about-section-index').offset().top;
		$('body').animate({scrollTop: aboutTop}, 1000);
	}
},

// about
item,
active,
itemLength,
wrap,
settings,

AboutPage = {
	init: function(){
		app.developer('load', 'AboutPage.init()', 'Вызов функции.');
		item = $('.certificates-item'),
		active = $('.certificates-item.active'),
		itemLength = item.length,
		wrap = $('.wrapper-slide'),
		settings={
			item: item.outerWidth(true),
			active: active.outerWidth(true)
		};
		
		FeedBackButton();
		// AboutPage.wrapSlide();
		AboutPage.slick('.wrapper-slide');
	
		// $(window).resize(function(event) {
		// 	AboutPage.wrapSlide();
		// 	$('.wrapper-slide').css('margin-left', 0);
		// });
	},
	slick: function(obj){
		$(obj).slick({
		  centerMode: true,
		  centerPadding: '30px',
		  slidesToShow: 3,
          arrows: true,
          nextArrow: '<div class="right-arrow arrow-item"><i class="fa fa-long-arrow-right"></i></div>',
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1
		      }
		    }
		  ]
		});
	},
	wrapSlide: function(){
			var settings_ ={
				itemS: parseInt(item.css('width')),
				activeS: parseInt(active.css('width')),
				marginS: parseInt(item.css('margin-left'))
			},
			wrapW = (itemLength - 1) * (settings_.itemS + (settings_.marginS * 2)) + (settings_.activeS + (settings_.marginS * 2));
			wrap.css('width', wrapW).addClass('d-flex');
	},
	slider: function(action){
		var	wrap = $('.wrapper-slide'),
			wrapMarg = $('.wrapper-slide').css('margin-left');

		if(action == 'next'){
			for (var i = 0; i < itemLength; i++) {
				if($($(item)[i]).hasClass('active')){
					if(itemLength !== $($(item)[i]).index() + 1){
						$($(item)[i]).removeClass('active');
						$($(item)[i+1]).addClass('active');
						wrap.css('margin-left', parseInt(wrapMarg) - parseInt(settings.item));
						
						$('.left-arrow.arrow-item').removeClass('disabled');

						if(i+2 == itemLength){
							$('.right-arrow.arrow-item').addClass('disabled');
						}
						else{
							$('.right-arrow.arrow-item').removeClass('disabled');
						}
					}

					break
				}
			}
		}
		else if(action == 'prev'){
			for (var i = 0; i < itemLength; i++) {
				if($($(item)[i]).hasClass('active')){
					if(0 !== $($(item)[i]).index()){
						$($(item)[i]).removeClass('active');
						$($(item)[i-1]).addClass('active');
						wrap.css('margin-left', parseInt(wrapMarg) + parseInt(settings.item))

						$('.right-arrow.arrow-item').removeClass('disabled');

						if(i-1 == 0){
							$('.left-arrow.arrow-item').addClass('disabled');
						}
						else{
							$('.left-arrow.arrow-item').removeClass('disabled');
						}
					}

					break
				}
			}
		}

	}
},

BlogPage = {
	init: function(){
		app.developer('load', 'BlogPage.init()', 'Вызов функции.');
		// Search blog focus
		$(document).on('click','.search-case',function(){
			if(!$(this).hasClass('open')){searchFousBlog()}
		})
		// Search blog focusout
		.on('blur','.search-case input[type="text"]',function(){
			if($(this).val() == '' || $(this).val() == ' '){searchFousBlog()}
		})
		// Current open
		.on('click','.filters-case',function(){
			$(this).addClass('open')
		})
		// Current hide
		.on('click',function(e){
			var current_ = $('.filters-case');
			if (current_.has(e.target).length === 0){current_.removeClass('open');}
		});
		$(document).scroll(function(){fixedColumn('.column-right','.category-list-blog');});

		function searchFousBlog(){
			var case_ = $('.search-case');
			if(case_.hasClass('open')){case_.removeClass('open')}
			else {case_.addClass('open').find('input').focus()}
		}
	}
},

PortfolioPage = {
	init: function(){
		app.developer('load', 'PortfolioPage.init()', 'Вызов функции.');
		FeedBackButton();
		// Wrapper category open
		$(document).on('click', '.portfolio-category.hide .title-category', function(){
			$(this).parents('.hide').removeClass('hide');
		})
		// show popup gallery
		.on('click', '.item-portfolio', function(){
			PortfolioPage.popupGallery($(this).find('img'));
		})
		// close gallery popup
		.on('click', '.wrapper-popup-profile .icon-close', function(){
			$('.wrapper-popup-profile, .photo-wrapper').animate({'opacity': 0}).hide();
		})
		// control gallery popup
		.on('click', '.wrapper-popup-profile .control-element', function(){
			var id = '#' + $(this).attr('data-next-id');
			PortfolioPage.popupGallery($(id), true);
		});
	},
	popupGallery: function(obj, control){
		var control = typeof(control) == 'undefined' ? false : true,
			gallery = $('.wrapper-popup-profile'),
			img_gallery = gallery.find('.photo-wrapper').find('img'),
			desc_gallery = gallery.find('.photo-description');

		if(control){
			img_gallery.animate({'opacity': 0});
			desc_gallery.animate({'opacity': 0});
		}

		var img = $(obj),
			src = img.attr('data-big-src'),
			alt = img.attr('alt'),
			control_n = $('.control-element.next'),
			control_p = $('.control-element.prev'),
			curr_id = img.attr('id'),
			curr_prefix = $(obj).parents('.portfolio-category').attr('id'),
			curr_index;

		if(control){
			img_gallery.animate({'opacity': 1});
			desc_gallery.animate({'opacity': 1});

			setTimeout(function(){
				img_gallery.attr('src', src);
				desc_gallery.text(alt);
			},400);
		}
		else {
			img_gallery.attr('src', src);
			desc_gallery.text(alt);
		
			gallery.animate({'opacity': 1}).show(function(){
				$('.photo-wrapper').animate({'opacity': 1}).show('slow');
			});
		}


		curr_index = parseInt(curr_id.replace(curr_prefix + '_',''));

		var next_el = curr_index + 1,
			prev_el = curr_index - 1;

		controlEl(next_el, control_n);
		controlEl(prev_el, control_p);

		function controlEl(a, b){
			if($(document).find('#' + curr_prefix + '_' + a).length > 0){
				b.removeClass('ended');
				b.attr('data-next-id', curr_prefix + '_' + a);
			}
			else {
				b.addClass('ended');
				b.attr('data-next-id', '');
			}
		}
	},
},
// Contacts page
map,
ContactsPage = {
	init: function() {
	},
	googleMap: function(){
		var clinic = {lat: 55.728524, lng: 37.645579};

		map = new google.maps.Map(document.getElementById('map'), {
		  center: clinic,
		  zoom: 17
		});

		// Add a style-selector control to the map.
        var styleControl = document.getElementById('style-selector-control');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

        // Set the map's style to the initial value of the selector.
        map.setOptions({styles: ContactsPage.googleMapStyle});
		
		var marker = new google.maps.Marker({
          position: clinic,
          map: map,
          icon: 'images/icon/googleMarker.png'
        });
	},
	googleMapStyle: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
},


fixedColumn = function(a,b){
	app.developer('action scroll', 'fixedColumn()', 'Фиксированное меню');
	var pageH = $(document).outerHeight(),
		Lb = $(a), // column 1
		LbH = Lb.outerHeight(),
		LbT = Lb.offset().top,
		fixed = $(b), //column fixed
		fixedH = fixed.outerHeight(),
		result = pageH - (LbH + LbT),
		maxBottom = pageH - LbT - (result + fixedH),
		offset = $(document).scrollTop();
		value_ = offset <= LbT ? 0 : (offset - LbT < maxBottom ? offset - LbT : maxBottom);
		fixed.css({
			'top' : value_
		});
}