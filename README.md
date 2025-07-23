# Sentinel-AI Smart Contract Auditor Backend

## API Endpoint

### POST `/api/audit`

Submit smart contract code for automated auditing using Google Gemini 1.5 Flash.

#### Request Body
```json
{
  "code": "<your smart contract code as a string>"
}
```

#### Response
- On success:
```json
{
  "result": { /* Gemini API response with vulnerabilities, fixes, and analysis */ }
}
```
- On error:
```json
{
  "error": "<error message>"
}
```

## Environment Variables

Create a `.env.local` file in the project root with:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

## Prompt Engineering
The backend uses an extensive prompt referencing best practices and research from:
- Trail of Bits
- ConsenSys Diligence
- OpenZeppelin
- Paradigm
- CertiK
- PeckShield
- SlowMist
- Immunefi
- And more

The prompt instructs Gemini to:
- Identify vulnerabilities, bugs, and gas inefficiencies
- Assign risk levels
- Suggest fixes
- Reference research/blogs
- Summarize the contract's security posture
