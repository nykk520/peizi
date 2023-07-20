; (function ($, window, document, undefined) {
	$.fn.countTo = function () {
		var defaultConfig = {
			from: 0,
			to: 0,
			speed: 1000,
			refreshInterval: 100,
			formatter: function (b, a) {
				return b.toFixed(0)
			}
		};
		this.each(function () {
			var c = $.extend({}, defaultConfig, {
				from: $(this).data("from"),
				to: $(this).data("to"),
				speed: $(this).data("speed"),
				refreshInterval: $(this).data("refresh-interval")
			});
			var h = Math.ceil(c.speed / c.refreshInterval),
				i = (c.to - c.from) / h;
			var j = this,
				f = $(this),
				e = 0,
				g = c.from,
				d = f.data("countTo") || {};
			f.data("countTo", d);
			if (d.interval) {
				clearInterval(d.interval)
			}
			d.interval = setInterval(function () {
				g += i;
				e++;
				b(g);
				if (e >= h) {
					f.removeData("countTo");
					clearInterval(d.interval);
					g = c.to;
				}
			}, c.refreshInterval);
			b(g);
			function b (m) {
				var l = c.formatter.call(j, m, c);
				f.html(l)
			}
		})
		return this;
	};

	$.fn.previewImg = function (fn) {
		this.each(function () {
			var _this = $(this);
			var temSrc = ''
			_this.hasClass('axis-wrapper-img') ? (temSrc = _this.data('src')) : (temSrc = _this.attr('src'))
			_this.click(function () {
				if (!_this[0].naturalWidth) {
					return false
				}

				var naturalWidth = _this[0].naturalWidth;
				var naturalHeight = _this[0].naturalHeight;
				var ratio = naturalWidth / naturalHeight;
				var clientWidth = document.documentElement.clientWidth;
				var clientHeight = document.documentElement.clientHeight;
				console.log(naturalWidth, naturalHeight, clientWidth, clientHeight, ratio);
				var temStyle = '';
				if (ratio >= 1) {
					var resWidth = parseInt(clientWidth / ratio);
					if (resWidth > clientHeight) {
						resWidth = clientHeight * 0.8
					} else {
						resWidth = resWidth * 0.8;
					}
					
					temStyle = 'height:' + resWidth + 'px';
				} else {
					var resHeight = parseInt(clientHeight * ratio);
					resHeight = resHeight * 0.8;
					temStyle = 'width:' + resHeight + 'px';
				}
				var temStr = '<div style="display: none" class="preview-bg"><img style="' + temStyle + '" src="' + temSrc + '" alt=""></div>';
				$('body').append(temStr);
				if (fn) fn($('.preview-bg'));
			});
		})
	};

	$.fn.tabCard = function(options, fn) {
		var defaultConfig = {
			activeClass: 'ley-tab-card-active',
			tabItemClass: '.hd-item',
			tabPanelClass: '.bd-item'
		};
		options = $.extend({}, defaultConfig, options);
		this.each(function(){
			var _this = $(this);
			_this.find(options.tabItemClass).click(function(){
				$(options.tabItemClass).removeClass(options.activeClass);
				var temIndex = $(this).addClass(options.activeClass).index();
				_this.find(options.tabPanelClass).hide();
				_this.find(options.tabPanelClass).eq(temIndex).fadeIn(function(){
					if (fn) fn(temIndex)
				});
			})
		})
	};

	$.fn.leyPopup = function (options, fn) {
		var defaultConfig = {
			title: '提示',
			content: ''
		};

		options = $.extend({}, defaultConfig, options);

		this.each(function () {
			var _this = $(this);
			var temStr = '<div class="popup-bg">' +
				'	<div class="popup-wraper ley-radius">' +
				'		<div class="popup-hd">' + options.title + '</div>' +
				'		<div class="popup-bd">' + options.content + '</div>' +
				'		<div class="popup-close">×</div>' +
				'	</div>' +
				'</div>';
			$('body').append(temStr);
			setTimeout(function () {
				$('.popup-wraper').addClass('ley-scale');
			}, 100);
			$('.popup-close').click(function () {
				$(this).parents('.popup-bg').remove();
			})
			if (fn) fn()
		});

		return this;
	};


	$.fn.leyAlert = function (options, fn) {
		var defaultConfig = {
			title: '提示',
			type: 'info', // 成功 success， 失败 error， 警告 warning， 消息 info
			content: '',
			reload: false, // 是否刷新页面
		};

		options = $.extend({}, defaultConfig, options);

		this.each(function () {
			var _this = $(this);
			var temStr = '<div class="popup-bg">' +
				'	<div class="popup-wraper ley-radius">' +
				'		<div class="popup-hd">' + options.title + '</div>' +
				'		<div class="popup-bd">' + options.content + '</div>' +
				'		<div class="popup-close">×</div>' +
				'	</div>' +
				'</div>';
			$('body').append(temStr);
			setTimeout(function () {
				$('.popup-wraper').addClass('ley-scale');
			}, 100);

			setTimeout(function(){
				$('.popup-bg').remove();
				if (options.reload) {
					window.location.reload()
				}
			}, 1000)

			$('.popup-close').click(function () {
				$('.popup-bg').remove();
				if (options.reload) {
					window.location.reload()
				}
			})
			if (fn) fn()
		});

		return this;
	};

	$.extend({
		BrowserDetect: {
			init: function () {
				return {
					browser: this.searchString(this.dataBrowser) || "An unknown browser",
					version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version"
				}
			},
			searchString: function (data) {
				for (var i = 0; i < data.length; i++) {
					var dataString = data[i].string;
					var dataProp = data[i].prop;
					this.versionSearchString = data[i].versionSearch || data[i].identity;
					if (dataString) {
						if (dataString.indexOf(data[i].subString) != -1)
							return data[i].identity;
					}
					else if (dataProp)
						return data[i].identity;
				}
			},
			searchVersion: function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index == -1) return;
				return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
			},
			dataBrowser: [
				{
					string: navigator.userAgent,
					subString: "Chrome",
					identity: "Chrome"
				},
				{
					string: navigator.vendor,
					subString: "Apple",
					identity: "Safari",
					versionSearch: "Version"
				},
				{
					prop: window.opera,
					identity: "Opera",
					versionSearch: "Version"
				},
				{
					string: navigator.userAgent,
					subString: "Firefox",
					identity: "Firefox"
				},
				{
					string: navigator.userAgent,
					subString: "MSIE",
					identity: "Explorer",
					versionSearch: "MSIE"
				},
				{
					string: navigator.userAgent,
					subString: "Gecko",
					identity: "Mozilla",
					versionSearch: "rv"
				},
				{
					string: navigator.userAgent,
					subString: "Mozilla",
					identity: "Netscape",
					versionSearch: "Mozilla"
				}
			]
		}
	});

})(jQuery, window, document);

