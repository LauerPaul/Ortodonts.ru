// If logStatus = true - console log all actions
var app_config = {
	log_status: true,
},
logStatus = true,
// Application logic
app = {
	init: function(){
		app.developer('load', 'app.init()', 'Загрузка основной функции.');
		app.data_js();
	},
	developer: function(action, func, text, log_status, type){
		type = typeof(type) !== 'undefined' ? type : 'info';
		if(typeof log_status == 'undefined') log_status = app_config.log_status; 
		// LOG DEVELOPER MODE
		// If log_status = true - console log all actions
		if(log_status && logStatus){
			var time_format = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
			switch(type) {
				case 'info':
					console.log('%c💁 Info', "color: #3598db; font-weight: bold; font-size: 10px;");
					console.group();
						console.log('%c('+ time_format +') ' + action + ' - ' + func, "background: #3598db; color: white; padding: 3px 10px; font-size: 10px;");
						console.info('%c'+text, "background: #666; color: white; padding: 3px 12px; padding-left: 10px; font-size: 11px;");
						// console.trace();
					console.groupEnd();
					break;
				case 'success':
					console.log('%c👌 Success', "color: #5fbd5f; font-weight: bold; font-size: 10px;");
					console.group();
						console.log('%c('+ time_format +') ' + action + ' - ' + func, "background: #5fbd5f; color: white; padding: 3px 10px; font-size: 10px;");
						console.info('%c'+text, "background: #666; color: white; padding: 3px 12px; padding-left: 10px; font-size: 11px;");
						// console.trace();
					console.groupEnd();
					break;
				case 'error':
					console.log('%c⛔ ERROR!!!', "color: #c23f35; font-weight: bold; font-size: 10px;");
					console.group();
						console.log('%c('+ time_format +') ' + action + ' - ' + func, "background: #c23f35; color: white; padding: 3px 10px; font-size: 10px;");
						console.warn('%c'+text, "background: #666; color: white; padding: 3px 12px; padding-left: 10px; font-size: 11px;");
					console.groupEnd();
					break;
			}
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