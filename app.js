/* AI in Your Practice: Boulder 2027
 * No dependencies, no build step, no network requests beyond fonts and images.
 *
 * Content lives in content/*.js. This file renders it into #site.
 * Authoring: `node app.js --refresh` rewrites the no-JavaScript snapshot in
 * index.html so the page reads fully without scripts (all views stacked).
 *
 * With JavaScript, the page behaves as four views selected by the hash:
 *   home (#, #learn, #theme-*)  agenda (#agenda, #S01…)
 *   speakers (#speakers, #speaker-*)  details (#details, #faq, #hotels)
 */
(function () {
  'use strict';
  const authoring = typeof window === 'undefined';
  if (authoring) {
    global.window = {};
    const fs = require('node:fs');
    const vm = require('node:vm');
    for (const name of ['event', 'speakers', 'sessions', 'faqs']) {
      vm.runInThisContext(fs.readFileSync(`${__dirname}/content/${name}.js`, 'utf8'));
    }
  }

  const { event: E, days: DAYS, speakers: SPEAKERS, faqs: FAQS } = window.CONF;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const attr = esc;

  /* ---------- derived data ---------- */
  const THEMES = E.themes;
  const theme = id => THEMES.find(t => t.id === id);
  const tone = (id, onNavy) => (E.colorCoding ? theme(id).tone[onNavy ? 1 : 0] : (onNavy ? '#5fd4d0' : '#172a46'));
  const SESSIONS = {};
  DAYS.forEach((d, di) => d.rows.forEach(r => { if (r.id) SESSIONS[r.id] = { ...r, day: di, dayLabel: d.label }; }));
  const sessionsOf = s => Object.values(SESSIONS).filter(x => x.lead.includes(s.match));
  const REG = E.registrationUrl || '#details';
  const TBA = 'To be announced';

  /* ---------- small pieces ---------- */
  const brand = (accent) => `${esc(E.titleLead)}<span style="color:${accent}">${esc(E.titleAccent)}</span>${esc(E.titleTail)}`;
  const reserve = (cls = 'btn btn-accent') => `<a class="${cls}" href="${attr(REG)}" data-link="registration">Reserve your spot</a>`;
  const imgButton = (key, cls) => {
    const i = E.images[key];
    return `<button type="button" class="zoom ${cls}" data-img="${attr(key)}" aria-label="Enlarge: ${attr(i.title)}"><img src="media/${attr(i.f)}" alt="${attr(i.alt)}"${cls === 'zoom-main' ? '' : ' loading="lazy"'}></button>`;
  };
  const portrait = (p, cls) => `<div class="portrait ${cls}"><span aria-hidden="true">${esc(p.initials)}</span>${p.photo ? `<img src="${attr(p.photo)}" alt="${attr(p.name)}" loading="lazy" style="transform:scale(${p.photoScale || 1});transform-origin:${attr(p.photoOrigin || '50% 50%')}">` : ''}</div>`;
  const sessionChips = p => `<div class="chips"><span class="chips-label">Sessions</span>${sessionsOf(p).map(s => `<a class="chip" href="#${attr(s.id)}" title="${attr(s.title + s.sub)}"><span class="swatch" style="background:${tone(s.theme)}"></span>${esc(s.id)}</a>`).join('')}</div>`;

  /* ---------- views ---------- */
  const header = `
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" href="#top" data-route="home"><span class="brand-name">${brand('#d6561d')}</span><span class="brand-year">${esc(E.city)} ${E.year}</span></a>
      <nav class="site-nav" aria-label="Sections">
        <a href="#learn">What you’ll learn</a>
        <a href="#agenda" data-nav="agenda">Agenda</a>
        <a href="#speakers" data-nav="speakers">Speakers</a>
        <a href="#details" data-nav="details">Details</a>
      </nav>
      ${reserve('btn btn-accent btn-sm')}
    </div>
  </header>`;

  const hero = `
  <section class="hero wrap" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="hero-eyebrow"><span class="tag">${esc(E.hero.tag)}</span><span>${esc(E.hero.eyebrow)}</span></p>
      <div class="hero-title">
        <h1 id="hero-title">${brand('#d6561d')}</h1>
        <div class="rule"></div>
      </div>
      <p class="hero-sub">${esc(E.hero.subtitle)}</p>
      <p class="hero-body">${esc(E.hero.body)}</p>
      <div class="actions">
        ${reserve()}
        <a class="btn btn-navy" href="#learn">See what you’ll learn</a>
        <a class="btn btn-outline" href="#agenda">View the agenda</a>
      </div>
    </div>
    <figure class="hero-media">
      ${imgButton(E.hero.main, 'zoom-main')}
      ${E.heroLayout === 'mosaic' ? `<div class="mosaic">${E.hero.small.map(k => imgButton(k, 'zoom-small')).join('')}</div>` : ''}
      <figcaption>${esc(E.hero.caption)}</figcaption>
    </figure>
  </section>`;

  const learn = `
  <section id="learn" class="learn" aria-labelledby="learn-title">
    <div class="wrap learn-inner">
      <div class="learn-head">
        <div class="stack-14">
          <p class="eyebrow eyebrow-teal">${esc(E.learn.eyebrow)}</p>
          <h2 id="learn-title" class="h2 h2-light">${esc(E.learn.title)}</h2>
        </div>
        <div class="learn-intro">
          <p>${esc(E.learn.body)}</p>
          <p class="learn-audience">${esc(E.learn.audience)}</p>
        </div>
      </div>
      <ol class="themes">
        ${THEMES.map(t => `
        <li id="theme-${attr(t.id)}" class="theme" data-theme="${attr(t.id)}" style="--cn:${tone(t.id, true)}">
          <div class="theme-head"><span class="theme-num">${esc(t.num)}</span><h3>${esc(t.name)}</h3></div>
          <p>${esc(t.outcome)}</p>
        </li>`).join('')}
      </ol>
    </div>
  </section>`;

  const speakersPreview = `
  <section id="speakers-preview" class="cream" aria-labelledby="speakers-preview-title">
    <div class="wrap section-pad stack-36">
      <div class="split-end">
        <div class="stack-14">
          <p class="eyebrow">02 / Speakers</p>
          <h2 id="speakers-preview-title" class="h2">Organizers &amp; guest speakers.</h2>
        </div>
        <a class="btn btn-navy" href="#speakers">Read full bios →</a>
      </div>
      <ul class="faces">
        ${SPEAKERS.map(p => `
        <li><a href="#speaker-${attr(p.key)}" class="face">
          ${portrait(p, 'portrait-round')}
          <span class="face-text"><span class="face-name">${esc(p.name)}</span><span class="face-role">${esc(p.title)}</span></span>
        </a></li>`).join('')}
      </ul>
    </div>
  </section>`;

  const sessionRow = (d, r, i) => {
    if (r.pause || r.plenary) {
      const title = r.plenary ? r.title + r.sub : r.title;
      const note = r.plenary ? `Speakers: ${r.lead}` : r.note;
      return `<li class="row row-pause${r.kind === 'lunch' ? ' row-lunch' : ''}" id="row-${d.num}-${i}">
        <span class="row-time">${esc(r.t)}</span>
        <span class="pause-text"><strong>${esc(title)}</strong><span>${r.min} min</span>${note ? `<span>${esc(note)}</span>` : ''}</span>
      </li>`;
    }
    const t = theme(r.theme);
    const tbd = r.lead === 'Presenter TBD';
    return `<li class="row row-session" id="${attr(r.id)}" data-theme="${attr(t.id)}" style="--c:${tone(t.id)}">
      <span class="row-time row-time-strong">${esc(r.t)}</span>
      <div class="row-body">
        <div class="row-tags">
          <a class="theme-tag" href="#theme-${attr(t.id)}" data-hl="${attr(t.id)}"><span class="theme-badge">${esc(t.num)}</span><span>${esc(t.short)}</span></a>
          <span class="row-meta">${esc(r.id)} · ${r.min} min · ${esc(r.level)}</span>
        </div>
        <details class="session">
          <summary>
            <span class="session-title"><strong>${esc(r.title)}</strong><span>${esc(r.sub)}</span></span>
            <span class="toggle" aria-hidden="true"></span>
            <span class="session-lead">${tbd ? '' : 'Speakers '}<span>${esc(r.lead)}</span></span>
          </summary>
          <div class="abstract">
            <p>${esc(r.abstract)}</p>
            <div class="outcomes">
              <span class="outcomes-label">${r.proposedOutcomes ? 'Proposed learning outcomes · pending speaker review' : 'Learning outcomes'}</span>
              ${r.outcomes.length
                ? `<ul>${r.outcomes.map(o => `<li><span class="bullet"></span><span>${esc(o)}</span></li>`).join('')}</ul>`
                : '<p class="muted">Learning outcomes to be confirmed with the presenter.</p>'}
            </div>
          </div>
        </details>
      </div>
    </li>`;
  };

  const agenda = `
  <section id="agenda" class="agenda" aria-labelledby="agenda-title">
    <div class="wrap section-pad stack-28">
      <div class="head-grid">
        <div class="stack-14">
          <p class="eyebrow">Agenda · ${esc(E.city)} ${E.year}</p>
          <h2 id="agenda-title" class="h2">The agenda</h2>
        </div>
        <p class="lede">${esc(E.agenda.intro)}</p>
      </div>
      <div class="tabbar">
        <div class="tabs js-only" role="tablist" aria-label="Program day" hidden>
          ${DAYS.map((d, i) => `<button type="button" role="tab" id="tab-${i}" aria-controls="day-${i + 1}" aria-selected="${i === 0}" data-day="${i}"><span>${esc(d.label)}</span><span class="tab-hours">${esc(d.hours)}</span></button>`).join('')}
        </div>
        <button type="button" class="hl-clear js-only" hidden><span>Highlighting <strong></strong></span><span class="u">Clear</span></button>
      </div>
      ${DAYS.map((d, di) => `
      <div class="day" id="day-${di + 1}" aria-labelledby="day-title-${di}">
        <div class="day-head"><span class="day-num">${esc(d.num)}</span><h3 id="day-title-${di}"><span class="visually-hidden">${esc(d.label)}, ${esc(d.hours)}: </span>${esc(d.theme)}</h3></div>
        <ol class="rows">${d.rows.map((r, i) => sessionRow(d, r, i)).join('')}</ol>
        <div class="actions">
          <button type="button" class="btn btn-outline js-only" data-day="${di === 0 ? 1 : 0}" data-scroll="agenda" hidden>${di === 0 ? 'Continue to Day 2 →' : '← Back to Day 1'}</button>
          ${reserve()}
        </div>
      </div>`).join('')}
    </div>
  </section>`;

  const details = `
  <section id="details" class="wrap section-pad details" aria-labelledby="details-title">
    <div class="stack-14">
      <p class="eyebrow">Details · ${esc(E.city)} ${E.year}</p>
      <h2 id="details-title" class="h2">Plan your time in Boulder.</h2>
      <div class="actions">${reserve()}</div>
    </div>
    <div class="details-grid">
      <dl class="facts">
        ${E.logistics.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd${v === TBA ? ' class="muted"' : ''}>${esc(v)}</dd></div>`).join('')}
      </dl>
      <div id="faq" class="faq">
        <h3 class="faq-title">Questions</h3>
        ${FAQS.map(([q, a]) => `<details><summary><span>${esc(q)}</span><span class="faq-plus" aria-hidden="true">+</span></summary><p>${esc(a)}</p></details>`).join('')}
      </div>
      <div id="hotels" class="hotels">
        <div class="stack-8">
          <h3>Book your hotel</h3>
          <p>Recommended hotels in Boulder, with links to book.</p>
        </div>
        <div class="hotel-list">
          ${E.hotels.map(h => `<a class="hotel" href="${attr(h.href)}" data-link="hotel"><span class="hotel-name">${esc(h.name)}</span><span class="hotel-cta">Book a room →</span></a>`).join('')}
        </div>
      </div>
    </div>
  </section>`;

  const organizers = SPEAKERS.filter(p => p.org);
  const guests = SPEAKERS.filter(p => !p.org);
  const speakers = `
  <section id="speakers" class="speakers" aria-labelledby="speakers-title">
    <div class="wrap section-pad speakers-inner">
      <div class="stack-14 speakers-head">
        <p class="eyebrow">Speakers · ${esc(E.city)} ${E.year}</p>
        <h2 id="speakers-title" class="h2 h2-xl">Organizers &amp; guest speakers.</h2>
      </div>
      <div>
        ${organizers.map(p => `
        <article id="speaker-${attr(p.key)}" class="organizer">
          <div class="offset offset-teal">${portrait(p, 'portrait-tall')}</div>
          <div class="organizer-text">
            <span class="role">${esc(p.title)}</span>
            <h3 class="organizer-name">${esc(p.name)}</h3>
            <span class="focus">${esc(p.focus)}</span>
            <p class="bio">${esc(p.bio)}</p>
            ${sessionChips(p)}
          </div>
        </article>`).join('')}
      </div>
      <div class="guests">
        <h3 class="guests-title">Guest speakers</h3>
        <div class="guest-grid">
          ${guests.map(p => `
          <article id="speaker-${attr(p.key)}" class="guest">
            <div class="offset offset-cream">${portrait(p, 'portrait-square')}</div>
            <div class="stack-6">
              <span class="role">${esc(p.title)}</span>
              <h4 class="guest-name">${esc(p.name)}</h4>
              <span class="focus focus-sm">${esc(p.focus)}</span>
            </div>
            <p class="guest-bio${p.bio === 'Bio forthcoming.' ? ' muted' : ''}">${esc(p.bio)}</p>
            ${sessionChips(p)}
          </article>`).join('')}
        </div>
      </div>
    </div>
  </section>`;

  const sp = E.sponsors;
  const sponsorTile = s => {
    const inner = s.logo ? `<img src="${attr(s.logo)}" alt="${attr(s.name)}" loading="lazy">` : `<span>${esc(s.name)}</span>`;
    return `<li>${s.href ? `<a class="sponsor" href="${attr(s.href)}" target="_blank" rel="sponsored noopener" aria-label="${attr(s.name)} (opens in a new tab)">${inner}</a>` : `<div class="sponsor${s.logo ? '' : ' sponsor-empty'}">${inner}</div>`}</li>`;
  };
  const sponsors = sp ? `
  <section id="sponsors" class="sponsors" aria-labelledby="sponsors-title">
    <div class="wrap sponsors-inner">
      <div class="stack-8">
        <h2 id="sponsors-title" class="sponsors-title">${esc(sp.title)}</h2>
        ${sp.note ? `<p class="sponsors-note">${esc(sp.note)}</p>` : ''}
      </div>
      <ul class="sponsor-list">${sp.list.map(sponsorTile).join('')}</ul>
    </div>
  </section>` : '';

  const footer = `
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <span class="footer-brand">${brand('#5fd4d0')} <span class="footer-year">${esc(E.city)} ${E.year}</span></span>
      <nav aria-label="Footer">
        <a href="#agenda">Agenda</a>
        <a href="#details">Details</a>
        <a class="footer-cta" href="${attr(REG)}" data-link="registration">Reserve your spot →</a>
      </nav>
    </div>
  </footer>`;

  const html = `<a class="skip-link" href="#main">Skip to content</a>
