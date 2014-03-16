$.ajaxSetup({
    cache: false
});

var currentPath = ".";

function startDirectoryContent (path) {
	$.ajax ({
		'url': 'getpath.php',
		'type': 'post',
		'data': { 'path':  path },
		'dataType' : 'json',
		'success': updateDirectoryContent});
}

function updateDirectoryContent (data) {
	$("#explorer").empty ();
	$.each(data, function () {
		$("#explorer").append ('<li>' + this.path + '</li>')
	});
}

function handleDirectoryClickEvent (event) {
	var path = $(this).text ();
	currentPath += '/' + path;
	startDirectoryContent (currentPath);
}

$(document).ready(function() {
    startDirectoryContent (".");
    $("body").on ("click", "#explorer li", handleDirectoryClickEvent);
});