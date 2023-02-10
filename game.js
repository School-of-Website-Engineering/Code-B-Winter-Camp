var map = document.getElementById("map");
(function () {
	var Game = function (map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
	};

	// 蛇越来越长的原因是，没有删除之前的蛇节，而是在不停地创建与修改之前的坐标
	Game.prototype.start = function () {
		// 1.把蛇和食物对象，渲染到地图上;
		this.food.render(this.map);
		this.snake.render(this.map);
		// 移动之后，得重新渲染 => 原生JS没有帮我们做数据驱动视图的工作
		this.snake.move();
		this.snake.render(this.map);
		this.snake.move();
		this.snake.render(this.map);
		this.snake.move();
		this.snake.render(this.map);
		this.snake.move();
		this.snake.render(this.map);
		this.snake.move();
		// 2.开始游戏的逻辑;
	};
	// game.js中
	// 定义私有函数，让蛇跑起来
	function runSnake() {
		var timerId = setInterval(() => {
			// 因为调用的是定时器，this默认指向window，所以在一开始的时候
			// 可以将this保存至变量that 传入food和map
			that.snake.move(that.food, that.map);
			that.snake.render(that.map);
			// 横坐标的最大值
			var maxX = that.map.offsetWidth / that.snake.width;
			// 纵坐标的最大值
			var maxY = that.map.offsetHeight / that.snake.height;
			// 蛇头的坐标
			var headX = that.snake.body[0].x;
			var headY = that.snake.body[0].y;
			// 横坐标的最大值
			if (headX < 0 || headX >= maxX) {
				alert("Game Over!");
				clearInterval(timerId);
			}
			// 纵坐标的最大值
			if (headY < 0 || headY >= maxY) {
				alert("Game Over!");
				clearInterval(timerId);
			}
		}, 150);
	}
	// 暴露对象
	window.Game = Game;
})();
// 实例化，此时可以将另外两个实例的测试代码删除掉
var game = new Game(map);
game.start();
