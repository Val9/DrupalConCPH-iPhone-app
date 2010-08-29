Ti.include('../include/database.js');

var info = db.execute('SELECT info_id, info_title, info_type FROM info ORDER BY info_order ASC');
var win = Ti.UI.currentWindow;

var data = [];
var i = 0;

var view = Ti.UI.createView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0
});

var imageView = Ti.UI.createImageView({
	image: '../img/sessions/drupal.jpg',
	left: 0,
	top: 0,
	height: 96,
	width: 320
});

while(info.isValidRow())
{
	var infoId = info.field(0);
	var infoTitle = info.field(1);
	var infoType = info.field(2);
	
	var row = Ti.UI.createTableViewRow({
		selectedBackgroundColor: '#EEEEEE'
	});
	
	var label = Ti.UI.createLabel(
	{
		text: infoTitle,
		color: '#666666',
		width:270,
		top: 13,
		left:25,
		height:15,
		font:{fontWeight:'bold', fontSize:14}
	});
	
	var arrow = Ti.UI.createImageView({
		image: '../img/design/arrow.png',
		right: 8,
		top: 13,
		height: 16,
		width: 16
	});
	
	row.id = infoId;
	row.name = infoTitle;
	
	if(infoType == 'map')
	{
		row.link = '../windows/info_map.js';
	}
	else
	{
		row.link = '../windows/info_img.js';
	}
	
	row.add(label);
	row.add(arrow);
	
	i++;
	data[i] = row;
	info.next();
}
info.close();

var tableview = Ti.UI.createTableView(
{
	top: 96,
	data:data,
	style:Ti.UI.iPhone.TableViewStyle.PLAIN,
	separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
});

tableview.addEventListener('click', function(e)
{
	if(e.rowData.link)
	{		
		var program = Ti.UI.createWindow({
			url:e.rowData.link,
			title: e.rowData.name,
			backButtonTitle: 'Back',
			barColor: '#666'
		});
		
		Ti.App.Properties.setString("infoId", e.rowData.id);
		Ti.App.Properties.setString("infoTitle", e.rowData.name);
		
		Ti.UI.currentTab.open(program, {animated:true});
	}
});
view.add(imageView);
view.add(tableview);
win.add(view);