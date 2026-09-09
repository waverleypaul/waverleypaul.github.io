/*
  SINGLE SOURCE OF TRUTH FOR ALL INSIGHTS.
  Add a new insight by copying an object below and filling it in — it will
  automatically appear on: the homepage (latest 3), the Insights archive
  (with category filtering), and the matching Learning Hub subtopic under
  Emerging Developments (latest 2 per subtopic, oldest rolling off).

  MODEL: the homepage/archive entry (title, summary, sourceUrl) is a hook
  pointing at an EXTERNAL paper. The Learning Hub side is no longer a
  summary/commentary on that paper — it's a teaser ("hubPreview") for a piece
  of ORIGINAL material you create (a blog note, a chart, an infographic)
  that the paper merely inspired.

  ============================================================
  QUICK REFERENCE — four scenarios, and exactly where to stop
  ============================================================
  Every entry starts with the same six fields, always:
    id → date → dateSort → title → summary → category
  What you add AFTER category determines which of the four scenarios below
  you're in. Find your scenario, add exactly those fields, and stop —
  anything past that point belongs to a different scenario.

  ── SCENARIO 1 — Insight-only. Never touches the Learning Hub. ──────────
    Add:      sourceUrl
    Stop.     Do NOT add hubTeaser or subtopic — their mere presence is
              what pulls a piece toward the Learning Hub below.
    Example:  "AI-adoption-risks-2026-07" further down this file.

  ── SCENARIO 2 — On the homepage now; Learning Hub piece PLANNED but ────
  ── not written yet. Teaser text shows, but no clickable link yet.  ────
    Add:      sourceUrl, hubTeaser (recommended — this is what shows on
              the homepage card even before the link is ready), subtopic
              (routes it to the right Learning Hub stack once it's ready),
              hubLinkReady: false
    Stop.     Do NOT add hubTitle, hubPreview, fullArticlePdf,
              fullArticleFile, or kitFormUid yet — those all get added in
              one batch, together, when you move this piece to Scenario 3.
              hubLinkReady: false hides ONLY the "Click for a broader
              perspective" link — the hubTeaser paragraph above it still
              shows as normal, since that's homepage-only content and is
              fine to display even before the Learning Hub side is ready.
    Example:  "cash-in-use" further down this file.

  ── SCENARIO 3 — On the homepage AND fully linked to a ready ────────────
  ── Learning Hub piece.                                      ────────────
    Add:      sourceUrl, hubTeaser, subtopic, hubTitle (optional),
              hubPreview (optional — falls back to summary),
              hubDate + hubDateSort (optional pair — only needed if the
              Learning Hub piece was finished/posted on a different date
              than the homepage Insight; otherwise skip, and "date" is
              used for both),
              THEN pick exactly ONE delivery mechanism:
                fullArticlePdf   (recommended default — plain PDF link)
                fullArticleFile  (only if you want native styled HTML)
                kitFormUid       (email-gated; add gateLabel/gatedExcerpt
                                  only if using this option)
    Note:     If this piece was previously in Scenario 2, this is also the
              moment to DELETE its hubLinkReady: false line — leaving it in
              place keeps hiding the link even once everything else here
              is ready.
    Example:  "CBDC-Note-2026-07" further down this file.

  ── SCENARIO 4 — Learning-Hub-only. No homepage/archive presence ────────
  ── at all (a piece that only makes sense inside one Learning Hub topic).
    Add:      learningHubOnly: true, subtopic (required — without it the
              piece would show nowhere at all), hubTitle (optional),
              hubPreview (optional — falls back to summary), then one
              delivery mechanism as in Scenario 3.
    Skip:     hubTeaser and hubLinkReady — neither does anything once
              learningHubOnly is true, since the homepage/archive card
              they'd attach to never renders in the first place.
              sourceUrl is still fine to include if there's a real external
              paper worth citing — it just won't be shown anywhere, since
              there's no homepage card to put a "Read the full paper" link
              on.

  FIELD ORDER — matches the order below, deliberately:
    id → date → dateSort → title → summary → category → hubTeaser → sourceUrl
    is everything you need for a piece that only appears on the homepage and
    Insights archive (no Learning Hub connection). If that's all a new piece
    needs, fill in through sourceUrl and stop — skip hubTeaser too if there's
    no Learning Hub tie-in at all.
    Everything AFTER sourceUrl (learningHubOnly, subtopic, hubLinkReady,
    hubTitle, hubPreview, fullArticlePdf, fullArticleFile, kitFormUid,
    gateLabel, gatedExcerpt) only matters once you set "subtopic" — that's
    what pushes a piece into the Learning Hub as well.

  FIELDS
  - id:        unique slug, lowercase-hyphenated, never reused
  - date:      display text, e.g. "July 2026"
  - dateSort:  "YYYY-MM-DD" — used only for sorting, always zero-padded. Use
               a real day whenever you can (even a rough guess), not just the
               month — several pieces published in the same month will tie
               on a month-only value, and the tiebreak then falls back to
               array order (see the note in insights-render.js), which is a
               safety net, not a substitute for an accurate date. "YYYY-MM"
               still works on its own (it compares fine against day-level
               values) but is no longer the recommended format
  - title:     the headline — write this as a hook, not a restatement of the
               external paper's own title.
  - summary:   2-3 sentences — shown on the homepage and the Insights archive.
               Write for the non-technical reader FIRST: most visitors won't
               click through to the source paper, so the opening sentence(s)
               need to carry the actual "so what does this mean for my
               business" takeaway on their own, in plain language, not a
               restatement of the paper's own framing (avoid phrasing like
               "This IMF Note presents a framework..." or naming the paper's
               authors/title in the summary itself, since that's the
               technical reader's territory, not the plain-language reader's).
               The clamp shows roughly the first 3 lines before "Read more"
               — put the plain-language takeaway there, and use the text
               that follows (revealed by "Read more") for one layer deeper,
               still in plain language, not a second, denser register.
               Readers who do want the primary source have the "Prefer the
               primary source? Read the full paper" link in the same card
               (see sourceUrl below) — the summary itself doesn't need to
               do that job.
               Renders as HTML: use <strong>...</strong> or <em>...</em> to
               bold/italicise a phrase. For a real second paragraph, wrap
               each one in its own <p>...</p> tag (e.g. "<p>First
               point.</p><p>Second point.</p>") rather than typing a raw
               paragraph break — plain text with no <p> tags still works
               exactly as before, so nothing existing needs to change.
  - category:  one of: "financialStability" | "macroprudential" | "panelData"
               | "dataDecisions"
  - hubTeaser: REQUIRED whenever "subtopic" (below) is set — otherwise leave
               it out entirely. One sentence, written to the reader, naming
               the specific connection — e.g. "This paper also speaks to how
               digitalisation is reshaping financial stability risk." This
               is what the reader sees on the HOMEPAGE/archive, before
               deciding to click through to the Learning Hub — make it
               specific to this piece, not generic.
               Fine to write this in advance during Scenario 2 (subtopic
               set, hubLinkReady: false) — it shows right away in that
               case; only the clickable link stays hidden until
               hubLinkReady is removed.
  - sourceUrl: link to the external paper. Used ONLY on the homepage/Insights
               archive as the "Read the full paper →" link — no longer
               auto-linked anywhere in the Learning Hub box.

  — fields below this line only apply once "subtopic" is set —

  - learningHubOnly: OPTIONAL, boolean, default false. Set to "true" for a
               piece that should appear ONLY in its Learning Hub subtopic —
               it will be completely excluded from the homepage's latest-3
               list and from the full Insights archive (and won't count
               toward that page's category pills/counts either). Requires
               "subtopic" to be set — otherwise the piece would show nowhere
               at all. Leave omitted (or explicitly "false") for the normal
               case, where a piece appears everywhere its other fields say it
               should.
  - subtopic:  OPTIONAL. Include it only if this piece should also appear in
               the Learning Hub's Emerging Developments section under the
               matching subtopic. Omit it entirely for an Insights-only piece
               (still shows on the homepage and the Insights archive — just
               won't be pushed into any Learning Hub subtopic, and shows no
               Learning Hub link at all).
               When included, it must match one of the keys listed below.
  - hubLinkReady: OPTIONAL, boolean, default true (so every existing entry
               keeps working exactly as before without needing this field
               at all). Set to "false" while "subtopic" is already assigned
               but the actual Learning Hub piece (hubTitle/hubPreview/
               delivery mechanism) hasn't been written yet — this is
               SCENARIO 2 above. With it set to false, the homepage/archive
               card hides ONLY the "Click for a broader perspective" link —
               the hubTeaser paragraph still shows as normal, since that
               text is homepage-only content and is fine to display even
               before the Learning Hub side is ready. This is what lets
               visitors know a piece connects to a broader topic without
               sending them to a Learning Hub stack item that isn't
               actually ready yet. The piece still correctly slots into its
               Learning Hub subtopic's stack in the meantime (showing just
               the free Preview text, same as any entry with a subtopic but
               no delivery mechanism set) — this flag only ever affects the
               link on the HOMEPAGE/archive side.
               Once the Learning Hub piece is genuinely ready, DELETE this
               line entirely (simplest) or set it to "true" — either way,
               the link reappears on the homepage/archive with no other
               change needed.
  - hubTitle:  OPTIONAL. The headline shown in the Learning Hub's "Further
               Insights" box, in place of "title". Use this when the
               original piece deserves its own headline distinct from the
               homepage/archive hook — since "title" is written as a hook
               for the EXTERNAL paper, while the Learning Hub box is about
               YOUR original piece, the two don't always want the same
               words. If omitted, "title" is reused here as a fallback.
  - hubPreview: OPTIONAL. The enticing text shown in the Learning Hub box
               under the bold "Preview:" label. Renders as HTML, same as
               "summary" above — <strong> and <em> work for bolding/
               italicising a phrase, and wrapping separate <p>...</p> tags
               gives you real paragraph breaks.
               This is NOT a summary of the external paper — it's the
               hook for your own original piece. Give the reader a
               genuinely good overview — there's no length limit here (no
               truncation, no character cap), so use as much space as the
               piece actually needs. If omitted, "summary" is reused here
               as a fallback.
               To cite the external paper, do it inline as a plain sentence
               within this text (e.g. "...building on a recent BIS Bulletin
               on AI-driven cyber risk, we mapped...") — you can embed a raw
               <a href="..."> tag directly, since this field renders as HTML.
  - hubDate:   OPTIONAL. Display text for the date shown in the Learning Hub
               box (e.g. "September 2026"), separate from "date" above.
               Use this whenever the Learning Hub piece is finished and
               posted on a different date than the homepage/archive Insight
               that pointed to it — which is common, since the homepage
               Insight is usually quick to write, while the Learning Hub
               piece is the longer original article and often takes longer
               to finish. If omitted, "date" is reused here as a fallback
               (the old behaviour, for every entry that doesn't need this
               distinction).
  - hubDateSort: OPTIONAL. Same relationship to hubDate as dateSort has to
               date — "YYYY-MM-DD", used only for sorting entries WITHIN a
               Learning Hub subtopic's stack (newest-first, latest 2 shown).
               Set this alongside hubDate whenever you set hubDate, so the
               Learning Hub stack sorts by the date the ARTICLE actually
               went up, not the date the homepage Insight did — otherwise a
               piece could be sorted incorrectly relative to other Learning
               Hub pieces despite showing the right date text. If omitted,
               dateSort is reused here as a fallback.
               Note this only affects ordering inside the Learning Hub
               subtopic stack — the homepage and Insights archive always
               sort by plain dateSort, regardless of hubDateSort.
  - fullArticlePdf: OPTIONAL. Path to a PDF (relative to the site root, e.g.
               "resources/insights/pdfs/cbdc-2026-07.pdf") — usually just
               the original document you already have, as-is. RECOMMENDED
               DEFAULT for an ungated piece: no reformatting into HTML, no
               separate image files to manage — whatever PDF you already
               wrote is what gets hosted. When set, the Learning Hub box
               shows the free Preview text as usual, then a plain "Read the
               full article (PDF) →" link that opens the PDF in a new tab.
               This is also the exact URL to share directly on LinkedIn or
               anywhere else — one file, both destinations.
               Takes precedence over BOTH fullArticleFile and kitFormUid if
               more than one is set on the same entry (see the on/off-switch
               note under fullArticleFile below, which works the same way
               here — delete this field later, leaving kitFormUid as-is, to
               switch the entry back to gated).
  - fullArticleFile: OPTIONAL — and only worth reaching for instead of
               fullArticlePdf above if you specifically want the piece to
               render as native, styled page content (matching fonts/
               colours) rather than a PDF.
               Path to a separate HTML file (relative to the site root, e.g.
               "resources/insights/articles/cbdc-2026-07.html") holding the
               COMPLETE text of your original piece, shown UNGATED — no
               email required. When set, the Learning Hub box shows the
               free Preview text as usual, then a "Read the full article →"
               button. Clicking it fetches that file's content on demand
               and reveals it inline, right there on the page — the file
               itself is never loaded until someone actually clicks.
               WHY A SEPARATE FILE rather than pasting the article text
               directly into this data file: this file (insights-data.js)
               is re-read and re-edited every time any entry changes, so
               keeping full article text out of it keeps this file small
               and easy to work with even after dozens of articles. Each
               article's HTML lives in its own small file instead.
               The file itself should hold ONLY the article body — a
               sequence of <p>, <h4>, <img>, <ul> etc. tags, no <html>,
               <head>, or <body> wrapper. Paragraph breaks need real
               <p>...</p> tags (not blank lines). Any images referenced
               inside it (e.g. <img src="resources/insights/...">) use
               paths relative to the SITE ROOT, not to the article file's
               own folder, since the fetched HTML is injected directly
               into the Learning Hub page.
               THIS TAKES PRECEDENCE OVER kitFormUid: if both are set on
               the same entry, the reader sees the ungated full article,
               not the email gate — kitFormUid is simply ignored for that
               entry while fullArticleFile is present. This is the
               deliberate on/off switch for gating a given piece: add
               fullArticleFile now to publish a piece freely while you're
               building an audience and credibility; delete the field
               later (leaving kitFormUid as-is) and that entry's gate
               reappears with nothing else to change.
               Leave omitted for the normal gated flow (or no delivery
               mechanism at all, if neither this nor kitFormUid/
               fullArticlePdf is set — the reader then just sees the
               Preview text with nothing beneath it).
  - kitFormUid: OPTIONAL. Set once you've actually built the original piece
               AND set up a Kit form + sequence to deliver it. This is the
               "data-uid" value from that form's INLINE embed snippet in Kit
               (Kit dashboard → your form → Embed → make sure the "Inline"
               tab is selected, not Toggle/Modal/WordPress) — it's what
               makes Kit's real signup form render directly under this
               entry, in place of the free Preview text alone, PROVIDED
               neither fullArticlePdf nor fullArticleFile is also set on
               the same entry (see the precedence notes on each above).
               Leave omitted while a topic's original piece doesn't exist
               yet — visitors just see the Preview text, no form.
               All entries can share the same kitFormUid (one form/sequence
               for everything) or use different ones per piece, if you set
               up separate Kit forms/sequences later.
  - Delivery:  when a piece IS actually gated (kitFormUid set, and no
               fullArticlePdf/fullArticleFile overriding it), write/paste
               the actual piece directly into the Kit email itself (in
               Kit's own automation/sequence editor) — attach the image,
               write the accompanying text right there. Nothing about the
               piece needs to live on this site at all in that case. This
               is simpler than hosting a separate page per piece, and it's
               also more private: since there's no public URL for the piece
               anywhere, there's nothing to leak — only someone who
               actually receives that specific email can see it.
  - gateLabel: OPTIONAL. Custom prompt text on the locked box, e.g. "Enter
               your email and we'll send the full infographic." Defaults to
               a generic "Enter your email and the full piece will be sent
               to you."
  - gatedExcerpt: OPTIONAL, only relevant when "kitFormUid" is also set. A
               sentence or two, LIFTED VERBATIM from the actual gated piece
               (the one you're delivering by email), rendered directly
               beneath the email signup box — blurred and faded so it's
               visually present but not actually readable. It's a "there's
               real content back here" cue, not something meant to be read;
               it's purely decorative (hidden from screen readers). Doesn't
               need to make sense out of context or avoid spoilers — since
               it's illegible, the exact wording barely matters, but pulling
               a real line from the piece (rather than writing new filler)
               keeps the effect honest. Leave omitted for no excerpt teaser
               (the gate box just ends after the email form, as before).
               Renders as HTML like summary/hubPreview above, but since the
               text is blurred, any bold/italic formatting won't be visible
               — plain text is simplest here.

  VALID category + subtopic PAIRS (must match Learning Hub subtopic ids):
    financialStability : cbdc | digitalAssets | cash
    macroprudential     : nbfi | systemicInterconnectedness
    panelData           : modelSelection | interpretingResults
    dataDecisions       : performanceMeasurement | decisionAnalytics
*/

