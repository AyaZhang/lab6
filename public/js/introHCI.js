'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#exBtn').click(externalAPI);

}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	$.get("/project/"+idNumber, callback);

	console.log("User clicked on project " + idNumber);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {

	$.get("/palette", colorCallback);

	console.log("User clicked on color button");
}

function callback (result) {

	var projectHTML = '<div class="thumbnail">' + '<img src="' + projectID['image'] + '"class="detailsImage">' + '<p>' + projectID['title'] + '</p>' + '<p><small>' + projectID['date'] + '</small></p>' + '<p>' + projectID['summary'] + '</p></div>';

	var p = '#project' + projectID['id'] + ' .details';

	$(p).html(projectHTML);
}

function colorCallback (result) {

	var colorsArray = result['colors'];

	var colors = colorsArray['hex'];

	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

function externalAPI (e) {

	var url = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=-180&miny=-90&maxx=180&maxy=90&size=medium&mapfilter=true' + 'callback=exCallback';

	$.get(url,exCallback,'jsonp');

	console.log("Click exBtn!");
}

function exCallback (result) {

	var randomNum = Math.floor(result['photos'].length * Math.random());

	var image = '<div class="thumbnail">'+ '<img src=' + result['photos'][randomNum]['photo_file_url'] + '>' + '</div>';

	$(".ex").html(image);
}