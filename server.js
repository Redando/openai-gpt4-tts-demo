import { OpenAiService } from "./OpenAiService.js"
import { Constants } from "./Constants.js"

const micCheck = async () => {
    await OpenAiService.textToSpeech(Constants.micCheck, Constants.voiceOptionAlloy, Constants.voiceOptionAlloy.concat('_audio'))
    await OpenAiService.textToSpeech(Constants.micCheck, Constants.voiceOptionEcho, Constants.voiceOptionEcho.concat('_audio'))
    await OpenAiService.textToSpeech(Constants.micCheck, Constants.voiceOptionFable, Constants.voiceOptionFable.concat('_audio'))
    await OpenAiService.textToSpeech(Constants.micCheck, Constants.voiceOptionNova, Constants.voiceOptionNova.concat('_audio'))
    await OpenAiService.textToSpeech(Constants.micCheck, Constants.voiceOptionOnyx, Constants.voiceOptionOnyx.concat('_audio'))
    await OpenAiService.textToSpeech(Constants.micCheck, Constants.voiceOptionShimmer, Constants.voiceOptionShimmer.concat('_audio'))
}

const roastImage = async () => {
    const description = await OpenAiService.getImageDescription(Constants.imageUrl, Constants.roastImagePrompt)
    await OpenAiService.textToSpeech(description, Constants.voiceOptionAlloy, 'roast_image_one'.concat('_Audio'))   
}

const outfitVariants = async () => {
    
    // Generate product design descriptions
    const shirtPrompt = await OpenAiService.getImageDescription(Constants.shirtUrl, Constants.productVariationPrompt)
    const socksPrompt = await OpenAiService.getImageDescription(Constants.socksUrl, Constants.productVariationPrompt)
    const sneakersPrompt = await OpenAiService.getImageDescription(Constants.sneakersUrl, Constants.productVariationPrompt)

    // Generate alternate shirt design images
    await OpenAiService.generateDalleImage(shirtPrompt)
    await OpenAiService.generateDalleImage(shirtPrompt)
    // Generate alternate shirt design images
    await OpenAiService.generateDalleImage(socksPrompt)
    await OpenAiService.generateDalleImage(socksPrompt)
    // Generate alternative sneaker design images
    await OpenAiService.generateDalleImage(sneakersPrompt)
    await OpenAiService.generateDalleImage(sneakersPrompt)
}


/* Mic Check */
// micChecks()

/* Roast Image */
// roastImage()

/* Outfit Variants */
// outfitVariants()