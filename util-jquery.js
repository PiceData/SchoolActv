$.fn.onenter = function(callback) 
{
	$(this).keypress(function( event ) 
	{
		var code = event.keyCode ? event.keyCode : event.which;
		if ( code == 13 ) 
		{
			callback.call(this);
			return false;
		}
	});
};

$.fn.boxoverlay = function(status , bg)
{
	var options = 
	{
		message : '',
		status : status,
		successTimeout : 2000,
		errorTimeout : 2000,
		close : false
	};
	
	var $this = $(this);
	var id = $this.attr('id');
	if(!id)
	{
		id = 'div_' + get_temp_id();
		$this.attr('id' , id);
	}
	
	if(options.status == 'processing')
	{
		if(bg == true)
		{
			var $overlay = $('<div class="box_overlay_container" id="overlay_'+ id +'"></div>');
			$this.css('position' , 'relative').append($overlay);
			id = "overlay_" + id;
		}
		/*
		var spin_opts = 
		{
			lines : 13, // The number of lines to draw
			length : 7, // The length of each line
			width : 4, // The line thickness
			radius : 10, // The radius of the inner circle
			corners : 0,
			rotate : 90, // The rotation offset
			color : '#000', // #rgb or #rrggbb
			speed : 1, // Rounds per second
			trail : 60, // Afterglow percentage
			shadow : false, // Whether to render a shadow
			hwaccel : false, // Whether to use hardware acceleration
			className : 'spinner', // The CSS class to assign to the spinner
			zIndex : 2e9, // The z-index (defaults to 2000000000)
			top : 'auto', // Top position relative to parent in px
			left : 'auto' // Left position relative to parent in px
		};
		
		var spinner = new Spinner(spin_opts);
		spinner.spin(document.getElementById(id));
		$this.data('spinner' , spinner);
		/**/

		$('#'+id).html('<div class="veggie-spinner"></div>');
	}	
	else if(options.status == 'success')
	{
		$('#'+id).find('.veggie-spinner').remove();
		/*
		var spinner = $this.data('spinner');
		spinner.stop();
		/**/
		if(bg == true)
		{
			$('#overlay_' + id).remove();
		}
	}
	
	return $(this);
};

$.fn.async = function(status)
{
	if(status == 'loading')
	{
		var counter = $(this).data('async-counter');
		counter = counter ? counter : 0; counter ++;
		$(this).data('async-counter' , counter);
	}	
	else if(status == 'loaded')
	{
		var counter = $(this).data('async-counter');
		counter = counter ? counter : 0; counter --;
		$(this).data('async-counter' , counter);
		
		if(counter == 0)
		{
			$(this).trigger('async-callback');
		}	
	}
};

$.fn.serializeObject = function()
{
	var $form = $(this);
   	var o = {};
   	var a = this.serializeArray();
   	
	$.each(a, function() {
	   if (o[this.name]) {
	       if (!o[this.name].push) {
	           o[this.name] = [o[this.name]];
	       }
	       o[this.name].push(this.value || '');
	   } else {
	       o[this.name] = this.value || '';
	   }
	});

	$('input:checkbox' , $form).each(function() 
	{		
		var name = $(this).attr('name');
		var value = $(this).is(':checked') ? $(this).val() : "";
		o[name] = value;	
	});

	return o;
};

$.fn.unserializeObject = function(data)
{
	var $form = $(this);
	jQuery.each(data, function (name , value) 
	{
		jQuery("input[name='"+name+"'],select[name='"+name+"'],textarea[name='"+name+"']" , $form).each(function() 
		{
		    switch (this.nodeName.toLowerCase()) 
		    {
		        case "input":
		            switch (this.type) 
		            {
		                case "radio":
		                case "checkbox":
		                    if (this.value==value) 
		                    { 
		                    	jQuery(this).attr('checked' , 'checked');

		                    	if(jQuery(this).hasClass('switch'))
		                    	{
		                    		jQuery(this).trigger('trigger-on');
		                    	}
		                    }
		                    else 
		                    {
		                    	jQuery(this).removeAttr('checked');

		                    	if(jQuery(this).hasClass('switch'))
		                    	{
		                    		jQuery(this).trigger('trigger-off');
		                    	}
		                    }
		                    break;
		                case "hidden":
		                	jQuery(this).val(value);

		                	if(jQuery(this).closest('.file-thumbnail').length > 0)
		                	{
		                		var $file_thumbnail = jQuery(this).closest('.file-thumbnail');
		                		$file_thumbnail.find('img').attr('src' , get_render_url(value));
		                	}	
		                	break;    
		                default:
		                    jQuery(this).val(value);
		                    break;
		            }
		            break;
		        case "select":
		            jQuery("option",this).each(function()
		            {
		                if (this.value==value) { this.selected=true; }
		            });
		            break;
		        case "textarea":
		            jQuery(this).val(value);
		            break;    
		    }
	  	});
	});  	
};
(function($){
	$.extend({
		cssFile: function (f, m){
			$('<link>')
				.attr('href', f)
				.attr('type', 'text/css')
				.attr('rel', 'stylesheet')
				.attr('media', m || 'screen')
				.appendTo('head');
		},
		/*
		isArray: function (arr){
			if (arr && typeof arr == 'object'){
				if (arr.constructor == Array){
					return true;
				}
			}
			return false;
		},
		/**/
		arrayMerge: function (){
			var a = {};
			var n = 0;
			var argv = $.arrayMerge.arguments;
			for (var i = 0; i < argv.length; i++){
				if ($.isArray(argv[i])){
					for (var j = 0; j < argv[i].length; j++){
						a[n++] = argv[i][j];
					}
					a = $.makeArray(a);
				} else {
					for (var k in argv[i]){
						if (isNaN(k)){
							var v = argv[i][k];
							if (typeof v == 'object' && a[k]){
								v = $.arrayMerge(a[k], v);
							}
							a[k] = v;
						} else {
							a[n++] = argv[i][k];
						}
					}
				}
			}
			return a;
		},
		count: function (arr){
			if ($.isArray(arr)){
				return arr.length;
			} else {
				var n = 0;
				for (var k in arr){
					if (!isNaN(k)){
						n++;
					}
				}
				return n;
			}
		},
		log: function (msg){
			if (window.console)
				console.log(msg);
			else
				alert(msg);
		}
	});
	$.fn.extend({
		serializeAssoc: function (){
			var o = {
				aa: {},
				add: function (name, value){
					var tmp = name.match(/^(.*)\[([^\]]*)\]$/);
					if (tmp){
						var v = {};
						if (tmp[2])
							v[tmp[2]] = value;
						else
							v[$.count(v)] = value;
						this.add(tmp[1], v);
					}
					else if (typeof value == 'object'){
						if (typeof this.aa[name] != 'object'){
							this.aa[name] = {};
						}
						this.aa[name] = $.arrayMerge(this.aa[name], value);
					}
					else {
						this.aa[name] = value;
					}
				}
			};
			var a = $(this).serializeArray();
			for (var i = 0; i < a.length; i++){
				o.add(a[i].name, a[i].value);
			}
			return o.aa;
		}
	});
})(jQuery);