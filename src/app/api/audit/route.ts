import { NextRequest, NextResponse } from 'next/server';
import { auditSmartContract } from '@/lib/gemini';

const AUDIT_PROMPT = `You are a world-class smart contract auditor. Analyze the following smart contract code for vulnerabilities, bugs, gas inefficiencies, and security issues. Reference the latest research, best practices, and findings from top security blogs (e.g., Trail of Bits, ConsenSys Diligence, OpenZeppelin, Paradigm, CertiK, PeckShield, SlowMist, Immunefi, and others). For each issue, provide:
- A clear description of the vulnerability or issue
- The risk level (Critical, High, Medium, Low, Informational)
- The affected code section (line numbers if possible)
- A recommended fix or mitigation
- References to relevant research or blog posts
- A summary of the contract's overall security posture
`;

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Smart contract code is required.' }, { status: 400 });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured.' }, { status: 500 });
    }
    const geminiResponse = await auditSmartContract(code, AUDIT_PROMPT, apiKey);
    return NextResponse.json({ result: geminiResponse });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Invalid request.' }, { status: 400 });
  }
} 