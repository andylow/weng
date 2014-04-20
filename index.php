<?php 
	//require_once('include/config.php');
?>

<!DOCTYPE HTML>
<html>
<head>
	<title>Weng Photograph</title>
    <?php include('include/include.php') ?>
    <script>
<!--
    var bName = getBrowser().split(" ", 2)[0];
    if(bName == "MSIE" || bName == "IE") {
    	location.href = "index.html";
    }

    function getBrowser(){
	    var ua= navigator.userAgent, tem, 
	    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
	    if(/trident/i.test(M[1])){
	        tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
	        return 'IE '+(tem[1] || '');
	    }
	    M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
	    if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	    return M.join(' '); //eg: "Chrome 33.0.1750.154"
	}
//-->
    </script>
</head>
<body oncontextmenu="return false">
	<div class="loading">
		<div class="bubblingG">
			<span id="bubblingG_1"></span>
			<span id="bubblingG_2"></span>
			<span id="bubblingG_3"></span>
		</div>
	</div>

	<div class="logo-wrapper"><div class="logo"></div></div>
	<div class="menu_bar">
		<div class="menu-wrapper">
		<ul>
			<li class="navLink"><a name="aboutme" href="#">about me</a></li>
			<li class="navLink"><a name="albums" href="#">albums</a></li>
			<li class="navLink"><a name="contactme" href="#">contact me</a></li>
		</ul>
		</div>
	</div>

	<div class="ajax" style="display:none;"></div>
	<div class="ajaxShow" style="display:none;"></div>

	<div class="content-wrapper" data-current="0">
		<div class="homediv content">
			<div class="homealbum"></div>
		</div>
		<div class="aboutmediv content">
			<div class="aboutmeblur"></div>
			<div class="aboutme"></div>
		</div>
		<div class="albumsdiv content">
			<div class="albums"></div>
		</div>
	</div>

	<div class="music"></div>

	<div class="copyright">
		Copyright &copy; 2013 [yun]. All Rights Reserved <br/> 
		(Beta) Designed by [yun]
	</div>

	<div class="mz">
		<img src="img/mz.png" width="32px" height="32px" />
	</div>
</body>
</html>