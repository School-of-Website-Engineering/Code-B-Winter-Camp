var oMap = document.getElementById("map");
(function () {
	// 设置属性
	var Snake = function (options = {}) {
		this.position = options.position || "absolute";
		// 蛇节的大小
		this.width = options.width || 20;
		this.height = options.height || 20;
		// 这个方向，主要是用于，监听键盘事件的时候，用来判断走向的
		this.direction = options.direction || "right";
		// 蛇的身体 第一个元素是蛇头，默认初始有3节，x和y分别为，距离左侧和上侧有几个蛇节的距离;
		this.body = [
			{ x: 3, y: 2, color: "red" },
			{ x: 2, y: 2, color: "yellowGreen" },
			{ x: 1, y: 2, color: "yellowGreen" },
		];
	};
	// 定义remove函数删除蛇，不定义为原型方法，就变成了私有成员
	var snakeList = [];
	function removeSnake(map) {
		for (var i = snakeList.length - 1; i >= 0; i--) {
			// 删除每一个旧的div
			map.removeChild(snakeList[i]);
			// 每次遍历，都把当前的这个成员给删除掉，遍历完毕之后，就全部删除完了
			snakeList.splice(i, 1);
		}
	}
	// 在render函数中，在渲染蛇之前，先删除之前的蛇
	Snake.prototype.render = function (map) {
		// 调用removeSnake函数，删除之前创建的蛇
		removeSnake(map);
		// 把每一个蛇节渲染到地图上
		this.body.forEach((v) => {
			// 每次遍历的时候，都动态创建一个div，并且给div设置样式属性
			var div = document.createElement("div");
			map.appendChild(div);
			div.style.position = this.position;
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.left = v.x * this.width + "px";
			div.style.top = v.y * this.height + "px";
			div.style.backgroundColor = v.color;
			snakeList.push(div);
		});
	};
	function runSnake() {
		var timerId = setInterval(() => {
			// 因为调用的是定时器，this默认指向window，所以在一开始的时候 可以将this保存至
			变量that;
			// 定时器第一步就是每隔一段时间，让蛇能够移动 => 调用move方法
			使用键盘让蛇移动起来;
			// 如果this是游戏对象，则可以直接调用this.snake.move,但是因为定时器中的this指
			向window;
			// 所以获取不到this，此时，就可以先将this提前保存起来
			that.snake.move();
			// 现在蛇已经可以移动了，但是一直都在移动，所以如果触碰到边界了，则停止定时器
			that.snake.render(that.map);
			// 当蛇遇到边界游戏结束, 也就是需要判断蛇头的坐标
			// 思路：用总的map尺寸 / 蛇头的尺寸，可以计算出map最多可允许蛇前行多少步，超出边
			界则进行处理;
			var maxX = that.map.offsetWidth / that.snake.width,
				maxY = that.map.offsetHeight / that.snake.height,
				headX = that.snake.body[0].x,
				headY = that.snake.body[0].y;
			if (headX < 0 || headX >= maxX) {
				alert("游戏结束");
				clearInterval(timerId);
			}
			if (headY < 0 || headY >= maxY) {
				alert("游戏结束");
				clearInterval(timerId);
			}
		}, 300);
	}
	// 在start函数中调用runSnake函数
	Game.prototype.start = function () {
		// 1.把蛇和食物对象，渲染到地图上;
		this.food.render(this.map);
		this.snake.render(this.map);
		// 测试move方法，ok的话即可注销
		// 2.开始游戏的逻辑;
		// 2.1 让蛇移动起来 当蛇遇到边界游戏结束
		runSnake();
		// 2.2 通过键盘控制蛇移动的方向
		function bindKey() {}
		// 2.3 当蛇遇到食物 做相应的处理
	};
	Snake.prototype.move = function (food, map) {
		// 控制蛇身的移动 => 当前蛇节移动到上一个蛇节的位置
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		// 控制蛇头移动的方向
		var head = this.body[0];
		switch (this.direction) {
			case "right":
				head.x += 1;
				break;
			case "left":
				head.x -= 1;
				break;
			case "top":
				head.y -= 1;
				break;
			case "bottom":
				head.y += 1;
				break;
		}
		// 判断蛇头与食物的坐标是否重合。因为该函数中只有蛇，所以需要接收food实例对象和map对
		象;
		var headX = head.x * this.width,
			headY = head.y * this.height;
		if (headX == food.x && headY == food.y) {
			// 让蛇增加一节 ， 获取蛇的最后一节
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color,
			});
			// 随机新生成食物
			food.render(map);
		}
	};
	// 集中管理键盘事件
	function bindKey() {
		document.addEventListener("keydown", handleKey, false);
	}
	// 定义键盘事件
	function handleKey(e) {
		// console.log(e.keyCode);
		var keyResult = e.keyCode;
		/**
	* top 87
	让蛇吃掉食物
	当蛇头的坐标与食物的坐标一致的时候，发生了两件事情
	1.蛇的身体变长了一节 => 在蛇的body对象中新增一个对象，且位置就是最后一个元素的位置
	2.地图上重新生成食物 => 需要传入map对象
	因为蛇要吃食物，必须是在移动过程中才可以，所以在snake.js中进行逻辑处理
	因为蛇的move中要判断是否与食物重合，所以要拿到食物对象
	拿到之后，得重新在地图上生成新的食物，所以也要拿到地图
	所以，game在调用move的时候，就需要将that.food, that.map传入进来
	snake.js中
	* bottom 83
	* left 65
	* right 68
	*/
		switch (keyResult) {
			case 87:
				// 因为该函数中的this是document,所以不能直接写this，还是要写that
				that.snake.direction = "top";
				break;
			case 83:
				that.snake.direction = "bottom";
				break;
			case 65:
				that.snake.direction = "left";
				break;
			case 68:
				that.snake.direction = "right";
		}
	}
	window.Snake = Snake;
})();
var snake = new Snake();
snake.render(oMap);
