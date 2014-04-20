$(function(){

	var albums = new Array();

	flexibleCSS();

	function flexibleCSS() {
		$('.aboutmeblur, .aboutme').css('left', ($(this).width()/2)-70 );
		$('.aboutme').css('left', ($(this).width()/2)-70 );
		parallaxScroll(parseInt($('.content-wrapper').attr('data-current')));
	}

	function parallaxScroll(id) {
		$('.content-wrapper').attr('data-current', id);
		var w = $('.content').width();
		switch(id) {
			case 0: 
				$('.homediv').animate({ "left": "0px" }, { duration: 1000, queue: false });
				$('.aboutmediv').animate({ "left": w+"px" }, { duration: 1000, queue: false });
				$('.albumsdiv').animate({ "left": w*2+"px" }, { duration: 1000, queue: false });
				break;
			case 1:
				$('.homediv').animate({ "left": -w+"px" }, { duration: 1000, queue: false });
				$('.aboutmediv').animate({ "left": "0px" }, { duration: 1000, queue: false });
				$('.albumsdiv').animate({ "left": w+"px" }, { duration: 1000, queue: false });
				break;
			case 2:
				$('.homediv').animate({ "left": -w*2+"px" }, { duration: 1000, queue: false });
				$('.aboutmediv').animate({ "left": -w+"px" }, { duration: 1000, queue: false });
				$('.albumsdiv').animate({ "left": "0px" }, { duration: 1000, queue: false });
		}
	}

	function showAlbums() {
		var div = "";
		$.each(albums, function(id, item){
			div += '<div class="album" id="'+id+'" ';
			div += 'style="background-image:url(\''+$(item.html()).children(0).attr('src')+'\');" >';
			div += '</div>';
			return;
		});
		return div;
	}

	//album id = 196721493822120
	function showPhotos( id ){
		$('.ajaxShow').queue('ajax', [function( next ) { 
			$(this).html(albums[id].html());
			setTimeout(next, 500);
		}, function( next ) {
			$('.photos').fotorama({
				width: 700,
				height: 467,
				transition: 'crossfade',
				transitionduration: '500',
				loop: true,
				autoplay: 3000,
				stopautoplayontouch: false,
				shuffle: true,
				shadows: true,
				thumbheight: 50,
				nav: 'thumbs'
			});
			setTimeout(next, 500);
		}, function( next ){
			$('.ajax').show();
			$(this).fadeIn("slow");
			$('.loading').hide();
			next();
		}]).dequeue('ajax');
	}

	function randomXToY(minVal,maxVal,floatVal) {
		var randVal = minVal+(Math.random()*(maxVal-minVal));
		return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
	}

	function AnimateRotate(obj, sAngle, eAngle) {
	    // (starts from `0` to `angle`), you can name it as you want
	    if( sAngle > 180 && eAngle == 0) eAngle = 360;
	    if( eAngle > 180 && sAngle == 0) sAngle = 360;
	    $({deg: sAngle}).animate({deg: eAngle}, {
	        step: function(now) {
	            obj.css({
	                transform: 'rotate(' + now + 'deg)'
	            });
	        }
	    });
	}

	function getRotationDegrees(obj) {
	    var matrix = obj.css("-webkit-transform") ||
	    obj.css("-moz-transform")    ||
	    obj.css("-ms-transform")     ||
	    obj.css("-o-transform")      ||
	    obj.css("transform");
	    if(matrix !== 'none') {
	        var values = matrix.split('(')[1].split(')')[0].split(',');
	        var a = values[0];
	        var b = values[1];
	        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	    } else { var angle = 0; }
	    return (angle < 0) ? angle +=360 : angle;
	}

	function homeAlbum(){
		var id = Math.floor((Math.random()*albums.length));
		$(albums[id].html()).children().each( function() {
			var hPhotos = $('<div>').html(this).addClass('homePhoto');
			$('.homealbum').append(hPhotos[0].outerHTML);
		});

		$(".homePhoto").each(function (i) {
			var tempVal = Math.round(Math.random());
			if(tempVal == 1) {
				var rotDegrees = randomXToY(340, 360); // rotate left
			} else {
				var rotDegrees = randomXToY(0, 20); // rotate right
			}
			
			var wiw = Math.random()*($(window).width()-400);
			var wih = (Math.random()*($(window).height()-500))+150;
			
			var cssObj = { 'left' : wiw, 'top' : wih,
				'-webkit-transform' : 'rotate('+ rotDegrees +'deg)',  // safari only
				'transform' : 'rotate('+ rotDegrees +'deg)' }; // added in case CSS3 is standard
			$(this).css(cssObj);
		});

		var zindexnr  = 0;

		// boolean to check if the user is dragging
		$(".homePhoto").mousedown(function(e){
			// Prevent right mouse click
			if( e.button == 2 ) {
	            return false;
	        }

	        $(this).attr('data-clicked', true);

			$('.homePhoto').addClass('homePhoto_blur');
			$(this).removeClass('homePhoto_blur');

			zindexnr++;
			savedAngle = getRotationDegrees( $(this) );
			$(this).css({
				'z-index' : zindexnr,
				'box-shadow' : '#888 5px 10px 10px',
				'-webkit-box-shadow' : '#888 5px 10px 10px'
			});
			AnimateRotate($(this), savedAngle, 0);
		});

		$(".homePhoto").mouseup(function(e){
			if( $(this).attr('data-clicked') == 'true' ) {
				$('.homePhoto').removeClass('homePhoto_blur');
				$(this).css({
					'box-shadow' : '',
					'-webkit-box-shadow' : ''
				});
				AnimateRotate($(this), 0, savedAngle);
				$(this).attr('data-clicked', false);
			}
		});

		var savedAngle;
		$(".homePhoto").draggable({
		cursor: 'pointer',
		stop: function(event, ui) {
			$('.homePhoto').removeClass('homePhoto_blur');
			$(this).css({
				'box-shadow' : '',
				'-webkit-box-shadow' : ''
			});
			AnimateRotate($(this), 0, savedAngle);
			$(this).attr('data-clicked', false);
		}
	});
	}

	var rotTimer;
	var rotAngle = 0;
	var rotAni = function(){
	    	rotAngle+=3;
	    	$(".mz img").rotate(rotAngle);
	}

	function initMusiz(){
		var mz = document.createElement('iframe');
			mz.id = 'yt'
			mz.src = "//www.youtube.com/embed/DFhJUk7LNT0?autoplay=1&loop=1&enablejsapi=1";
			mz.width = 0; mz.height = 0;
			//mz.style.display = "none"; //FireFox will not load if display:none;
			$('.mz').append(mz);
	}
	
	function playMusiz(b){
		var iframe = document.getElementById("yt").contentWindow;
		if(b) {
			iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			rotTimer = setInterval(rotAni,50);
		} else {
			iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			clearInterval(rotTimer);
		}
	}

	$.ajax({
		url: 'https://graph.facebook.com/196705750490361/',
		dataType: "json",
		success: function(data, status, xhr){
			$('.aboutme').html(data['description']);
			$(".aboutme").mCustomScrollbar({
            	autoHideScrollbar:true,
				theme:"light-thin"}
			);
		}
	});

	$.ajax({
		url: 'https://graph.facebook.com/196705750490361/albums?fields=photos.fields(images,id),id,name',
		dataType: "json",
		success: function(data, status, xhr){
			$.each(data['data'], function(i, item){
				var msg = '<div id="'+i+'" class="photos">';

				$.each(item['photos']['data'], function(j, photo){
					msg += '<img id="'+photo['id']+'" src="'+photo['images'][0]['source']+'">';
				});

				msg += '</div>';
				albums[i] = $('<div>').html(msg);
				/*var msg = '<div id="'+item['id']+'" class="photos">';

				$.each(item['photos']['data'], function(j, photo){
					msg += '<img id="'+photo['id']+'" src="'+photo['images'][0]['source']+'">';
				});

				msg += '</div>';
				albums[item['id']] = $('<div>').html(msg);*/
			});
			homeAlbum();
		}
	});

	$(window).resize(function(){
		flexibleCSS();
	});

	$('.logo').click(function(e){
		$('.loading').show();
		parallaxScroll(0);
		$('.albumsdiv').promise().done( function(){ $('.loading').fadeOut('slow'); });
	});

	$('a[name="aboutme"]').click(function(e){
		$('.loading').show();
		parallaxScroll(1);
		$('.albumsdiv').promise().done( function(){ $('.loading').fadeOut('slow'); });
	});

	$('a[name="albums"]').click(function(){
		$('.loading').show();
		$('.albums').html( showAlbums() );
		parallaxScroll(2);
		$('.albumsdiv').promise().done( function(){ $('.loading').fadeOut('slow'); });
	});

	$('.albumsdiv').on("click", ".album", function(){
		$('.loading').show();
		showPhotos($(this).attr('id'));
	});

	$('.ajax').click(function(){
		$('.ajaxShow').hide();
		$('.ajaxShow').html('');
		$(this).fadeOut('slow');
	});

	$('.navLink').hover(function(){$(this).addClass('navLink_hover')}, function(){$(this).removeClass('navLink_hover')});

	var play = true;

	$(window).load(function() {
		$('.loading').hide();
		initMusiz();
		playMusiz(play);
		$('.mz img').click(function(){
			play = play?false:true;
			playMusiz(play);
		});
	});
});