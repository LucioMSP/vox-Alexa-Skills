/*********************
*  Author: egomez 
*  Fecha: 7 de Mayo 2019
**********************/
// lambda
// Demo sobre el manejo de intents en una skill Alexa SDK v2
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Bienvenido a Ejemplo Multimodal, puedes decirme, dame un saludo, salúdame, o también puedes pedirme una imagen ¿Qué elijes?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Ejemplo Multimodal')
            .reprompt('¿Qué elijes?')
            /*.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: require('./welcome.json'),
                datasources: {}
            })*/
            .getResponse();
    }
};
const HolaMundoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HolaMundoIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var myName = request.intent.slots.nombre.value;
        
        const speechText = 'Hola ' + myName + ', el grupo Vox Alexa Skills, México y Querétaro te saludan!';
        return handlerInput.responseBuilder
            .speak(speechText)  
            .withShouldEndSession(true)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Puedo darte un saludo, para esto, dime Hola, o puedo mostrarte mis capacidades APL, puedes decirme, muestrame una imagen, ¿qué elijes?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Adiós, regresa pronto, te tendré sorpresas!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // aquí va código de limpieza o reinicialización.
        return handlerInput.responseBuilder.getResponse();
    }
};

// Handler para testing y debugging.
// Repite la petición del usuario.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = 'Ejecutaste,' + intentName + ', en breve tendré funcionalidad disponible';

        return handlerInput.responseBuilder
            .speak(speechText)            
            .getResponse();
    }
};

// Captura genérica de erroes, (sintáxis, enrutamiento).
// Si se recibe error, significa que no hay un handler que regrese "true" para el método canHandle()
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = 'No entiendo lo que dices, intenta nuevamente';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// Entrada de la skill, se encarga de enrutar todas las peticiones.
// Aquí deben existir todos los handlers e interceptores.
/*************************************************************
/* IMPORTANTE EL ORDEN DE APARICIÓN, en dicho orden se procesan.
/*************************************************************/

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HolaMundoIntentHandler,        
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
		
		// al final va el IntentReflector, con esto evitamos que maneje peticiones erróneas
        IntentReflectorHandler) 
    .addErrorHandlers(
        ErrorHandler)
.lambda();
