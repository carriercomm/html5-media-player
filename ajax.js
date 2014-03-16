$.ajaxSetup({
    cache: false
});

var currentPath = new Array ();

function isDefined(x) {
    var undefinedVar;
    return x !== undefinedVar;
}

function getCurrentPath () {
	return currentPath.join ("/");
}

function startDirectoryContent () {
	$.ajax ({
		'url': 'getpath.php',
		'type': 'post',
		'data': { 'path':  getCurrentPath () },
		'dataType' : 'json',
		'success': updateDirectoryContent});
}

function updateDirectoryContent (data) {
	$("#explorer").empty ();
	$.each(data, function () {
		var dataAttribute = "";
		if (this.isDir) {
			dataAttribute = " data-directory='true'";
		}
		$("#explorer").append ('<li' + dataAttribute + '>' + this.path + '</li>')
	});
}

function handleDirectoryClickEvent (event) {
	if (!isDefined ($(this).attr ("data-directory"))) {
		return;
	}
	currentPath.push ($(this).text ());
	startDirectoryContent ();
}

function topDirectory (event) {
	if (event) {
		event.preventDefault();
	}
	currentPath = new Array ();
	currentPath.push (".");
	startDirectoryContent ();
}

function upDirectory (event) {
	if (event) {
		event.preventDefault();
	}
	if (currentPath.length == 1) return;
	currentPath.pop ();
	startDirectoryContent ();
}

$(document).ready(function() {
	topDirectory ();
    $("body").on ("click", "#explorer li", handleDirectoryClickEvent);
    $("#buttonHome").on ("click", topDirectory);
    $("#buttonUp").on ("click", upDirectory);
});