// Includeing database
Ti.include('../include/database.js');
// Creating window
var win = Ti.UI.currentWindow;
// Getting variables from info.js
var infoId = Ti.App.Properties.getString('infoId');
var infoTitle = Ti.App.Properties.getString('infoTitle');

/**
 * Accesing database and getting data from the table info.
 * Implementation of createView(), createScrollView() & createLabel()
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
	top:96
});

while(info.isValidRow())
{
  // Assigning data from SQLite to variables
	var infoDesc = info.field(2);
	var infoImage = info.field(3);
	
	// Creating a imageView for the top image
	var image = Ti.UI.createImageView({
		image: infoImage,
		top: 0,
		left: 0,
		height: 96,
		width: 320
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

// Adding image(imageView) to view(view)
view.add(image);
// Adding titleLabel(label) & desc(label) to contentHolder(scrollView)
contentHolder.add(titleLabel);
contentHolder.add(desc);
// Adding contentView(scrollView) to view(view)
view.add(contentHolder);

// Adding view(view) to win(Window)
win.add(view);