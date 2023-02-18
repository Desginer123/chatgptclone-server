import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Configuration, OpenAIApi} from "openai";
const configuration = new Configuration({
    organization: "org-GbLMg4RhsXc3ClODecgJIKdn",
    apiKey: "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",
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
            max_tokens: 150,
            temperature: 0.8,
        },
        {
            headers: {
                'Authorization': `Bearer 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`,
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
