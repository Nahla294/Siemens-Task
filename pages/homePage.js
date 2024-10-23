module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php',
    elements: {
        searchBar: '#search_query_top', 
        searchButton: 'button[name="submit_search"]', 
        searchResultTitle: '.product_list .product-name',
    },
    commands: [{
        performSearch(searchTerm) {
            this
                .setValue('@searchBar', searchTerm)
                .click('@searchButton');
            return this;
        },
        verifyOnlyDressResults() {
            this.waitForElementVisible('@searchResultTitle', 5000);
            this.api.elements('css selector', '@searchResultTitle', (results) => {
              const itemCount = results.value.length;
              for (let i = 1; i <= itemCount; i++) {
                this.api.verify.attributeContains(
                  `#product_list > li:nth-child(${i}) > div > div.right-block > h5 > a`,
                  'title',
                  'Dress',
                  (result) => {
                    if (result.value === false) {
                      console.log(`Product ${i} is not dress.`);
                    } else {
                      console.log(`Product ${i} is a dress.`);
                    }
                  }
                );
              }
            });
          
            return this;
          }
          
    }]
};
