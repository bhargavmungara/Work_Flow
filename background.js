browser.contextMenus.create({
  id: "eat-page",
  title: "Eat this page",
});

var messages = [
  "How do you handle 404 on this page",
  "What happens if we 500 here? ",
  "Check if the client is able to access the webpage with 1mbps",
  "What happens if I don't let any fonts load?",
];

var randomNumber = Math.floor(Math.random() * messages.length);

function messageTab(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    replacement: messages[randomNumber],
  });
}

function onExecuted(result) {
  let querying = browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  querying.then(messageTab);
}

browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "eat-page") {
    let executing = browser.tabs.executeScript({
      file: "page-eater.js",
    });
    executing.then(onExecuted);
  }
});
