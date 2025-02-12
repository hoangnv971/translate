const  AWS = require('aws-sdk');
const  fs = require('fs');
const  config = require('../config.js');

AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region
});

const polly = new AWS.Polly();

async function textToSpeech(text, outputFilePath = "speech.mp3") {
    const params = {
        Text: text,
        OutputFormat: "mp3",
        VoiceId: "Joanna"
    };

    try {
        const { AudioStream } = await polly.synthesizeSpeech(params).promise();
        fs.writeFileSync(outputFilePath, AudioStream);
        console.log("Speech saved to", outputFilePath);
        return outputFilePath;
    } catch (error) {
        console.error("Error in text-to-speech:", error);
        return null;
    }
}

module.exports = { textToSpeech };
