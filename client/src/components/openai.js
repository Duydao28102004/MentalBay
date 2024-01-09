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
    'how',
    'nervous',
    'phobia',
    'panic',
    'lonely',
    'hopeless',
    'helpless',
    'worthless',
    'fatigue',
    'insomnia',
    'appetite',
    'concentration',
    'self-harm',
    'self-esteem',
    'therapy',
    'medication',
    'counseling',
    'suicidal',
    'grief',
    'loss',
    'relationship',
    'trauma',
    'obsessive-compulsive disorder',
    'ocd',
    'self-care',
    'self-love',
    'love',
    'loves',
    'hurt',
    'harm',
    'autism',
    'diagnosis',
    'cause',
    'treatment',
    'condition',
    'effect',
    'side effect',
    'improvement',
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

  // Combine the constraints using logical OR
  return hasMentalHealthKeyword || hasMentalHealthPattern || isMentalHealthQuestionForm;
}


export async function sendUserQuestion(question) {
  try {
    // Check if the question is related to mental health
    if (!isMentalHealthQuestion(question)) {
      return 'I am here to help with mental health-related questions. Please ask me about mental health topics.';
    }

    // Determine dynamic max_tokens based on the length of the user's question
    const maxTokens = Math.min(150, Math.ceil(question.length * 0.1));

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that specializes in mental health. You should only reply to questions related to mental health' },
        { role: 'user', content: question },
      ],
      temperature: 0.5,
      max_tokens: maxTokens,
      presence_penalty: 0.7,
      frequency_penalty: 0.7,
      
    });

    // Extract and return the generated text from the OpenAI response
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return 'I apologize, but I encountered an issue. Please try asking your question again.';
  }
}