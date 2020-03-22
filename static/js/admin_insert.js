$(document).ready(function(){

	$.ajax({
		method: 'GET',
		url: '/api/signedin'
	}).then(function(res){
		console.log(res)
		if(!res.status){
			alert("You must be signed in to use this page")
			window.location.href = '/admin/si'
		}
	});

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
			});

			$('#title-input').val("");
			$('#article-input').val("");
		}

	});

	$.ajax({
		method: 'GET',
		url: '/api/article/latest',
	}).then(function(res){
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

	$("#read-article-button-hp").on('mouseover', function(){
		$(this).css('color', "#ff4e33")
	})

	$("#read-article-button-hp").on('mouseleave', function(){
		$(this).css('color', "black")
	})

	$("#read-article-button-hp").on('click', function(){
		window.location.href='/log'
	});


});