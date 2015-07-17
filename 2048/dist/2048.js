var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
starty = 0;
endx = 0;
endy = 0;

$(document).ready(function() {
	prepareForMobile();
	newgame();
});

function prepareForMobile() {

	if (documentWidth > 500) {
		gridContainerWidth = 500;
		cellSidelength = 100;
		cellSpace = 20;
	}
	var header = $('header');
	var headerp = header.find('p');
	var headera = header.find('a');
	header.css('width', gridContainerWidth - 2 * cellSpace);
	header.css('padding', cellSpace / 2 + 'px ' + cellSpace + 'px');
	header.css('height', 0.28 * gridContainerWidth);
	header.find('h1').css('font-size', 0.7 * cellSidelength + 'px');
	headera.css('font-size', 0.04 * gridContainerWidth + 'px');
	headera.css('padding', 0.03 * gridContainerWidth + 'px' + ' ' + 0.02 * gridContainerWidth + 'px');
	headerp.css('font-size', 0.05 * gridContainerWidth + 'px');
	headerp.css('margin', 0.02 * gridContainerWidth + 'px' + ' auto');
	headerp.css('padding', 0.03 * gridContainerWidth + 'px' + ' ' + 0.02 * gridContainerWidth + 'px');

	var gridcontainer = $('#grid-container');
	gridcontainer.css('width', gridContainerWidth - 2 * cellSpace);
	gridcontainer.css('height', gridContainerWidth - 2 * cellSpace);
	gridcontainer.css('padding', cellSpace);
	gridcontainer.css('border-radius', 0.02 * gridContainerWidth);

	var gridcell = $('.grid-cell');
	gridcell.css('width', cellSidelength);
	gridcell.css('height', cellSidelength);
	gridcell.css('border-radius', 0.06 * cellSidelength);

	var overcell = $('#over-cell');
	overcell.css('border-radius', 0.02 * gridContainerWidth);
	overcell.css('font-size', 0.12 * gridContainerWidth + 'px');
	overcell.css('line-height', 0.68 * gridContainerWidth + 'px');
}

function newgame() {
	//初始化棋盘格
	init();
	//随机生成两个数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++) {

			var gridcell = $('#grid-cell-' + i + "-" + j);
			gridcell.css('top', getPosTop(i, j));
			gridcell.css('left', getPosLeft(i, j));
			gridcell.css('left', getPosLeft(i, j));
		}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++)
			board[i][j] = 0;
		hasConflicted[i][j] = false;
	}
	
	$("#over-cell").find('p').text('');
	$("#over-cell").css('width', '0px');
	$("#over-cell").css('height', '0px');
	$("#over-cell").css('top', gridContainerWidth / 2);
	$("#over-cell").css('left', gridContainerWidth / 2);
	updateBoardView();

	score = 0;
}

function updateBoardView() {

	$(".number-cell").remove();

	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '">');
			var numbercell = $('#number-cell-' + i + '-' + j);
			if (board[i][j] == 0) {
				numbercell.css('width', '0px');
				numbercell.css('height', '0px');
				numbercell.css('top', getPosTop(i, j) + cellSidelength / 2);
				numbercell.css('left', getPosLeft(i, j) + cellSidelength / 2);
			} else {
				numbercell.css('width', cellSidelength);
				numbercell.css('height', cellSidelength);
				numbercell.css('top', getPosTop(i, j));
				numbercell.css('left', getPosLeft(i, j));
				numbercell.css('background-color', getNumberBackgroudColor(board[i][j]));
				numbercell.css('color', getNumberColor(board[i][j]));
				numbercell.text(board[i][j]);
			}

			hasConflicted[i][j] = false;
		}

	$(".number-cell").css('border-radius', 0.06 * cellSidelength);
	$(".number-cell").css('line-height', cellSidelength + 'px');
	$(".number-cell").css('font-size', 0.6 * cellSidelength + 'px');
}

function generateOneNumber() {
	if (nospace(board))
		return false;

	//随机位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	//原来的随机算法
	// while(true){
	// 	if(board[randx][randy] == 0)
	// 		break;

	// 	randx = parseInt(Math.floor(Math.random() * 4 ));
	// 	randy = parseInt(Math.floor(Math.random() * 4 ));
	// }
	//新的随机算法

	var times = 0;
	while (times < 50) {
		if (board[randx][randy] == 0)
			break;

		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}
	if (times == 50) {
		for (var i = 0; i < 4; i++)
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
	}

	//随机数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;
}

