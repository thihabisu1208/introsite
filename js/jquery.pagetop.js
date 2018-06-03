/**
 * jQuery plugin pageTop
 * Copyright 2014 goma.pw
 * Released under the MIT license
 * http://goma.pw/license/
 * @author: goma.pw
 * @version: 1.0.0
 * @date: 2014/12/12
 * @requires: jQuery
 **/
;(function($){
	var pluginName = 'pageTop';
	$.fn[pluginName] = function(options){
		$.fn[pluginName].defaults = {
			autoHide: true,
			ratio: 0.3,
			animateTime: 500
		};
		var opt = $.extend($.fn[pluginName].defaults, options);
		var winHei = $(window).height();
		var docHei = getDocumentHeight();
		if(opt.ratio > 1){opt.ratio = 1;}
		return this.each(function(i){
			var thisElm = $(this);
			var originalPos = parseInt(thisElm.css('bottom'), 10);
			var thisATag = thisElm.find('a');
			var pageScrollTop = $(window).scrollTop();
			if(this.tagName == 'a'){
				thisATag = thisElm;
			}
			thisATag.unbind('click').bind('click', function(e){
				e.preventDefault();
				var thisHash = this.hash,
				to = thisHash == '' || $(thisHash).length == 0 ? 0 : $(thisHash).offset().top,
				max = docHei - winHei;
				if(to > max){to = max;}
				$('html, body').stop(false, true).animate({scrollTop: to}, opt.animateTime);
			});
			$(window).resize(function(){
				winHei = $(window).height();
				docHei = getDocumentHeight();
				if(opt.autoHide){
					pageTopBtn();
				}
			});
			/*** scroll ***/
			$(window).scroll(function(){
				if(opt.autoHide){
					pageTopBtn();
				}
			}).trigger('scroll');
			function pageTopBtn(){
				pageScrollTop = $(window).scrollTop();
				var scrolled = pageScrollTop / (docHei - winHei);
				/*** pagetop ***/
				var thisElmDisp = thisElm.css('display') == 'none';
				if(docHei > winHei){
					if(scrolled > opt.ratio){
						if(thisElmDisp){
							thisElm.fadeIn(opt.animateTime);
						}
					}else{
						if(!thisElmDisp){
							thisElm.fadeOut(opt.animateTime);
						}
					}
				}else{
					thisElm.hide();
				}
			}
		});
		function getDocumentHeight(){
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
		}
	};
})(jQuery);