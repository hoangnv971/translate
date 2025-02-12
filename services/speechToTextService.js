const  fs = require('fs');
const  axios = require('axios');
const  OpenAI = require('openai');
const  config = require('../config');

const openai = new OpenAI({ apiKey: config.openai });

async function getAudioStream(filePathOrUrl) {
    if (filePathOrUrl.startsWith('http')) {
        console.log("Downloading audio from URL...");
        const response = await axios({
            url: filePathOrUrl,
            method: 'GET',
            responseType: 'stream'
        });
        return response.data;
    }
    if (!fs.existsSync(filePathOrUrl)) throw new Error("Audio file not found");
    return fs.createReadStream(filePathOrUrl);
}

async function transcribeAudio(filePathOrUrl) {
    try {
        const audioStream = await getAudioStream(filePathOrUrl);
        const response = await openai.audio.transcriptions.create({
            file: audioStream,
            model: 'whisper-1',
            language: 'auto',
            response_format: "text",
        });
        return response.text;

    } catch (error) {
        console.error('Error transcribing audio:', error);
        return null;
    }
}

module.exports = { transcribeAudio };
