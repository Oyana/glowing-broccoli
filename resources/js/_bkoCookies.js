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
