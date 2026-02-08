import { GoogleGenerativeAI } from "@google/generativeai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const KNOWLEDGE_BASE = `
CONTEXT: Foundations of Marketing & Entrepreneurship.
CORE DATA:
- Marketing vs Selling: Marketing focuses on customer needs; Selling focuses on the product/cash.
- Supply & Demand: Equilibrium in perfect competition results in zero price differentiation.
- Resource-Based Model: Tangible (physical) vs Intangible (reputation, human capital). Core Competency must be hard to imitate.
- PESTDN: Political (Legislation, Sugar Tax), Economic (Purchasing power, Inflation), Social (Lifestyle shifts, Lack of time), Technological (Accelerated replacement rate), Demographic (Age, Migration), Natural (Green legislation).
- Porter's 5 Forces: Buyer power, Supplier power, Substitutes, New entrants, Intensity of rivalry.
- SWOT: Internal (Strengths/Weaknesses) vs External (Opportunities/Threats).
- Business Models: Razor-Blade (Lock-in), Long Tail (Niche hits), Tesla (Direct to consumer), Rolls Royce (Servitization), Subscription (Retention/Binge).
- Holistic Marketing: Internal (Staff motivation), Integrated (Synergy), Relationship (Pareto 80/20, 5% retention = 25-95% profit), Performance (Social responsibility).
- 4P's (The 4 M's): Product (Features, Image), Price (Discounts, Credit), Place (Ordering convenience, Logistics), Promotion (PR, Ads, Sales Promo).
- Positioning: Perceptual maps (Quality/Price axes). Errors: Under, Over, Confused (lack of consistency), Pretentious.
- Satisfaction: Standard (Met expectations), WOW (Exceeded), Disappointment (Not met, 60% negative share).
- Maslow's Hierarchy: Physiological (Basic), Safety, Social, Esteem, Self-actualization.
- Communication Model: Message -> Noise -> Medium -> Receiver -> Feedback.
`;

export async function POST(req) {
  try {
    const { businessDescription } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a Socratic Marketing Expert. Use ONLY this knowledge: \${KNOWLEDGE_BASE}. 
    Analyze this user business: \${businessDescription}. 
    Provide a professional HTML output with: 
    1. Checklist of curriculum coverage.
    2. Socratic Questions & Answers with logical reasoning for each marketing unit.
    3. Integration of all business models and 4P's.
    4. Highlight lecturer emphasis on consistency and hard-to-imitate features.
    Language: Hebrew.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return new Response(JSON.stringify({ html: response.text() }), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}