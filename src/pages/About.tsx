export default function About() {
return (
<div className="relative overflow-hidden bg-[#4b1018] text-[#f2e4ca]">

  {/* subtle background texture */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.18]"
    style={{
      backgroundImage:
        "radial-gradient(circle at 20% 20%, rgba(212,175,55,.22) 0 1px, transparent 1px), radial-gradient(circle at 80% 75%, rgba(242,228,202,.12) 0 1px, transparent 1px)",
      backgroundSize: "42px 42px, 58px 58px",
    }}
  />

  <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">

    {/* OUTER FRAME */}
    <div className="relative border border-[#d4af37]/45 p-3 md:p-5">

      {/* INNER FRAME */}
      <div className="relative border border-[#d4af37]/20">

        {/* Corner ornaments */}
        <div className="absolute left-3 top-3 h-16 w-16 border-l border-t border-[#d4af37]/70" />
        <div className="absolute right-3 top-3 h-16 w-16 border-r border-t border-[#d4af37]/70" />
        <div className="absolute bottom-3 left-3 h-16 w-16 border-b border-l border-[#d4af37]/70" />
        <div className="absolute bottom-3 right-3 h-16 w-16 border-b border-r border-[#d4af37]/70" />

        {/* ornamental corner marks */}
        <span className="absolute left-[18px] top-[18px] text-xs text-[#d4af37]">✦</span>
        <span className="absolute right-[18px] top-[18px] text-xs text-[#d4af37]">✦</span>
        <span className="absolute bottom-[18px] left-[18px] text-xs text-[#d4af37]">✦</span>
        <span className="absolute bottom-[18px] right-[18px] text-xs text-[#d4af37]">✦</span>


        <div className="px-5 py-16 md:px-14 md:py-20">

          {/* HERO */}
          <section className="relative text-center">

            <div className="mx-auto mb-8 flex items-center justify-center gap-4 text-[#d4af37]/70">
              <span className="h-px w-16 bg-current md:w-24" />
              <span className="text-sm">✦</span>
              <span className="h-px w-16 bg-current md:w-24" />
            </div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.5em] text-[#d4af37]/75">
              THE ART OF DISCOURSE
            </p>

            <h1
              className="font-hindi mt-6 text-5xl font-normal tracking-wide text-[#e2bc55] md:text-7xl"
              style={{ textShadow: "0 4px 25px rgba(0,0,0,.25)" }}
            >
              तर्कपीठ
            </h1>

            <p className="font-hindi mt-3 text-lg tracking-[0.22em] text-[#f2e4ca]/75">
              विचार • संवाद • अभिव्यक्ति
            </p>

            <div className="mx-auto mt-7 h-px w-24 bg-[#d4af37]/60" />

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.3em] text-[#f2e4ca]/45">
              Inter-School Hindi Debate Competition
            </p>

          </section>


          {/* INTRODUCTION — CREAM PANEL */}
          <section className="relative mx-auto mt-24 max-w-5xl">

            <div className="relative overflow-hidden bg-[#f2e4ca] px-7 py-12 text-[#4b1018] md:px-14 md:py-16">

              {/* decorative lines */}
              <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-[#b38b2c]/50" />
              <div className="absolute right-4 top-4 h-10 w-10 border-r border-t border-[#b38b2c]/50" />
              <div className="absolute bottom-4 left-4 h-10 w-10 border-b border-l border-[#b38b2c]/50" />
              <div className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-[#b38b2c]/50" />

              <div className="text-center">

                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#9c7628]">
                  01 — About the Competition
                </p>

                <div className="mx-auto my-7 flex items-center justify-center gap-3 text-[#b38b2c]">
                  <span className="h-px w-10 bg-current" />
                  <span className="text-[10px]">✦</span>
                  <span className="h-px w-10 bg-current" />
                </div>

                <p className="font-hindi mx-auto max-w-4xl text-lg leading-[2] text-[#4b2a25] md:text-xl md:leading-[2.15]">
                  <span className="font-semibold text-[#681d25]">
                    तर्कपीठ
                  </span>{" "}
                  दून इंटरनेशनल स्कूल द्वारा आयोजित अंतरविद्यालयी हिंदी वाद-विवाद समारोह है,
                  जो हिंदी भाषा की गरिमा, विचारों की विविधता और तर्क की प्रखरता का उत्सव मनाता है।
                  यह केवल एक प्रतियोगिता नहीं, बल्कि संवाद, चिंतन और अभिव्यक्ति के उस मंच की
                  परिकल्पना है जहाँ मतभेद विचार-विस्तार का माध्यम बनते हैं और शब्द विचारों को दिशा देते हैं।
                </p>

              </div>
            </div>

          </section>


          {/* EVENTS */}
          <section className="mt-24">

            <div className="mb-10 flex items-center gap-4">
              <span className="text-[9px] font-bold tracking-[0.35em] text-[#d4af37]/75">
                02
              </span>

              <span className="h-px flex-1 bg-[#d4af37]/20" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#f2e4ca]/40">
                THREE EXPRESSIONS
              </span>
            </div>


            <div className="grid gap-5 md:grid-cols-3">

              {/* KURUKSHETRA */}
              <div className="group relative overflow-hidden border border-[#d4af37]/30 bg-[#54131d] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/65 md:p-10">

                <div className="absolute right-5 top-5 text-[9px] tracking-[0.2em] text-[#d4af37]/45">
                  01
                </div>

                <div className="mb-9 text-[#d4af37]/70">
                  <svg
                    viewBox="0 0 80 80"
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M18 18 Q40 40 18 62" />
                    <path d="M18 18 Q40 40 62 18" opacity=".4" />
                    <path d="M18 62 Q40 40 62 62" opacity=".4" />
                    <path d="M24 40 H66" />
                    <path d="M66 40 L57 34" />
                    <path d="M66 40 L57 46" />
                  </svg>
                </div>

                <h2 className="font-hindi text-3xl text-[#e2bc55]">
                  कुरुक्षेत्र
                </h2>

                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f2e4ca]/45">
                  संसदीय वाद-विवाद
                </p>

                <div className="my-7 h-px w-10 bg-[#d4af37]/60 transition-all duration-500 group-hover:w-20" />

                <p className="font-hindi text-base leading-8 text-[#f2e4ca]/70">
                  त्वरित चिंतन और
                  <br />
                  तार्किक प्रत्युत्तर
                </p>

              </div>


              {/* GYAN VAHINI */}
              <div className="group relative overflow-hidden border border-[#b38b2c]/30 bg-[#f2e4ca] p-8 text-[#4b1018] transition-all duration-500 hover:-translate-y-1 hover:border-[#b38b2c]/70 md:p-10">

                <div className="absolute right-5 top-5 text-[9px] tracking-[0.2em] text-[#9c7628]/50">
                  02
                </div>

                <div className="mb-9 text-[#8c6a32]">
                  <svg
                    viewBox="0 0 80 80"
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M14 25 Q27 17 40 25 V63 Q27 55 14 63 Z" />
                    <path d="M66 25 Q53 17 40 25 V63 Q53 55 66 63 Z" />
                    <path d="M40 25 V63" />
                    <path d="M21 34 Q30 31 36 35" />
                    <path d="M59 34 Q50 31 44 35" />
                  </svg>
                </div>

                <h2 className="font-hindi text-3xl text-[#681d25]">
                  ज्ञानवाहिनी
                </h2>

                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6b5144]/65">
                  पारंपरिक वाद-विवाद
                </p>

                <div className="my-7 h-px w-10 bg-[#b38b2c]/60 transition-all duration-500 group-hover:w-20" />

                <p className="font-hindi text-base leading-8 text-[#6b3b2d]">
                  सुविचारित पक्ष-विपक्ष और
                  <br />
                  विषय की गहराई
                </p>

              </div>


              {/* SWARANJALI */}
              <div className="group relative overflow-hidden border border-[#d4af37]/30 bg-[#54131d] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/65 md:p-10">

                <div className="absolute right-5 top-5 text-[9px] tracking-[0.2em] text-[#d4af37]/45">
                  03
                </div>

                <div className="mb-9 text-[#d4af37]/70">
                  <svg
                    viewBox="0 0 80 80"
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="28" y="12" width="24" height="38" rx="12" />
                    <path d="M19 41 C19 57 29 64 40 64 C51 64 61 57 61 41" />
                    <path d="M40 64 V73" />
                    <path d="M30 73 H50" />
                  </svg>
                </div>

                <h2 className="font-hindi text-3xl text-[#e2bc55]">
                  स्वरांजलि
                </h2>

                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f2e4ca]/45">
                  भाषण प्रतियोगिता
                </p>

                <div className="my-7 h-px w-10 bg-[#d4af37]/60 transition-all duration-500 group-hover:w-20" />

                <p className="font-hindi text-base leading-8 text-[#f2e4ca]/70">
                  प्रभावशाली वक्तृत्व और
                  <br />
                  विचारों की सशक्त अभिव्यक्ति
                </p>

              </div>

            </div>

          </section>


          {/* PHILOSOPHY — CREAM STRIP */}
          <section className="mx-auto mt-24 max-w-5xl">

            <div className="border-y border-[#d4af37]/25 bg-[#f2e4ca] px-7 py-12 text-[#4b1018] md:px-14 md:py-14">

              <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold tracking-[0.35em] text-[#9c7628]">
                  03
                </span>

                <span className="h-px flex-1 bg-[#b38b2c]/25" />

                <span className="text-[9px] uppercase tracking-[0.35em] text-[#6b5144]/50">
                  OUR PHILOSOPHY
                </span>
              </div>

              <div className="mx-auto mt-9 max-w-4xl border-l-2 border-[#b38b2c]/50 pl-6 md:pl-10">

                <p className="font-hindi text-lg leading-[2] text-[#4b2a25] md:text-xl md:leading-[2.1]">
                  यह आयोजन विद्यार्थियों को केवल बोलने का अवसर नहीं देता,
                  बल्कि{" "}
                  <span className="font-semibold text-[#681d25]">
                    सुनने, सोचने, तर्क करने और असहमति का सम्मान करते हुए संवाद स्थापित करने
                  </span>{" "}
                  की संस्कृति से जोड़ता है। यहाँ हिंदी केवल अभिव्यक्ति का माध्यम नहीं,
                  बल्कि विचार, विवेक और सृजन की शक्ति बनकर सामने आती है।
                </p>

              </div>

            </div>

          </section>


          {/* DINKAR */}
          <section className="relative mx-auto mt-24 max-w-4xl text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-[#d4af37]/60">
              IN HONOUR OF RASHTRAKAVI DINKAR
            </p>

            <div className="mx-auto mt-8 border-y border-[#d4af37]/20 py-12">

              <p className="font-hindi text-xl italic leading-[2] text-[#f2e4ca]/85 md:text-2xl md:leading-[2.1]">
                "क्षमा शोभती उस भुजंग को, जिसके पास गरल हो,
                <br />
                उसको क्या जो दंतहीन, विषरहित, विनीत, सरल हो।"
              </p>

              <p className="mt-6 text-xs tracking-[0.18em] text-[#f2e4ca]/40">
                — राष्ट्रकवि श्री रामधारी सिंह 'दिनकर'
              </p>

            </div>

          </section>


          {/* CLOSING */}
          <section className="mt-24 border-t border-[#d4af37]/20 pt-14 text-center">

            <div className="mx-auto mb-8 flex items-center justify-center gap-4 text-[#d4af37]/65">
              <span className="h-px w-16 bg-current" />
              <span>✦</span>
              <span className="h-px w-16 bg-current" />
            </div>

            <p className="font-hindi text-2xl leading-[1.9] text-[#e2bc55] md:text-3xl md:leading-[2]">
              तर्कपीठ — जहाँ शब्दों को स्वर मिलता है,
              <br />
              तर्क को दिशा और विचारों को मंच।
            </p>

          </section>

        </div>
      </div>
    </div>
  </div>
</div>

);
}