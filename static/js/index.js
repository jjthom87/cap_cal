$(document).ready(function(){

	var currentUpdate;

	$.ajax({
		method: 'GET',
		url: '/api/html/home'
	}).then(function(html_res){
		html_res.forEach((r) => {
			if(r.field_id == "masthead-h1"){
				currentUpdate = r;
				$("#" + r.page + "-" + r.field_id).text(r.text)
			}
		})
	});

	$(document).on('mouseover', function(e){
		$.ajax({
			method: 'GET',
			url: '/api/signedin'
		}).then(function(signed_in_res){
			if(signed_in_res.status){
				$("#home-masthead-h1").css("cursor", "pointer");
			}
		});
	});

	$("#update-modal-input").on('keypress', function(e){
		// if((e.target.value + e.key) == )
	});

	$("#update-modal-form").on('submit', function(e){
		e.preventDefault();

		var input = $("#update-modal-input").val();

		$.ajax({
			method: 'PUT',
			url: '/api/html/' + currentUpdate.page,
			dataType: 'json',
			data: JSON.stringify({text: input, field_id: currentUpdate.field_id}),
			contentType: 'application/json'
		}).then(function(res){
			if(res.whatever){
				window.location.href = "/"
			}
		});

	});

	$("#home-masthead-h1").on('click', function(e){
		$.ajax({
			method: 'GET',
			url: '/api/signedin'
		}).then(function(signed_in_res){
			if(signed_in_res.status){
				$('#update-modal').modal();

				$("#update-modal-header-h2").text("Update Home Masthead Header")
				$("#update-modal-input").text(currentUpdate.text)
			}
		});
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
});