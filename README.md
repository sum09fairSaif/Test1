# connectHer🧘‍♀️ 
<img width="1920" height="458" alt="connectHer-logo" src="https://github.com/user-attachments/assets/79f26e37-10ff-4951-888c-943563f05919" />

A personalized prenatal fitness platform that matches pregnant women with safe workouts based on their daily symptoms and energy levels.
## Purpose Statement

Women in their first or second-trimester of pregnancy face significant anxiety and stigma around exercise, often avoiding physical activity out of fear of harming their baby despite evidence that safe exercise is beneficial. 
connectHer provides personalized workout recommendations based on how the user feels each day using their specific symptoms, energy levels, and emotional state. 
By meeting women where they are physically and mentally, our team empowers them to stay active safely during the most uncertain phase of pregnancy when support and reliable information are hardest to find.

## Features

* **Daily check-in** - Quick assessment of symptoms (nausea, fatigue, dizziness), mood, and energy level
* **Smart workout matching** - Platform recommends 5-15 minute first-trimester-safe workouts based on the user's current state
* **Curated video library** - Pre-vetted exercises across intensity levels (gentle stretching to moderate strength training)
* **Safety-first design** - All workouts are by certified instructors and catered to the first trimester with clear modifications and rest encouragement
* **Removes guesswork** - Eliminates the "is this safe?" anxiety that keeps pregnant women sedentary
* **Builds healthy habits** - Encourages day-to-day movement adapted to the fluctuating reality of early pregnancy

## Tech Stack

**Frontend:** React + TypeScript + Vite  
**Backend:** Node.js + Express + TypeScript  
**Database:** PostgreSQL (via Supabase)  
**Auth0:** User Authentication for User Login/Account Creation   
**AI:** Gemini API for intelligent recommendations  
**ElevenLabs + OpenAI:** Voice agent API for users to navigate the website in five other languages

## Get Started

### Prerequisites
- Node.js (v18+)
- Supabase account
- Gemini API key

### Quick Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   
   cd ../backend
   npm install
   ```

2. **Set up environment variables**
   
   Frontend `.env` (in `frontend/` folder):
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   
   Backend `.env` (in `backend/` folder):
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_KEY=your-service-key
   GEMINI_API_KEY=your-gemini-key
   PORT=3000
   ```

3. **Set up the database**
   - Go to Supabase Dashboard → SQL Editor
   - Run supabase_schema_with_enums.sql
   - Run seed_workouts_with_enums.sql

4. **Run the app**
   ```bash
   # Frontend (terminal 1)
   cd frontend
   npm run dev
   
   # Backend (terminal 2)
   cd backend
   npm run dev
   ```
## Safety

⚠️ **Important Disclaimer** 

connectHer is an informational tool and not a substitute for professional medical advice. Always consult a healthcare provider before starting any exercise program during pregnancy.

All workout recommendations are:
- Evaluated for first-trimester safety
- Include modifications for different symptom severities
- Encourage rest when needed
- Focus on low-impact, pregnancy-safe movements

## Future Additions

- [ ] Extend to 2nd and 3rd trimester
- [ ] Track workout completion history
- [ ] Progress analytics and insights
- [ ] Community features (share experiences)
- [ ] Integration with healthcare providers
- [ ] Push notifications for daily check-ins
- [ ] Wearable device integration

## Our Lovely Team! 👥

Built by women for women. Navigating the uncertainty of early pregnancy.

Team: Sumehra, Scar, Salena, Kaylee, & Agrima

---
Hack Beanpot 2026 (Feb 13-14) — Boston, MA
