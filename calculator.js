
function calculateRunningMeters() {
	var rm = 0.0;
	var width = parseInt($('#width').val());
	var length = parseInt($('#length').val());
	var plankWidth = parseInt($('#plank_width').val());
	var plankLength = parseInt($('#plank_length').val());
	var spacing = parseFloat($('#spacing').val());


	var numberOfRows = width / (spacing + plankWidth);

	var rmNeeded = length * numberOfRows;
	var minNrOfPlanks = Math.ceil((length / plankLength) * numberOfRows);
	rm = minNrOfPlanks * plankLength;
	
	
	if ($('input[name=balconyType]:checked').val() == 'lshape') {
		var lshapeLength = parseInt($('#lshape_length').val());
		var lshapeWidth = parseInt($('#lshape_width').val());

		var lshapeRows = lshapeWidth / (spacing + plankWidth);
		var lshapePlanks = Math.ceil((lshapeLength / plankLength) * lshapeRows);
		rm += lshapePlanks * plankLength;
	}

	rm = rm / 100;
	if (rm % 1 > 0) {
		rm = Math.round(rm).toFixed(2);
	}
	
	return rm;
}

function validate() {
	var ready = true;
	$('.numeric_box').each(function() {
		if (!$.trim($(this).val()).length) {
			ready = false;
		}
	});
	return ready;
}

$(function() {
	$(document).ready(function() {
		$('#lshape_length').removeClass("numeric_box");
		$('#lshape_width').removeClass("numeric_box");
	});
	$('.numeric_box').change(function() {
		if (validate()) {
			$('#running_meters').text(calculateRunningMeters());
		}
		else {
			$('#running_meters').text('-');
		}
	});

	$('input[name=balconyType]:radio').change(function() {
		if ($(this).val() == 'lshape') {
			$('#lshape_length').addClass('numeric_box');
			$('#lshape_width').addClass('numeric_box');
			$('div#lshape_measurements').css('visibility', 'visible');
			if (validate()) {
				$('#running_meters').text(calculateRunningMeters());
			}
			else {
				$('#running_meters').text('-');
			}
		}
		else {
			$('div#lshape_measurements').css('visibility', 'hidden');
			$('#lshape_length').removeClass("numeric_box");
			$('#lshape_width').removeClass("numeric_box");
			if (validate()) {
				$('#running_meters').text(calculateRunningMeters());
			}
			else {
				$('#running_meters').text("-");
			}
		}
	});
})