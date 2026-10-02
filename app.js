/* No dependencies, imports, fetch, storage, or network requests.
 * Optional authoring utility: node app.js --refresh updates the no-JS snapshot.
 * Opening index.html never requires Node or a build step.
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
  const { event: e, speakers, sessions, faqs } = window.CONF;
  const c = e.copy;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const minutes = time => time.split(':').reduce((hours, value) => hours * 60 + Number(value));
  const time = value => {
    const [h, m] = value.split(':').map(Number);
    if (h === 12 && m === 0) return c.timeLabels.noon;
    return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? c.timeLabels.am : c.timeLabels.pm}`;
  };
  const range = item => `${time(item.start)}–${time(item.end)}`;
  const fullName = `${e.workingTitle}: ${e.city} ${e.year}`;
  const capacity = c.capacityTemplate.replace('{count}', e.maxAttendees);
  const meal = c.mealTemplate.replace('{count}', e.includedMeals);
  const badge = status => `<span class="badge">${esc(c.statuses[status])}</span>`;
  const paragraphs = items => items.map(p => `<p>${esc(p)}</p>`).join('');
  const list = items => `<ul>${items.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
  const leads = item => item.speakerIds.map(id => speakers.find(s => s.id === id)).map(s => `<a href="#speaker-${esc(s.id)}">${esc(s.shortName)}</a>`).join(' + ');
  const agendaItem = item => {
    const metadata = `<span class="session-meta">${esc(item.id)} <span aria-hidden="true">/</span> ${minutes(item.end) - minutes(item.start)} ${esc(c.minutes)}${item.level ? ` <span aria-hidden="true">/</span> ${esc(item.level)}` : ''}</span>`;
    const title = `<h4>${esc(item.title)}</h4>`;
    const byline = item.speakerIds.length ? `<p class="byline">${esc(c.proposedLead)}: ${leads(item)}</p>` : (item.kind === 'session' ? `<p class="byline">${esc(c.presenterTBD)}</p>` : '');
    return `<article class="agenda-item ${esc(item.kind)}" id="${esc(item.id)}"><div class="time-column"><time>${esc(time(item.start))}</time><span>– ${esc(time(item.end))}</span></div><div class="session-content">${item.kind === 'session' ? `<details open><summary>${metadata}${title}<span class="expand-label">${esc(c.abstractToggle)} <span class="expand-icon" aria-hidden="true">+</span></span></summary><div class="abstract"><p>${esc(item.abstract)}</p><h5>${esc(item.outcomesStatus === 'proposed' ? c.proposedOutcomes : c.outcomes)}</h5>${item.outcomes.length ? list(item.outcomes) : `<p>${esc(c.pendingOutcomes)}</p>`}</div></details>` : `${title}<span class="session-meta">${minutes(item.end) - minutes(item.start)} ${esc(c.minutes)}</span>`}${byline}${item.note ? `<p class="byline">${esc(item.note)}</p>` : ''}${badge(item.status)}</div></article>`;
  };
  const days = e.days.map(day => `<section class="agenda-day" id="day-${day.id}" aria-labelledby="day-heading-${day.id}"><div class="day-heading"><span class="day-number" aria-hidden="true">0${day.id}</span><div><p class="eyebrow">${esc(c.day)} ${day.id} · ${esc(range(day))}</p><h3 id="day-heading-${day.id}">${esc(day.title)}</h3></div></div>${sessions.filter(s => s.day === day.id).map(agendaItem).join('')}</section>`).join('');
  const facts = [[c.dates, e.dates ?? c.unknown], [c.location, `${e.city}, ${e.state}`], [c.venue, e.venue ?? c.unknown], [c.price, e.price === null ? c.unknown : new Intl.NumberFormat('en-US', { style: 'currency', currency: e.currency }).format(e.price)], [c.hours, e.days.map(d => `${c.day} ${d.id}: ${range(d)}`).join(' · ')], [c.capacity, capacity], [c.meal, `${meal}. ${c.mealPlacement}.`]];
  const html = `<a class="skip-link" href="#main">${esc(c.skip)}</a>
    ${e.draftMode ? `<div class="draft-banner">${esc(c.banner)}</div>` : ''}
    <header class="site-header"><div class="header-inner"><a class="brand" href="#top" aria-label="${esc(fullName)}">${esc(e.workingTitle)}<span>${esc(e.city)} ${e.year}</span></a><button class="menu-toggle" hidden aria-expanded="false" aria-controls="navigation">${esc(c.menu)} <span aria-hidden="true">☰</span></button><nav id="navigation" aria-label="${esc(c.navLabel)}">${c.nav.map(n => `<a href="#${esc(n.id)}">${esc(n.label)}</a>`).join('')}</nav></div></header>
    <main id="main" tabindex="-1"><section class="hero wrap" id="top" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${esc(e.city)}, ${esc(e.state)} · ${e.year} · ${esc(e.dates ?? c.dateEyebrow)}</p><h1 id="hero-title">${esc(e.workingTitle)}</h1><p class="hero-subtitle">${esc(e.subtitle)}</p><p class="hero-body">${esc(c.heroBody)}</p><div class="hero-actions"><a class="button" href="#agenda">${esc(c.primaryCTA)} <span aria-hidden="true">↗</span></a><a class="text-link" href="#speakers">${esc(c.secondaryCTA)} <span aria-hidden="true">↗</span></a></div><p class="status-note">${esc(c.statusNote)}</p></div><div class="hero-art" aria-hidden="true"><svg viewBox="0 0 400 520" fill="none" focusable="false"><g stroke="currentColor" stroke-width="1"><path d="M-80 500 165 10 495 570M-60 520 168 60 465 575M-40 540 171 110 435 580M-20 560 174 160 405 585M0 580 177 210 375 590M20 600 180 260 345 595M40 620 183 310 315 600M60 640 186 360 285 605"/><path d="M-30 340 430 340M-30 390 430 390M-30 440 430 440M-30 490 430 490" opacity=".35"/></g><circle cx="281" cy="111" r="33" fill="var(--copper)" stroke="none"/></svg><span>${esc(e.city)}<br>${e.year}</span></div></section>
    <div class="facts-strip"><div class="wrap">${[...e.days.map(d => `${c.day} ${d.id}: ${range(d)}`), capacity, meal].map(f => `<p>${esc(f)}</p>`).join('')}</div></div>
    <section class="section wrap overview" id="overview" aria-labelledby="overview-title"><div><p class="eyebrow">01 / ${esc(c.nav[0].label)}</p><h2 id="overview-title">${esc(c.overviewTitle)}</h2></div><div>${paragraphs(c.overview)}<h3>${esc(c.audienceTitle)}</h3><p>${esc(c.audience)}</p><p class="muted">${esc(c.audienceList)}</p></div></section>
    <section class="learning section" aria-labelledby="learning-title"><div class="wrap"><p class="eyebrow">${esc(c.approachTitle)}</p><div class="approach"><h2>${esc(c.approachLead)}</h2><p>${esc(c.approachBody)}</p></div><h3 id="learning-title">${esc(c.learningTitle)}</h3><ol class="learning-grid">${c.learning.map(o => `<li>${esc(o)}</li>`).join('')}</ol></div></section>
    <section class="section wrap" id="agenda" aria-labelledby="agenda-title"><div class="section-heading"><div><p class="eyebrow">02 / ${esc(c.nav[1].label)}</p><h2 id="agenda-title">${esc(c.agendaTitle)}</h2></div><button class="button button-outline print-button" hidden>${esc(c.print)} <span aria-hidden="true">↗</span></button></div><p class="section-intro">${esc(c.agendaIntro)}</p><p class="local-time">${esc(c.allTimes)}</p><noscript><p>${esc(c.noScript)}</p></noscript><div class="day-controls" role="group" aria-label="${esc(c.dayControls)}" hidden>${e.days.map((d,i) => `<button type="button" data-day="${d.id}" aria-controls="day-${d.id}" aria-pressed="${i === 0}">${esc(c.day)} ${d.id}<span>${esc(range(d))}</span></button>`).join('')}</div>${days}</section>
    <section class="section speakers-section" id="speakers" aria-labelledby="speakers-title"><div class="wrap"><p class="eyebrow">03 / ${esc(c.nav[2].label)}</p><h2 id="speakers-title">${esc(c.speakersTitle)}</h2><p class="section-intro">${esc(c.speakersIntro)}</p><div class="speaker-grid">${speakers.map(s => `<article class="speaker-card" id="speaker-${esc(s.id)}"><div class="portrait" aria-hidden="true">${esc(s.initials)}</div><p class="speaker-role">${esc(s.displayRole)}</p><h3>${esc(s.displayName)}</h3><p>${esc(s.bio)}</p>${badge(s.participationStatus)}</article>`).join('')}</div></div></section>
    <section class="section wrap event-details" id="details" aria-labelledby="details-title"><div><p class="eyebrow">04 / ${esc(c.nav[3].label)}</p><h2 id="details-title">${esc(c.detailsTitle)}</h2><p class="registration-note">${esc(c.registration)}</p></div><dl>${facts.map(([label,value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl></section>
    <section class="section wrap faq-section" id="faq" aria-labelledby="faq-title"><div><p class="eyebrow">05 / ${esc(c.nav[4].label)}</p><h2 id="faq-title">${esc(c.faqTitle)}</h2></div><div>${faqs.map(f => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join('')}</div></section>
    <section class="closing"><div class="wrap"><p class="eyebrow">${esc(fullName)}</p><h2>${esc(c.closingTitle)}</h2><a class="button" href="#agenda">${esc(c.primaryCTA)} <span aria-hidden="true">↗</span></a><p>${esc(c.registration)}</p></div></section></main>
    <footer class="wrap"><p>${esc(fullName)}</p><p>${esc(c.footerNote)}</p></footer>`;
  if (authoring) {
    if (process.argv.includes('--refresh')) {
      const fs = require('node:fs');
      const path = `${__dirname}/index.html`;
      const old = fs.readFileSync(path, 'utf8');
      fs.writeFileSync(path, old.replace(/<!-- CONTENT START -->[\s\S]*<!-- CONTENT END -->/, `<!-- CONTENT START -->\n${html}\n<!-- CONTENT END -->`).replace(/<title>.*?<\/title>/, `<title>${esc(fullName)}</title>`));
      console.log('Updated index.html snapshot from content files. No dependencies or build needed to view.');
    }
    module.exports = { html, minutes, time, range };
    return;
  }
  document.getElementById('site').innerHTML = html;
  document.title = fullName;
  const controls = document.querySelector('.day-controls');
  controls.hidden = false;
  const chooseDay = id => {
    document.querySelectorAll('.agenda-day').forEach(day => { day.hidden = day.id !== `day-${id}`; });
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.day === String(id))));
  };
  controls.addEventListener('click', event => { const button = event.target.closest('button'); if (button) chooseDay(button.dataset.day); });
  chooseDay(1);
  document.querySelectorAll('.agenda-item details').forEach(detail => { detail.open = false; });
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  menu.hidden = false;
  document.documentElement.classList.add('enhanced');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  const revealHash = () => {
    const target = document.getElementById(location.hash.slice(1));
    const day = target && target.closest('.agenda-day');
    if (day) { chooseDay(day.id.slice(-1)); target.scrollIntoView(); }
  };
  window.addEventListener('hashchange', revealHash);
  revealHash();
  const print = document.querySelector('.print-button');
  print.hidden = false;
  let previousDetails;
  window.addEventListener('beforeprint', () => {
    if (previousDetails) return;
    previousDetails = Array.from(document.querySelectorAll('.agenda-item details'), detail => [detail, detail.open]);
    previousDetails.forEach(([detail]) => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => { if (previousDetails) previousDetails.forEach(([detail, open]) => { detail.open = open; }); previousDetails = null; });
  print.addEventListener('click', () => window.print());
}());
