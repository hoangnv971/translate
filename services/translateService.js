const translate = require('google-translate-api-x');

async function translateText(text, targetLanguage) {
    if (!text || !targetLanguage) {
        console.error("Invalid input: text or targetLanguage is missing.");
        return text;
    }

    try {
        const translated = await translate(text, { to: targetLanguage });
        return translated.text;
    } catch (error) {
        console.error("Error in translation:", error.message);
        return text; // Trả về text gốc nếu lỗi
    }
}


module.exports = translateText;