$(document).keydown(function(event) {
	switch (event.keyCode) {
		case 37: //left
			event.preventDefault();
			if (moveLeft()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
			break;
		case 38: //up
			event.preventDefault();
			if (moveUp()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
			break;
		case 39: //right
			event.preventDefault();
			if (moveRight()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
			break;
		case 40: //down
			event.preventDefault();
			if (moveDown()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
			break;
		default:
			break;
	}
});

document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});
document.addEventListener('touchmove', function(event) {
	event.stopPropagation();
	event.preventDefault();
});
document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth)
		return;

	//x
	if (Math.abs(deltax) >= Math.abs(deltay)) {
		if (deltax > 0) {
			//moveright
			if (moveRight()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
		} else {
			//moveleft
			if (moveLeft()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
		}
	}
	//y 屏幕坐标中Y轴是竖直向下的
	else {
		if (deltay > 0) {
			//movedown
			if (moveDown()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
		} else {
			//moveup
			if (moveUp()) {
				setTimeout("generateOneNumber()", 180);
				setTimeout("isgameover()", 260);
			}
		}
	}
});

function isgameover() {
	if (nospace(board) && noMove(board)) {
		gameover();
	}
}

function gameover() {
	//alert("gameover!");
	showOverAnimation();
}

function moveLeft() {

	if (!canMoveLeft(board))
		return false;

	//moveLeft 
	for (var i = 0; i < 4; i++)
	//从左侧开始“相邻的”比较合并
		for (var j = 1; j < 4; j++) {
		if (board[i][j] != 0) {
			for (var k = 0; k < j; k++) {
				if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
					//move
					showMoveAnimation(i, j, i, k);
					board[i][k] = board[i][j];
					board[i][j] = 0;

					continue;

				} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
					//move
					showMoveAnimation(i, j, i, k);
					//add
					board[i][k] += board[i][j];
					board[i][j] = 0;
					//addscore
					score += board[i][k];
					updatescore(score);
					hasConflicted[i][k] = true;

					continue;
				}

			}
		}
	}
	setTimeout("updateBoardView()", 180);
	return true;
}

function moveUp() {

	if (!canMoveUp(board))
		return false;

	for (var j = 0; j < 4; j++)
	//从顶部开始“相邻的”比较合并
		for (var i = 1; i < 4; i++) {
		if (board[i][j] != 0) {
			for (var k = 0; k < i; k++) {
				if (board[k][j] == 0 && noBlockvertical(j, k, i, board)) {

					showMoveAnimation(i, j, k, j);
					board[k][j] = board[i][j];
					board[i][j] = 0;

					continue;
				} else if (board[k][j] == board[i][j] && noBlockvertical(j, k, i, board) && !hasConflicted[k][j]) {

					showMoveAnimation(i, j, k, j);
					board[k][j] += board[i][j];
					board[i][j] = 0;
					//addscore
					score += board[k][j];
					updatescore(score);
					hasConflicted[k][j] = true;

					continue;
				}
			}
		}
	}
	setTimeout("updateBoardView()", 180);
	return true;
}

function moveRight() {
	if (!canMoveRight(board))
		return false;

	for (var i = 0; i < 4; i++)
	//从右侧开始“相邻的”比较合并
		for (var j = 2; j >= 0; j--) {
		if (board[i][j] != 0) {
			for (var k = 3; k > j; k--) {
				if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
					showMoveAnimation(i, j, i, k);
					board[i][k] = board[i][j];
					board[i][j] = 0;

					continue;
				} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
					showMoveAnimation(i, j, i, k);
					board[i][k] += board[i][j];
					board[i][j] = 0;
					//addscore
					score += board[i][k];
					updatescore(score);
					hasConflicted[i][k] = true;

					continue;
				}
			}
		}
	}
	setTimeout("updateBoardView()", 180);
	return true;
}

function moveDown() {

	if (!canMoveDown(board))
		return false;

	for (var j = 0; j < 4; j++)
	//从顶部开始“相邻的”比较合并
		for (var i = 2; i >= 0; i--) {
		if (board[i][j] != 0) {
			for (var k = 3; k > i; k--) {
				if (board[k][j] == 0 && noBlockvertical(j, i, k, board)) {

					showMoveAnimation(i, j, k, j);
					board[k][j] = board[i][j];
					board[i][j] = 0;

					continue;
				} else if (board[k][j] == board[i][j] && noBlockvertical(j, i, k, board) && !hasConflicted[k][j]) {

					showMoveAnimation(i, j, k, j);
					board[k][j] += board[i][j];
					board[i][j] = 0;
					//addscore
					score += board[k][j];
					updatescore(score);
					hasConflicted[k][j] = true;

					continue;
				}
			}
		}
	}
	setTimeout("updateBoardView()", 180);
	return true;
};function showNumberWithAnimation(i, j, randNumber) {
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
};documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSidelength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
	return cellSpace + i * (cellSidelength + cellSpace);
}

function getPosLeft(i, j) {
	return cellSpace + j * (cellSidelength + cellSpace);
}

function getNumberBackgroudColor(number) {
	switch (number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}

	return "#000";
}

function getNumberColor(number) {
	if (number <= 4)
		return "#776e65";

	return "#fff";
}

function nospace(board) {
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (board[i][j] == 0)
				return false;
	return true;
}

function noMove(board) {
	if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
		return false;
	return true;
}

function canMoveLeft(board) {
	for (var i = 0; i < 4; i++)
		for (var j = 1; j < 4; j++)
			if (board[i][j] != 0)
				if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
					return true;

	return false;
}

function canMoveRight(board) {
	for (var i = 0; i < 4; i++)
		for (var j = 2; j >= 0; j--)
			if (board[i][j] != 0)
				if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
					return true;

	return false;
}

function canMoveUp(board) {
	for (var j = 0; j < 4; j++)
		for (var i = 1; i < 4; i++)
			if (board[i][j] != 0)
				if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
					return true;

	return false;
}

function canMoveDown(board) {
	for (var j = 0; j < 4; j++)
		for (var i = 2; i >= 0; i--)
			if (board[i][j] != 0)
				if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
					return true;

	return false;
}

function noBlockHorizontal(row, col1, col2, board) {
	for (var j = col1 + 1; j < col2; j++)
		if (board[row][j] != 0)
			return false;
	return true;
}

function noBlockvertical(col, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++)
		if (board[i][col] != 0)
			return false;

	return true;
}

function updatescore(score) {
	$('#score').text(score);
}