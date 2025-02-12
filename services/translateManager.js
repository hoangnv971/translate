const  speechToTextService = require("./speechToTextService.js");
const  textToSpeechService = require("./textToSpeechService.js");
const  translateService = require("./translateService.js");

async function processAudioTranslation(audioFilePath, targetLanguage) {
    try {
        console.log("Starting speech-to-text...");
        const text = await speechToTextService.transcribeAudio(audioFilePath);
        if (!text) throw new Error("Speech-to-text failed");
        
        console.log("Translating text...");
        const translatedText = await translateService.translateText(text, targetLanguage);
        
        console.log("Converting translated text to speech...");
        const outputSpeechFile = await textToSpeechService.textToSpeech(translatedText);
        
        return outputSpeechFile;
    } catch (error) {
        console.error("Error processing audio translation:", error);
        return null;
    }
}

async function processTextToSpeechTranslation(text, targetLanguage) {
    try {
        console.log("Translating text...");
        const translatedText = await translateService.translateText(text, targetLanguage);
        
        console.log("Converting translated text to speech...");
        const outputSpeechFile = await textToSpeechService.textToSpeech(translatedText);
        
        return outputSpeechFile;
    } catch (error) {
        console.error("Error processing text-to-speech translation:", error);
        return null;
    }
}

module.exports = { processAudioTranslation, processTextToSpeechTranslation, processTextTranslation };
