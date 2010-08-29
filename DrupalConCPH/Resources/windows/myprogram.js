Ti.include('../include/database.js');
var win = Ti.UI.currentWindow;

win.addEventListener('focus', function()
{
	var Tue = [];
	var Wed = [];
	var Thu = [];
	var data = [];
	
	var myprogram = db.execute('SELECT myprogram.my_day, myprogram.my_time, myprogram.my_session, sessions.session_id, sessions.session_title, sessions.session_cat, program.program_room FROM myprogram LEFT OUTER JOIN sessions ON myprogram.my_session=sessions.session_id LEFT OUTER JOIN program ON program.program_id=sessions.session_time');
	
	var TueFirst = false;
	var WedFirst = false;
	var ThuFirst = false;
	
	var timeRoom = '';
	var sessionName = '';
	var bullet;
	var color;
	
	while(myprogram.isValidRow())
	{
		var day = myprogram.field(0);
		var time = myprogram.field(1);
		var title = myprogram.field(4);
		var cat = myprogram.field(5);
		var room = myprogram.field(6);
		var id = myprogram.field(3);
		
		if(!cat)
		{
			cat = 8;
		}
		
		switch(cat)
		{
			case 1:
				bullet = '../img/design/bullet_blue.png';
				color = '#3499e9';
			break;
			
			case 2:
				bullet = '../img/design/bullet_yellow.png';
				color = '#eebf64';
			break;
			
			case 3:
				bullet = '../img/design/bullet_green.png';
				color = '#4bd540';
			break;
			
			case 4:
				bullet = '../img/design/bullet_purple.png';
				color = '#7a34e9';
			break;
			
			case 5:
				bullet = '../img/design/bullet_orange.png';
				color = '#e96e34';
			break;
			
			case 6:
				bullet = '../img/design/bullet_red.png';
				color = '#e93434';
			break;
			
			case 7:
				bullet = '../img/design/bullet_grey.png';
				color = '#666666';
			break;
			
			case 8:
				bullet = '../img/design/bullet_white.png';
			break;
		}
		
		switch(day)
		{
			case 'Tuesday':
				if(!TueFirst)
				{
					TueFirst = true;
					Tue.push({id: id, day: day, time: time, title: title, room: room, cat: cat, color: color, bullet: bullet, link: '../windows/session.js', hasDetail:true, header: 'Thuesday,  24. August 2010'});
				}
				else
				{
					Tue.push({id: id, day: day, time: time, title: title, room: room, cat: cat, color: color, bullet: bullet, link: '../windows/session.js', hasDetail:true});
				}
			break;
			case 'Wednesday':
				if(!WedFirst)
				{
					WedFirst = true;
					Wed.push({id: id, day: day, time: time, title: title, room: room, cat: cat, color: color, bullet: bullet, link: '../windows/session.js', hasDetail:true, header: 'Wednesday,  25. August 2010'});
				}
				else
				{
					Wed.push({id: id, day: day, time: time, title: title, room: room, cat: cat, color: color, bullet: bullet, link: '../windows/session.js', hasDetail:true});
				}
			break;	
			case 'Thursday':
				if(!ThuFirst)
				{
					ThuFirst = true;
					Thu.push({id: id, day: day, time: time, title: title, room: room, cat: cat, color: color, bullet: bullet, link: '../windows/session.js', hasDetail:true, header: 'Thursday,  26. August 2010'});
				}
				else
				{
					Thu.push({id: id, day: day, time: time, title: title, room: room, cat: cat, color: color, bullet: bullet, link: '../windows/session.js', hasDetail:true});
				}
			break;
		}
		myprogram.next();
	}
	myprogram.close();
	
	all = Tue.concat(Wed, Thu);
	
	for(var j = 0; j < all.length; j++)
	{
		var row = Ti.UI.createTableViewRow({
			selectedBackgroundColor: '#EEEEEE',
			className: 'myprogram'+j
		});
		
		if(all[j].room)
		{
			timeRoom = all[j].time + ' / ' + all[j].room;
		}
		else
		{
			timeRoom = all[j].time;
		}
		
		if(all[j].title)
		{
			sessionName = all[j].title;
			
			var arrow = Ti.UI.createImageView({
				image: '../img/design/arrow.png',
				right: 8,
				top: 13,
				height: 16,
				width: 16
			});
			
			row.add(arrow);
		}
		else
		{
			sessionName = 'No session';
		}
				
		if(all[j].header)
		{
			row.header = all[j].header;
		}
		
		var label = Ti.UI.createLabel({
			text: sessionName,
			color: '#666666',
			width:265,
			top: 20,
			left:22,
			height:18,
			font:{fontSize:12}
		});
		
		var clock = Ti.UI.createLabel({
			text: timeRoom,
			color: '#666666',
			width:265,
			top: 8,
			left:22,
			height:10,
			font:{fontWeight:'bold', fontSize:11}
		});
		
		var dot = Ti.UI.createImageView({
			image: all[j].bullet,
			left: 8,
			top: 19,
			height: 8,
			width: 8
		});
				
		row.name = all[j].title;
		row.id = all[j].id;
		row.day = all[j].day;
		row.time = all[j].time;
		row.link = all[j].link;
		row.color = all[j].color;
		
		row.add(label);
		row.add(clock);
		row.add(dot);
		
		data[j] = row;	
	}

	var tableview = Ti.UI.createTableView({
		data:data
	});
	
	tableview.addEventListener('click', function(e)
	{
		if(e.rowData.name)
		{
			if(e.rowData.link)
			{
				var session = Ti.UI.createWindow({
					url:e.rowData.link,
					title: e.rowData.name,
					backButtonTitle: 'Back',
					barColor: e.rowData.color
				});
				
				Ti.App.Properties.setString("programDay", e.rowData.day);
				Ti.App.Properties.setString("programTime", e.rowData.time);
				Ti.App.Properties.setString("sessionId", e.rowData.id);
				Ti.UI.currentTab.open(session, {animated:true});
			}
		}
	});
	
	// Adds tableview to window.
	win.add(tableview);
});