/**
 * @OnlyCurrentDoc Limits the script to only accessing the current presentation.
 */

/**
 * Update with your own
 */
var uneeqJWTSecret = 'COPY TOUR OWN from https://creator.uneeq.io/deploy/build-your-own';

/**
 * Create a open sidebar
 * @param {Event} event The open event.
 */
function onOpen(event) {
  SlidesApp.getUi().createAddonMenu()
      .addItem('Open Speak', 'showSidebar')
      .addToUi();
}

/**
 * Open the Add-on upon install.
 * @param {Event} event The install event.
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var ui = HtmlService
      .createHtmlOutputFromFile('sidebar')
      .setTitle('Speak');
  SlidesApp.getUi().showSidebar(ui);
}

 function base64Encode(str) {
    var encoded = Utilities.base64EncodeWebSafe(str);
    // Remove padding
    return encoded.replace(/=+$/, '');
};

/* 
* from https://wtfruby.com/gas/2018/11/21/jwt-app-scripts.html
*/
function encodeJWT (data, secret) {
    var header = JSON.stringify({
        typ: 'JWT',
        alg: 'HS256'
    });
    var encodedHeader = base64Encode(header);
    var payload = JSON.stringify(data);
    var encodedPayload = base64Encode(payload);
    var toSign = [encodedHeader, encodedPayload].join('.');
    var signature = Utilities.computeHmacSha256Signature(toSign, secret);
    var encodedSignature = base64Encode(signature);
    console.log("Encoded Signature: " + encodedSignature);
    return [toSign, encodedSignature].join('.');
};

function speak(sessionId, text) {
  // Make a POST request with form data.
  var JWTdata = {
    "sessionId": sessionId
  }

  var sessionIdJwt = encodeJWT(JWTdata, uneeqJWTSecret);
  var url = 'https://api.us.uneeq.io/api/v1/avatar/' + sessionId + '/speak';
  var data = {
              'answer': text, 
              'answerAvatar': '{}', 
              'sessionIdJwt': sessionIdJwt
              }

  // Because payload is a JavaScript object, it is interpreted as
  // as form data. (No need to specify contentType; it automatically
  // defaults to either 'application/x-www-form-urlencoded'
  // or 'multipart/form-data')
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };

  return UrlFetchApp.fetch(url, options);
}

/**
 * Read Note from selected slide and send speak request.
 *
 * @return {string} note string or message
 */
function readNoteAndSpeak() {
  // Get Session id from the first slides
  var slides = SlidesApp.getActivePresentation().getSlides()
  sessionId = slides[0].getNotesPage().getSpeakerNotesShape().getText().asString().trim();

  if (!sessionId) {
    return "[X] Put the session id in the first slide note."
  }
  
  // Get selected elements.
  var presentation = SlidesApp.getActivePresentation()
  var selection = SlidesApp.getActivePresentation().getSelection();
  var currentPage = selection.getCurrentPage();

  var currentSlide = currentPage.asSlide();
  var notePage = currentSlide.getNotesPage();
  var text = notePage.getSpeakerNotesShape().getText().asString().trim();

  if (text) {
    speak(sessionId, text)
    return text
  }

  return "[!] No note in the slids!"
}