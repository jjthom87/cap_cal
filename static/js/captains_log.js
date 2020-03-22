$(document).ready(function(){

	$("header.masthead").css(
		{
			paddingTop: "10rem", 
			paddingBottom: "calc(10rem - 72px)",
			background: "linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url(../img/site-background-image.jpg)",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundAttachment: "scroll",
			backgroundSize: "cover"
		}
	)

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

});