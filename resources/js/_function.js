'use strict';

$.fn.isBound = function(type, fn)
{
	if (
		(
			this.data('eventsisBound') === undefined
			|| this.data('eventsisBound')[type] === undefined
			|| this.data('eventsisBound')[type].length === 0
		)
		&& this.data('eventsisBound') !== type
	)
	{
		this.data("eventsisBound", type);
		return false;
	}
	return true;
};

$.fn.checkVisible = function( evalType )
{
	evalType = evalType || "visible";

	const vpH = $(window).height(), // Viewport Height
		st = $(window).scrollTop(), // Scroll Top
		y = $(this).offset().top,
		elementHeight = $(this).height();
	if ( evalType === "visible" )
	{
		return ((y < (vpH + st)) && (y > (st - elementHeight)));
	}
	else if ( evalType === "above" )
	{
		return ((y < (vpH + st)));
	}
	return false;
}

function getYTId( urlYT )
{
	const ytID = urlYT.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ );
	if ( ytID && ytID[2].length === 11 )
	{
		return ytID[2];
	}
	else
	{
		return 'error';
	}
}

function trackPChange()
{
	ga("set", "location", window.location.href);
	ga("send", "pageview");
}

$.fn.resize16_9 = function()
{
	return $(this).height( $(this).width() * 0.5628205128205128 );
}

$.fn.bkoMenu = function( userParam )
{
	const defaultParam = {
		'mainSelector': 'body',
		'menuSelector': this,
		'closeSelector': ".mobile-fermeture",
		'btnSelectorSub': ".sub-menu-btn",
		'burgerSelector': '.hamburger',
		'oppenSelector': '.openMenu',
		'oppenSubSelector': '.openSubMenu',
		'oppenBurgerSelector': '.is-active'
	};
	let param = $.extend( defaultParam, userParam );
	let $burger = $( param.burgerSelector );
	let $burgerAvtive = $( param.burgerSelector + param.oppenBurgerSelector );
	let $close = $( param.closeSelector );
	let $main = $( param.mainSelector );
	const isOppen = param.oppenSelector.substring( 1 );
	const isOppenSub = param.oppenSubSelector.substring( 1 );
	const isActive = param.oppenBurgerSelector.substring( 1 );
	const btnSelectorSub = param.btnSelectorSub.substring( 1 );

	// function
	let toggleBkoMenu = function()
	{
		$main.toggleClass( isOppen );
		$burger.toggleClass( isActive );
	}

	if( $burger.isBound( "bkoMenu" ) == false )
	{
		$burger.on( "click", toggleBkoMenu );
		$close.on( "click", toggleBkoMenu );

		$(".menu-mobile li a").on( "click", toggleBkoMenu );

		// ajouter fleche sous-menu
		$(".menu-mobile li.menu-item-has-children").prepend("<div class='" + btnSelectorSub + "'><i class=\"fa fa-chevron-right\"></i></div>");
		// le selecteur 'li.menu-item-has-children ' + param.btnSelectorSub
		// ne doit en aucun cas être stoqué dans une variable (probleme de porté du sélécteur $)
		$( 'li.menu-item-has-children ' + param.btnSelectorSub ).on( "click", function(e) {
			var toggleBtn = $(this).parent();
			if ( toggleBtn.hasClass( isOppenSub ) )
			{
				toggleBtn.removeClass( isOppenSub );
			}
			else
			{
				$(param.btnSelectorSub).removeClass( isOppenSub );
				toggleBtn.addClass( isOppenSub );
			}
		});
	}
	// reset
	$burgerAvtive.removeClass( isActive );
}

function getAPITkn()
{
	const kley = "{yourAPIKey}";
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	const yyyy = today.getFullYear();
	if( dd<10 )
	{
		dd = '0'+dd
	}
	if( mm<10 )
	{
		mm = '0'+mm
	}
	return MD5( kley + MD5( yyyy + '-' + mm + '-' + dd ) );
}

