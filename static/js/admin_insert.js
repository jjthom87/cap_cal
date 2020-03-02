$(document).ready(function(){

	$('#article-form').on('submit', function(e){
		e.preventDefault();

		var title = $("#title-input").val();
		var article = $("#article-input").val();

		if(!title || !article){
			alert("There must be an input for title and article")
		} else {
			var articleToPublish = {
				title: title,
				article: article
			}

			$.ajax({
				method: 'POST',
				url: '/api/publish',
				dataType: 'json',
				data: JSON.stringify(articleToPublish),
				contentType: 'application/json'
			}).then(function(res){
				if(res === "null_article"){
					alert("Please Enter Article")
				}
				//appendGuestbook();
			});

			$('#title-input').val("");
			$('#article-input').val("");
		}

	});

	$.ajax({
		method: 'GET',
		url: '/api/article/latest',
	}).then(function(res){
		console.log(res)
		if(res.title != "nada surf"){
			var title = res.title;
			var article = res.article;

			$("#latest-title").text(title);
			$("#latest-article").text(article);
		} else {
			$("#latest-title").text("Awaiting First Article");
			$("#latest-article").text("Awaiting First Article");
		}
	});

	$.ajax({
		method: 'GET',
		url: '/api/article/all'
	}).then(function(articles){

		if(articles.size > 0){
			var allArticlesDiv = $(".articles-all");
			var headerHtml = "";
			headerHtml += '<div class="col-lg-10 align-self-end" style="padding-bottom: 15px">';
			headerHtml += '<h1 class="text-uppercase font-weight-bold" style="color: orange;">Captains Log</h1>';
			headerHtml += '</div>';

			allArticlesDiv.append(headerHtml);

			articles.forEach((article) => {
				var articleHtml = "";
				articleHtml += '<div class="col-lg-10 align-self-end">';
				articleHtml += '<h3 class="text-uppercase text-white font-weight-bold">' + article.title + '</h1>';
				articleHtml += '<hr class="divider my-4">';
				articleHtml += '</div>';
				articleHtml += '<div class="col-lg-8 align-self-baseline">';
				articleHtml += '<p class="text-white-75 font-weight-light mb-5">' + article.article + '</p>';
				articleHtml += '</div>';

				allArticlesDiv.append(articleHtml)
			});
		} else {
			var allArticlesDiv = $(".articles-all");
			var headerHtml = "";
			headerHtml += '<div class="col-lg-10 align-self-end" style="padding-bottom: 15px">';
			headerHtml += '<h1 class="text-uppercase font-weight-bold" style="color: orange;">Captains Log</h1>';
			headerHtml += '</div>';

			allArticlesDiv.append(headerHtml);

			var articleHtml = "";
			articleHtml += '<div class="col-lg-10 align-self-end">';
			articleHtml += '<h3 class="text-uppercase text-white font-weight-bold">Awaiting First Article</h1>';
			articleHtml += '<hr class="divider my-4">';
			articleHtml += '</div>';
			articleHtml += '<div class="col-lg-8 align-self-baseline">';
			articleHtml += '<p class="text-white-75 font-weight-light mb-5">Awaiting First Article</p>';
			articleHtml += '</div>';

			allArticlesDiv.append(articleHtml)
		}
	});

	// function appendGuestbook(){
	// 	$('#all-div').remove();
	// 	$.ajax({
	// 		method: 'GET',
	// 		url: '/api/messages'
	// 	}).then(function(messages){
	// 		var allDiv = $('<div id="all-div">');
	// 		var guestDiv, nameP, messageP, xButton;
	// 		messages.rows.sort(function(a, b) { 
	// 			return a.id - b.id;
	// 		});
	// 		for(var i = 0 ; i < messages.rows.length; i++){
	// 			guestDiv = $('<div class="well guest-div">');
	// 			guestDiv.css({display: 'inline-block', margin: '10px', overflow: 'hidden'});

	// 			xButton = $('<button class="btn btn-danger x-button" data-id=' + messages.rows[i].id + '>');
	// 			xButton.css({padding: "0px 4px 0px 4px", float: 'right'})
	// 			xButton.text("x");

	// 			nameP = $('<p>');
	// 			messageP = $('<p class="message" data-id=' + messages.rows[i].id + '>');

	// 			nameP.text("Name: " + messages.rows[i].name);
	// 			nameP.css({fontWeight: 'bold'})
	// 			messageP.text("Message: " + messages.rows[i].message);
	// 			guestDiv.append(xButton).append(nameP).append(messageP);
	// 			allDiv.append(guestDiv);
	// 		}
	// 		$('#everything-div').append(allDiv)
	// 	});
	// }
	// appendGuestbook();

	// $(document).on('click', '.x-button', function(){
	// 	$.ajax({
	// 		method: 'DELETE',
	// 		url: '/api/delete-message/' + $(this).data('id')
	// 	});
	// 	appendGuestbook();
	// });

	// $(document).on('click', '.message', function(){
	// 	$('#modal-input-div').remove();
	// 	var messageId = $(this).data('id');
	// 	$('#update-message-modal').modal();

	// 	var inputDiv = $('<div id="modal-input-div">');

	// 	$.ajax({
	// 		method: 'GET',
	// 		url: '/api/messages'
	// 	}).then(function(messages){
	// 		for(var i = 0; i < messages.rows.length; i++){
	// 			if(messages.rows[i].id == messageId){
	// 				var textInput = $("<textarea id='message-update-input'>");
	// 				textInput.val(messages.rows[i].message);
	// 				inputDiv.append(textInput);
	// 			}
	// 		}
	// 		var submitButton = $('<button>');
	// 		submitButton.addClass('btn btn-info enter-button');
	// 		submitButton.attr('data-id', messageId);
	// 		submitButton.text("Enter");
	// 		inputDiv.append("<br>").append(submitButton);
	// 	});
	// 	$('.modal-body').append(inputDiv);
	// });

	// $(document).on('click', '.enter-button', function(){
	// 	var updatedMessage = $("#message-update-input").val();

	// 	if(updatedMessage !== ""){
	// 		$.ajax({
	// 			method: 'PUT',
	// 			url: '/api/update-message/' + $(this).data('id'),
	// 			data: {message: updatedMessage}
	// 		}).then(function(res){
	// 			appendGuestbook();
	// 			$('#update-message-modal').modal('toggle');
	// 		});
	// 	} else {
	// 		alert ('Please Enter Text')
	// 	}

	// });

});