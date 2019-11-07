$.fn.bkoContact = function()
{
	let $self = $(this);
	if( $self.isBound("submit") === false )
	{
		$self.on("submit", function( e )
		{
			e.preventDefault();
			let $form = $(this);
			let data = $(this).serializeArray();
			let message = '';
			let subject = '';
			for ( let i = 0; i <= data.length -1; i++ )
			{
				if (
					data[ i ][ 'name' ] === "Nom"
					|| data[ i ][ 'name' ] === "Prénom"
					|| data[ i ][ 'name' ] === "Société"
					|| data[ i ][ 'name' ] === "Téléphone"
					|| data[ i ][ 'name' ] === "Email"
				)
				{
					message += "<b>" + data[ i ][ 'name' ] + ": </b>" + data[ i ][ 'value' ] + "<br />";
				}
				else if ( data[ i ][ 'name' ] === "Message" )
				{
					message += "<br /> <br />" + nl2br( data[ i ][ 'value' ] ) + "<hr />";
				}
				else if ( data[ i ][ 'name' ] === "subject" )
				{
					subject += data[ i ][ 'value' ];
				}
			}
			jQuery.ajax({
				type:'POST',
				url : 'https://www.bkotest.com/staticmailer/staticmailer.php',
				data : {
					'token': getAPITkn(),
					'mail': 'contact@oveto.fr',
					'subject': subject,
					'message': message
				},
				success : function ( resp )
				{
					console.log( resp );
					document.getElementById("contact-error").innerHTML = "Votre message a bien été envoyé.";
					eraseForm(".contact-form");
				},
				error: function ( resp )
				{
					console.log( "error bkoFormidableSubmitForm", resp );
					document.getElementById("contact-error").innerHTML = "Une erreur s'est produite lors de l'envoi de votre message.";
				}
			});
		});
	}
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
