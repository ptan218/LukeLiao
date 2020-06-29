// JavaScript Document
// We define the function

const winning_combinations = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [3, 6, 9], [4, 5, 6], [7, 8, 9]];
const x_class = "x-mark"
const o_class = "o-mark"

function getChoice() {
	var digit = count%2;
	if (digit == 0) {
		return 'o';
	} else {
		return 'x';
	}
}

function isSelected(obj) {
	return $(obj).hasClass('disable');
}

function handleResult(result) {
	if ('NA' == result) {
		return;
	}

	//Add timeout to allow render to complete
	setTimeout(function () {
		handleCompletion(result);
	}, 1);
}

function handleCompletion(result) {
	if ('draw' == result) {
		alert("It's a draw!");
	} else if ('o' == result) {
		o_win++;
		$('#o_win').text(o_win);
		alert(result + " win!");
	} else if ('x' == result) {
		x_win++;
		$('#x_win').text(x_win);
		alert(result + " win!");
	}
	resetBoard();
}


function trackTicTac(obj, mark) {
	var winner = 'NA';
	var markedPosition = $(obj).data("position");

	$.each(winning_combinations, function (key, winning_combinations_index) {
		if ($.inArray(markedPosition, winning_combinations_index) >= 0) {
			markedLength = 0;
			$.each(winning_combinations_index, function (index, value) {
				var innerSquareClass = $("#box-" + value).attr("class");

				if (innerSquareClass.indexOf(mark) > 0) {
					markedLength = markedLength + 1;
					if (markedLength == winning_combinations_index.length) {
						finished = true;
						if (mark == o_class) {
							winner = 'o';
						} else {
							winner = 'x';
						}
						return winner;
					}
				}
			});
		}
	});

	if (count == 9 && winner=='NA') {
		winner = 'draw';
	}
	return winner;
}

function resetBoard() {
	count = 0;
	finished = false;
	$("#game li").text("+");
	$("#game li").removeClass('disable');
	$("#game li").removeClass(o_class);
	$("#game li").removeClass(x_class);
	$("#game li").removeClass('btn-primary');
	$("#game li").removeClass('btn-info');
}

function resetGame() {
	o_win = 0;
	x_win = 0;
	resetBoard();
}

$(document).ready(function () {
	o_win = 0;
	x_win = 0;
	count = 0;
	finished = false;

	$('#game li').click(function () {
		if (isSelected(this)) {
			console.debug("Already selected!");
			return;
		}
		var choice = getChoice();
		$(this).text(choice);

		count++;
		var cssClass = x_class;
		if (choice == 'o') {
			cssClass = o_class;
		}
		$(this).addClass('disable ' + cssClass + ' btn-info');
		var result = trackTicTac(this, cssClass);
		handleResult(result);
	});
	$("#reset").click(function () {
		resetGame();
	});
});


