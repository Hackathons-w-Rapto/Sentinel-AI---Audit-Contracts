const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function auditSmartContract(code: string, prompt: string, apiKey: string): Promise<any> {
  const body = {
    contents: [
      { parts: [ { text: prompt + '\n\n' + code } ] }
    ]
  };

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.statusText}`);
  }
  return res.json();
} 