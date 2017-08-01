$(document).ready(function($) {
	app.init();
});

var indexPage = {
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
				console.log(feedBackSection);
				console.log(aboutTop);
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
		var feedBackSection = $('.feedback-section').offset().top;
		$('body').animate({scrollTop: feedBackSection}, 1000);
	},
	scroll_down: function(){
		app.developer('click', 'indexPage.scroll_down()', 'Вызов функции объекта.');
		var aboutTop = $('.about-section-index').offset().top;
		$('body').animate({scrollTop: aboutTop}, 1000);
	}
}