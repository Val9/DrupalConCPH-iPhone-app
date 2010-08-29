var win = Ti.UI.currentWindow;

Ti.include('../include/database.js');
var infoId = Ti.App.Properties.getString('infoId');
var infoTitle = Ti.App.Properties.getString('infoTitle');

var info = db.execute('SELECT * FROM info WHERE info_id = ' + infoId);

while(info.isValidRow())
{
	var infoDesc = info.field(2);
	var infoMap = info.field(3);
	var infoOffX = info.field(4);
	var infoOffY = info.field(5);
 	var infoWidth = info.field(6);
 	var infoHeight = info.field(7);
	
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
		contentOffset:{x:infoOffX,y:infoOffY}
	});
	
	var map = Ti.UI.createImageView({
		image: infoMap,
		bottom: 0,
		right: 0,
		width: infoWidth,
		height: infoHeight
	});
	
	var google = Ti.UI.createLabel({
		text: '©2010 Google - Map data ©2010 Tele Atlas',
		left: 110,
		top: -30,
		color: '#000000',
		font:{fontSize:10}
	});
	
	var contentHolder = Ti.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:180,
		showHorizontalScrollIndicator:true
	});
	
	var titleLabel = Ti.UI.createLabel({
		text: infoTitle,
		top: 10,
		left: 10,
		color: '#666666',
		height: 15,
		width: 300,
		font:{fontWeight:'bold', fontSize:12}
	});
	
	var desc = Ti.UI.createLabel({
		text: infoDesc,
		top: 35,
		left: 10,
		color: '#666666',
		height:'auto',
		width: 300,
		font:{fontSize:12}
	});
info.next();
}

info.close();

mapHolder.add(map);
contentHolder.add(titleLabel);
contentHolder.add(desc);
view.add(mapHolder);
view.add(google);
view.add(contentHolder);

win.add(view);