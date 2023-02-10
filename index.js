var map = document.getElementById("map");
(function () {
	var foodsList = [];
	var Food = function (options) {
		// 进行容错处理，如果外部没有传，就默认为空对象，否则会报错
		options = options || {};
		// 设置属性
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.color = options.color || "orange";
		this.position = "absolute";
	};
	// 设置方法
	Food.prototype.render = function () {
		// 每次生成新的食物的时候，先清空原来的食物，并从map中移除旧食物
		removeOldFood();
		// 渲染之前，重新给x坐标和y坐标赋值随机数
		// 坐标从0开始，先按照地图大小和食物大小划分为等份，但是最后一个会超出，所以-1
		this.x =
			utils.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
		this.y =
			utils.getRandom(0, map.offsetHeight / this.height - 1) *
			this.height;
		// 创建一个div，并且将实例身上的属性设置为div的样式，最终将div放在地图中
		var div = document.createElement("div");
		div.style.backgroundColor = this.color;
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.top = this.x + "px";
		div.style.left = this.y + "px";
		div.style.position = this.position;
		map.appendChild(div);
		// 将最新的食物添加到食物列表中
		foodsList.push(div);
	};
	function removeOldFood() {
		// 从map中移除旧的dom节点
		foodsList.forEach((v) => map.removeChild(v));
		foodsList.pop();
	}
	window.Food = Food;
})();
var food = new Food();
// 别忘了调用方法，函数不调用就不会执行
food.render();
