$.ajaxSetup({
    cache: false
});

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

$(document).ready(function() {
    startDirectoryContent (".");
});