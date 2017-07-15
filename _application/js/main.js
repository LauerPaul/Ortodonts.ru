var indexPage = {
	init: function(){
		app.developer('load', 'indexPage.init()', 'Вызов функции объекта.');
		$(document).ready(function(){
			indexPage.services();
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
	}
}