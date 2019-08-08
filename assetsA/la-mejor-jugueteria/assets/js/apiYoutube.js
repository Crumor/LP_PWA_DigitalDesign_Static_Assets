// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var onYouTubeIframeAPIReady = function () {
	player = new YT.Player('player', {
		height: '260',
		width: '600',
		videoId: 'X9ZoKKQsxis',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
};

// 4. The API will call this function when the video player is ready.
var onPlayerReady = function (event) {
	event.target.playVideo();
};

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
var onPlayerStateChange = function (event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
};
var stopVideo = function () {
	player.stopVideo();
};