// 上传
function upload (file, callback) {
	var formData = new FormData()

	formData.append('file', file);

	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/files_upload');
	let token = document.head.querySelector('meta[name="csrf-token"]');
	if (token) {
		xhr.setRequestHeader('X-CSRF-TOKEN', token.content);
	} else {
		alert('上传失败, 请刷新浏览器后重试');
	}

	xhr.upload.onprogress = function (e) {
		if (e.lengthComputable) {
			var percentComplete = (e.loaded / e.total) * 100;
			if (callback != undefined && callback.onprogress != undefined) {
				callback.onprogress(percentComplete.toFixed(2))
			}
		}
	};

	xhr.onreadystatechange = function (e) {
		if (xhr.readyState == 4) {
			var ret = JSON.parse(xhr.responseText);
			if (ret.code === 'success') {
				if (callback != undefined && callback.success != undefined) {
					callback.success(ret.data)
				}
			} else {
				if (callback != undefined && callback.error != undefined) {
					callback.error(ret.data)
				}
			}
		}
	};

	xhr.send(formData);

}

function followPlateform (obj, plateform_id) {
	$.ajax({
		type: 'post',
		url: "/plateform_ajax_follow",
		data: {
			plateform_id: plateform_id
		},
		async: false,
		success (ret) {
			$(this).leyAlert({
				type: 'success',
				content: ret.msg,
				reload:true
			});
		}
	});
}

function unfollowPlateform (obj, plateform_id) {
	$.ajax({
		type: 'post',
		url: "/plateform_ajax_unfollow",
		data: {
			plateform_id: plateform_id
		},
		async: false,
		success (ret) {
			$(this).leyAlert({
				type: 'success',
				content: '取消成功',
				reload:true
			});
		}
	});
}

function followWarning (obj, warning_id) {
	$.ajax({
		type: 'post',
		url: "/warning_ajax_follow",
		data: {
			warning_id: warning_id,
			sp:getCookie('sp')
		},
		async: false,
		success (ret) {
			$(this).leyAlert({
				type: 'success',
				content: '关注成功',
				reload:true
			});
		}
	});
}

function unfollowWarning (obj, warning_id) {
	$.ajax({
		type: 'post',
		url: "/warning_ajax_unfollow",
		data: {
			warning_id: warning_id,
			sp:getCookie('sp')
		},
		async: false,
		success (ret) {
			$(this).leyAlert({
				type: 'success',
				content: '取消成功',
				reload:true
			});
		}
	});
}


