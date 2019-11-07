( function() {
	Turbolinks.start();
	let ready = function()
	{
		console.log( "🦄 TurboLinks Ready -> " + window.location.href + " width: " + $(window).width());
		let pageWidth = $(window).width();

		// We reset the scroll to 0 at every page load
		$('html, body').scrollTop(0);

		if ( pageWidth >= 481 )
		{
			setTimeout( function()
			{
				/**
				 * Uncoment to unable animation & update gulpdile.js
				 */
				// setAnimationList();
			}, 100);
		}
		/**
		 * Uncoment to unable bko scrollind links & update gulpdile.js
		 */
		// $('a').bkoScroll();

		/**
		 * Uncoment to unable bko coookie baner & update gulpdile.js
		 */
		// $("body").bkoCookies({
		// 	bkoBgColor: '#4f6254'
		// });

		/**
		 * Uncoment to unable google analitycs & update gulpdile.js
		 */
		// trackPChange();

		/**
		 * Uncoment to unable bko mobile menu & update gulpdile.js
		 */
		// $(".menu-mobile").bkoMenu();

		/**
		 * Uncoment to unable bko contact form & update gulpdile.js
		 */
		// $(".contact-form").bkoContact('{tokenApi}', '{emailTo}');

		/**
		 * Uncoment to unable bko lazyload & update gulpdile.js
		 */
		// lazywatcher();
	}
	let cache = function()
	{
		console.log( "🦄 TurboLinks CacheLoad" );
		/**
		 * Uncoment to unable animation & update gulpdile.js
		 */
		// resetAnimationList();
	}
	document.addEventListener("turbolinks:before-cache", cache);
	document.addEventListener("turbolinks:load", ready);

	$(window).on('scroll', function()
	{
		let fromTop = $(window).scrollTop();
		if ( $(window).width() >= 481 )
		{
			/**
			 * Uncoment to unable animation & update gulpdile.js
			 */
			// setAnimationList();
		}
		$('body').toggleClass("down", (fromTop > 150));
	});

	/**
	 * Uncoment to unable google analitycs & update gulpdile.js
	 */
	// gaInit( '{yourUA}' );
} )( jQuery );
