import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

function isMentalHealthQuestion(question) {
  // Normalize the question to lowercase for case-insensitive comparison
  const normalizedQuestion = question.toLowerCase();

  // Check if the question contains specific keywords related to mental health
  const mentalHealthKeywords = [
    'hello',
    'hi',
    'how',
    'who',
    'what',
    'mental',
    'emotional',
    'well-being',
    'stress',
    'anxiety',
    'depress',
    'bipolar disorder',
    'post-traumatic stress disorder',
    'ptsd',
    'schizophrenia',
    'eating disorders',
    'disruptive behavior',
    'dissocial disorders',
    'neurodevelopmental disorders',
    'sad',
    'happy',
    'fear',
    'joy',
    'angry',
    'bipolar',
    'traumatic',
    'schizo',
    'eating',
    'disruptive',
    'dissocial',
    'neurodevelopmental',
    'sorrowful',
    'joyful',
    'fearful',
    'nervous',
  ];

  // Check if the question contains any of the mental health keywords
  const hasMentalHealthKeyword = mentalHealthKeywords.some(keyword => normalizedQuestion.includes(keyword));

  // Check for specific phrases or patterns that are common in mental health-related questions
  const hasMentalHealthPattern =
    /(?:how\s+to\s+cope\s+with|feeling\s+overwhelmed|manage\s+stress|improve\s+mental\s+health)/.test(normalizedQuestion);

  // Check for specific question forms that might indicate a mental health concern
  const isMentalHealthQuestionForm =
    /(how|what|why|when|where|can|should)\s+(to|do|I|you|we)\s*(feel|handle|manage|deal)\s*(better|with|stress|anxiety|depression)/.test(
      normalizedQuestion
    );

  // Add more constraints as needed based on your specific requirements

  // Combine the constraints using logical OR
  return hasMentalHealthKeyword || hasMentalHealthPattern || isMentalHealthQuestionForm;
}


export async function sendUserQuestion(question) {
  try {
    // Check if the question is related to mental health
    if (!isMentalHealthQuestion(question)) {
      return 'I am here to help with mental health-related questions. Please ask me about mental health topics.';
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that specializes in mental health. You should only reply to questions related to mental health' },
        { role: 'user', content: question },
      ],
      temperature: 0.5,
      max_tokens: 150,
      presence_penalty: 0.7,
      frequency_penalty: 0.7,
      
    });

    // Extract and return the generated text from the OpenAI response
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw error;
  }
}