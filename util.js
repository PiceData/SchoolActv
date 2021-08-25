function idialog($container , opts)
{
	var options = 
	{
		show : false,
		escape : true,  
		modal: true,
		beforeOpen : function(){},
		afterOpen : function(){},
		beforeClose : function(){},
		afterClose : function(){},
	};
	$.extend(options, opts);
	
	$container.dialog(options);
	
	$container.on('show', function () 
	{
		if($.isFunction(options.beforeOpen))
			options.beforeOpen();
	});
	
	$container.on('shown', function () 
	{
		if($.isFunction(options.afterOpen))
			options.afterOpen();
	});
	
	$container.on('hide', function () 
	{
		if($.isFunction(options.beforeClose))
			options.beforeClose();
	});
			
	$container.on('hidden', function () 
	{
		if($.isFunction(options.afterClose))
			options.afterClose();
	});
}
function iconfirm(message , opts)
{
	var options = {};
	$.extend(options, opts);
	
	var html =  '<div id="alert_confirm"> \
					<div class="alert-content alert-content-confirm clearfix pt-l pb-l pl-l pr-l"> \
						<div class="circle circle-l circle-db fl mr-l"><span class="icon icon-l help"></span></div> \
						<div class="alert-message gray-d confirm fl pt-s"></div> \
					</div> \
				</div>';
	
	$('body').append(html);
	var $container = $('#alert_confirm');
	$container.find('.confirm').html(message);
		
	var dialogOptions = {
		height : 'auto',
		minWidth : 400,
		width : 'auto',
		dialogClass : 'dialog dialog-alert dialog-alert-confirm',
		closeOnEscape : false,
		buttons: {
			"Yes": 
			{
				'text' : "Yes",
				'class': 'btn btn-p',
				'click' : function() {
					$container.dialog('close');
					if($.isFunction(options.onYes)){
						options.onYes();
					}
				}
			},
			"No" : 
			{
				'text' : "No",
				'class': 'btn btn-s',
				'click' : function() {
				
					$container.dialog('close');
					if($.isFunction(options.onNo)){
						options.onNo();
					}
				}
			}
		}
	};
	idialog($container , dialogOptions);        
	$container.dialog('open');        
}

function ialert(message , opts)
{
	var options = {
		showIcon : true
	};
	$.extend(options, opts);
	var html =  '<div id="alert_alert"> \
		<div class="alert-content alert-content-alert clearfix pt-l pb-l pl-l pr-l"> \
			<div class="circle circle-l circle-dy fl mr-l"><span class="icon icon-l alert"></span></div> \
			<div class="alert-message gray-d alert iinfo fl pt-s"></div> \
		</div> \
	</div>';
	
	$('body').append(html);
	var $container = $('#alert_alert');
	$container.find('.alert').html(message);
	if(!options.showIcon)
	{
		$container.find('.iinfo').removeClass('iinfo');
	}
	var dialogOptions = {
		height : 'auto',
		minWidth : 200,
		width : 'auto',
		dialogClass : 'dialog dialog-alert',
		closeOnEscape : false,
		buttons: {
			"Ok": function() {
				$container.dialog('close');
				if($.isFunction(options.onOk)){
					options.onOk();
				}
			}
		}
	};
	idialog($container , dialogOptions);        
	$container.dialog('open');
}

function balert(message , opts, title, button)
{

	title = typeof title !== 'undefined' ? title : "Alert";
	button = typeof button !== 'undefined' ? button : "Close";

	var options = {
		z_index : 9999
	};
	$.extend(options, opts);

	var html = '';
	html += '<div class="modal fade" id="modal_alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: '+ 9999 +'">';
	html += '    <div class="modal-dialog">';
	html += '        <div class="modal-content">';
	html += '            <div class="modal-header">';
	html += '                <h4 class="modal-title" id="myModalLabel" style="color:black;">' + title +'</h4>';
	html += '                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">' + button + '</span></button>';
	html += '            </div>';
	html += '            <div class="modal-body" style="color:black;">';
	html += message;
	html += '            </div>';
	html += '            <div class="modal-footer">';
	html += '                <button type="button" class="btn btn-default" data-dismiss="modal"><span>' + button + '</span></button>';
	html += '            </div>';
	html += '        </div>';
	html += '    </div>';
	html += '</div>';

	$('#modal_alert').remove();
	$('body').append(html);

	$('#modal_alert').modal(options);
	$('#modal_alert').modal('show');

	$('#modal_alert').on('hidden.bs.modal', function (e) 
	{
		if(options.on_close)
		{
			options.on_close();
		}
	});
}

