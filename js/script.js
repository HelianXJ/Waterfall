window.onload = function() {
	waterfall('main','box');
	var dataInt = {"data":[{"src":"img.jpg"},{"src":"1.jpeg"}]}
	window.onscroll = function() {
		if(checkScrollSlide) {
			var oParent = document.getElementById('main');
			//数据块渲染到页面尾部
			for(var i=0; i<dataInt.data.length; i++) {
				var oBox = document.creatElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.creatElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.creatElement('img');
				oImg.src = "img/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
		}
	}
}

function waterfall(parent, box) {
	//取出main下为box的元素
	var oParent = document.getElementById(parent);
	//parent.getElementsByClassName() ie8以下不兼容
	var oBoxs = getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽度/box宽度）

	var oBoxW = oBoxs[0].offsetWidth;//console.log(oBoxW); 202 = 内容165 + pading10x2 + border1x2 + padding15
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main宽度
	// var oMainW = oBoxW*cols;
	// oParent.style.cssText = 'width:'+ oMainW +'px; margin:0 auto';
	var hArr = []; //存放每一页高度的数组
	for(var i=0; i<oBoxs.length; i++) {
		if( i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else {
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';//oBoxs[i].style.left = oBoxW*(index) +'px';
			hArr[index] +=oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
	// console.log(oBoxs.length);
}
//通过类名获取元素
function getByClass(parent,clsName) {
	var boxArr = [],// new Array 获取所有class为box的元素
		oElements = parent.getElementsByTagName('*');

	for(var i=0; i< oElements.length; i++) {
		if(oElements[i].className == clsName) {
			boxArr.push(oElements[i]);
		}
	}

	return boxArr;

}

// 查找最小高度的索引值
function getMinhIndex(arr,val) {
	for(var i in arr) {
		if(arr[i] == val)
			return i;
	}
}

//检测是否具备滚动条加载数据块条件
function checkScrollSlide() {
	var oParent = document.getElementById('main'),
		oBoxs = getByClass(oParent,'box'),
		lastBox = oBoxs[oBoxs.length-1],
		lastBoxH = lastBox.offsetTop+Math.floor(lastBox.offsetHeight/2),
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop,//混杂模式，标准模式
		height = document.body.clientHeight || document.documentElement.clientHeight;

		return (lastBoxH<scrollTop+height)?true:false;

}