$(document).ready(function(){

	$('#sign-in-form').on('submit', function(e){
		e.preventDefault();

		var signInObj = {
			username: $('#username-input').val(),
			password: $('#password-input').val()
		}

		$.ajax({
			method: 'POST',
			url: '/api/sign-in',
			dataType: 'json',
			data: JSON.stringify(signInObj),
			contentType: 'application/json'
		}).then(function(res){
			console.log(res)
			if(!res.success){
				if(res.info.message === "incorrect password"){
					alert("Incorrect Password for username")
				} else if (res.info.message === "no user"){
					alert("Username does not exist")
				}
			} else {
				window.location.href = '/'
			}
		});
	});

});