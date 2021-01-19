/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// i18n strings for all supported locales
const languageStrings = require('./languageStrings');

const { broadcast } = require('../../server.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        // console.log('test..............')
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        const speakOutput = handlerInput.t('WELCOME_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GoHomeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoHomeIntent';
    },
    handle(handlerInput) {
        let speakOutput = handlerInput.t('GO_HOME_MSG');
        console.log(JSON.stringify(handlerInput.requestEnvelope, null, 4))
       
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('')
            .withShouldEndSession(false)
            .getResponse();
    }
};
const ChannelUpDownIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChannelUpDownIntent';
    },
    handle(handlerInput) {
        let speakOutput = handlerInput.t('CHANNEL_UP_MSG');
        const channelAction = Alexa.getSlotValue(handlerInput.requestEnvelope, 'channelAction');
        if(channelAction === 'channel down') {
            console.log('channel down')
            speakOutput = handlerInput.t('CHANNEL_DOWN_MSG');
        } else {
            console.log('channel up')
            
        }
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('')
            .withShouldEndSession(false)
            .getResponse();
    }
};

const GotoChannelIntentIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GotoChannelIntent';
    },
    handle(handlerInput) {
        // console.log(JSON.stringify(handlerInput))

        const channelName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'channelName') || Alexa.getSlotValue(handlerInput.requestEnvelope, 'channelStringName') || Alexa.getSlotValue(handlerInput.requestEnvelope, 'broadcastChannel');
        const channelNumber = Alexa.getSlotValue(handlerInput.requestEnvelope, 'channelNumber');
        let speakOutput;
        if(channelName) {
            speakOutput = handlerInput.t('GO_TO_CHANNEL_MSG', { channelName });
        } else {
            speakOutput = handlerInput.t('GO_TO_CHANNEL_NUMBER_MSG', { channelNumber });

        }
        console.log('go to channel ' + (channelName|| channelNumber))
        console.log(JSON.stringify(handlerInput.requestEnvelope, null, 4))
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .reprompt('')
            .withShouldEndSession(false)
            .getResponse();
    }
};
const OpenApplicationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpenApplicationIntent';
    },
    handle(handlerInput) {
        
        const appName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'appName');
        const speakOutput = handlerInput.t('OPEN_APPLICATION_MSG', { appName });
        console.log('open ' + appName)
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        const res = handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('')
            .withShouldEndSession(false)
            .getResponse();
            // delete res['shouldEndSession']
            // console.log('response:', res)
            return res;
    }
};
const SearchIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SearchContentIntent';
    },
    handle(handlerInput) {
        
        const searchString = Alexa.getSlotValue(handlerInput.requestEnvelope, 'searchString');
        const speakOutput = handlerInput.t('SEARCH_CONTENT_MSG', { searchString });
        console.log('searching ' + searchString)
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            // .reprompt('')
            .getResponse();
    }
};

const TurnOnOfDeviceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurnOnOffDeviceIntent';
    },
    handle(handlerInput) {
        let speakOutput = handlerInput.t('TURN_ON_MSG');
        const stbAction = Alexa.getSlotValue(handlerInput.requestEnvelope, 'stbAction');
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        if(stbAction === 'turn off') {
            console.log('turning off device')
            speakOutput = handlerInput.t('TURN_OFF_MSG');
        } else {
            
            console.log('turning on device')
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            // .reprompt('')
            .getResponse();
    }
};

const VolumeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VolumeIntent';
    },
    handle(handlerInput) {
        let speakOutput = handlerInput.t('TURN_ON_MSG');
        const volumeAction = Alexa.getSlotValue(handlerInput.requestEnvelope, 'volumeAction');
        if(volumeAction === 'mute') {
            console.log('volume off')
            speakOutput = handlerInput.t('VOLUME_MUTE_MSG');
        }
        if(volumeAction === 'volume up') {
            console.log('volume up')
            speakOutput = handlerInput.t('VOLUME_UP_MSG');
        }
        if(volumeAction === 'volume down') {
            console.log('volume down')
            speakOutput = handlerInput.t('VOLUME_DOWN_MSG');
        }
        broadcast(JSON.stringify(handlerInput.requestEnvelope))
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            // .reprompt('')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');
        console.log('---------------------goodbye candy')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MSG');
        console.log("==================Sorry, I don't know what you mean===============");
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        const speakOutput = handlerInput.t('SESSION_END_MSG');
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .withShouldEndSession(false)
        .getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intentName: intentName});
        console.log('-------------reflect handler--------------')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            // .withShouldEndSession(false)
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return false;
    },
    handle(handlerInput, error) {
        const speakOutput = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GoHomeIntentHandler,
        GotoChannelIntentIntentHandler,
        OpenApplicationIntentHandler,
        SearchIntentHandler,
        ChannelUpDownIntentHandler,
        TurnOnOfDeviceIntentHandler,
        VolumeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
