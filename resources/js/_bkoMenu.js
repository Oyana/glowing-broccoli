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
