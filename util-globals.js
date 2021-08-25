/**
 * REST API Layer
 * 
 */

function get_data(url , data , success , error , reqtype , restype , async , cache)
{
	call_server(url , data , 'GET' , success , error , reqtype , restype , async , cache);
}

function post_data(url , data , success , error , reqtype , restype , async , cache)
{
	call_server(url , data , 'POST' , success , error , reqtype , restype , async , cache);
}

function put_data(url , data , success , error , reqtype , restype , async , cache)
{
	call_server(url , data , 'PUT' , success , error , reqtype , restype , async , cache);
}

function delete_data(url , data , success , error , reqtype , restype , async , cache)
{
	call_server(url , data , 'DELETE' , success , error , reqtype , restype , async , cache);
}

var call_server_cache = Object();
var call_request = Object();
var call_response = Object();
var error_request = Object();
var error_response = Object();
var error_xhr = Object();

function call_server(url , data , type , success , error , reqtype , restype , async , cache)
{
	switch(reqtype)
	{
		case 'json' : reqtype = 'application/json'; break;
		case 'form' : reqtype = 'application/x-www-form-urlencoded; charset=UTF-8'; break;
		default : reqtype = 'application/x-www-form-urlencoded; charset=UTF-8'; break;
	}
	
	if(!restype)
	{
		restype = 'json';
	}

	if(async == null)
	{
		async = true;
	}

	if(cache == null)
	{
		cache = false;
	}

	if(cache)	
	{
		var cache_key = url + ';';
		for(var key in data)
		{
			cache_key += key + ':' + data[key].toString() + ';';
		}

		if(cache_key in call_server_cache)
		{
			if($.isFunction(success))
			{
				success(call_server_cache[cache_key]);				
			}
			return;
		}
	}

	// console.log(restype);

	ajax(url , 
	{
		type : type,
		data : data,
		contentType : reqtype,
		dataType : restype,
		async : async,
		success : function(response)
		{
			// console.log('response ' + url);
			call_request = {
				url : url,
				type : type,
				data : data,
				contentType : reqtype,
				dataType : restype	
			};

			call_response = response;

			if(cache)
			{
				call_server_cache[cache_key] = response;
			}

			if($.isFunction(success))
			{
				success(response);
			}
		},
		error : function(jqXHR, status, error)
		{
			// console.log('error ' + url);
			// console.log(jqXHR);
			// console.log(status);
			// console.log(error);
			
			error_request = {
				url : url,
				type : type,
				data : data,
				contentType : reqtype,
				dataType : restype	
			};
			
			error_response = {
				xhr : jqXHR,
				status : status,
				error : error
			}

			if($.isFunction(error))
			{
				error();
			}
		}
	});
}
/**
 * REST API Layer
 * 
 */


function common_exception_handler()
{
	alert('Something went wrong!');
}