import fs from 'fs'
import path from 'path'
import { Constants } from './Constants.js'
import { OpenAI } from 'openai'

const openAi = new OpenAI({apiKey: Constants.apiKey})

export class OpenAiService {
    
    static textToSpeech = async (prompt, voiceOption, fileName) => {
        
        // Audio file path
        const speechFile = path.resolve(`./audio/${fileName}.mp3`)

        console.log(`Generating ${fileName} audio...`)

        // Generate mp3 file
        const mp3 = await openAi.audio.speech.create({
            model: 'tts-1-hd',
            voice: voiceOption, // TODO: Get voice options
            input: prompt
        })
        
        // Save mp3 to audio file path
        const buffer = Buffer.from(await mp3.arrayBuffer())
        await fs.promises.writeFile(speechFile, buffer)
    }

    static getImageDescription = async (imageUrl, prompt) => {
        // Pass image url to GPT-4 Vision and get description
        const result = await openAi.chat.completions.create(requestOptions(imageUrl, prompt))
        console.log(result.choices[0].message.content)
        return result.choices[0].message.content
    }

    static generateDalleImage = async (prompt) => {
    
        // Generate Dall-E Image
        const dalleImageResponse = await openAi.images.generate({
            prompt: prompt,
            model: 'dall-e-3',
            quality:'hd',
            n:1,
            size: '1024x1024'
        })
        
        // Print Response Payload
        console.log(dalleImageResponse)
        return dalleImageResponse
    }

    static generateDalleImage = async (prompt) => {
    
        // Generate Dall-E Image
        const dalleImageResponse = await openAi.images.generate({
            prompt: prompt, // Image description
            model: 'dall-e-3',
            quality:'hd',
            n:1,
            size: '1024x1024'
        })
        // Print Dall-E Response
        console.log(dalleImageResponse)
        return dalleImageResponse
    }
}

const requestOptions = (imageUrl, prompt) => {

    // Configure request options with image and prompt
    return {
        model: 'gpt-4-vision-preview',
        max_tokens:500,
        messages: [{
            role: 'user',
            content: [{
            type: 'image_url',
            image_url: {
                url: imageUrl
            }
            },
            {
                type: 'text',
                text:prompt,
            }],
        }]
    }
}