function bdialog(id , title , opts)
{
	var options = {
		
	};
	$.extend(options, opts);

	var html = '';
	html += '<div class="modal fade" id="modal_'+ id +'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	html += '    <div class="modal-dialog modal-lg">';
	html += '        <div class="modal-content">';
	html += '            <div class="modal-header">';
	html += '                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
	html += '                <h4 class="modal-title" id="myModalLabel">'+ title +'</h4>';
	html += '            </div>';
	html += '            <div class="modal-body dev_body">';
	html += '            </div>';
	html += '            <div class="modal-footer">';
	html += '                <button type="button" class="btn btn-primary btn_save">Save</button>';
	html += '                <button type="button" class="btn btn-default btn_cancel" data-dismiss="modal">Cancel</button>';
	html += '            </div>';
	html += '        </div>';
	html += '    </div>';
	html += '</div>';

	$('#modal_' + id).remove();
	$('body').append(html);

	var $modal = $('#modal_' + id);

	$modal.modal(options);
	$modal.on('hidden.bs.modal', function (e) 
	{
		if(options.on_close)
		{
			options.on_close($modal);
		}
	});

	$modal.on('shown.bs.modal', function (e) 
	{
		if(options.on_show)
		{
			options.on_show($modal);
		}
	});

	$('.btn_save' , $modal).click(function()
	{
		if(options.on_save)
		{
			options.on_save($modal);
		}
	});

	return $modal;
}

function bconfirm(message , opts , title , confirm , cancel)
{
	title = title ? title : "Confirm";
	confirm = confirm ? confirm : "Confirm";
	cancel = cancel ? cancel : "Cancel";

	var options = {
		
	};
	$.extend(options, opts);

	var html = '';
	html += '<div class="modal splash fade text-left" id="modal_confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
	html += '    <div class="modal-dialog">';
	html += '        <div class="modal-content">';
	html += '            <div class="modal-header text-left">';
	html += '                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
	html += '                <h3 class="modal-title custom-font" id="myModalLabel">'+ confirm +'</h3>';
	html += '            </div>';
	html += '            <div class="modal-body">';
	html += message;
	html += '            </div>';
	html += '            <div class="modal-footer text-right">';
	html += '                <button type="button" class="btn btn-success  confirm"><span>' + confirm + '</span></button>';
	html += '                <button type="button" class="btn btn-default cancel" data-dismiss="modal"><span>' + cancel + '</span></button>';
	html += '            </div>';
	html += '        </div>';
	html += '    </div>';
	html += '</div>';

	$('#modal_confirm').remove();
	$('body').append(html);

	$('#modal_confirm').on('show.bs.modal', function()
	{
		$('body').addClass('modal-open splash splash-2 splash-ef-11');
		$(this).addClass('splash-2 splash-ef-11');
	});

	$('#modal_confirm').on('hidden.bs.modal', function()
	{
		$('body').removeClass('modal-open splash splash-2 splash-ef-11');
		$(this).removeClass('splash-2 splash-ef-11');
	});

	$('#modal_confirm').modal(options);
	$('#modal_confirm').modal('show');

	$('#modal_confirm .confirm').on('click', function (e) 
	{
		if($.isFunction(options.on_confirm))
		{
			options.on_confirm();
		}
		$('#modal_confirm').modal('hide');
	});

	$('#modal_confirm .cancel').on('click', function (e) 
	{
		if($.isFunction(options.on_cancel))
		{
			options.on_cancel();
		}
		$('#modal_confirm').modal('hide');
	});

	$('#modal_confirm').on('hidden.bs.modal', function (e) 
	{
		if($.isFunction(options.on_close))
		{
			options.on_close();
		}
	});
}

function balertbox($container , type ,  title , message , opts)
{
	var options = {
		
	};
	$.extend(options, opts);

	var html = '';
	html += '<div role="alert" class="alert alert-'+ type +' fade in">';
	html += '    <button data-dismiss="alert" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';
	if(title)
		html += '    <h4>'+title+'</h4><hr/>';

	html += '    <p>'+ message +'</p>';
	html += '</div>';

	$container.append(html);
}


