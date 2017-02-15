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
    
  //Collect credit card fields
  
  var ccNum = $('#card_number').val(), 
    cvcNum = $('#card_code').val(),
    expMonth = $('#card_month').val(),
    expYear = $('#card_year').val();
    
  //Send card info to Strpe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum, 
    exp_month: expMonth,
    exp_year: expYear}, stripeResponseHandler);
  })
  

  //Stripe will return token
  //Jnject token as hidden int form
  //Submit form into rails app
});