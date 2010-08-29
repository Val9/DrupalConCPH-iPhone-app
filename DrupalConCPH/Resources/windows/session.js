/**
 * COMMENT
 */
 
Ti.include('../include/database.js');

// Window properties
var win = Ti.UI.currentWindow;
win.orientationModes = [ Ti.UI.PORTRAIT ]; 

// Getting global variables.
var sessionId = Ti.App.Properties.getString('sessionId');
var programDay = Ti.App.Properties.getString('programDay');
var programTime = Ti.App.Properties.getString('programTime');

// Get session data from SQLITE
var session = db.execute('SELECT * FROM sessions WHERE session_id =' + sessionId);
var myProgram = db.execute('SELECT * FROM myprogram WHERE my_session =' + sessionId);

var view = Ti.UI.createView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0
});

if(session.isValidRow())
{
	var sessionId = session.field(0);
	var sessionTitle = session.field(1);
	var sessionDesc = session.field(2);

	var f = Ti.Filesystem.getFile('img/sessions/', sessionId+'.jpg');

	if(f.exists())
	{
		var sessionImage = '../img/sessions/'+sessionId+'.jpg';
	}
	else
	{
		var sessionImage = '../img/sessions/drupal.jpg';
	}
	
	var imageView = Ti.UI.createImageView({
		image: sessionImage,
		left: 0,
		top: 0,
		height: 96,
		width: 320
	});
	
	var bookmark = Ti.UI.createView({
		left: 0,
		top: 96,
		height: 30,
		width: 320
	});
	
	var bookmarkBg = Ti.UI.createImageView({
		image: '../img/design/add_bookmark.png',
		left: 0,
		top: 0,
		height: 30,
		width: 320
	});
	
	var bookmarkText = Ti.UI.createLabel({
		text: 'Add to My Program',
		top: 0,
		left: 30,
		color: '#999',
		font:{fontSize:12}
	});
		
	var bookmarkArrow = Ti.UI.createImageView({
		image: '../img/design/arrow.png',
		right: 8,
		top: 7,
		height: 16,
		width: 16
	}); 
	
	var imageView2 = Ti.UI.createImageView({
		image:'../img/design/toProgram.png',
		left: 0,
		top: 92,
		height: 45,
		width: 320
	});
	
	var title = Ti.UI.createLabel({
		text:sessionTitle,
		color:"#FFF",
		font:{fontSize:13, fontWeight:'bold'},
		height:'auto',
		left: 10,
		top: 7
	});
	
	var box = Ti.UI.createView({
		width: 305,
		height: 50,
		top: 46,
		left: 15
	});
	
	var boxBg = Ti.UI.createView({
		width: 305,
		backgroundColor: '#000',
		opacity: 0.6,
		height: 50
	});
	
	var text = Ti.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:0,
		showHorizontalScrollIndicator:true
	});

	desc = Ti.UI.createWebView({
		html: sessionDesc, 
		width: 320, 
		top: 125,
		backgroundColor: '#EEE'
	});
	
	box.add(boxBg);
	box.add(title);
	bookmark.add(bookmarkBg);
	bookmark.add(bookmarkText);
	bookmark.add(bookmarkArrow);
	text.add(desc);
	
	view.add(text);
	view.add(imageView);
	view.add(box);
	view.add(bookmark);
}
session.close();

// Checking if session is added to My Program.
if(myProgram.isValidRow())
{
	var added = true;
	bookmarkBg.image = '../img/design/added_bookmark.png';
	bookmarkText.text = 'Added to My Program';
}
else
{
	var added = false;
	bookmarkBg.image = '../img/design/add_bookmark.png';
	bookmarkText.text = 'Add to My Program';
}

// Add / Remove session from My Program.
bookmark.addEventListener('click', function()
{
	if(!added)
	{
		var checkIfSet = db.execute('SELECT my_session FROM myprogram WHERE my_day="' + programDay + '" AND my_time="' + programTime +'" AND my_session != "99999"');
		if(checkIfSet.rowCount != 0)
		{
			var sessionInfo = db.execute('SELECT session_title FROM sessions WHERE session_id="' + checkIfSet.field(0) +'"');
			
			var dialog = Ti.UI.createOptionDialog({
				options:['Add to MyProgram', 'Cancel'],
				cancel:1,
				title:'You have already added "' + sessionInfo.field(0) + '" to this slot. Do you want to replace it with this session?'
			});
			
			dialog.addEventListener('click',function(e)
			{
				if(e.index == 0)
				{
					added = true;
					bookmarkBg.image = '../img/design/added_bookmark.png';
					bookmarkText.text = 'Added to My Program';
					db.execute('UPDATE myprogram SET my_session=' + sessionId + ' WHERE my_day="' + programDay + '" AND my_time="' + programTime +'"');
				}
			});
			
			// Show dialog
			dialog.show();
		}
		else
		{
			added = true;
			bookmarkBg.image = '../img/design/added_bookmark.png';
			bookmarkText.text = 'Added to My Program';
			db.execute('UPDATE myprogram SET my_session=' + sessionId + ' WHERE my_day="' + programDay + '" AND my_time="' + programTime +'"');
		}
	}
	else
	{
		added = false;
		bookmarkBg.image = '../img/design/add_bookmark.png';
		bookmarkText.text = 'Add to My Program';
		db.execute('UPDATE myprogram SET my_session=99999 WHERE my_day="' + programDay + '" AND my_time="' + programTime +'"');
	}
});

win.add(view);