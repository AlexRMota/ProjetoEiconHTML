//funcao tocar video
function playVid() {
	var vid = document.getElementById("myVideo");
	//document.getElementById("telaPlay").style.visibility = "hidden"; 
	$("#telaPlay").fadeOut(); 
    vid.play(); 
} 


//funcao para tocar video em background
jQuery(window).on('load', function(){

	$('.btn-detalhes').click(function() {
		var trId = $(this).attr('id');
		if ($('#linha_' + trId).attr('class') == 'hidden') {
			$('#linha_' + trId).attr('class', ''); 
		} else {
			$('#linha_' + trId).attr('class', 'hidden');
		}
	});

	$('.enviar-msg').click(function() {
		if($('.enviar-msg:checked').length > 0) {
			$('#div-msg').removeClass('hidden'); 
		} else {
			$('#div-msg').addClass('hidden'); 
		}
		var usuarios = [];
		$('.enviar-msg:checked').each(function(){
			usuarios.push($(this).val());
		});
		$('#ids').val(usuarios);
	});

	$('.btn-todas-marcas').click(function() {
		var id = $(this).attr('id');
		if ($('#div-todas-marcas_' + id).hasClass('hidden')) {
			$('#div-todas-marcas_' + id).removeClass('hidden');
		} else {
			$('#div-todas-marcas_' + id).addClass('hidden');			
		}
	});
	
	//windowLoadInit();
	
	//Google Map script
	var $googleMaps = jQuery('#map, .page_map');
	if ( $googleMaps.length ) {
		$googleMaps.each(function() {
			var $map = jQuery(this);

			var lat;
			var lng;
			var map;

			//map styles. You can grab different styles on https://snazzymaps.com/
			var styles = [{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]}];
			
			//map settings
			var address = $map.data('address') ? $map.data('address') : 'london, baker street, 221b';
			var markerDescription = $map.find('.map_marker_description').prop('outerHTML');

			//if you do not provide map title inside #map (.page_map) section inside H3 tag - default titile (Map Title) goes here:
			var markerTitle = $map.find('h3').first().text() ? $map.find('h3').first().text() : 'Map Title';
			var markerIconSrc = $map.find('.map_marker_icon').first().attr('src');

			//type your address after "address="
			jQuery.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + address, function(data) {
				
				lat = data.results[0].geometry.location.lat;
				lng = data.results[0].geometry.location.lng;

			}).complete(function(){
				
				var center = new google.maps.LatLng(lat, lng);
				var settings = {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 17,
					draggable: true,
					scrollwheel: false,
					center: center,
					styles: styles 
				};
				map = new google.maps.Map($map[0], settings);

				var marker = new google.maps.Marker({
					position: center,
					title: markerTitle,
					map: map,
					icon: markerIconSrc,
				});

				var infowindow = new google.maps.InfoWindow({ 
					content: markerDescription
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});

			});
		}); //each
	}//google map length

}); //end of "window load" event