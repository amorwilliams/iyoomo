iyoomo.signupin = {};

// ready event
iyoomo.signupin.ready = function() {
	var
	$signTabItem = $('#signin .tabular.menu a.item'),
    $top_menu = $('#top_menu'),
    $signin_form = $('#signin_form'),
    $signup_form = $('#signup_form'),
    handler
    ;
    
    var validationRules = {
		email: {
			identifier  : 'email',
			rules: [
				{
					type   : 'empty',
					prompt : 'Please enter an e-mail'
				},
				{
					type   : 'email',
					prompt : 'Please enter a valid e-mail'
				}
			]
		},
		username: {
			identifier : 'username',
			rules: [
				{
					type   : 'empty',
					prompt : 'Please enter a username'
				}
			]
		},
		password: {
			identifier : 'password',
			rules: [
				{
					type   : 'empty',
					prompt : 'Please enter a password'
				},
				{
					type   : 'length[6]',
					prompt : 'Your password must be at least 6 characters'
				}
			]
		},
		repassword: {
			identifier : 'repassword',
			rules: [
				{
					type 	: 'match[password]',
					prompt	: 'Your confirm password is different with password'
				}
			]
		},
		terms: {
			identifier : 'terms',
				rules: [
				{
					type   : 'checked',
					prompt : 'You must agree to the terms and conditions'
				}
			]
		}
	};
    
    // alias
    handler = {
    
    	showLoginModel : function(){
			$('#siginModal')
				.modal('setting',
				'transition', 
				'scale')
					.modal('show')
			;
		},

		signin: function() {
			var email = $('#signin_email').val();
			var password = $('#signin_password').val();
			//发送数据
			var posting = $.ajax({
				type: 'post',
				url: '/signin',
				dataType: 'json',
				data: {email: email, password: password}
			});
			
			posting.success(function(data){
				var status = data.status;
				console.log(status);
				if('success' == status){
					$('#signin').hide({
							height: [ 'toggle', 'swing' ],
							opacity: 'toggle'
						}, 1000, 'linear', function() {
							$('#signin').remove();
						}
					);
					
					$top_menu.remove();
					
					$('body')
						.prepend(data.html);
					
					$('#user_button')
						.text(data.username).show();
						
					$('#siginModal').modal('hide');

				}
				
			});
		},
		
		resizeModal: function(){
			$('#siginModal').modal('refresh');
		}
		
	};
	
	$('#top_menu').on('click', '.login.button', function(e){
		handler.showLoginModel();
	});
	
	$signin_form
		.on('submit', function(e){
			e.preventDefault();
			handler.signin();
		})
	;
	
	$signTabItem
    	.tab()
	;
	
	$signup_form
		.form(validationRules, {
			inline : true
			,on     : 'blur'
			,onValid: function(field){handler.resizeModal()}
			,onInvalid: function(field){handler.resizeModal()}
			}
		)
	;
	
	$('#signin .tabular.menu').on('click', 'a.item', function(e){
		handler.resizeModal()
	});
};

// attach ready event
$(document)
  .ready(iyoomo.signupin.ready)
;