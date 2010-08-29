var win = Ti.UI.currentWindow;

Ti.include('../include/database.js');
var infoId = Ti.App.Properties.getString('infoId');
var infoTitle = Ti.App.Properties.getString('infoTitle');

var info = db.execute('SELECT * FROM info WHERE info_id = ' + infoId);

var view = Ti.UI.createView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0
});

var contentView = Ti.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:96
});

while(info.isValidRow())
{
	var infoDesc = info.field(2);
	var infoImage = info.field(3);
	
	var image = Ti.UI.createImageView({
		image: infoImage,
		top: 0,
		left: 0,
		height: 96,
		width: 320
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

view.add(image);
contentView.add(titleLabel);
contentView.add(desc);
view.add(contentView);

win.add(view);