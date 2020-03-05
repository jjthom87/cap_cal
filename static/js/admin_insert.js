$(document).ready(function(){

	$.ajax({
		method: 'GET',
		url: '/api/signedin'
	}).then(function(res){
		console.log(res)
		if(!res.status){
			alert("You must be signed in to use this page")
			window.location.href = '/'
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

	$.ajax({
		method: 'GET',
		url: '/api/article/all'
	}).then(function(articles){

		if(articles.size > 0){
			var allArticlesDiv = $(".articles-all");
			var headerHtml = "";
			headerHtml += '<div class="col-lg-10 align-self-end" style="padding-bottom: 15px">';
			headerHtml += '<h1 class="text-uppercase font-weight-bold" style="color: #f4623a;">Captains Log</h1>';
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
			headerHtml += '<h1 class="text-uppercase font-weight-bold" style="color: #f4623a;">Captains Log</h1>';
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