${header}
<main id="main" tabindex="-1">
  <div data-page="home" id="top">${hero}${learn}${speakersPreview}</div>
  <div data-page="agenda">${agenda}</div>
  <div data-page="details">${details}</div>
  <div data-page="speakers">${speakers}</div>
</main>
${sponsors}
${footer}`;

  /* ---------- authoring: bake the snapshot ---------- */
  if (authoring) {
    if (process.argv.includes('--refresh')) {
      const fs = require('node:fs');
      const path = `${__dirname}/index.html`;
      const old = fs.readFileSync(path, 'utf8');
      const title = `${E.title}: ${E.city} ${E.year}`;
      fs.writeFileSync(path, old
        .replace(/<!-- CONTENT START -->[\s\S]*<!-- CONTENT END -->/, () => `<!-- CONTENT START -->\n${html}\n<!-- CONTENT END -->`)
        .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`));
      console.log('Updated the index.html snapshot from content files.');
    }
    module.exports = { html };
    return;
  }

  /* ---------- enhanced behavior ---------- */
  const root = document.getElementById('site');
  root.innerHTML = html;
  document.documentElement.classList.add('js');
  root.querySelectorAll('.js-only').forEach(n => { n.hidden = false; });

  const $ = s => root.querySelector(s);
  const $$ = s => Array.from(root.querySelectorAll(s));
  const pages = $$('[data-page]');
  const dayPanels = $$('.day');
  const tabs = $$('[role="tab"]');
  const state = { page: null, day: 0, hl: null };

  dayPanels.forEach((p, i) => { p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', `tab-${i}`); });

  const setDay = i => {
    state.day = i;
    dayPanels.forEach((p, j) => { p.hidden = j !== i; });
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(j === i)); t.tabIndex = j === i ? 0 : -1; });
  };

  const setHl = id => {
    state.hl = id;
    root.classList.toggle('hl-on', !!id);
    $$('[data-theme]').forEach(n => n.classList.toggle('is-dim', !!id && n.dataset.theme !== id));
    const clear = $('.hl-clear');
    clear.hidden = !id;
    if (id) { const t = theme(id); clear.querySelector('strong').textContent = `${t.num} ${t.short}`; }
  };

  const setPage = page => {
    if (state.page === page) return false;
    state.page = page;
    pages.forEach(p => { p.hidden = p.dataset.page !== page; });
    $$('[data-nav]').forEach(a => {
      if (a.dataset.nav === page) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    return true;
  };

  /* Map a hash to a view, then reveal and scroll to its target. */
  const resolve = hash => {
    const id = decodeURIComponent((hash || '').replace(/^#\/?/, ''));
    if (!id || id === 'top') return { page: 'home', target: null };
    if (id === 'approach' || id === 'learn') return { page: 'home', target: 'learn' };
    if (/^theme-/.test(id) || id === 'speakers-preview') return { page: 'home', target: id };
    if (id === 'agenda') return { page: 'agenda', target: null };
    const sid = id.replace(/^session-/, '');
    if (SESSIONS[sid]) return { page: 'agenda', target: sid, session: sid };
    if (id === 'speakers') return { page: 'speakers', target: null };
    if (/^speaker-/.test(id)) return { page: 'speakers', target: id };
    if (id === 'details') return { page: 'details', target: null };
    if (id === 'faq' || id === 'hotels') return { page: 'details', target: id };
    return { page: 'home', target: document.getElementById(id) ? id : null };
  };

  const scrollToId = id => {
    const el = id && document.getElementById(id);
    if (el) el.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
  };

  const route = (hash, { focus = false } = {}) => {
    const r = resolve(hash);
    const changed = setPage(r.page);
    if (r.session) {
      const s = SESSIONS[r.session];
      setDay(s.day);
      const d = document.getElementById(r.session).querySelector('details');
      if (d) d.open = true;
    }
    requestAnimationFrame(() => {
      scrollToId(r.target);
      if (focus && changed && !r.target) {
        const h = root.querySelector(`[data-page="${r.page}"] h1, [data-page="${r.page}"] h2`);
        if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
      }
    });
  };

  /* In-page links: route without a browser jump, keep history. */
  root.addEventListener('click', e => {
    const hlLink = e.target.closest('[data-hl]');
    if (hlLink) setHl(hlLink.dataset.hl);

    const a = e.target.closest('a[href^="#"]');
    if (a && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      const href = a.getAttribute('href');
      if (href === '#main') return;                 // skip link: native behavior
      if (a.dataset.link === 'hotel' && href === '#hotels') { e.preventDefault(); return; }
      e.preventDefault();
      const next = href === '#top' ? location.pathname + location.search : href;
      if (location.hash !== href) history.pushState(null, '', next);
      route(href, { focus: true });
      return;
    }

    const dayBtn = e.target.closest('button[data-day]');
    if (dayBtn) {
      setDay(Number(dayBtn.dataset.day));
      if (dayBtn.dataset.scroll) scrollToId(dayBtn.dataset.scroll);
      return;
    }
    if (e.target.closest('.hl-clear')) { setHl(null); return; }

    const zoom = e.target.closest('.zoom');
    if (zoom) openLightbox(zoom.dataset.img);
  });

  /* Arrow keys move between day tabs. */
  root.querySelector('[role="tablist"]').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = (state.day + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setDay(i); tabs[i].focus();
  });

  window.addEventListener('popstate', () => route(location.hash));
  window.addEventListener('hashchange', () => route(location.hash));

  /* Lightbox */
  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.innerHTML = '<figure><img alt=""><figcaption><span class="lb-text"><strong></strong> <span></span></span><button type="button" class="lb-close">Close · Esc</button></figcaption></figure>';
  document.body.appendChild(box);
  const openLightbox = key => {
    const i = E.images[key];
    if (!i) return;
    const img = box.querySelector('img');
    img.src = `media/${i.f}`; img.alt = i.alt;
    box.setAttribute('aria-label', i.title);
    box.querySelector('strong').textContent = `${i.title}.`;
    box.querySelector('.lb-text > span').textContent = i.caption;
    box.showModal();
  };
  box.addEventListener('click', e => { if (e.target === box || e.target.closest('.lb-close') || e.target.tagName === 'IMG' || e.target.tagName === 'FIGURE') box.close(); });

  /* Print: expand every session abstract, restore afterwards. */
  let printed;
  window.addEventListener('beforeprint', () => {
    printed = $$('.session').map(d => [d, d.open]);
    printed.forEach(([d]) => { d.open = true; });
  });
  window.addEventListener('afterprint', () => { (printed || []).forEach(([d, o]) => { d.open = o; }); printed = null; });

  setDay(0);
  setHl(null);
  route(location.hash);
}());
