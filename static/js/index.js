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

	$("header.masthead").on('click', function(){
		$.ajax({
			method: 'GET',
			url: '/api/signedin'
		}).then(function(signed_in_res){
			if(signed_in_res.status){
				$("#picture-upload-modal").modal();
			}
		});
	});

	$("#upload-picture-modal-form").submit(function(e){

		$(this).attr("disabled", true);

		setTimeout(()=>{
	      	var formData = new FormData($(this)[0]);
		   	$.ajax({
				url: '/publish/image',
				type: 'POST',
				data: formData,
				async: false,
				cache: false,
				contentType: false,
				enctype: 'multipart/form-data',
				processData: false,
				success: function (response) {
					window.location.href = "/"
				}
		   	}, 1000);
		   	return false;
		})
	})


	var currentUpdate;

	$(document).on('mouseover', function(e){
		$.ajax({
			method: 'GET',
			url: '/api/signedin'
		}).then(function(signed_in_res){
			if(signed_in_res.status){
				$.ajax({
					method: 'GET',
					url: '/api/html/home'
				}).then(function(html_res){
					html_res.forEach((r) => {
						$("#" + r.page + "-" + r.field_id).css("cursor", "pointer");
					})
				});
			}
		});
	});

	var populateUpdateModal = (tag, field) => {
		$.ajax({
			method: 'GET',
			url: '/api/signedin'
		}).then(function(signed_in_res){
			if(signed_in_res.status){

				$.ajax({
					method: 'GET',
					url: '/api/html/home'
				}).then(function(html_res){
					html_res.forEach((r) => {
						if(r.field_id == tag){
							currentUpdate = r;
							$('#home-update-modal').modal();

							$("#home-update-modal-header-h2").text("Update Home Masthead " + field)
							$("#home-update-modal-input").text(currentUpdate.text)
						}
					})
				});

			}
		});
	}

	$("#home-update-modal-form").on('submit', function(e){
		e.preventDefault();

		var input = $("#home-update-modal-input").val();

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

	$.ajax({
		method: 'GET',
		url: '/api/html/home'
	}).then(function(html_res){
		html_res.forEach((r) => {
			$("#" + r.page + "-" + r.field_id).text(r.text)

			$("#" + r.page + "-" + r.field_id).on('click', function(e){
				populateUpdateModal(r.field_id, r.type)
			});
		})
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


	$("#close-home-update-modal").on('click', () => { $('#home-update-modal').modal('toggle'); })
	$("#close-picture-upload-modal").on('click', () => { $('#picture-upload-modal').modal('toggle'); })
	$("#read-article-button-hp").click(() => { window.location.href = "/log" });
});