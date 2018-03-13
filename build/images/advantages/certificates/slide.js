// ------------------------------------------------------------------------------------------------
// ----------------------------------- SLIDE CAROUSEL ---------------------------------------------
// ------------------------------------------------------------------------------------------------
app.developer('init', 'slide.js', 'include success');

$(document).ready(function(){
	$('input#status').on('ifUnchecked', function(event){
		$('input#view').prop('disabled', true).iCheck('update');
	});
	$('input#status').on('ifChecked', function(event){
		$('input#view').prop('disabled', false).iCheck('update');
	});
	$('input#button').on('ifUnchecked', function(event){
		$('input#view').prop('disabled', true).iCheck('update');
	});
	$('input#button').on('ifChecked', function(event){
		$('input#view').prop('disabled', false).iCheck('update');
	});
	$('input#new_window').on('ifUnchecked', function(event){
		$('input#view').prop('disabled', true).iCheck('update');
	});
	$('input#new_window').on('ifChecked', function(event){
		$('input#view').prop('disabled', false).iCheck('update');
	});
});

var slide = {
	NEWlide: function(){
		app.developer('init', 'slide.NEWlide()', 'slide.js');

		$('.wrapper-image .image > img').attr('src', success_array.src);
		$('#Modal').modal('hide');
		click.hideCropperModal();

		console.log(success_array.src);
		console.log(success_array.status);

		if(success_array.status == 'Ok'){
			app.notify('success', 'Lauer CMS:', success_array.message);
		}
		else{
			app.notify('danger', 'Lauer CMS:', success_array.message);
		}
	},
	successEDITslide: function(){
		app.developer('init', 'slide.successEDITslide()', 'slide.js');
		app.notify('success', 'Lauer CMS:', success_array.message);

		setTimeout(function(){
			 window.location.href = success_array.link;
			success_array = {};
		}, 1000);
	},
	removeItem: function(object){
		app.developer('init', 'slide.removeItem(object)', 'slide.js');

		var url_ = $(object).attr('data-url'),
			confirmText = $(object).attr('data-confirm');

		$.confirm({
		    title: 'Lauer CMS:',
		    content: confirmText,
		    icon: 'fa fa-warning',
			type: 'red',
    		theme: 'modern',
    		backgroundDismiss: false,
		    backgroundDismissAnimation: 'glow',
		    buttons: {
		        yes: {
		        	keys: ['enter'],
		        	btnClass: 'btn-danger',
		        	action: function () {
						app.developer('AJAX', 'slide.removeItem(object)', 'url - ' + url_);

						jAjax.set("URL", url_).set("dataType", "json").set("type", "POST").load(function(success){
							app.developer('AJAX', 'slide.removeItem(object)', 'request - SUCCESS');
							console.log(success);
							$(object).parents('li.list-group-item').remove();
							app.notify('success', 'Lauer CMS:', success.message);
						});
		        	}
		    	},
		        no: {keys: ['esc']}
		    }
		});
	},
	loadSlidePreview: function(object){
		app.developer('init', 'slide.loadSlidePreview()', 'slide.js');

		var url_ = $(object).attr('data-url');

		app.developer('AJAX', 'slide.loadSlidePreview()', 'url - ' + url_);

		jAjax.set("URL", url_).set("dataType", "json").set("type", "POST").load(function(success){
			app.developer('AJAX', 'slide.loadSlidePreview()', 'request - SUCCESS');
			console.log(success);

			var parent = '.wrapper-preview';

			$(document).find(parent +' .post-preview').hide().remove();

			$.when(app.print_result(parent, success.response_html, 'append')).then(function(){
				var	categories_block = $(document).find(parent +' .post-preview');

				if(categories_block.length > 0){
					categories_block.show();
				}
			});
		});
	}
}