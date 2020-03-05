$(document).ready(function(){

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
}