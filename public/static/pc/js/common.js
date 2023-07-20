; (function ($, window, document, undefined) {
	var browser = $.BrowserDetect.init().browser;
	var version = $.BrowserDetect.init().version;
	var isUpdata = false;
	if (browser === 'Chrome' && version >= 40) {
		isUpdata = false
	} else if (browser === 'Safari' && version >= 10) {
		isUpdata = false
	} else if (browser === 'Opera' && version >= 30) {
		isUpdata = false
	} else if (browser === 'Firefox' && version >= 30) {
		isUpdata = false
	} else if (browser === 'Explorer' && version >= 11) {
		isUpdata = false
	} else {
		isUpdata = true
	}

	if (isUpdata) alert('您的浏览器过时了，为了浏览体验性建议下载最新版的主流浏览器');


	$.ajaxSettings.beforeSend = function (xhr, request) {
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
// 		xhr.setRequestHeader('X-CSRF-TOKEN', document.head.querySelector('meta[name="csrf-token"]').content);
	}
	//滚动监听
	function debounce (fn, wait) {
		var timeout = null;
		return function () {
			if (timeout !== null) clearTimeout(timeout);
			timeout = setTimeout(fn, wait);
		}
	}
	function handle () {
		var scrollTop = $(window).scrollTop();
		if (scrollTop == 0) {
			$('#gotop').slideUp(300);
		}
		if (scrollTop > 80) {
			$('#gotop').slideDown(300);
		}
	}
	window.addEventListener('scroll', debounce(handle, 300));

	//首页切换分类
	$('.tag-toggle').click(function () {
		$('.tag-wrapper').toggleClass('roll-up').toggleClass('roll-down');
	});

	//首页数字统计效果
	$('.ley-count').countTo();

	// 返回顶部
	$('#gotop.gotop').click(function () {
		$('html,body').animate({ scrollTop: 0 }, 300);
		return false;
	});


	// 全局图片预览
	$('.ley-preview').previewImg(function (res) {
		res.fadeIn().click(function () {
			$(this).remove();
		});
	});

	// 平台详情页---选项卡切换
	$('.ley-tab-card').tabCard();

	// 大事记
	$('.event_year label').click(function () {
		$('.event_year>li').removeClass('current');
		$(this).parent('li').addClass('current');
		var year = $(this).attr('for');
		$('#' + year).parent().prevAll('div').slideUp(800);
		$('#' + year).parent().slideDown(800).nextAll('div').slideDown(800);
	});

	// 意见反馈
	$('#feedback').click(function () {
		var temStr = '<div class="feedback-wrapper">' +
			'<div class="feedback-title">您对配资指数新版有任何意见和建议，或使用中遇到的问题，请在本页面反馈。 我们会每天关注并不断优化，为您提供更好的服务！</div>' +

			'<form id="feedback-form" action="" class="ley-form ley-full-lable">' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">反馈的内容</label>' +
			'		<div class="error-msg"></div>' +
			'		<textarea class="ley-textarea" name="report_describe" placeholder=""></textarea>' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">联系方式</label>' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="text" name="report_mobile" placeholder="">' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<input class="ley-input ley-radius ley-submit" type="submit" value="提交" />' +
			'	</div>' +
			'</form>' +
			'</div>'

			$(this).leyPopup({
				title: '意见反馈',
				content: temStr
			}, function () {
				$('#feedback-form .ley-submit').click(function () {
					var reportNescribe = $('textarea[name="report_describe"]');
					var reportMobile = $('input[name="report_mobile"]');
					$('#feedback-form .error-msg').text('');
					if (!reportNescribe.val().trim()) {
						reportNescribe.prev().text('反馈的内容不能为空');
						return false;
					} else if (!reportMobile.val().trim()) {
						reportMobile.prev().text('联系方式不能为空');
						return false;
					} else if (!(/^(((13[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(15([0-9]{1}))|(18[0-9]{1})|(17+(0|1|2|4|5|3|6|7|8))|(14+(5|6|7|8|9)))+\d{8})$/.test(reportMobile.val()))) {
						reportMobile.prev().text('手机号格式错误');
						return false;
					}
					
					$.ajax({
						type: 'post',
						url: "/commit_feedback",
						data: $('#feedback-form').serialize(),
						async: false,
						success (ret) {
							$(this).leyAlert({
								type: 'success',
								content: '提交成功'
							});
						},
						error(ret){
							var errors = ret.responseJSON.errors
							var errorMsg = ''
							for (const key in errors) {
								if (errors.hasOwnProperty(key)) {
									const element = errors[key];
									errorMsg += element[0] + '<br \><br \>'
								}
							}
						}
					});
	
					return false;
				})
			});
	});

	// 我要收录
	var applyingImages = [];
	$('.usoo').click(function () {
		var temStr = '<div class="feedback-wrapper">' +
			'<div class="feedback-title">您可在此提交配资指数未收录的平台，以便配资指数做的更好！</div>' +
			'<form id="join-form" method="POST" class="ley-form ley-full-lable">' +
			'	<div class="ley-inline-group">' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="text" name="applying_name" placeholder="平台名称">' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="text" name="applying_url" placeholder="平台网址">' +
			'	</div>' +
		    '	<div class="ley-inline-group">' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="text" name="applying_qq" placeholder="联系QQ">' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">上传<span>(上传营业执照、团队合影、办公场景等相关图片)</span></label>' +
			'		<input id="join-file-upload" class="file-upload" type="file" multiple="multiple" style="opacity: 0;">' +
			'       <input type="hidden" name="applying_images" />' +
			'		<div class="show-image" id="applying-show-image"></div>' +
			'		<div class="upload-preview">' +
			'			<label for="join-file-upload" class="ley-upload">+</label>' +
			'		</div>' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<input class="ley-input ley-radius ley-submit" type="submit" value="提交" />' +
			'	</div>' +
			'</form>' +
			'</div>'

		$(this).leyPopup({
			title: '收录平台',
			content: temStr
		}, function () {
			$('#join-form .ley-submit').click(function (event) {
			    event.preventDefault();
				var applyingName = $('input[name="applying_name"]');
				var applyingUrl = $('input[name="applying_url"]');
				var applyingqq = $('input[name="applying_qq"]');
				$('#join-form .error-msg').text('');
				if (!applyingName.val().trim()) {
					applyingName.prev().text('平台名称不能为空');
					return false;
				} else if (!applyingUrl.val().trim()) {
					applyingUrl.prev().text('平台网址不能为空1');
					return false;
				} else if (!(/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/.test(applyingUrl.val()))) {
					applyingUrl.prev().text('平台网址格式错误');
					return false;
				}else if(!applyingqq.val().trim()){
				    applyingqq.prev().text('qq不能为空');
					return false;
				}
				$.ajax({
					type: 'post',
					url: "/feedback/plateform",
					data: $('#join-form').serialize(),
					async: false,
					success (ret) {
					    console.log(ret)
						$(this).leyAlert({
							type: 'success',
							content: '提交成功'
						});
						$('input[name="applying_images"]').val('');
						applyingImages = [];
					},
					error(ret){
						var errors = ret.responseJSON.errors
						var errorMsg = ''
						for (var key in errors) {
							if (errors.hasOwnProperty(key)) {
								var element = errors[key];
								errorMsg += element[0] + '<br \><br \>'
							}
						}
						// $(this).leyAlert({
						// 	type: 'error',
						// 	content: errorMsg
						// });
					}
				});

				return false;
			})
		});
	});

	// 我要收录上传
	$(document).on('input propertychange', '#join-file-upload',function() {
		var files = $(this).context.files;
		for (var i = files.length - 1; i >= 0; i--) {
			
			if(applyingImages.length >= 5){
				alert('最多上传五张图片');return;
			}
			
			upload(files[i], {
				success:function(res){
					applyingImages.push(res);
					$('#applying-show-image').append('<img src="' + res.url +
					'"  class="ley-preview">')
					$('input[name="applying_images"]').val(JSON.stringify(applyingImages));
				},
				error:function(){
				}
			});
		}
	});


	// 举报
	var reportImages = [];
	$('.btn-report').click(function () {
		var temStr = '<div class="feedback-wrapper">' +
			'<form action="" id="report-form" class="ley-form ley-no-lable">' +
			'<input type="hidden" value="'+$(this).data('plateform-id')+'" name="plateform_id">'+
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">平台名称</label>' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="text" name="report_name" value="'+$(this).data('plateform-name')+'" placeholder="平台名称">' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">平台网址</label>' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="url" name="report_url" value="'+$(this).data('plateform-url')+'" placeholder="平台网址">' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">联系电话</label>' +
			'		<div class="error-msg"></div>' +
			'		<input class="ley-input" type="text" name="report_mobile" placeholder="联系电话">' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">举报描述</label>' +
			'		<div class="error-msg"></div>' +
			'		<textarea style="height: 100px;" class="ley-input" name="report_describe" placeholder="举报描述"></textarea>' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">上传</label>' +
			'		<input id="report-file-upload" class="file-upload" type="file" multiple="multiple" style="opacity: 0;">' +
			'       <input type="hidden" name="report_images" />' +
			'		<div class="show-image" id="report-show-image"></div>' +
			'		<div class="upload-preview">' +
			'			<label for="report-file-upload" class="ley-upload">+</label>' +
			'		</div>' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<input class="ley-input ley-radius ley-submit" type="submit" value="立即举报" />' +
			'	</div>' +
			'</form>' +
			'</div>';


			$(this).leyPopup({
				title: '举报平台',
				content: temStr
			}, function () {
				$('#report-form .ley-submit').click(function () {
					var reportDescribe = $('textarea[name="report_describe"]');
					var reportMobile = $('input[name="report_mobile"]');
					$('#report-form .error-msg').text('');
					if (!reportDescribe.val().trim()) {
						reportDescribe.prev().text('举报描述不能为空');
						return false;
					} else if (!reportMobile.val().trim()) {
						reportMobile.prev().text('联系方式不能为空');
						return false;
					}
					
					$.ajax({
						type: 'post',
						url: "/commit_report",
						data: $('#report-form').serialize(),
						async: false,
						success (ret) {
							$(this).leyAlert({
								type: 'success',
								content: '提交成功'
							});
							$('input[name="report_images"]').val('');
							reportImages = [];
						},
						error(ret){
							var errors = ret.responseJSON.errors
							var errorMsg = ''
							for (const key in errors) {
								if (errors.hasOwnProperty(key)) {
									const element = errors[key];
									errorMsg += element[0] + '<br \><br \>'
								}
							}
						}
					});
	
					return false;
				})
			});
	}); 

	// 举报上传
	$(document).on('input propertychange', '#report-file-upload',function() {
		var files = $(this).context.files;
		for (var i = files.length - 1; i >= 0; i--) {
			
			if(reportImages.length >= 5){
				alert('最多上传五张图片');return;
			}
			
			upload(files[i], {
				success:function(res){
					reportImages.push(res);
					$('#report-show-image').append('<img src="' + res.url +
					'"  class="ley-preview">')
					$('input[name="report_images"]').val(JSON.stringify(reportImages));
				}
			});
		}
	});



	$('.filter-more').click(function(){
		$(this).hide();
		$('.filter-provice-more').css('display', 'inline-block');
	})

	
	// 回复
	$('.replay-btn').click(function () {
		var temStr = '<div class="feedback-wrapper">' +
			'<form action="" id="replay-form" class="ley-form ley-no-lable">' +
			'<input type="hidden" value="'+$(this).data('plateform-id')+'" name="plateform_id">'+
			'<input type="hidden" value="'+$(this).data('parent-id')+'" name="parent_id">'+
			'	<div class="ley-inline-group">' +
			'		<label class="ley-lable">回复内容</label>' +
			'		<div class="error-msg"></div>' +
			'		<textarea class="ley-input" name="content" placeholder="回复内容"></textarea>' +
			'	</div>' +
			'	<div class="ley-inline-group">' +
			'		<input class="ley-input ley-radius ley-submit" type="submit" value="立即回复" />' +
			'	</div>' +
			'</form>' +
			'</div>';


			$(this).leyPopup({
				title: '回复',
				content: temStr
			}, function () {
				$('#replay-form .ley-submit').click(function () {
					var content = $(this).parents('form').find('textarea[name="content"]');
					$('#replay-form .error-msg').text('');
					if (!content.val().trim()) {
						content.prev().text('回复内容不能为空');
						return false;
					}
					
					$.ajax({
						type: 'post',
						url: "/plateform_ajax_comment",
						data: $('#replay-form').serialize(),
						async: false,
						success (ret) {
							$(this).leyAlert({
								type: 'success',
								content: '回复成功'
							});
							window.location.reload()
						},
						error(ret){
							var errors = ret.responseJSON.errors
							var errorMsg = ''
							for (const key in errors) {
								if (errors.hasOwnProperty(key)) {
									const element = errors[key];
									errorMsg += element[0] + '<br \><br \>'
								}
							}
						}
					});
	
					return false;
				})
			});
	});
	
	// 判断用户是否关闭过广告条
	var downApp = window.sessionStorage.getItem('downApp');
	if (!downApp) {
		$('.download-app').fadeIn();
	}
	// 关闭下载APP广告条
	$('.colse-download').click(function(){
		window.sessionStorage.setItem('downApp', 1);
		$('.download-app').fadeOut();
	})


})(jQuery, window, document);


