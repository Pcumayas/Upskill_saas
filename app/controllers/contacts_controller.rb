class ContactsController < ApplicationController
  
  # GET request to /contact-us
  # Show new form
  def new
    @contact = Contact.new
  end
  
  # POST request /contacts
  def create
    # Mass assignment of form fields into Contact object
    @contact = Contact.new(contact_params)
    # Save Contact objet to database
    if @contact.save
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      # Send to contact mailer method and send email
      ContactMailer.contact_email(name, email, body).deliver
      flash[:success] = "Message Sent"
      redirect_to new_contact_path
    else
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path
    end
  end
  
  private
    #To collect data from form we need strong parameters
    # and whitelist form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end