function ioverlay(message , container , opts){

	var options = {
		status : 'processing',
		successTimeout : 3000,
		errorTimeout : 3000,
		close : false
	};
	$.extend(options, opts);

	// console.log('--- Ioverlay');
	// console.log(options);

	if(options.close == true)
	{
		if(typeof hideLoader !== 'undefined' && $.isFunction(hideLoader))
		{
			hideLoader();
			return;	
		}
	}
	if(options.status == 'processing')
	{
		if(typeof showLoader !== 'undefined' && $.isFunction(showLoader))
		{
			showLoader(message);
			return;
		}
		
	}
	if(options.status == 'success')
	{
		if(typeof hideLoaderSuccess !== 'undefined' && $.isFunction(hideLoaderSuccess))
		{
			hideLoaderSuccess(message , options.successTimeout);
			return;
		}
	}
	if(options.status == 'error')
	{
		if(typeof hideLoaderError !== 'undefined' && $.isFunction(hideLoaderError))
		{
			hideLoaderError(message , options.errorTimeout);
			return;
		}
	}
		
	var containerId = 'overlay_container_' + container;
	var $container = $('#' + containerId);
	  
	if(options.close == true)
	{
		// Close dialog immediately
		$container.dialog('close');
		return;
	}
	
	var message = '<i class="fa"></i><span class="imsg">' + message + '</span>';
	if($container.length == 0)
	{
		$('body').append('<div id="'+ containerId +'"><div class="overlay"></div></div>');
		$container = $('#' + containerId);

		$container.find('.overlay').removeClass('isuccess iprocessing ierror').addClass('i' + options['status']).html(message);

		var dialogOptions = {
			minHeight : 'auto',
			height: 'auto',
			width: 'auto',
			minWidth : 200,
			maxWidth: '80%',
			dialogClass : 'dialog overlay-container',
			closeOnEscape : false,
			modal: true
		};

		idialog($container , dialogOptions);      
	}
	else
	{
		$container.find('.overlay').removeClass('isuccess iprocessing ierror').addClass('i' + options['status']).html(message);
	}
	$container.dialog('open');        
	$container.dialog("option", "position", "center");

	if(options.status == 'success') {
		setTimeout(function(){
			$container.dialog('close');
			if($.isFunction(options.onSuccess))
			{
				options.onSuccess();
			}
		} , options.successTimeout);
	}
	else if(options.status == 'error') {
		setTimeout(function(){
			$container.dialog('close');
			if($.isFunction(options.onError))
			{
				options.onError();
			}
			} , options.errorTimeout);
	}
}


function iunderlay(message , container ,  $outer_container , opts){

	var options = {
		status : 'processing',
		successTimeout : 3000,
		errorTimeout : 3000,
		close : false
	};
	$.extend(options, opts);
	
	var containerId = 'underlay_container_' + container;
	var $container = $('#' + containerId);

	if(options.close == true)
	{
		// Close dialog immediately
		$container.remove()
		return;
	}
	
	var message = '<i class="fa"></i><span class="imsg">' + message + '</span>';
	if($container.length == 0)
	{
		$('body').append('<div id="'+ containerId +'" class="underlay-outer"><div class="underlay-bg"><div class="underlay"></div></div></div>');
		$container = $('#' + containerId);

		$container.find('.underlay').removeClass('isuccess iprocessing ierror').addClass('i' + options['status']).html(message);

		$container.width($outer_container.outerWidth());
		$container.height($outer_container.outerHeight());
		$container.offset($outer_container.offset())
	}
	else
	{
		$container.find('.underlay').removeClass('isuccess iprocessing ierror').addClass('i' + options['status']).html(message);
	}
	
	if(options.status == 'success') {
		setTimeout(function()
		{
			$container.remove();
			if($.isFunction(options.onSuccess))
			{
				options.onSuccess();
			}
		} , options.successTimeout);
	}
	else if(options.status == 'error') {
		setTimeout(function()
		{
			$container.remove();
			if($.isFunction(options.onError))
			{
				options.onError();
			}
		} , options.errorTimeout);
	}
}

$(document).bind('loading' , function(event , name , message)
{
	var counter = $(document).data('counter') ? $(document).data('counter') : 0;
	
	if(counter == 0)
	{
		ioverlay(message , name);
	}
	
	counter ++ ;
	$(document).data('counter' , counter);
});

$(document).bind('loaded' , function(event , name , message)
{
	var counter = $(document).data('counter') ? $(document).data('counter') : 0;
	counter --;
	
	if(counter <= 0)
	{
		counter = 0;
		ioverlay(message , name , 
		{
			status : 'success',
			close : true
		});

		
		if(!$(document).data('finished'))
		{
			$(document).data('finished' , true);
			$(document).trigger('finished');
		}
	}
	
	$(document).data('counter' , counter);
});

