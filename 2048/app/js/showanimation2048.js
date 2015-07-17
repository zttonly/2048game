function showNumberWithAnimation(i, j, randNumber) {
	var numberCell = $('#number-cell-' + i + "-" + j);

	numberCell.css('background-color', getNumberBackgroudColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width: cellSidelength,
		height: cellSidelength,
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	}, 60);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
	var numberCell = $('#number-cell-' + fromx + '-' + fromy);
	numberCell.animate({
		top: getPosTop(tox, toy),
		left: getPosLeft(tox, toy)
	}, 180);
}

function showOverAnimation() {
	var overcell = $('#over-cell');

	overcell.find('p').text('Game Over!');
	overcell.animate({
		width: gridContainerWidth,
		height: gridContainerWidth,
		top: 0,
		left: 0
	}, 60);
}