const INSIGHTS = [
  {
    id: "AI-adoption-risks-2026-07",
    date: "July 2026",
    dateSort: "2026-07-01",
    title: "AI and Financial Stability: Balancing Innovation with Resilience",
    summary: "<p>AI is moving into everyday financial decision-making faster than the oversight built to manage it, and that gap is where the real risk sits. Institutions that build governance in from the start, rather than bolting it on after something goes wrong, are the ones best placed to benefit from AI without taking on risk they haven't priced in.</p><p>The IMF's broader message: oversight, not the technology itself, is what will determine whether AI strengthens or undermines financial resilience over time.</p>",
    category: "financialStability",
    // TEST CASE — Insight-only. No "subtopic" here on purpose (see further
    // down): this piece shows on the homepage and the Insights archive with
    // just a "Read the full paper" link, and does NOT appear anywhere in
    // the Learning Hub. If you'd rather test the opposite case — appearing
    // ONLY in the Learning Hub, hidden from the homepage/archive — that's
    // learningHubOnly: true, paired with a subtopic. Let me know and I'll
    // swap this entry to that instead, or set up a fresh one.
    sourceUrl: "#"
  },

  {
    id: "mythos-ai-cyber-risk-2026-07",
    date: "July 2026",
    dateSort: "2026-07-10",
    title: "Can AI become systemic cyber risk?",
    summary: "<p>The concern with AI in finance isn't just what happens if one firm's model fails, it's what happens when many institutions lean on the same handful of AI providers, models, or infrastructure at once. A BIS Bulletin looks at how that kind of shared reliance could turn an isolated AI problem into a system-wide one.</p><p>Even firms that manage their own AI responsibly can still be exposed if the wider market becomes dependent on the same small set of tools, since a single outage or flaw could then ripple across many institutions at the same time.</p>",
    category: "macroprudential",
    hubTeaser: " Explore how frontier AI is redefining cyber risk and what it could mean for the resilience of the financial system.",
    sourceUrl: "https://www.bis.org/publ/bisbull129.pdf",
    learningHubOnly: false,
    subtopic: "systemicInterconnectedness",
    // DRAFT — this still reads as commentary on the BIS paper rather than a
    // teaser for an original piece. Replace with a hook for whatever you
    // create (e.g. a visual on AI-related outage/incident trends), then add
    // fullArticlePdf/kitFormUid once that piece actually exists.
    hubPreview: "The increasing use of AI highlights why macroprudential policy focuses on safeguarding the stability of the financial system as a whole, rather than the safety of individual institutions. Even if individual firms manage AI responsibly, widespread reliance on similar models, shared infrastructure, or common technology providers can create vulnerabilities that extend across the financial system. Understanding these system-wide risks is essential as AI becomes more deeply embedded in financial services."
  },

  {
    id: "CBDC-Note-2026-07",
    date: "August 2026",
    dateSort: "2026-08-12",
    title: "CBDC Implementation: The Benefits Are In The Details",
    summary: "<p>Retail central bank digital currencies (CBDCs) are often pitched as a safer and more efficient form of digital money. Nevertheless, introducing a CBDC is not simply a matter of replacing cash with a digital alternative. The real question is whether it can improve the way payments and the financial system work without creating new risks. An IMF Note \"<em>Evaluating the Implications of CBDC for Financial Stability</em>\" explains that the answer depends on the details. <p>The way a CBDC is designed, how widely it is adopted, and the structure of a country's financial system all influence whether it strengthens payment systems, supports financial inclusion, and preserves financial stability.</p>",
    category: "financialStability",
    hubTeaser: "Although developed primarily for policymakers, the Note provides valuable information for anyone seeking to understand the relationship between retail CBDCs and financial stability.",
    sourceUrl: "https://www.imf.org/-/media/files/publications/ftn063/2025/english/ftnea2025008.pdf",
    learningHubOnly: false,
    subtopic: "cbdc",
    // OPTIONAL — headline shown in the Further Insights box, if it should
    // differ from the "title" hook above. Delete this line to just reuse
    // "title" instead.
    hubTitle: "CBDC: Could the Biggest Impact Occur Behind the Scenes?",
    // EXAMPLE — this is what actually shows in the Learning Hub box, under
    // the bold "Preview:" label. Tease your original piece here; cite the
    // source paper inline if relevant (plain <a> tag works fine).
    hubPreview: "Central Bank Digital Currencies (CBDCs) are often discussed in terms of how they could change the way people make payments, use cash, and interact with money. But the more consequential transformation may be happening elsewhere. While retail CBDCs have attracted much of the public attention, central banks are also exploring how digital forms of central bank money could reshape the infrastructure through which financial institutions transfer money and settle transactions. Could the biggest impact of CBDCs occur not in the money people use every day, but in the financial infrastructure operating behind it?",
    // UNGATED FOR NOW — see fullArticlePdf field docs above. Delete this
    // field later (leaving kitFormUid as-is below) to switch this entry
    // back to the email-gated flow once there's a subscriber base worth
    // building. This is also the exact URL to paste into a LinkedIn post.
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/cbdc-2026-07.pdf",
    kitFormUid: "29ff756091", // this is the form/sequence they'll actually get by signing up here — stays here, unused, until fullArticlePdf above is removed
    gateLabel: "Enter your email and we will send you the full piece.",
    gatedExcerpt: "<p>Yet, beyond these considerations another important development is taking place behind the scenes. Central banks alongside other financial institutions are exploring how digital forms of central bank money could reshape the financial system, particularly, how money is transferred and financial transactions are settled.</p>"
  },

  {
    id: "tokenizedfinance",
    date: "July 2026",
    dateSort: "2026-07-30",
    title: "Tokenised Finance: Potentially Transformative But Can It Really Deliver?",
    summary: "<p>Turning assets like deposits and securities into digital tokens promises faster, cheaper transactions, but whether tokenisation actually delivers on that promise depends on how well the new risks it introduces are managed. An IMF Note \"<em>Tokenized Finance</em>\" examines what policymakers need to consider for tokenisation to deliver greater efficiency without introducing risks that could undermine financial stability.</p><p>The policy choices made along the way, not just the technology itself, are what will determine whether tokenised deposits, securities, and smart contracts end up making finance more efficient or simply more complex.</p>",
    category: "financialStability",
    hubTeaser: "Explore the IMF's latest analysis to see why the future of finance depends as much on policy and trust as it does on technology.",
    sourceUrl: "https://www.imf.org/-/media/files/publications/imf-notes/2026/english/insea2026001.pdf",
    learningHubOnly: false,
    subtopic: "digitalAssets",
    // OPTIONAL — headline shown in the Further Insights box, if it should
    // differ from the "title" hook above. Delete this line to just reuse
    // "title" instead.
    hubTitle: "Beyond the Hype: Can Tokenisation Transform Cross-Border Finance?",
    // EXAMPLE — this is what actually shows in the Learning Hub box, under
    // the bold "Preview:" label. Tease your original piece here; cite the
    // source paper inline if relevant (plain <a> tag works fine).
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/tokenizedfinance.pdf",
    hubPreview: "As financial markets and payment systems become increasingly digital, tokenisation could reshape how assets are issued, transferred, settled, and managed, as well as change how money moves across borders. Yet the technology may be only part of the story. The bigger question is whether the institutions and rules surrounding cross-border finance can evolve with it. \"<em><strong>Beyond the Hype: Can Tokenisation Transform Cross-Border Finance?</strong></em>\" explores what tokenisation could really change - and what may stand in its way.",
    kitFormUid: "29ff756091", // this is the form/sequence they'll actually get by signing up here
    gateLabel: "Enter your email and we'll send you the full piece."
  },

  {
    id: "cash-in-use",
    date: "August 2026",
    dateSort: "2026-08-21",
    title: "Will We Really Become Cashless?",
    summary: "<p>For years, the rise of digital payments has fuelled predictions that cash would eventually disappear. But what if the transition to a cashless society is not as inevitable as we once thought?</p><p>A European Central Bank study, published in 2025, offers an interesting challenge to the conventional narrative. The study finds that while use in everyday transactions has continued to decline, cash continues to be used across generations, suggesting that its future may be more persistent than the traditional “cashless society” narrative implies.</p>",
    category: "financialStability",
    hubTeaser: "Why does cash continue to persist, and what role will it play in an increasingly digital payment system?",
    sourceUrl: "https://www.ecb.europa.eu/press/economic-bulletin/articles/2025/html/ecb.ebart202505_03~d74cb56069.en.html",
    subtopic: "cash",
    learningHubOnly: false,
    hubTitle: "Will We Really Become Cashless? A Global Perspective on the Future of Cash",
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/cash-in-use.pdf",
    hubPreview: "For years, the rise of digital payments has fuelled predictions that cash would eventually disappear.</p><p>In many economies, this transition is already well advanced. Recent evidence suggests that cash is accounting for a declining share of everyday transactions, while the use of digital payment methods continues to expand.</p><p>But is declining transactional use of cash equivalent to the disappearance of cash? This article examines this question by looking at the role of cash across the euro area, the United States, Sweden, India and South Africa, economics that differ in their payment systems, levels of financial inclusion and patterns of cash use.</p>",
    // The Learning Hub article is finished later than the homepage Insight
    // above (which was posted in August) — hubDate/hubDateSort give the
    // Learning Hub box its own, later posting date without touching
    // date/dateSort, which still correctly describe the August Insight.
    hubDate: "September 2026",
    hubDateSort: "2026-09-03"
  },

  {
    id: "quantitative-methods",
    date: "September 2026",
    dateSort: "2026-09-11",
    title: "Quantitative Models: A Reality Check",
    summary: "<p>Quantitative models help us understand complex problems, assess risks, explore scenarios, and inform decisions. But models are simplifications of reality, built on data, assumptions, and choices. Their value therefore depends not only on the results they produce, but on understanding what those results mean, and where their limitations lie.</p><p>A McKinsey article “Demystifying modeling: How quantitative models can—and can’t—explain the world” provides a useful introduction to what quantitative models can, and cannot, tell us.</p>",
    category: "panelData",
    hubTeaser: "Quantitative models are essential for helping us make sense of a world that is too complex to understand all at once. Their usefulness, however, depends on understanding both their strengths and limitations.",
    sourceUrl: "https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/demystifying-modeling-how-quantitative-models-can-and-cant-explain-the-world",
   //Add other fields below this line only if a learning hub article is set//

  }

];

// Category display labels — used by the insights.html filter pills
const INSIGHT_CATEGORY_LABELS = {
  financialStability: "Financial Stability",
  macroprudential: "Macroprudential Policy",
  panelData: "Panel Data Methods",
  dataDecisions: "Data-Driven Decision Making"
};