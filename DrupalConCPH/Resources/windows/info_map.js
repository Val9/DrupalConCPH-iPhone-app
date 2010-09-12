// Includeing database
Ti.include('../include/database.js');
// Creating window
var win = Ti.UI.currentWindow;
// Getting variables from info.js
var infoId = Ti.App.Properties.getString('infoId');
var infoTitle = Ti.App.Properties.getString('infoTitle');

/**
 * Accesing database and getting data from the table info.
 * Implementation of createView(), createScrollView(), createImageView() & createLabel()
 */
 
// Getting data from SQLite
var info = db.execute('SELECT * FROM info WHERE info_id = ' + infoId);

// Creating a view to hold all of the content
var view = Ti.UI.createView({
  contentWidth:'auto',
  contentHeight:'auto',
  top:0
});

// Creating a scollView for makeing the text scollable
var contentHolder = Ti.UI.createScrollView({
  contentWidth:'auto',
  contentHeight:'auto',
  top:180,
  showHorizontalScrollIndicator:true
});

while(info.isValidRow())
{
  // Assigning data from SQLite to variables
	var infoDesc = info.field(2);
	var infoMap = info.field(3);
	var infoOffX = info.field(4);
	var infoOffY = info.field(5);
 	var infoWidth = info.field(6);
 	var infoHeight = info.field(7);
	
	// Creating a scollView for makeing the map scollable
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
	
	// Creating a imageView for the map
	var map = Ti.UI.createImageView({
		image: infoMap,
		bottom: 0,
		right: 0,
		width: infoWidth,
		height: infoHeight
	});
	
	// Creating a label for the Google maps copyright notice
	var google = Ti.UI.createLabel({
		text: '©2010 Google - Map data ©2010 Tele Atlas',
		left: 110,
		top: -30,
		color: '#000000',
		font:{fontSize:10}
	});
	
	// Creating a label for the title
	var titleLabel = Ti.UI.createLabel({
		text: infoTitle,
		top: 10,
		left: 10,
		color: '#666666',
		height: 15,
		width: 300,
		font:{fontWeight:'bold', fontSize:12}
	});
	
	// Creating a label for the text
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
// Closing database connection
info.close();

// Adding map(imageView) to mapHolder(scrollView)
mapHolder.add(map);
// Adding titleLabel(label) & desc(label) to contentHolder(scollView)
contentHolder.add(titleLabel);
contentHolder.add(desc);
// Adding mapHolder(scollView), google(label) & contentHolder(scollView) to view(view)
view.add(mapHolder);
view.add(google);
view.add(contentHolder);

// Adding view(view) to win(Window)
win.add(view);