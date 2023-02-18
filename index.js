import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Configuration, OpenAIApi} from "openai";
const apikey = "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"
const configuration = new Configuration({
    organization: "org-5hixOwK40DjyoIfTt8rNO6SQ",
    apiKey: apikey,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
    const {message} = req.body;
    try {
        const aiResponce = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 1500,
            temperature: 0.8,
        },
        {
            headers: {
                'Authorization': 'Bearer ' + apikey
            }
        });
        res.json({message: aiResponce.data.choices[0].text});
    } catch (error) {
        console.error(error) // from creation or business logic
        res.json({message: 'error'});
    }
    
   
});

app.listen(port, (err, res) => {
    console.log(`Server is listening on ${port}`);
});
