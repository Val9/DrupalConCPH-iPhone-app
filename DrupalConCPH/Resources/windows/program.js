Ti.include('../include/database.js');

var win = Ti.UI.currentWindow;
win.orientationModes = [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ]; 

/* Get information about wich track there is selected
-------------------------------------------------------*/
var trackId = Ti.App.Properties.getString('trackId');
var trackName = Ti.App.Properties.getString('trackName');
var bullet = Ti.App.Properties.getString('bullet');
var color = Ti.App.Properties.getString('color');

var sessions = db.execute('SELECT sessions.session_id, sessions.session_title, sessions.session_time, program.program_day, program.program_time, program.program_room FROM sessions INNER JOIN program ON sessions.session_time=program.program_id WHERE sessions.session_cat ='+ trackId +' ORDER BY program.program_time ASC');

var Tue = [];
var Wed = [];
var Thu = [];
var allDate = [];
var all = [];
var data = [];

var TueFirst = false;
var WedFirst = false;
var ThuFirst = false;

function sortByTime(a, b) {
	var x = a.time.toLowerCase();
	var y = b.time.toLowerCase();
	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

while(sessions.isValidRow())
{
	var sessionId = sessions.field(0);
	var sessionTitle = sessions.field(1);
	var programId = sessions.field(2);

	var programDay = sessions.field(3);
	var programTime = sessions.field(4);
	var programRoom = sessions.field(5);

	switch(programDay)
	{
		case 'Tuesday':
			if(!TueFirst)
			{
				TueFirst = true;
				Tue.push({day: programDay, time: programTime, room: programRoom, title: sessionTitle, id: sessionId, link: '../windows/session.js', hasDetail:true, header: 'Thuesday,  24. August 2010'});
			}
			else
			{
				Tue.push({day: programDay, time: programTime, room: programRoom, title: sessionTitle, id: sessionId, link: '../windows/session.js', hasDetail:true});
			}
		break;
		
		case 'Wednesday':
			if(!WedFirst)
			{
				WedFirst = true;
				Wed.push({day: programDay, time: programTime, room: programRoom, title: sessionTitle, id: sessionId, link: '../windows/session.js', hasDetail:true, header: 'Wednesday,  25. August 2010'});
			}
			else
			{
				Wed.push({day: programDay, time: programTime, room: programRoom, title: sessionTitle, id: sessionId, link: '../windows/session.js', hasDetail:true});
			}
		break;
					
		case 'Thursday':
			if(!ThuFirst)
			{
				ThuFirst = true;
				Thu.push({day: programDay, time: programTime, room: programRoom, title: sessionTitle, id: sessionId, link: '../windows/session.js', hasDetail:true, header: 'Thursday,  26. August 2010'});
			}
			else
			{
				Thu.push({day: programDay, time: programTime, room: programRoom, title: sessionTitle, id: sessionId, link: '../windows/session.js', hasDetail:true});
			}
		break;
	}

	sessions.next();
}
sessions.close();

all = Tue.concat(Wed, Thu);

for(var j = 0; j < all.length; j++)
{
	var row = Ti.UI.createTableViewRow({
		selectedBackgroundColor: '#EEEEEE',
		className: trackName+''+j
	});
	
	if(all[j].header)
	{
		row.header = all[j].header;
	}
	
	var indicator = Ti.UI.createImageView({
		image: bullet,
		left: 8,
		top: 18,
		height: 8,
		width: 8
	});
	
	var label = Ti.UI.createLabel({
		text: all[j].title,
		color: '#666666',
		width:265,
		top: 5,
		left:25,
		height:15,
		font:{fontWeight:'bold', fontSize:14}
	});
	
	var clock = Ti.UI.createLabel({
		text: all[j].time + ' / ' + all[j].room,
		color: '#666666',
		width:265,
		top: 25,
		left:25,
		height:12,
		font:{fontSize:11}
	});
	
	var arrow = Ti.UI.createImageView({
		image: '../img/design/arrow.png',
		right: 8,
		top: 13,
		height: 16,
		width: 16
	});
	
	row.link = all[j].link;
	row.name = all[j].title;
	row.id = all[j].id;
	row.day = all[j].day;
	row.time = all[j].time;
	
	row.add(indicator);
	row.add(arrow);
	row.add(label);
	row.add(clock);
	
	data[j] = row;	
}

var tableview = Ti.UI.createTableView({
	data:data
});

tableview.addEventListener('click', function(e)
{
	if(e.rowData.link)
	{
		var session = Ti.UI.createWindow({
			url:e.rowData.link,
			title: e.rowData.name,
			backButtonTitle: 'Back',
			barColor: color
		});
		
		Ti.App.Properties.setString("programDay", e.rowData.day);
		Ti.App.Properties.setString("programTime", e.rowData.time);
		Ti.App.Properties.setString("sessionId", e.rowData.id);
		Ti.UI.currentTab.open(session, {animated:true});
	}
});

win.add(tableview);