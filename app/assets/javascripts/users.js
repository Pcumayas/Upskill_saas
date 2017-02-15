/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBTN = $('#form-submit-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  
  //When user clicks form submit btn, prevent default submission
  submitBTN.click(function(event){
    event.preventDefault();
    submitBTN.val("Processing").prop('disabled', true);
    
  //Collect credit card fields
  
  var ccNum = $('#card_number').val(), 
    cvcNum = $('#card_code').val(),
    expMonth = $('#card_month').val(),
    expYear = $('#card_year').val();
    
  //Use Stripe JS Lib to check card errors
  var error = false;
  
  if(!Stripe.card.validateCardNumber(ccNum)){
    error=true;
    alert('Credit card is invalid')
  }
  
  if(!Stripe.card.validateCVC(cvcNum)){
    error=true;
    alert('CVC is invalid')
  }
  
  if(!Stripe.card.validateExpiry(expMonth, expYear)){
    error=true;
    alert('Expiration is invalid')
  }
  
  if(error){
    submitBTN.prop('disabled', false).val("Sign Up");
  } else {  
  //Send card info to Strpe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum, 
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
  }
  
  return false;
  });
  
  //Stripe will return token
  function stripeResponseHandler(status, response){
    //Get the token from the response
    var token = response.id;
    
    //Inject the card token in a hidden field.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Submit form to our Rails app.
    theForm.get(0).submit();
  }
});