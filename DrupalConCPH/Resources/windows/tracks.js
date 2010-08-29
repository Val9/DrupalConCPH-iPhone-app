/**
 * COMMENT
 */

Ti.include('../include/database.js');

var win = Ti.UI.currentWindow;
win.orientationModes = [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ];

var tracks = db.execute('SELECT category_id, category_name, category_desc FROM categories');

var data = [];
var i = 0;

while(tracks.isValidRow())
{
	i++;
	var trackId = tracks.field(0);
	var trackName = tracks.field(1);
	var trackDesc = tracks.field(2);
	var track = Ti.UI.createTableViewRow({
		selectedBackgroundColor: '#EEEEEE',
		className: 'track'+i
	});
	
	switch(trackId)
	{
		case 1:
			var bullet = '../img/design/bullet_blue.png';
			var color = '#3499e9';
		break;
		
		case 2:
			var bullet = '../img/design/bullet_yellow.png';
			var color = '#eebf64';
		break;
		
		case 3:
			var bullet = '../img/design/bullet_green.png';
			var color = '#4bd540';
		break;
		
		case 4:
			var bullet = '../img/design/bullet_purple.png';
			var color = '#7a34e9';
		break;
		
		case 5:
			var bullet = '../img/design/bullet_orange.png';
			var color = '#e96e34';
		break;
		
		case 6:
			var bullet = '../img/design/bullet_red.png';
			var color = '#e93434';
		break;
		
		case 7:
			var bullet = '../img/design/bullet_grey.png';
			var color = '#666666';
		break;
	}
	
	var label = Ti.UI.createLabel(
	{
		text: trackName,
		color: '#666666',
		width:270,
		top: 7,
		left:25,
		height:15,
		font:{fontWeight:'bold', fontSize:14}
	});
	
	var desc = Ti.UI.createLabel(
	{
		text: trackDesc,
		color: '#666666',
		width: 270,
		top: 25,
		left: 25,
		height:30,
		font:{fontSize: 10}
	});
	
	var dot = Ti.UI.createImageView({
		image: bullet,
		left: 8,
		top: 27,
		height: 8,
		width: 8
	});
	
	var arrow = Ti.UI.createImageView({
		image: '../img/design/arrow.png',
		right: 8,
		top: 23,
		height: 16,
		width: 16
	});
	
	track.link = '../windows/program.js';
	track.id = trackId;
	track.name = trackName;
	track.color = color;
	track.bullet = bullet;
	track.height = 61;
	
	track.add(dot);
	track.add(arrow);
	track.add(label);
	track.add(desc);
	data[i] = track;
	
	tracks.next();
}

tracks.close();

var tableview = Ti.UI.createTableView(
{
	data:data,
	style:Ti.UI.iPhone.TableViewStyle.PLAIN,
	separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
});

tableview.addEventListener('click', function(e)
{
	if(e.rowData.link)
	{
		//Ti.API.info(e.rowData.link);
		//Ti.API.info(e.rowData.name);
		//Ti.API.info(e.rowData.id);
		
		var program = Ti.UI.createWindow({
			url:e.rowData.link,
			title: e.rowData.name,
			backButtonTitle: 'Back',
			barColor: e.rowData.color
		});
		
		Ti.App.Properties.setString("trackId", e.rowData.id);
		Ti.App.Properties.setString("trackName", e.rowData.name);
		Ti.App.Properties.setString("bullet", e.rowData.bullet);
		Ti.App.Properties.setString("color", e.rowData.color);
		
		Ti.UI.currentTab.open(program, {animated:true});
	}
});


//win.hideNavBar();
win.add(tableview);