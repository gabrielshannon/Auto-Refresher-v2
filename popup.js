document.addEventListener('DOMContentLoaded', function () {

  var glastoHoldingPage = 'https://glastonbury.seetickets.com/'; // Replace with your desired URL



  document.getElementById('autoRefresh').addEventListener('click', function () {
    function checkAndRefresh() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;
        if (currentUrl !== glastoHoldingPage) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    }

    checkAndRefresh();
  
    setInterval(checkAndRefresh, 500);
  });
  

  document.getElementById('setPageVisitButton').addEventListener('click', function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var now = new Date();
      var millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 59, 59, 800) - now;
      if (millisTillTime < 0) {
        millisTillTime += 86400000; // Resets to following day
      }
      setTimeout(function () {
        chrome.tabs.update(tabs[0].id, { url: 'https://glastonbury.seetickets.com/' });
      }, millisTillTime);
    });
  });
});