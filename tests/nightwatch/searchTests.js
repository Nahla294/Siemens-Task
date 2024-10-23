module.exports = {
    'Search for "dress" and Ensure All Results Are Dresses': function (browser) {
      const homepage = browser.page.homePage();
  
      homepage
        .navigate()
        .performSearch('dress') 
        .verifyOnlyDressResults(); 
  
      browser.end();
    }
  };
  