function nl2br (str, is_xhtml) {
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function lazywatcher()
{
	$(window).on('scroll', function()
	{
		loadwithlazyiness();
	});
	$(window).on('hashchange', function (e) {
		loadwithlazyiness();
	});
	loadwithlazyiness();
}

function loadwithlazyiness()
{
	$('.lazyload').each(function()
	{
		let elem = this;
		if ( checkVisible( elem ) )
		{
			lazyload( $(elem) );
		}
	});
};

function lazyload ( $elem )
{
	if(
		$elem.prop("tagName") === "img"
		|| $elem.prop("tagName") === "IMG"
		|| $elem.prop("tagName") === "iframe"
		|| $elem.prop("tagName") === "IFRAME"
	)
	{
		$elem.attr('src', $elem.attr("data-lazy"));
	}
	else
	{
		$elem.css( "background-image", "url(" + $elem.attr("data-lazy") + ")" );
	}
	$elem.removeClass('lazyload');
}

function checkVisible( elem, evalType )
{
	evalType = evalType || "visible";

	let vpH = $(window).height(), // Viewport Height
		st = $(window).scrollTop(), // Scroll Top
		y = $(elem).offset().top,
		elementHeight = $(elem).height();
	if ( evalType === "visible" )
	{
		return ( ( y < ( vpH + st ) ) && ( y > ( st - elementHeight ) ) );
	}
	else if ( evalType === "above" )
	{
		return ( ( y < ( vpH + st ) ) );
	}
	return false;
}

$.fn.bkoCookies = function( param )
{
	var defaultParam = {
		'bkoTxt': '<p>En poursuivant votre navigation sur ce site, vous acceptez l\'utilisation de Cookies ou autres traceurs.</p><p>Ceux-ci sont utilisés pour améliorer et personnaliser votre navigation sur le site, réaliser des statistiques et des mesures d\'audiences.</p>',
		'bkoBgColor': '#4f6254',
		'bkoTxtColor': '#ffffff'
	};
	var param = $.extend( defaultParam, param );
	var body = $("body");
	var bkoCookiesTxt = param.bkoTxt;
	var bkoCookiesBgColor = param.bkoBgColor;
	var bkoCookiesTxtColor = param.bkoTxtColor;

	// Class qui vont apparaître dans le body pour gérer l'affichage du bandeau
	var valeurCookieOk = "bkoCookies-button-ok";
	var valeurCookieNotOk = "bkoCookies-button-not-ok";

	var pageWidth = $(window).width();


	// Au loading de la page on vérifie si on a déjà le cookie :
	if ( localStorage.getItem('bkoCookies') != 'bkoCookies-button-ok' && localStorage.getItem('bkoCookies') != 'bkoCookies-button-not-ok' )
	{
		bkoCookiesLaunch();

	// si on a déjà cliqué sur un bouton  -> cliqué Oui
	} else if ( localStorage.getItem('bkoCookies') == 'bkoCookies-button-ok' ) {
		trackPChange();
		console.log('btn-ok');

	// si on a déjà cliqué sur un bouton  -> cliqué Non
	} else if ( localStorage.getItem('bkoCookies') == 'bkoCookies-button-not-ok' ) {
		console.log('btn-not-ok');
	}

	// html
	function bkoCookiesHtml()
	{
		var bkoCookiesHtml = "<div class='bkoCookies-wrapper'><div class='bkoCookies-content'>"+bkoCookiesTxt+"</div><div class='bkoCookies-buttons'><button class='bkoCookies-button bkoCookies-accept' href='#' >J'accepte</button><button class='bkoCookies-button bkoCookies-denied' href='#' >Je&nbsp;refuse</button></div></div>";

		$(body).prepend(bkoCookiesHtml);
	}

	// css
	function bkoCookiesCss()
	{
		if ( pageWidth <= 600 )
		{
			$(".bkoCookies-wrapper").addClass("bkoCookies-responsive");
		} else {
			$(".bkoCookies-wrapper").removeClass("bkoCookies-responsive");
		}

		$(".bkoCookies-wrapper").css({
			"position": "fixed",
			"display": "none",
			"bottom": "0",
			"left": "0",
			"flex-direction": "row",
			"justify-content": "center",
			"width": "100%",
			"z-index": "9999",
			"padding": "2rem",
			"transition": "opacity 0.2s ease",
			"color": bkoCookiesTxtColor,
			"background-color": bkoCookiesBgColor,
			"box-shadow": "0 0 0.8rem 0.3rem rgba(0,0,0,0.3)"
		});
		$(".bkoCookies-content").css({
			"display": "flex",
			"flex-direction": "column",
			"justify-content": "center",
			"background-color": bkoCookiesBgColor,
			"color": bkoCookiesTxtColor
		});
		$(".bkoCookies-content p").css({
			"line-height": "1.7rem",
			"font-size": "1.5rem",
			"margin-bottom": "0"
		});
		$(".bkoCookies-buttons").css({
			"display": "flex",
			"flex-direction": "column",
			"justify-content": "center",
			"padding-left": "3%"
		});
		$(".bkoCookies-accept").css({
			"display": "block",
			"margin-bottom": "0.8rem",
			"padding": "0.5rem 2.5rem",
			"background-color": bkoCookiesTxtColor,
			"text-transform": "uppercase",
			"border": "0.1rem solid white",
			"box-shadow": "none",
			"font-size": "1.3rem",
			"cursor": "pointer",
			"color": bkoCookiesBgColor
		});
		$(".bkoCookies-denied").css({
			"display": "block",
			"padding": "0.5rem 2.5rem",
			"background-color": "transparent",
			"text-transform": "uppercase",
			"border": "0.1rem solid white",
			"box-shadow": "none",
			"font-size": "1.3rem",
			"cursor": "pointer",
			"color": bkoCookiesTxtColor
		});
		$(".bkoCookies-denied").mouseover(function() {
			$(this).css({
				"background-color": bkoCookiesTxtColor,
				"color": bkoCookiesBgColor
			});
		});
		// SKIN effet hover bouton refuser
		$(".bkoCookies-denied").mouseover(function() {
			$(this).css({
				"background-color": bkoCookiesTxtColor,
				"color": bkoCookiesBgColor
			});
		}).mouseout(function() {
			$(this).css({
				"background-color": bkoCookiesBgColor,
				"color": bkoCookiesTxtColor
			});
		});
		// SKIN responsive
		$(".bkoCookies-responsive").css({
			"flex-direction": "column",
			"color": bkoCookiesBgColor
		});
		$(".bkoCookies-responsive .bkoCookies-buttons").css({
			"padding-left": "0",
			"padding-top": "2rem"
		});
	}

	// action clic sur Oui -> enregistrement cookie
	function bkoCookiesAccept()
	{
		localStorage.setItem("bkoCookies", valeurCookieOk);
		$("body").removeClass(valeurCookieNotOk);
		$("body").addClass(valeurCookieOk);
		$(".bkoCookies-wrapper").css("display", "none");
	}

	// action clic sur Non -> enregistrement cookie
	function bkoCookiesDenied()
	{
		localStorage.setItem("bkoCookies", valeurCookieNotOk);
		$("body").removeClass(valeurCookieOk);
		$("body").addClass(valeurCookieNotOk);
		$(".bkoCookies-wrapper").css("display", "none");
	}

	// init cookieBaner!
	function bkoCookiesLaunch()
	{
		bkoCookiesHtml();
		bkoCookiesCss();
		$(".bkoCookies-wrapper").css('display', 'flex');
		$(body).find('.bkoCookies-accept');
	}

	// stockage choix utilisateur
	if( localStorage.getItem('bkoCookies') )
	{
		$(body).addClass( localStorage.getItem('bkoCookies') );
	}

	// action au clic sur Oui
	$('.bkoCookies-accept').on("click", function(){
		bkoCookiesAccept();

		// verif turbolinks -> idempotence
		if ( !$(body).attr('data-appended') )
		{
			$(body).attr('data-appended', 'true');
			trackPChange();
			console.log('cookie-accept');
		}
	});

	// action au clic sur Non
	$('.bkoCookies-denied').on("click", function(){
		bkoCookiesDenied();
		console.log('cookie-denied');
	});
}

$.fn.bkoScroll = function()
{
	let $self = $(this);
	if( $self.isBound("click") === false )
	{
		$self.on('click', function (event)
		{
			let target = $.attr(this, 'href').split("#");
				if ( target[1] && document.getElementById( target[1] ) )
				{
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: $( "#" + target[1] ).offset().top
						},
						500,
						'swing',
						function()
						{
							window.location.hash = target[1];
						}
					);
				}
		});
	}
}
