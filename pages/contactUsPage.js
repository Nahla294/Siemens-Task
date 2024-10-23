module.exports = {
  url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
  elements: {
    subjectHeading: '#id_contact',
    defaultCustomerService: 'select#id_contact option[value="0"]', 
    subjectOptionCustomerService: 'select#id_contact option[value="2"]', 
    subjectOptionWebmaster: 'select#id_contact option[value="1"]', 
    orderReference: '#id_order',
    emailField: '#email',
    fileUpload: '#fileUpload',
    messageField: '#message',
    submitButton: '#submitMessage',
    successAlert: '.alert-success',
    errorAlert: '.alert-danger'
  },
  commands: [{
    selectSubject(subjectOption) {
      this.click('@subjectHeading') 
        .click(subjectOption);
      return this;
    },
    fillContactForm(subjectOption, email,reference, message, filePath) {
      this
        .selectSubject(subjectOption) 
        .setValue('@emailField', email)
        .setValue('@orderReference', reference)
        .setValue('@messageField', message)
        if (filePath) {
          this.setValue('@fileUpload', require('path').resolve(filePath));
        }
        this.click('@submitButton');
      return this;
    }
  }]
};
