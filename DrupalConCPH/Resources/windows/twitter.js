/**
 * COMMENT
 */
 
var win = Titanium.UI.currentWindow;

var dialog = Titanium.UI.createOptionDialog({
	options:['Connect', 'Cancel'],
	cancel:1,
	title:'You must connect to the internet to load announcements from DrupalCon.'
});

var view = Titanium.UI.createView({
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

function parseTwitterDate($stamp)
{		
// convert to local string and remove seconds and year //		
	var date = new Date(Date.parse($stamp)).toLocaleString().substr(0, 16);
// return the formatted string //
	return date.substr(0, 8);
}

// Function loadTweets()
function loadTweets()
{
	var rowData = [];

	var loader = Titanium.Network.createHTTPClient();

	loader.open("GET", "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=drupalcon");
	
	loader.onload = function() 
	{
		var tweets = eval('('+this.responseText+')');
		//Titanium.API.info(tweets);
		for (var i = 0; i < tweets.length; i++)
		{
			var tweetText = tweets[i].text;
			var tweetTime = parseTwitterDate(tweets[i].created_at);
			var tweetName = tweets[i].user.screen_name;
			var row = Titanium.UI.createTableViewRow({height:'auto'});
			
			var post_view = Titanium.UI.createView({
				height: 'auto', 
				layout:'vertical',
				left:10,
				width: 300
			});
			
			var text = Titanium.UI.createLabel({
				text:tweetText,
				top:3,
				bottom:5,
				color: '#666666',
				height:'auto',
				font:{fontSize:11}
			});
			
			var name = Titanium.UI.createLabel({
				text: tweetName + ' // ' + tweetTime,
				top:5,
				height: 'auto',
				color: '#333333',
				font:{fontWeight:'bold', fontSize:11}
			});
			
			post_view.add(name);
			post_view.add(text);
			row.add(post_view);
			rowData[i] = row;
		}
		
		var tableView = Titanium.UI.createTableView({top: 96, data:rowData});
		//Add the table view to the window
		view.add(imageView);
		view.add(tableView);
		win.add(view);
		
	};
	// Send the HTTP request
	loader.send();
}

win.addEventListener('focus', function()
{
	dialog.show();
});

dialog.addEventListener('click',function(e)
{
	if(e.index == 0)
	{
		loadTweets();
	}
});