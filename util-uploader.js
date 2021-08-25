(function($){
	var jcrop_api;

	$.fn.extend({

		uploader : function(options , attachment) {
			var defaults = {
				on_success : function(){},
				on_progress : function(){},
				on_error : function(){},
				dragDrop : false,
				module : 'DEFAULT',
				rel : null,
				type : 0,
				size: '',
				acceptFileTypes : /(\.|\/)(gif|jpe?g|png|pdf|doc|docx)$/i
			};

			var options = $.extend(true, defaults, options);
			var $this = $(this);
			var id = $this.attr('id');

			$this.data('uploader-options' , options);

			if(options.dragDrop) {
				$this.addClass('drop-zone');
			}
			$this.addClass('fileinput-button');

			$('fileupload_'+ id).remove();
			var $fileupload =$('<input id="fileupload_'+ id +'" name="fileupload_'+ id +'" type="file" multiple>');
			$this.append($fileupload);

			var $remove = $('<span class="remove dev_remove"><i class="fa fa-times"></i></span>');
			var $crop = $('<span class="lnk-crop dev_crop"><i class="fa fa-crop"></i></span>');

			if($this.hasClass('file-thumbnail')) {
				// $this.append($remove);
				// $this.append($crop);
			}

			$fileupload.fileupload({
				url : g.lang_url + '/attachment/upload',
				dataType: 'json',
				formData : {module : options.module , type:options.type},
				dropZone : options.dragDrop ? $this : null,
				done: function (e, response) {
					var attachment = response['result']['result'];
					showAttachment($this , attachment);

					// cropAttachment($this , $crop);

					if($.isFunction(options.on_success))
						options.on_success(attachment);
				},
				singleFileUploads : true,
				paramName : 'attachment',
				acceptFileTypes : options.acceptFileTypes,
				sequentialUploads : true
			});

			$fileupload
				.bind('fileuploadadd', function (e, data) { $this.trigger('upload-start' , [data]); }) .bind('fileuploaddone', function (e, data) { $this.trigger('upload-end' , [data]); }) .bind('fileuploadprogress', function (e, data) { $this.trigger('upload-progress' , [data]); });
			$remove.click(function(){
				removeAttachment($this , $remove);
				return false;
			});

			$crop.click(function(){
				cropAttachment($this , $crop);
				return false;
			});

			if(attachment) {showAttachment($this , attachment);

				if($.isFunction(options.on_success)) options.on_success(attachment);
			} else {
				resetAttachment($this);
				$remove.hide();
				$crop.hide();
			}

			function showAttachment($this , attachment) {
				var options = $this.data('uploader-options');
				var $remove = $this.find('.dev_remove');
				var $crop = $this.find('.dev_crop');

				$this.data('attachment' , attachment);
				var $outer = $this.closest('.fileUploaderOuter');

				$('input[type="hidden"]' , $this).val(attachment['attachmentId']);
				if($('img.thumb' , $this).length)
				{
					$('img.thumb' , $this).attr('src' , attachment['renderUrl'] + '/' + (options['size'].length ? options['size'] : ''));
				}

				var $parent = $this.closest('.fileUploaderOuter');
				if($parent.length > 0) {
					if($('a.download' , $parent).length > 0) {
						$('a.download' , $parent).attr('href' , attachment['downloadUrl']).html((attachment['name'] ? attachment['name'] : "Download"));
					} else {
						var a = '<a href="' + attachment['downloadUrl'] + '" class="download">' + (attachment['name'] ? attachment['name'] : "Download") + '</a>';
						$parent.append(a);
					}
				}

				$remove.show();
				$crop.show();

				var options = $this.data('uploader-options');
                if (typeof options !== 'undefined' && options.rel) {
					var $that = $('#'+options.rel);
					showAttachment($that , attachment);
					// cropAttachment($that , $that.find('.dev_crop'));
				}

				$this.trigger('attachmentShown' , [attachment]);
				console.log('Uploaded: ' + attachment['name']);
			}

			function resetAttachment($this) {
				var $parent = $this.closest('.fileUploaderOuter');
				if($parent.length > 0) {
					// $('a.download' , $parent).attr('href' , '#').html("");
				}
			}

			function removeAttachment($this , $remove) {
				$this.data('attachment' , {});

				$('input[type="hidden"]' , $this).val('');
				$('img.thumb' , $this).attr('src' , $('img.thumb' , $this).data('src'));
				Holder.run({images:$('img.thumb' , $this).get(0)});
				$('a.link' , $this).attr('href' , '#');
				$remove.hide();
				$crop.hide();
			}

			function cropAttachment($this , $crop) {
				if(!$this.hasClass('file-thumbnail')) {
					return false;
				}

				$modal = bdialog('upload_crop' , 'Crop image' , {
					on_show : function($modal) {
						var $body = $('.dev_body' , $modal);
						$modal.modal('show');

						var attachment = $this.data('attachment');
						var body = '<div class="img-crop"><img class="img-block dev_image"></img></div>';
						$body.html(body);

						$('.dev_image' , $modal).attr('src' , attachment['renderUrl']+'?rand='+Math.random());

						$('.dev_image' , $modal).Jcrop({
							bgOpacity: 0.4,
							bgColor: 'black',
							addClass: 'jcrop-light',
							onSelect: function(coords) {
								$('.dev_image' , $modal).data('coords' , coords);
							}
						},function() {
							jcrop_api = this;
							// jcrop_api.setSelect([130,65,130+350,65+285]);
							// jcrop_api.setOptions({ bgFade: true });
							// jcrop_api.ui.selection.addClass('jcrop-selection');
						});
					},
					on_save : function($modal) {
						var attachment = $this.data('attachment');
						var $image = $('.dev_image' , $modal);
						var coords = $image.data('coords');

						if(coords && coords.w && coords.h) {

							var data = new Object();
							data['attachmentId'] = attachment['attachmentId'];
							data['x'] = coords.x;
							data['y'] = coords.y;
							data['w'] = coords.w;
							data['h'] = coords.h;
							data['width'] = $image.width();
							data['height'] = $image.height();

							post_data('common/attachment/crop' , data , function(response)
							{
								var attachment = response.result;
								attachment['renderUrl'] = attachment['renderUrl']+'?rand='+Math.random();
								showAttachment($this , attachment);

								$modal.modal('hide');
							});
						}
						else
						{
							$modal.modal('hide');
						}
					},
					on_close : function ($modal) {
						jcrop_api.destroy();
					}
				});
			}


			$(document).bind('drop dragover', function (e) {
				// Prevent the default browser drop action:
				e.preventDefault();
			});


			$(document).bind('dragover', function (e) {
				var dropZone = $this,
					timeout = window.dropZoneTimeout;
				if (!timeout) {
					dropZone.addClass('in');
				} else {
					clearTimeout(timeout);
				}
				var found = false,
					node = e.target;
				do {
					if (node === dropZone[0]) {
						found = true;
						break;
					}
					node = node.parentNode;
				} while (node != null);
				if (found) {
					dropZone.addClass('hover');
				} else {
					dropZone.removeClass('hover');
				}
				window.dropZoneTimeout = setTimeout(function () {window.dropZoneTimeout = null;
					dropZone.removeClass('in hover');
				}, 100);
			});

		}
	});
})(jQuery);