function ajax(url , opts)
{
	var options = {
		type : 'post',
		dataType : 'json',
		success : function (response){
			if($.isFunction(opts.success))
				opts.success(response);
			},
			error : function(xhr, status, error){
				if($.isFunction(opts.error))
					opts.error();                        
			}
	};
	$.extend(options, opts);
	$.ajax(url , options);
}

function navigate(url)
{
	if(-1 == url)
		history.go(url);
	else
		window.location.href = url;    
}

function post(url , params)
{
	var $form = $('<form method="POST" action="'+ url +'"></form>').appendTo('body');
	for(var key in params)
	{
		var value = params[key];
		$form.append('<input type="hidden" name="'+key+'" id="'+key+'"/>');
		$form.find('#' + key).val(value);
	}
	$form.submit();
}

function escape_quotes(value)
{
	return $('<div/>').text(value).html().replace(/\"/g, '&quot;').replace(/\'/g, '&#39;');
}

function html_encode(value, escapeQuotes)
{
  value = (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '__NL_RF_TOKEN__');
  var html = $('<div/>').text(value).html();
  html = (html + '').replace(/__NL_RF_TOKEN__/g, '\n');

  if (escapeQuotes)
  {
	  html = html.replace(/"/g, '&quot;').replace(/'/g, '&#39;')
  }
  
  return html;
}

function html_decode(value)
{
	return $('<div/>').html(value).text();
}

function trim_text(str , n , trail)
{
	if(!trail)
	{
		trail = '..';
	}
	
	if(str.length > n)
	{
		return str.substring(0, n) + trail;
	}
	else
	{
		return str;
	}
}
function format_number(x)
{
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function format_date(timestamp , format)
{
	format = format != null ? format : 'Do MMM Y';
	if(timestamp)
	{
		return moment(timestamp).format(format);
	}
	else
	{
		return "";
	}
}
function format_date_time(timestamp , format)
{
	format = format != null ? format : 'Do MMM Y, hh:mm A';
	if(timestamp)
	{
		return moment(timestamp).format(format);
	}
	else
	{
		return "";
	}
}
function convert_date_format(date_str)
{
	var parts = date_str.split(" ");
	var dateParts = parts[0].split("-");
	return dateParts[2] +'/'+ dateParts[1] +'/'+ dateParts[0];
}
function show_success_message(div_id , message , timeout)
{
	var str = "";
	str += '<div class="alert alert-block alert-success fade in">';
	str += '    <button type="button" class="close close-sm" data-dismiss="alert">';
	str += '        <span>&times;</span>';
	str += '    </button>';
	str += '    ' + message;
	str += '</div>';
	$("#"+div_id).html(str).fadeIn('fast');

	if(!timeout)
	{
		timeout = 5000;
	}
	
	setTimeout(function()
	{
		$("#"+div_id).find('.alert').fadeOut('fast');
	} , timeout)        
}

function show_error_message(div_id , message)
{
	var str = "";
	str += '<div class="alert alert-block alert-danger fade in">';
	str += '    <button type="button" class="close close-sm" data-dismiss="alert">';
	str += '    	<span>&times;</span>';
	str += '    </button>';
	str += '    ' + message;
	str += '</div>';
	$("#"+div_id).html(str).fadeIn('fast');
}


function show_message(divId , type , message)
{
	var html='<div class="messageband messageband-'+type+' clearfix mb-l" id="'+type+'Band" >';
	html +='<span class="icon sprite"></span>';
	html +='<button class="close sprite" onclick="hideMessage(\''+type+'Band\')">&times;</button>';
	html += message;
	html += '</div>';
	$("#"+divId).html(html).fadeIn('fast');
}

function hide_message(divId)
{
	$("#"+divId).hide();
}

function object_size(object)
{
	var size = 0;
	for(var key in object)
	{
		size ++;
	}
	return size;
}

function random_int()
{
	 return Math.floor((Math.random()*100000)+1); 
}

function random_int()
{
	 return Math.floor((Math.random()*100000)+1); 
}

function fromDecimal(value, decimals)
{
	return value * Math.pow(10, decimals);
}

function toDecimal(value, decimals)
{
	return value / Math.pow(10, decimals);
}

function abbreviateNumber(value) {
	var newValue = value;
	// if (value >= 1000) {
	//     var suffixes = ["", "K", "M", "B", "T"];
	//     var suffixNum = Math.floor( (""+value).length/3 );
	//     var shortValue = '';
	//     for (var precision = 2; precision >= 1; precision--) {
	//         shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
	//         var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
	//         if (dotLessShortValue.length <= 2) { break; }
	//     }
	//     if (shortValue % 1 != 0)  shortNum = shortValue.toFixed(1);
	//     newValue = shortValue+suffixes[suffixNum];
	// }
	return newValue;
}

function calculatePercentage(maxpossible, value)
{
	if(isNaN(maxpossible) || isNaN(value)){
		return 0;
	}
	else {
		return ((value/maxpossible) * 100).toFixed(1);
	}
}

String.prototype.replaceAll = function(strTarget,strSubString)
{
	var strText = this;
	var intIndexOfMatch = strText.indexOf( strTarget);
	while (intIndexOfMatch != -1)
	{
		strText = strText.replace(strTarget, strSubString);
		intIndexOfMatch = strText.indexOf( strTarget );
	}
	return( strText.toString() );
};

function scroll_anchor(hash) 
{
	location.hash = "#" + hash;
}

function isset(val)
{
	return typeof val != "undefined" && val != null ? true : false;
}

function replace_tokens(string , parse)
{
	var value;
	for(var key in parse)
	{
		value = parse[key];
		value = value.toString().replace(/\$/g, '\$');        
		string = string.replaceAll('{'+key+'}', value);
	}
	return string;
}

function count_occurrences(str , ch)
{
	return (str.length - str.replace(new RegExp(ch,"g"), '').length) / ch.length;
}

function do_redirect(url, parameters)
{
	navigateTo(prepareHref(url, parameters));
}

function prepare_href(url, parameters)
{
	var queryString = '';
	var first = true;
	for (var key in parameters)
	{
		var value = parameters[key];
		if (first)
		{
			queryString += key+"="+value;
		}
		else
		{
			queryString += "&"+key+"="+value;
		}
		first = false;
	}
	if (queryString)
	{
		return url+"?"+queryString;
	}
	else
	{
		return url;
	}
}

function nl2br(str, is_xhtml) 
{
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function isFileNameInvalid(fileName)
{
	var regEx = new RegExp('[/?%/*:/|<>#]');
	return regEx.test(fileName);
}

RegExp.escape = function(text) 
{
	return text.replace(/[-[\]:{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function getTemporaryId()
{
	return 'tmp_' + Math.floor(Math.random()*1000000001);
}

function getTimestamp(timestamp)
{
	if(timestamp.toString().length == 10)
	{
		timestamp = timestamp.toString() + '000';
	}
	timestamp = parseInt(timestamp);
	var instanceDate = new Date(timestamp);
	var browserOffset = instanceDate.getTimezoneOffset();
	timestamp = timestamp + browserOffset * 60 * 1000;
	return timestamp;
}

function uuid() 
{
   var S4 = function() {
	  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
   };
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function uuid12()
{
   var S4 = function() {
	  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
   };
   return (S4()+"-"+S4()+"-"+S4());
}

function temp_uuid() 
{
   var S4 = function() {
	  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
   };
   return ('tmp_'+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

$( document ).ajaxComplete(function(event, xhr, settings) 
{
	if(settings.dataType == 'json')
	{
		var response = $.parseJSON(xhr.responseText);
		if(!response.status)
		{
			if(response.handler != "")
			{
				eval(response.handler + '_exception_handler()');
			}
		}
	}
});

function undefined_exception_handler()
{
	
}

function login_exception_handler()
{
	$('#login-modal').modal('show');
}

function round_half(num) 
{
	num = Math.round(parseFloat(num)*2)/2;
	return num;
}

function round(number)
{
	var rounded = Math.round( number * 10 ) / 10;
	var fixed = rounded.toFixed(1);
	return fixed;
}

function render_dropdown($element , objects , value , text)
{
	$element.html('');
	$element.append("<option value=''>-- Select --</option>");
	for (var i = 0; i < objects.length; i++) 
	{
		var object = objects[i];
		$element.append("<option value='"+object[value]+"'>"+object[text]+"</option>");
	};
}

function execute(function_name, context /*, args */) 
{
	var args = [].slice.call(arguments).splice(2);
	var namespaces = function_name.split(".");
	var func = namespaces.pop();
	for(var i = 0; i < namespaces.length; i++) 
	{
		context = context[namespaces[i]];
	}
	return context[func].apply(this, args);
}

function open_tab(url)
{
	// var win = window.open(url,'_blank');
	var redirectWindow = window.open(url, '_blank');
	$.ajax({
		type: 'POST',
		url: '/echo/json/',
		success: function (data) {
			redirectWindow.location;
		}
	});
	// if(win)
	// {
	// 	win.focus();
	// }
	// else
	// {
	// 	alert('Please allow popups for this site to see report.');
	// }
}

function buffered_call(key , callback)
{
	var buffered_timers = $(document).data('buffered_timers');
	buffered_timers = buffered_timers ? buffered_timers : {};

	var timer = buffered_timers[key];

	if(timer)
		clearTimeout(timer);

	timer = setTimeout(function()
	{
		callback();
	} , 500);
	
	buffered_timers[key] = timer;
	$(document).data('buffered_timers' , buffered_timers);
}

function get_timezone_data() 
{
	var today = new Date();
	var jan = new Date(today.getFullYear(), 0, 1);
	var jul = new Date(today.getFullYear(), 6, 1);
	var dst = today.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  
	return {
		offset: -today.getTimezoneOffset() / 60,
		dst: +dst
	};
}

function detect_timezone($element)
{
	var timezone = $element.val();
	if(!timezone)
	{
		post_data('common/common/get_timezone' , get_timezone_data() , function(response)
		{
			$element.val(response.result);
		});
	}
}

$(document).ready(function() 
{
	if($('.dev_timezone_detect').length > 0)
	{            
		detect_timezone($('.dev_timezone_detect'));
	}
});


// console.log(get_current_local_time(g.timezone));
// console.log(get_current_server_time(g.timezone));
// console.log(get_local_time('<?php echo now(); ?>' , g.timezone));
// console.log(get_server_time(get_current_local_time(g.timezone) , g.timezone));

function get_formatted_date(server_datetime)
{
	var date = get_local_time(server_datetime , g.timezone);
	date = moment(date, "YYYY-MM-DD HH:mm:ss");

	var format = g.date_format != "" ? g.date_format : 'hh:mm A, MM-DD-YYYY';
	return date.format(format);
}

function get_formatted_date_only(server_datetime)
{
	var date = get_local_time(server_datetime , g.timezone);
	date = moment(date, "YYYY-MM-DD HH:mm:ss");

	var format = 'MM/DD/YYYY';
	return date.format(format);
}

function get_local_time(server_datetime , timezone)
{
	if(!timezone)
		timezone = 'UTC';

	var gmt = moment.tz(moment(server_datetime , "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss'), 'UTC');
	var local = gmt.clone().tz(timezone);

	// console.log('UTC:' + gmt.format('YYYY-MM-DD HH:mm:ss'));
	// console.log('LOC:' + local.format('YYYY-MM-DD HH:mm:ss'));

	return local.format('YYYY-MM-DD HH:mm:ss');
}

function get_server_time(local_datetime , timezone)
{
	if(!timezone)
		timezone = 'UTC';
	
	var local = moment.tz(moment(local_datetime , "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss'), timezone);
	var gmt = local.clone().tz('UTC');

	// console.log('LOC:' + local.format('YYYY-MM-DD HH:mm:ss'));
	// console.log('UTC:' + gmt.format('YYYY-MM-DD HH:mm:ss'));

	return gmt.format('YYYY-MM-DD HH:mm:ss');
}

function get_current_local_time(timezone)
{
	if(!timezone)
		timezone = 'UTC';

	var gmt = moment.tz(moment().utc().format('YYYY-MM-DD HH:mm:ss'), 'UTC');
	var local = gmt.clone().tz(timezone);

	// console.log('UTC:' + gmt.format('YYYY-MM-DD HH:mm:ss'));
	// console.log('LOC:' + local.format('YYYY-MM-DD HH:mm:ss'));

	return local.format('YYYY-MM-DD HH:mm:ss');
}

function get_current_server_time(timezone)
{
	var gmt = moment.tz(moment().utc().format('YYYY-MM-DD HH:mm:ss'), 'UTC');

	// console.log('UTC:' + gmt.format('YYYY-MM-DD HH:mm:ss'));

	return gmt.format('YYYY-MM-DD HH:mm:ss');
}

function get_duration(minutes)
{
	// var units = {
	// 	"year": 24*60*365,
	// 	"month": 24*60*30,
	// 	"week": 24*60*7,
	// 	"day": 24*60,
	// 	"minute": 1
	// }

	// var result = [];


	// for(var name in units) {
	// 	var p =  Math.floor(minutes/units[name]);
	// 	if(p == 1) result.push(p + " " + name);
	// 	if(p >= 2) result.push(p + " " + name + "s");
	// 	minutes %= units[name];
	// }

	// return minutes;
	// 
	var value = minutes;

	var units = {
		"year": 24*60*60*365,
		"month": 24*60*60*30,
		"week": 24*60*60*7,
		"day": 24*60*60,
		"hour": 60*60,
		"min": 60,
	}

	var result = []

	for(var name in units) {
		var p =  Math.floor(value/units[name]);
		if(p == 1) result.push(" " + p + " " + name);
		if(p >= 2) result.push(" " + p + " " + name + "s");
		value %= units[name]
	}

   return result;
}

function minutes_to_string(minutes)
{
  
}

function get_distance(meters)
{
	var kms = meters/1000;

	if(kms > 1)
	{
		return kms + " kms"
	}

	return kms + " km";
}

function get_browser_details()
{
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) 
	{
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}

	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) 
	{
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}

	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) 
	{
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}
	
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) 
	{
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}

	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) 
	{
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
			  (verOffset=nAgt.lastIndexOf('/')) ) 
	{
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) 
		{
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
		fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
		fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) 
	{
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}

	return {
		'browser_name' : browserName,
		'full_version' : fullVersion,
		'major_version' : majorVersion,
		'app_name' : navigator.appName,
		'user_agent' : navigator.userAgent

	};
}

function get_os_details()
{
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	
	return {
		'os_name' : OSName,
		'os_version' : navigator.appVersion
	};
}

if (typeof String.prototype.startsWith != 'function') 
{
	String.prototype.startsWith = function (str)
	{
		return this.slice(0, str.length) == str;
	};
}

if (typeof String.prototype.endsWith != 'function') 
{
	String.prototype.endsWith = function (str)
	{
		return this.slice(-str.length) == str;
	};
}

$(document).bind('form_critical' , function(event , $container , message , callback)
{
	$(document).data('form_saved' , true);

	$container.find(':input').change(function()
	{
		$(document).trigger('form_unsaved' , [message]);
	});
});

$(document).bind('form_unsaved' , function(event , message)
{
	var window_event = window.attachEvent || window.addEventListener;
	var check_event = window.attachEvent ? 'onbeforeunload' : 'beforeunload';
	$(document).data('form_saved' , false);

	window_event(check_event, function(e)
	{ 
		var form_saved = $(document).data('form_saved');
		if(form_saved)    
			return true;

		var msg = message ? message : ' ';

		(e || window.event).returnValue = msg;

		if(msg)
			return msg;
	});
});

$(document).bind('form_saved' , function()
{
	$(document).data('form_saved' , true);
});

$(document).ready(function() 
{
	var window_event = window.attachEvent || window.addEventListener;
	var check_event = window.attachEvent ? 'onbeforeunload' : 'beforeunload';

	window_event(check_event, function(e)
	{ 
		$(document).data('page_reload' , true);
	});                
});        

function get_slug(text)
{
	text = text.toLowerCase().replace(/[^\w ]+/g,'_').replace(/ +/g,'_').replace(/_+/g,'_');
	return trim(text , '_');
}

function str_slug(text)
{
	text = text.toLowerCase().replace(/[^\w ]+/g,'-').replace(/ +/g,'-').replace(/_+/g,'-');
	return trim(text , '-');
}

function get_slug_name(text)
{
	text = text.toLowerCase().replace(/[^\w ]+/g,'.').replace(/ +/g,'.').replace(/_+/g,'.');
	return trim(text , '.');
}

var trim = (function () 
{
	"use strict";

	function escapeRegex(string) {
		return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
	}

	return function trim(str, characters, flags) {
		flags = flags || "g";
		if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
			throw new TypeError("argument must be string");
		}

		if (!/^[gi]*$/.test(flags)) {
			throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
		}

		characters = escapeRegex(characters);

		return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
	};
}());


function inifinite()
{
	return Number.MAX_SAFE_INTEGER;
}


$(document).ready(function() 
{
	$('.panel .panel-head-slide .btn-expand').click(function(event) 
	{
		$panel = $(this).closest('.panel');
		var $row = $(this).closest('.row');
		var $col = $(this).closest('.col');

		$row.find('> .col').removeAttr('class').addClass($(this).data('other-class')).addClass('col');
		$col.removeAttr('class').addClass($(this).data('self-class')).addClass('col');
		$panel.addClass('panel-expanded');

		/*var $parent = $($(this).data('parent'));

		$parent.css('position' , 'relative').height($panel.height());
		$panel.data('parent' , $panel.parent()).appendTo($parent);
		return false;    */
	});

	$('.panel .panel-head-slide .btn-compress').click(function(event) 
	{
		$panel = $(this).closest('.panel');
		var $row = $(this).closest('.row');
		var $col = $(this).closest('.col');

		$row.find('> .col').removeAttr('class').addClass($(this).data('other-class')).addClass('col');
		$col.removeAttr('class').addClass($(this).data('self-class')).addClass('col');
		$panel.removeClass('panel-expanded');

		/*var $parent = $($(this).data('parent'));

		$parent.height('auto');
		$panel.appendTo($panel.data('parent'));
		return false;    */
	});
});



var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}


$(document).ready(function() 
{
	$('.modal').on('hidden.bs.modal', function( event ) 
	{
		$(this).removeClass( 'fv-modal-stack' );
		$('body').data( 'fv_open_modals', $('body').data( 'fv_open_modals' ) - 1);
	});


	$('.modal').on('shown.bs.modal', function ( event ) 
	{
		// keep track of the number of open modals
		if (typeof($('body').data('fv_open_modals')) == 'undefined')
		{
			$('body').data( 'fv_open_modals', 0 );
		}
		 
	   // if the z-index of this modal has been set, ignore.
			
		if ( $(this).hasClass('fv-modal-stack'))
		{
			return;
		}
	   
		$(this).addClass('fv-modal-stack');

		$('body').data('fv_open_modals', $('body').data('fv_open_modals') + 1);

		$(this).css('z-index', 1040 + (10 * $('body').data('fv_open_modals')));

		$('.modal-backdrop').not('.fv-modal-stack').css( 'z-index', 1039 + (10 * $('body').data('fv_open_modals')));

		$('.modal-backdrop').not('fv-modal-stack').addClass( 'fv-modal-stack' ); 

		console.log($(this));
	 });
});

function zero_pad(num, places) 
{
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

var o = {};
o.lz = function(i,c)
{
  if( typeof c != 'number' || c <= 0 || (typeof i != 'number' && typeof i != 'string') )
   { return i; }
  i+='';

  while( i.length < c )
   { i='0'+i; }
  return i;  
}

o.getHashCode = function(s)
{
 var hash=0,c=(typeof s == 'string')?s.length:0,i=0;
 while(i<c) 
 {
   hash = ((hash<<5)-hash)+s.charCodeAt(i++);
   //hash = hash & hash; // Convert to 32bit integer
 }

 return ( hash < 0 )?((hash*-1)+0xFFFFFFFF):hash; // convert to unsigned
}; 

o.uniqueId = function( s, bres )
{ 
  if( s == undefined || typeof s != 'string' )
  { 
	 if( !o.___uqidc )
	  { o.___uqidc=0; }
	 else { ++o.___uqidc; } 
	 var od = new Date(),
		 i = s = od.getTime()+''+o.___uqidc; 
  }
  else { var i = o.getHashCode( s ); }
  return ((bres)?'res:':'')+i.toString(32)+'-'+o.lz((s.length*4).toString(16),3);  
};

/*Array.prototype.remove_value = function(val) 
{
	for (var i = 0; i < this.length; i++) 
	{
		if (this[i] === val) 
		{
			this.splice(i, 1);
			i--;
		}
	}
	return this;
}*/

function get_complete_url(url)
{
	if(url.startsWith('https://') || url.startsWith('http://') || url.startsWith('www') || url.endsWith('.com') || url.endsWith('.co') || url.endsWith('.co.in'))
	{
		url = url;
	}
	else if(url.startsWith('/'))
	{
		url = g.base_url + url;
	}
	else
	{
		url = g.base_url + '/' + url;
	}

	return url;
}

function render_attachment(id)
{
	var base_url = g.base_url;
	var attachment_url = base_url + '/attachment/render/' + id;

	return attachment_url;
}

function is_object_empty(obj)
{
	for (var key in obj)
	{ 
		if (obj.hasOwnProperty(key))
		{
			return false;
		}
	}

	return true;
}

function strip(html)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}

function getHourTimeout() {
	return 60 * 60 * 1000;
}

function numberFormat(num) {
	var x= num;
	x=x.toString();
	var afterPoint = '';
	if(x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'),x.length);
	x = Math.floor(x);
	x=x.toString();
	var lastThree = x.substring(x.length-3);
	var otherNumbers = x.substring(0,x.length-3);
	if(otherNumbers != '') lastThree = "'" + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, "'") + lastThree + afterPoint;
}