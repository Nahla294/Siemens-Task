module.exports = {
  src_folders: ['tests'],
  page_objects_path: ['pages'],
  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path,
    port: 9515,
  },
  
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      reporter: {
        name: 'nightwatch-html-reporter',
        options: {
          output_dir: 'reports',
          report_dir: 'reports',
          filename: 'report.html',
          overwrite: true,           
          showBrowserLogs: false,   
          showPassed: true,
        },
      },
    },
  },
};
