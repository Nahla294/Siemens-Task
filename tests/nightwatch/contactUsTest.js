module.exports = {
    'Test Contact Us Form Submission': function (browser) {
        const contactUsPage = browser.page.contactUsPage();

        // Validate that form is submitted correctly with all fields
        contactUsPage
            .navigate()
            .fillContactForm('@subjectOptionCustomerService', 'testuser@example.com', 'test', 'This is a test message', './test_files/image.png')
            .assert.containsText('@successAlert', 'Your message has been successfully sent');

        // Validate that form is submitted correctly without reference 
        contactUsPage
            .navigate()
            .fillContactForm('@subjectOptionCustomerService', 'testuser@example.com', '', 'This is a test message', './test_files/image.png')
            .assert.containsText('@successAlert', 'Your message has been successfully sent');

        // Validate that form is sumbitted without image
        contactUsPage
            .navigate()
            .fillContactForm('@subjectOptionCustomerService', 'testuser@example.com', 'test', 'This is a test message')
            .assert.containsText('@successAlert', 'Your message has been successfully sent');

        // Validate that form is not sumbitted without email
        contactUsPage
            .navigate()
            .fillContactForm('@subjectOptionCustomerService', '', 'test', 'This is a test message', './test_files/image.png')
            .assert.containsText('@errorAlert', 'Invalid email address.');

        // Validate that form is not sumbitted without subject
        contactUsPage
            .navigate()
            .fillContactForm('@defaultCustomerService', 'testuser@example.com', 'test', 'This is a test message', './test_files/image.png')
            .assert.containsText('@errorAlert', 'Please select a subject from the list provided.');

        // Validate that form is not sumbitted without message
        contactUsPage
            .navigate()
            .fillContactForm('@subjectOptionCustomerService', 'testuser@example.com', 'test', '', './test_files/image.png')
            .assert.containsText('@errorAlert', 'The message cannot be blank.');


        browser.end();
    }
};