$(document).ready(function() {
	$('.fileUploader').each(function(index, el) {
		initUploader($(this));
	});
});

function initUploaders($file_uploaders) {
	$file_uploaders.each(function(index, el) {
		initUploader($(this));
	});
}

function initUploader($this) {
	if(!$this.hasClass('fileUploader-template')) {
		$this.uploader({
			module : $this.data('module'),
			rel : $this.data('rel'),
			size : $this.data('size') ? $this.data('size') : '',
			dragDrop : true
		});
	}
}

function refreshAttachment($this , attachment) {
	var $remove = $this.find('.dev_remove');
	var $crop = $this.find('.dev_crop');

	$this.data('attachment' , attachment);
	var $outer = $this.closest('.fileUploaderOuter');

	$('input[type="hidden"]' , $this).val(attachment ? attachment['attachmentId'] : '');

	if(attachment) {
		$('img.thumb' , $this).attr('src' , attachment['renderUrl']);
	}

	var $parent = $this.closest('.fileUploaderOuter');
	if($parent.length > 0) {
		$('a.download' , $parent).attr('href' , attachment ? attachment['downloadUrl'] : '#').html(attachment ? attachment['name'] : "Download");
	}

	$remove.show();
	$crop.show();

	var options = $this.data('uploader-options');
	if(options.rel) {
		var $that = $('#'+options.rel);
		showAttachment($that , attachment);
		cropAttachment($that , $that.find('.dev_crop'));
	}
}
