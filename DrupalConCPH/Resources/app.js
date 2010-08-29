Ti.UI.setBackgroundColor('#FFF');
var tabGroup = Ti.UI.createTabGroup();

/* Confrence program / session
-------------------------------------------*/
var winProgram = Ti.UI.createWindow({
	url:'windows/tracks.js',
	title: 'Program',
	barColor: '#666'
});

var tabProgram = Ti.UI.createTab({
	icon:'img/icons/83-calendar.png',
	title: 'PROGRAM',
	window:winProgram
});

/* My program
-------------------------------------------*/
var winMyProgram = Ti.UI.createWindow({
	url:'windows/myprogram.js',
	title: 'My Program',
	barColor: '#666'
});

tabMyProgram = Ti.UI.createTab({
	icon:'img/icons/58-bookmark.png',
	title: 'MY PROGRAM',
	window:winMyProgram
});

/* Information about copenhagen
-------------------------------------------*/
var winCphInfo = Ti.UI.createWindow({
	url:'windows/info.js',
	title: 'DrupalCon CPH',
	barColor: '#666'
});

var tabCphInfo = Ti.UI.createTab({
	icon:'img/icons/drupal.png',
	title: 'DRUPALCON',
	window:winCphInfo
});

/* Twitter
-------------------------------------------*/
var winTwitter = Ti.UI.createWindow({
	url:'windows/twitter.js',
	title: 'Announcements',
	barColor: '#666'
});

var tabTwitter = Ti.UI.createTab({
	icon:'img/icons/08-chat.png',
	title: 'LIVE',
	window:winTwitter
});

/* Add tabs to tabGroup
-------------------------------------------*/
tabGroup.addTab(tabProgram);
tabGroup.addTab(tabMyProgram);  
tabGroup.addTab(tabCphInfo);
tabGroup.addTab(tabTwitter);

tabGroup.open({
	transition:Ti.UI.iPhone.AnimationStyle.NONE
});