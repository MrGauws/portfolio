"use client";

export const AboutSection = () => {
  return (
    <section id="about" className="flex justify-center items-center px-4">
      <div className="bg-zinc-800/30 backdrop-blur-md border border-zinc-700 text-white rounded-2xl shadow-lg p-10 max-w-4xl w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-accent">👨‍💻 Om mig</h2>

        <p className="text-md font-mono leading-relaxed text-gray-300">
          Jag heter <strong className="text-white">Herman Engström</strong> och är en nyexaminerad
          webbutvecklare från Grit Academy med ett brinnande intresse för att skapa smarta,
          moderna system – alltid med användaren i fokus. Med över 10 års erfarenhet inom
          bankvärlden har jag byggt upp en djup förståelse för kundbehov, kommunikation och
          problemlösning.
        </p>

        <p className="text-md font-mono leading-relaxed text-gray-300">
          Under utbildningen har jag arbetat med hela stacken: från användarvänliga gränssnitt i
          <strong> React</strong> och <strong>Next.js</strong> till skalbara backendlösningar med
          <strong> Node.js</strong> och <strong>MongoDB</strong>. Jag har dessutom byggt projekt med
          autentisering, API-hantering, containerisering via Docker och deployment till molnet.
        </p>

        <p className="text-md font-mono leading-relaxed text-gray-300">
          Jag kombinerar teknisk förståelse med hög social kompetens – och är utvecklaren som gärna
          kavlar upp ärmarna, oavsett om det gäller kod, UX eller samarbete.
        </p>

        <ul className="list-disc pl-5 text-gray-300 font-mono text-sm space-y-1">
          <li>🔧 Programmering: JavaScript, TypeScript, React, Node.js, PHP, C#, Python</li>
          <li>🛠️ DevOps & verktyg: Git, Docker, Linux, AWS, PowerShell</li>
          <li>🗃️ Databaser: MongoDB, SQL</li>
          <li>🧩 CMS & e-handel: WordPress, Shopify</li>
          <li>🌍 Språk: Svenska, Engelska, flera nordiska/europeiska grunder</li>
        </ul>

        <div className="text-center pt-4">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 rounded bg-accent text-black font-semibold hover:bg-teal-500 transition"
          >
            📄 Ladda ner mitt CV
          </a>
        </div>
      </div>
    </section>
  );
};