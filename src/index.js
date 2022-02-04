const getMP3Duration = require('get-mp3-duration')
const pdf = require('pdf-parse')
const { getVideoDurationInSeconds} = require('get-video-duration')
var Readable = require('stream').Readable


module.exports = { 
    getDuration  : async (buffer, extesion) => {
        try {
            let duration = 0
            switch (extesion) {
                case "mp3":
                    duration = getMP3Duration(buffer)   
                break;
                case "pdf":
                    const pdfParse = await pdf(buffer)
                    duration = (pdfParse.text.split(" ").length / 130) * 60
                break;
                case "mp4":
                case "mov":
                case "m4v" : 
                    let stream = new Readable()
                    stream.push(buffer)
                    stream.push(null)
                    duration =  await getVideoDurationInSeconds(stream)
                default:
                    break;
            }
            return duration    
        } catch (error) {
            
        }
    }

}


