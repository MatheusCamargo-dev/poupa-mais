// Create: Model.create() ou new Model() seguido de model.save()
// Read: Model.find(), Model.findOne(), Model.findById()
// Update: Model.updateOne(), Model.updateMany(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
// Delete: Model.deleteOne(), Model.deleteMany(), Model.findOneAndDelete(), Model.findByIdAndDelete()

const submit = async (text: string) => {
  try {
    const prompt = `Melhore o texto: ${text}`;
    console.log(prompt);
    const data = await fetch(
      `https://api.openai.com/v1/engines/text-davinci-003-playground/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TOKEN_CHAT_GPT}`
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.22,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      }
    );

    const output = await data.json();
    return output;
  } catch (e) {
    console.error(e);
  }
};
const chatGPTController = {
  submit
};

export default chatGPTController;
