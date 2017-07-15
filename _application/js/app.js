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