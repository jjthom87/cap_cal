$(document).ready(function(){

	$.ajax({
		method: 'GET',
		url: '/api/signedin'
	}).then(function(res){
		if(!res.status){
			alert("You must be signed in to use this page")
			window.location.href = '/admin/si'
		}
	});

	$('#post-form').on('submit', function(e){
		e.preventDefault();

		var postObj = {
			name: $('#name-input').val(),
			username: $('#username-input').val(),
			password: $('#password-input').val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/sign-up',
			dataType: 'json',
			data: JSON.stringify(postObj),
			contentType: 'application/json'
		}).then(function(res){
			if(!res.user){
				if(res.info.message === "username taken"){
					alert("Username has been taken. Please enter another one.")
				}
			} else {
				window.location.href = "/sign-in"
			}
		});
	});

});