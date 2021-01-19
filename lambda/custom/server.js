var express = require('express'),
    AlexaSkills = require('alexa-skills'),
    app = express(),
    port = process.env.PORT || 8000,
    alexa = new AlexaSkills({
        express: app, // required 
        route: "/", // optional, defaults to "/" 
        applicationId: "amzn1.echo-sdk-ams.app.XXXXXXX" // optional, but recommended 
    });

alexa.launch(function(req, res) {

        console.log('launch \n');

    var phrase = "Welcome to my app!";
    var options = {
        shouldEndSession: false,
        outputSpeech: phrase,
        reprompt: "What was that?"
    };

    alexa.send(req, res, options);
});

alexa.intent('Hello', function(req, res, slots) {

    console.log('intent \n');
    console.log(slots);

    var phrase = 'Hello World!';
    var options = {
        shouldEndSession: true,
        outputSpeech: phrase,
        card: alexa.buildCard("Card Title", phrase)
    };

    alexa.send(req, res, options);
});

alexa.ended(function(req, res, reason) {
    console.log(reason);
});

console.log('starting server \n');
app.listen(port);