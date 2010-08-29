var win = Ti.UI.currentWindow;

var view = Ti.UI.createView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0
});

var mapHolder = Ti.UI.createScrollView({
	top: 0,
	contentWidth:'auto',
	contentHeight:'auto',
	showHorizontalScrollIndicator:true,
	showVerticalScrollIndicator: true,
	width: 320,
	height: 180,
	contentOffset:{x:360,y:1440}
});

var map = Ti.UI.createImageView({
	image: '../img/maps/chx.jpg',
	bottom: 0,
	right: 0,
	width: 680,
	height: 2000
});

mapHolder.add(map);
view.add(mapHolder);

win.add(view);