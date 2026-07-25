document.addEventListener('DOMContentLoaded', () => {
    swapEmbeddedAssets();
    initNavbar();
    initMobileMenu();
    initHeadingReveal();
    initRippleEffect();
    initPillarsShowcase();
    initImpactCounters();
    initFootprintPins();
    initCountrySwitchNav();
    initTimelineReveal();
    renderCountryStories();
    initScrollReveal();
    initCountryFreshReveal();
    initModals();
    initStoriesCarousel();
    initTestimonialsCarousel();
    initFounderToggle();
    initScrollToDonate();
    initDonationFormSubmit();
    initVideoModal();
    highlightCurrentNav();
    initSearch();
    initNavDropdown();
});

function initSearch(){
    const btn = document.querySelector('.nav-search');
    if(!btn) return;
    const pages = [
        {t:'Home', d:'Possibilities Africa – equipping rural pastor leaders', u:'index.html'},
        {t:'About Us', d:'Our mission, vision and story', u:'about.html'},
        {t:'Our Work', d:'Programs, pillars and impact', u:'our-work.html'},
        {t:'Where We Work', d:'Countries and regions we serve', u:'where-we-work.html'},
        {t:'Founder', d:'Martin Simiyu – founder message', u:'founder.html'},
        {t:'Donate', d:'Support the ripple effect', u:'donate.html'},
        {t:'Kenya', d:'Kenya country programs', u:'kenya.html'},
        {t:'Ethiopia', d:'Ethiopia country programs', u:'ethiopia.html'},
        {t:'Malawi', d:'Malawi country programs', u:'malawi.html'},
        {t:'Zambia', d:'Zambia country programs', u:'zambia.html'},
        {t:'Rwanda', d:'Rwanda country programs', u:'rwanda.html'},
        {t:'Tanzania', d:'Tanzania country programs', u:'tanzania.html'},
        {t:'Burundi', d:'Burundi country programs', u:'burundi.html'},
    ];
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
        <div class="search-panel" role="dialog" aria-label="Site search">
            <button class="search-close" aria-label="Close">&times;</button>
            <label class="search-inputwrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="search-input" placeholder="Search pages, countries, programs..." autocomplete="off"/>
            </label>
            <ul class="search-results"></ul>
            <p class="search-hint">Press Enter to open the top result • Esc to close</p>
        </div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('.search-input');
    const list = overlay.querySelector('.search-results');
    const closeBtn = overlay.querySelector('.search-close');
    const render = (q) => {
        const query = q.trim().toLowerCase();
        const matches = !query ? pages : pages.filter(p => (p.t+' '+p.d).toLowerCase().includes(query));
        list.innerHTML = matches.length
            ? matches.map(m => `<li><a href="${m.u}"><strong>${m.t}</strong><span>${m.d}</span></a></li>`).join('')
            : '<li class="search-empty">No results. Try "pastor", "Kenya", or "donate".</li>';
    };
    const open = () => { overlay.classList.add('open'); document.body.style.overflow='hidden'; setTimeout(()=>input.focus(),50); render(''); };
    const shut = () => { overlay.classList.remove('open'); document.body.style.overflow='auto'; input.value=''; };
    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', shut);
    overlay.addEventListener('click', e => { if(e.target===overlay) shut(); });
    input.addEventListener('input', e => render(e.target.value));
    input.addEventListener('keydown', e => {
        if(e.key==='Escape') shut();
        if(e.key==='Enter'){
            const first = list.querySelector('a');
            if(first) location.href = first.getAttribute('href');
        }
    });
}

function initMobileMenu(){
    const btn = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');
    if(!btn || !links) return;
    btn.addEventListener('click', () => links.classList.toggle('open'));
}

function highlightCurrentNav(){
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const countryPages = ['kenya.html','ethiopia.html','malawi.html','zambia.html','rwanda.html','tanzania.html','burundi.html'];

    document.querySelectorAll('.nav-links > li > a, .nav-links .nav-dropdown-toggle').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if(!href.startsWith('#')){
            a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
        }
    });

    // Country pages live under "Where We Work" -- keep that nav item highlighted too.
    if(countryPages.includes(path)){
        document.querySelectorAll('.nav-dropdown-toggle').forEach(a => a.classList.add('active'));
    }

    // Founder page is a sub-section of About Us -- keep About Us highlighted.
    const aboutSubPages = ['founder.html'];
    if(aboutSubPages.includes(path)){
        document.querySelectorAll('.nav-links > li > a').forEach(a => {
            if((a.getAttribute('href') || '').toLowerCase() === 'about.html'){
                a.classList.add('active');
            }
        });
    }

    // Mark the matching entry inside the "Where We Work" dropdown list.
    document.querySelectorAll('.nav-dropdown-menu a').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        a.classList.toggle('active', href === path);
    });
}

function initNavDropdown(){
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    if(!dropdowns.length) return;

    dropdowns.forEach(item => {
        const caret = item.querySelector('.nav-dropdown-caret');
        if(!caret) return;
        caret.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = item.classList.contains('open');
            dropdowns.forEach(other => {
                if(other !== item){
                    other.classList.remove('open');
                    const otherCaret = other.querySelector('.nav-dropdown-caret');
                    if(otherCaret) otherCaret.setAttribute('aria-expanded', 'false');
                }
            });
            item.classList.toggle('open', !isOpen);
            caret.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    document.addEventListener('click', (e) => {
        dropdowns.forEach(item => {
            if(!item.contains(e.target)){
                item.classList.remove('open');
                const caret = item.querySelector('.nav-dropdown-caret');
                if(caret) caret.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            dropdowns.forEach(item => item.classList.remove('open'));
        }
    });
}

function initVideoModal(){
    const thumb = document.getElementById('video-thumb');
    const modal = document.getElementById('video-modal');
    const frame = document.getElementById('video-frame');
    const close = document.getElementById('video-close');
    if(!thumb || !modal || !frame) return;
    const VIDEO_ID = '9OiMry-NzAc';
    thumb.addEventListener('click', (e) => {
        e.preventDefault();
        frame.src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    const closeVideo = () => {
        frame.src = '';
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    };
    close.addEventListener('click', closeVideo);
    modal.addEventListener('click', (e) => { if(e.target === modal) closeVideo(); });
}

function swapEmbeddedAssets() {
    // The single source of truth for asset embedding now lives in assets-embed.js
    // (window.PA_applyEmbeddedAssets). We just re-run it here in case app.js
    // rendered/changed any DOM after the initial pass.
    if (typeof window.PA_applyEmbeddedAssets === 'function') {
        window.PA_applyEmbeddedAssets();
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* Simple, permanent reveal — no per-word splitting, cannot flicker or reset */
function initHeadingReveal() {
    const headings = document.querySelectorAll('.animated-heading');
    headings.forEach((heading, index) => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                heading.classList.add('revealed');
            }, 30 + index * 60);
        });
    });
}

const rippleData = {
    pa:        { keyword: "Possibilities Africa",  title: "Possibilities Africa",           desc: "With God all things are possible. The core training and empowerment engine initiating the ripple effect of holistic change." },
    pastor:    { keyword: "Equipped Pastor",       title: "Equipped Pastors Lead the Charge", desc: "Possibilities Africa's anchor begins by recruiting, training, mentoring, and organizing rural pastors — the main implementers of community growth." },
    church:    { keyword: "Holistic Church",       title: "Churches as Growth Centers",     desc: "Equipped pastors guide their congregations into active holistic ministry — spiritual development, micro-enterprise and community services." },
    community: { keyword: "Empowered Community",   title: "A Community Transformed",        desc: "Through self-reliance, agricultural productivity, youth mentoring and civic responsibility, communities craft their own prosperous future." },
    africa:    { keyword: "Rest of Africa",    title: "Rippling Across the Continent",  desc: "What begins with a single equipped pastor doesn't stop at one village — the model spreads to neighbouring regions and nations." }
};

function initRippleEffect() {
    const groups = Array.from(document.querySelectorAll('.bowl-ring-group'));
    const centerGroup = document.querySelector('.bowl-center-group');
    const allStages = document.querySelectorAll('.bowl-ring-group, .bowl-center-group');
    const svgEl = document.querySelector('.ripple-bowl-svg');
    const badge = document.getElementById('ripple-badge');
    const title = document.getElementById('ripple-title');
    const desc  = document.getElementById('ripple-desc');
    if (!svgEl || !badge) return;

    // Hit-test bands from innermost (visually on top) to outermost so every
    // stage can be highlighted even though the SVG paths overlap near the bottom.
    const hitBands = [
        { key: 'pa',       el: centerGroup, cx: 345, cy: 573, r: 92 },
        { key: 'pastor',   el: groups.find(g => g.dataset.node === 'pastor'),   cx: 345, cy: 528, r: 137 },
        { key: 'church',   el: groups.find(g => g.dataset.node === 'church'),   cx: 345, cy: 483, r: 182 },
        { key: 'community',el: groups.find(g => g.dataset.node === 'community'),cx: 345, cy: 437, r: 228 },
        { key: 'africa',   el: groups.find(g => g.dataset.node === 'africa'),   cx: 345, cy: 375, r: 290 }
    ].filter(b => b.el);

    let activeClone = null;

    // The real SVG rings never move. Instead, clone only the selected ring and
    // animate that duplicate above the locked original, so no white gaps can
    // open between stages while the selected stage pops outward.
    function removeActiveClone() {
        if (activeClone) {
            activeClone.remove();
            activeClone = null;
        }
    }

    function showPopClone(el) {
        removeActiveClone();
        if (!el || !el.classList.contains('bowl-ring-group')) return;

        const svg = el.closest('svg');
        if (!svg) return;

        const center = svg.querySelector('.bowl-center-group');
        const clone = el.cloneNode(true);
        clone.classList.remove('active', 'bowl-ring-group');
        clone.classList.add('bowl-ring-pop-clone');
        clone.setAttribute('aria-hidden', 'true');
        clone.removeAttribute('tabindex');
        clone.removeAttribute('role');
        clone.removeAttribute('aria-label');

        if (center) svg.insertBefore(clone, center);
        else svg.appendChild(clone);

        activeClone = clone;
        requestAnimationFrame(() => clone.classList.add('is-active'));
    }

    function setActiveStage(el) {
        // The real ring diagram stays locked in place. When a ring stage is
        // selected we drop a duplicate ring above it and scale that clone
        // upward from the logo point, producing a cute pop without opening
        // any white gap between neighbouring stages or extending below the
        // ring diagram.
        allStages.forEach(s => s.classList.toggle('active', s === el));
        if (el && el.classList && el.classList.contains('bowl-ring-group')) {
            showPopClone(el);
        } else {
            removeActiveClone();
        }
    }

    function updateContent(target) {
        if (!rippleData[target]) return;
        [badge,title,desc].forEach(el => el.style.opacity = '0');
        setTimeout(() => {
            badge.textContent = rippleData[target].keyword.toUpperCase();
            title.textContent = rippleData[target].title;
            desc.textContent = rippleData[target].desc;
            [badge,title,desc].forEach(el => el.style.opacity = '1');
        }, 180);
    }

    function pickStageAt(clientX, clientY) {
        const pt = svgEl.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const cursorPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
        for (const band of hitBands) {
            const dx = cursorPt.x - band.cx;
            const dy = cursorPt.y - band.cy;
            if (dx * dx + dy * dy <= band.r * band.r) return band.el;
        }
        return null;
    }

    // Mouse/touch movement highlights the band under the pointer.
    let lastStage = null;
    function handlePointerMove(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const stage = pickStageAt(clientX, clientY);
        if (stage && stage !== lastStage) {
            lastStage = stage;
            setActiveStage(stage);
            updateContent(stage.dataset.node);
        }
    }
    function handlePointerLeave() {
        lastStage = null;
        if (centerGroup) {
            setActiveStage(centerGroup);
            updateContent(centerGroup.dataset.node);
        } else {
            setActiveStage(null);
        }
    }

    svgEl.addEventListener('mousemove', handlePointerMove);
    svgEl.addEventListener('touchmove', handlePointerMove, { passive: true });
    svgEl.addEventListener('mouseleave', handlePointerLeave);
    svgEl.addEventListener('touchend', handlePointerLeave);

    // Keep keyboard/click support for accessibility.
    const attach = (el) => {
        el.addEventListener('focus', () => { lastStage = el; setActiveStage(el); updateContent(el.dataset.node); });
        el.addEventListener('click', () => { lastStage = el; setActiveStage(el); updateContent(el.dataset.node); });
    };
    groups.forEach(attach);
    if (centerGroup) attach(centerGroup);

    // Start centred on the logo -- the point the ripple begins from.
    if (centerGroup) setActiveStage(centerGroup);

    requestAnimationFrame(() => setTimeout(() => svgEl.classList.add('in-view'), 100));
}

function initPillarsShowcase() {
    const items = document.querySelectorAll('.pillar-item');
    const images = document.querySelectorAll('.pillar-visual-img');
    const numLabel = document.getElementById('active-pillar-num');
    if (!items.length) return;

    items.forEach(item => {
        const header = item.querySelector('.pillar-item-header');
        header.addEventListener('click', () => {
            const index = item.dataset.pillar;
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            images.forEach(img => img.classList.toggle('active', img.dataset.pillarImg === index));
            if (numLabel) numLabel.textContent = String(Number(index) + 1).padStart(2, '0');
        });
    });
}

function initImpactCounters() {
    const nums = document.querySelectorAll('.impact-num');
    if (!nums.length) return;

    function animateCount(el) {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    nums.forEach(num => observer.observe(num));
}

const footprintData = {
    kenya:    { flag: "https://flagcdn.com/w80/ke.png", name: "Kenya",    href: "kenya.html",    desc: "The birthplace of PA. Since 2005, equipping pastors and launching rural cooperatives across 32 constituencies." },
    ethiopia: { flag: "https://flagcdn.com/w80/et.png", name: "Ethiopia", href: "ethiopia.html", desc: "Since 2019, establishing holistic pastor leadership training in remote highland communities." },
    malawi:   { flag: "https://flagcdn.com/w80/mw.png", name: "Malawi",   href: "malawi.html",   desc: "Since 2012, discipling pastors in the 'Warm Heart of Africa' with financial stewardship and IGAs." },
    zambia:   { flag: "https://flagcdn.com/w80/zm.png", name: "Zambia",   href: "zambia.html",   desc: "Registered as PAZ in 2022, now active in 12 communities near Lusaka." },
    rwanda:   { flag: "https://flagcdn.com/w80/rw.png", name: "Rwanda",   href: "rwanda.html",   desc: "Pastor leaders championing holistic transformation across 13 districts and 256 pastor leaders." },
    tanzania: { flag: "https://flagcdn.com/w80/tz.png", name: "Tanzania", href: "tanzania.html", desc: "Expansion ground for holistic pastor training as PA reaches deeper into East Africa." },
    burundi:  { flag: "https://flagcdn.com/w80/bi.png", name: "Burundi",  href: "burundi.html",  desc: "New ministry ground where PA is equipping rural pastors for community transformation." }
};

function initFootprintPins() {
    const pins = document.querySelectorAll('.flag-pin');
    const card = document.querySelector('.pin-cluster-card');
    const popup = document.getElementById('map-floating-popup');
    const closeBtn = document.getElementById('popup-close-btn');
    if (!pins.length || !card || !popup) return;

    const popupFlag = document.getElementById('footprint-flag-img');
    const popupName = document.getElementById('footprint-country-name');
    const popupLink = document.getElementById('footprint-country-link');
    const sideFlag = document.getElementById('footprint-flag-img-side');
    const sideName = document.getElementById('footprint-country-name-side');
    const sideDesc = document.getElementById('footprint-country-desc');
    const sideLink = document.getElementById('footprint-country-link-side');

    let activeKey = null;

    const showPreview = (pin) => {
        const key = pin.dataset.country;
        const data = footprintData[key];
        if (!data) return;
        pins.forEach(p => p.classList.remove('active'));
        pin.classList.add('active');
        if (popupFlag) popupFlag.src = data.flag;
        if (popupName) popupName.textContent = data.name;
        if (popupLink) { popupLink.href = data.href; popupLink.firstChild.textContent = 'View ' + data.name + ' page '; }
        if (sideFlag)  sideFlag.src = data.flag;
        if (sideName)  sideName.textContent = data.name;
        if (sideDesc)  sideDesc.textContent = data.desc;
        if (sideLink)  { sideLink.href = data.href; sideLink.firstChild.textContent = 'Open ' + data.name + ' page '; }
        const pinRect = pin.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        let left = pinRect.left - cardRect.left + pinRect.width / 2;
        let top  = pinRect.top  - cardRect.top  + pinRect.height;
        popup.style.left = left + 'px';
        popup.style.top  = top + 'px';
        popup.classList.add('visible');

        // Clamp the popup so it never spills outside the card and overlaps
        // neighbouring pins/icons on smaller screens or near the edges.
        const popupRect = popup.getBoundingClientRect();
        const halfWidth = popupRect.width / 2;
        const minLeft = halfWidth + 6;
        const maxLeft = cardRect.width - halfWidth - 6;
        if (left < minLeft) left = minLeft;
        if (left > maxLeft) left = maxLeft;
        const maxTop = cardRect.height - popupRect.height - 6;
        if (top > maxTop) top = Math.max(pinRect.top - cardRect.top - popupRect.height, 6);
        popup.style.left = left + 'px';
        popup.style.top  = top + 'px';
    };

    pins.forEach(pin => {
        pin.addEventListener('mouseenter', () => showPreview(pin));
        pin.addEventListener('focus', () => showPreview(pin));
        // First tap on touch devices shows the preview; second tap follows the link.
        pin.addEventListener('click', (e) => {
            const key = pin.dataset.country;
            const isTouch = matchMedia('(hover: none)').matches;
            if (isTouch && activeKey !== key) {
                e.preventDefault();
                activeKey = key;
                showPreview(pin);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            popup.classList.remove('visible');
            activeKey = null;
        });
    }
}

function initCountrySwitchNav() {
    if (!document.body.classList.contains('country-page')) return;
    const hero = document.querySelector('.subpage-hero');
    if (!hero) return;

    const order = Object.keys(footprintData);
    const current = (location.pathname.split('/').pop() || '').replace('.html', '').toLowerCase();
    const idx = order.indexOf(current);
    if (idx === -1) return;

    const currentData = footprintData[current];

    const wrap = document.createElement('div');
    wrap.className = 'country-switch-dropdown';
    wrap.innerHTML = `
        <button type="button" class="country-switch-current" aria-haspopup="true" aria-expanded="false" aria-label="Switch country">
            <img src="${currentData.flag}" alt="">
            <span>${currentData.name}</span>
            <i class="fa-solid fa-chevron-down"></i>
        </button>
        <ul class="country-switch-menu">
            ${order.map(key => {
                const c = footprintData[key];
                const activeCls = key === current ? ' active' : '';
                return `<li><a href="${c.href}" class="${activeCls.trim()}"><img src="${c.flag}" alt="">${c.name}</a></li>`;
            }).join('')}
        </ul>`;
    hero.appendChild(wrap);

    const btn = wrap.querySelector('.country-switch-current');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrap.classList.contains('open');
        wrap.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
    });
    document.addEventListener('click', () => {
        wrap.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    });
}

function initTimelineReveal() {
    const items = document.querySelectorAll('.timeline-story');
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    items.forEach(item => observer.observe(item));
}

function initDonationFormSubmit() {
    const form = document.getElementById('pa-donation-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        openModal("Thank You for Your Generosity!", `
            <p>Your donation details have been received. As a light-themed Christian NGO, your support helps Possibilities Africa equip rural pastors and transform communities across East and Central Africa.</p>
            <p>May God bless you abundantly for partnering with us!</p>
        `);
        form.reset();
    });
}

function initScrollToDonate() {
    document.querySelectorAll('.btn-scroll-to-donate').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('.donation-modern-card') || document.querySelector('.donation-embed-card');
            if (!target) return;
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('donation-highlight-pulse');
            setTimeout(() => target.classList.remove('donation-highlight-pulse'), 1200);
        });
    });
}

const storyData = {
    "leadership": { title: "Transformational Leadership Development Detail", body: `<p><strong>Transformational Leadership</strong> is the cornerstone program of Possibilities Africa. Our philosophy is that community transformation begins with leaders who are equipped spiritually, intellectually, and socially.</p><p>Through organizing, training, and mentoring rural pastor-leaders, PA initiates a Ripple Effect.</p><p><strong>Impact Milestones:</strong> Over 1,200 pastors trained across Kenya, Ethiopia, Malawi, and Zambia.</p>` },
    "discipleship": { title: "Holistic Spiritual Discipleship", body: `<p>At Possibilities Africa, we believe that durable, long-term transformation must be rooted in Christian faith and personal spiritual growth.</p><p>Our program trains pastors to lead active discipling ministries, teaching integrity, work as a gift from God, stewardship, and loving one's neighbor.</p><p><strong>Inside Out Transformation:</strong> Spiritual growth breaks fatalistic attitudes, replacing them with hope and self-respect.</p>` },
    "productivity": { title: "Economic Productivity & Micro-Enterprise", body: `<p>Most rural African communities possess rich natural resources but lack structural frameworks to capture their value.</p><p>Pastors and church leaders are trained in business management, saving circles, and sustainable agriculture.</p><p><strong>Sustainable Growth:</strong> Households generate their own income and provide jobs inside their own villages.</p>` },
    "mentoring": { title: "Mentoring the Next Generation", body: `<p>PA's mentoring program equips youth and children in rural villages with leadership skills, educational support, and spiritual grounding.</p><p>We host youth leadership camps, career mentorship workshops, and character building programs.</p><p><strong>Building Tomorrow's Africa:</strong> We prepare young people to become ethical, visionary citizens.</p>` },
    "citizenship": { title: "Responsible Citizenship & Civic Action", body: `<p>The Responsible Citizenship program trains pastors and villagers to proactively engage in community affairs.</p><p>Villages organize clean-ups, construct local infrastructure, and partner with regional governments.</p><p><strong>Dignity and Action:</strong> Communities realize they have the power to solve their own challenges.</p>` },
    "martin-bio": { title: "About Founder Martin Simiyu", body: `<p><strong>Martin Simiyu</strong> is the Founder and President of Possibilities Africa, convinced that Africa's challenges can be resolved internally through faith, diligence, and self-reliance.</p><p>Today, PA operates in four countries, actively expanding across the continent.</p>` },
    "story-pastor": { title: "Pastor Abdisa: A man caught between ongoing rebel conflicts", body: `<p><em>Ethiopia — Transformational Leadership</em></p><p>Inchini, a town in Ethiopia, is plagued by ongoing conflicts that frequently disrupt and sometimes completely close schools, businesses, and gatherings, including church services. Pastor Abdisa struggles to support his church and family during these disruptions. Additionally, he has always been slow to engage in activities outside his church due to his church culture.</p><p>Pastor Abdisa engaged with Possibilities Africa (PA) and was intrigued by what the organization teaches. When the time came for centralized training with pastors selected from the rural parts of the country, he couldn't miss being onboarded on the 2 year holistic program. In October 2023, he attended the Module 1 training — PA's first programmatic training that introduces holistic ministry programs. For the first time, he learned to integrate spiritual, economic, and social development as part of day to day church activities.</p><p>Returning from the training, Pastor Abdisa began teaching holistic ministry concepts. To promote continuous spiritual growth among the members, he started three Bible study groups, aligning with the spiritual discipleship training provided by PA. Building on the skills acquired during the training, he also initiated business training for the youth.</p><p>Despite facing initial resistance from the community — whose culture traditionally limits ministers' involvement in other activities — he firmly believes that empowering the youth with business skills will help address the persistent issue of youth unemployment. The Bible study groups are growing, with each of the three groups having over eighteen members who meet weekly.</p><p><strong>Leading by example</strong>, Pastor Abdisa supplements his income through butter sales. These visible efforts are gradually inspiring acceptance of the holistic ministry concept among church elders. Pastor Abdisa's journey shows the power of holistic ministry.</p>` },
    "story-baking": { title: "Mary Mvilera's decision to make a living out of selling scones", body: `<p><em>Malawi — Economic Productivity</em></p><p>At 35 years old, Mary Mvilera is married with 4 children. Before PA programs were introduced in her community, she solely depended on her husband's sand business, which was not sustainable, to cater to the family's needs.</p><p>Her pastor, Namaona Seleman, who attended all Possibilities Africa training as of 2021, introduced holistic ministry teachings in his church. He introduced the essence of using locally available resources, God-given talent, and skills and working in groups to generate income for their families. These teachings intrigued Mary and she became interested to know more about the concepts so as to change her family's fortunes.</p><p>Out of the skills she had gained, she started a scones-baking business with an initial loan of MK15,000. She had also learned the importance of saving and reinvesting in the business. At the time PA was engaging with her, she had grown her savings to MK20,000 which allowed her to borrow more from the Shalom group.</p><p>Using her credibility following successfully repaying the first loan, Mary borrowed another loan of MK30,000 and encouraged her husband to invest in the potato business. At the time PA was engaging with the family again, the potato business was making MK30,000 in a week. The businesses have improved the family's living standards.</p><p><strong>Spiritually</strong>, Mary has replicated frequent prayer and bible study at the Shalom group meetings within her own family — something they struggled to find time for before engaging with PA.</p>` },
    "story-farming": { title: "A young man growing his church and crops", body: `<p><em>Zambia — Spiritual Discipleship</em></p><p>Pastor Chaambwa Siachilwena, a young pastor in Zambia, once relied solely on church contributions and did not see the need to engage in income-generating activities, as he was alone and did not have many needs to cater to.</p><p>His perspective changed when he met Possibilities Africa (PA), which enlightened him through its training on the importance of building wealth by utilizing available resources. The teachings came at an opportune time, as he had just started a new family, resulting in more needs and straining his monthly income.</p><p>Pastor Chaambwa identified idle church land and, with the church members' blessings, he began cultivating winter maize, tomatoes, green, and kidney beans. This marked the start of his economic transformation. The first harvest was a success! While honing the entrepreneurial skills sparked during PA's training, he sells fresh vegetables in the community — an initiative that has significantly increased his family's income.</p><p>Inspired by his success, Pastor Chaambwa has formed Shalom groups to transfer these skills to church members and the community. He is also keen to explore other areas trained by PA: Mentoring the Next Generation, Spiritual Discipleship, and Responsible Citizenship. <strong>His efforts are creating a ripple effect of positive change.</strong></p>` },
    "story-drought": { title: "Women building trench dams to store water for irrigation", body: `<p><em>Kenya — Responsible Citizenship</em></p><p>Kwale is one of the counties in Kenya that experiences severe droughts. Whenever this happens, the communities in the region are forced to deal with hunger pangs due to poor harvests. This affects the families' living standards, as they largely depend on agricultural activities for their livelihood.</p><p>Pastor Richard Mazera of Mnyenzeni PEFA Church is one of the community residents whom Possibilities Africa (PA) partners with to champion transformation. Through PA training, he realized that while natural disasters like droughts are inevitable, proper planning and early intervention can significantly reduce their negative effects.</p><p>Pastor Richard shared this newfound knowledge with the church after participating in PA training. He organized his congregation into Shalom groups. The women's Shalom group, in particular, was interested in vegetable farming, but they understood that addressing the water shortage was crucial for the project's success.</p><p>To store water during the short rains expected in November and December, the group is building trench dams. The water collected and stored in the wells will be used to irrigate the crops. Pastor Richard has encouraged the women's group to apply smart farming techniques, such as mulching, to conserve water during farming.</p><p><strong>Community-funded and community-led</strong> — the ongoing project is funded by money collected through table banking and merry-go-round activities, financial empowerment skills also covered in PA training.</p>` },
    "story-owino": { title: "Pastor Owino: the children mentorship champion", body: `<p><em>Kenya — Mentoring the Next Generation</em></p><p>Malindi CIFA is within Kilifi County, one of the poorest counties on Kenya's coast. Many young people drop out of school early for seasonal hotel jobs, contributing to low literacy and rising poverty.</p><p>Pastor Owino attended PA training in Nairobi in 2017, where he was challenged to minister holistically, with a specific conviction to reach out to children. In agreement with his wife, he began an early childhood development centre inside his church compound.</p><p>Three years later, the school enrols 103 children across day care, baby class and two pre-primary levels, with 19 graduating to grade one. "The vision was imposed in me about many children in the village who were not going to school," Pastor Owino recalls. "I found a lady who could teach... whatever small would come out would be shared. Her work was brilliant!"</p><p><strong>Now facing challenges of growth</strong>, the community wants the school to expand into a full primary school, and Pastor Owino continues turning available rooms — even a former kitchen — into classrooms.</p>` },
    "story-rachuonyo": { title: "Rachuonyo: a community's story of transformation", body: `<p><em>Kenya — Responsible Citizenship</em></p><p>In October 2020, Possibilities Africa began a journey with 35 pastors from 21 denominations in Rachuonyo, after Bishop Joseph of Ahero — one of PA's first recruits over six years earlier — introduced the community to the holistic model.</p><p>A community needs assessment revealed deep-rooted challenges: traditional practices including widow inheritance affecting 75% of the adult population, and 72.4% of families living below US$1.25 a day. Fathers were often absent from family life, contributing to early pregnancies and low school performance among the majority-youth population.</p><p>Despite this, PA views Africa as a continent of immense potential rather than perpetual poverty. The pastor leaders completed the first stage of PA's four-step journey — information sharing, community needs assessment, feedback, and prioritisation of needs — laying the foundation for lasting change.</p><p><strong>A budding story of transformation</strong> continues to unfold as the group deepens its commitment to holistic ministry.</p>` },
    "story-fikre": { title: "Making decisions around the ministry and money", body: `<p><em>Ethiopia — Economic Productivity</em></p><p>"A pastor cannot mix ministry work with money. This is unspiritual!" This narrative led Pastor Fikre to sell off land inherited from his parents, leaving his family reliant on hired-out plots for school fees.</p><p>After PA training, Pastor Fikre was convicted to build a sustainable model around his ministry and family life. Noticing the busy trade route through his village between Addis Ababa and Djibouti, he and his wife built rental rooms for truck drivers in transit — funded through a PA loan rather than selling more land.</p><p>Today the family home and two rental units are complete. Pastor Fikre now works with fellow pastors in his CIFA group to purchase a brick-making machine to serve more community members.</p><p><strong>Through his example</strong>, the church and community are learning that holistic transformation requires both ministry and money for the benefit of the family and the community.</p>` },
    "story-koka": { title: "Pastors planting churches — and vegetables — in Koka", body: `<p><em>Ethiopia — Spiritual Discipleship</em></p><p>In Koka, an area once marked by serious persecution of Christians, Pastor Brihanu's small kiosk became a safe space for fellowship. From that little shop, 20 churches were planted through Bible study cell groups.</p><p>Fellow believers pressured him to close the shop and focus solely on ministry, but he knew it sustained both his family and the 20 churches he had planted. "I always knew that God has more in terms of ministry, and that more is about being holistic," he says.</p><p>After PA training, Pastor Brihanu partnered with his CIFA group to establish a vegetable and onion farming project, mentoring fellow pastor Ermiyas in commercial farming using a loan from PA.</p><p><strong>A planter of churches and vegetables alike</strong> — his example of productivity now anchors the holistic message he preaches to 20 congregations.</p>` },
    "story-jeremiah": { title: "Pastor Jeremiah Haleke's story", body: `<p><em>Malawi — Mentoring the Next Generation</em></p><p>Pastor Jeremiah Haleke leads the Ntchisi group and pastors Deeper Life Bible Church, serving 72 adult members and 57 children alongside his wife Grace and their five children. He has walked the holistic ministry journey since 2016.</p><p>Convicted to address the education gap in his area, Pastor Jeremiah started a community school that now teaches over 100 children. Through better management of resources from his farming, his family moved into a stone house and can now enjoy a car ride around the community.</p><p><strong>As both teacher and pastor</strong>, he trains children in Bible reading, scripture memory and monthly community activities — bringing joy and hope to the children of Ntchisi as he raises up champions of holistic transformation.</p>` },
    "story-liwedi": { title: "Liwedi impact highlights", body: `<p><em>Malawi — Economic Productivity</em></p><p>The pastor leaders of Liwedi (Lilongwe West) have demonstrated ownership of PA's holistic vision, now discipling and training 40 Shalom group members in vegetable production to improve family nutrition and generate income.</p><p>With micro-financing support from PA, the group secured farming land, allocating a hectare to community small groups for vegetable farming, and partnering to plant sugar cane as part of a wider economic empowerment project.</p><p>The pastors also rehabilitated a divorced, devastated young woman by boosting her broom-making business with MK10,000 from their own savings — paired with prayer, visits and reintegration into community life.</p><p><strong>Fifteen youth trained</strong> in spiritual discipleship and life skills have gone on to plant three churches, part of over 3,000 young people equipped with life skills through the Liwedi community's transformation.</p>` },
    "story-webuye": { title: "Webuye CIFA groups embrace table banking", body: `<p><em>Kenya — Economic Productivity</em></p><p>In Webuye Constituency — the very ground where PA's journey began in 2005 — pastor leaders continue to deepen the holistic model nearly two decades on. A cluster of CIFA groups meets weekly, pooling savings through table banking and merry-go-round contributions.</p><p>What started as a handful of pastors testing a new way of ministry has grown into a network spanning dozens of churches, each running its own Shalom group for members to save, borrow and invest in small enterprises.</p><p>Pastor leaders report that families who once depended solely on subsistence farming now run poultry, tailoring and grocery businesses funded through group savings.</p><p><strong>Nearly twenty years on</strong>, Webuye remains a living example of how a single church's commitment to holistic ministry can ripple outward into an entire constituency.</p>` },
    "story-bungoma-school": { title: "A church-run school changing Bungoma's future", body: `<p><em>Kenya — Mentoring the Next Generation</em></p><p>In Bungoma County, a rural congregation partnered with its Shalom group to convert an underused church hall into a community primary school. What began with 30 pupils under a corrugated iron roof now serves over 150 children from the surrounding villages.</p><p>Teachers, many of them church volunteers trained through PA's mentoring track, combine basic literacy and numeracy with life-skills lessons drawn from the holistic ministry curriculum.</p><p>Parents who once walked children over an hour to the nearest school now see their children thrive closer to home, with attendance and performance steadily rising each term.</p><p><strong>A generation of Bungoma's children</strong> is growing up with both an education and a church community invested in their future.</p>` },
    "story-kilifi-youth": { title: "Kilifi's young people trade idleness for enterprise", body: `<p><em>Kenya — Responsible Citizenship</em></p><p>Along Kenya's coast, Kilifi County's youth have long faced a familiar cycle: leaving school early for seasonal hotel work, with few paths back to stable income once the tourist season ends.</p><p>Pastor leaders trained by PA began organising youth-focused Shalom groups, teaching basic bookkeeping, saving discipline and small-scale trade skills alongside Bible study.</p><p>Groups of young people have since pooled resources to start motorcycle taxi cooperatives, fishmongering stalls and tailoring units — activities that keep income flowing between tourist seasons.</p><p><strong>What began as a handful of restless teenagers</strong> meeting after church now anchors a growing culture of enterprise among Kilifi's youth.</p>` },
    "story-lilongwe-savings": { title: "Lilongwe's Shalom groups build a savings culture", body: `<p><em>Malawi — Economic Productivity</em></p><p>Across Lilongwe's rural outskirts, pastor leaders discipled through PA have introduced Shalom savings groups as a core part of church life, meeting weekly alongside Bible study to pool small contributions.</p><p>Members who once had no access to formal credit now borrow from their own group's savings to buy seed, livestock or trading stock, repaying with modest interest that grows the group's shared fund.</p><p>Several groups have gone on to jointly lease farmland for maize and vegetable production, sharing both the labour and the harvest among member families.</p><p><strong>What started as spare coins</strong> collected after Sunday service has grown into a dependable safety net for dozens of households.</p>` },
    "story-ntchisi-health": { title: "Ntchisi pastors champion family health and hygiene", body: `<p><em>Malawi — Responsible Citizenship</em></p><p>In the Ntchisi district, pastor leaders trained through PA's holistic curriculum have taken up public health education as part of their pastoral work, teaching basic hygiene, clean water handling and nutrition alongside Sunday sermons.</p><p>Working with the Deeper Life network of churches, pastors organised borehole clean-up days and encouraged families to build simple handwashing stations at home.</p><p>Cases of preventable illness in participating villages have visibly declined, and mothers credit the church-led health talks for changes in how they prepare and store food and water.</p><p><strong>A pulpit message about hygiene</strong> has quietly become one of the most practical forms of holistic ministry in Ntchisi.</p>` },
    "story-mzimba-cooperative": { title: "Mzimba's pastor-led farming cooperative", body: `<p><em>Malawi — Spiritual Discipleship</em></p><p>In Mzimba, a group of pastors who trained together through PA's Module 1 programme decided to put their shared conviction — that ministry and livelihood are not separate — into practice by forming a joint farming cooperative.</p><p>Each participating church contributes labour and a share of seed costs to a communal maize and groundnut plot, with proceeds split between household income and a fund for church-run community projects.</p><p>Weekly Bible study now doubles as a planning meeting for the cooperative, weaving spiritual discipleship directly into decisions about planting, harvesting and selling.</p><p><strong>The cooperative's first two harvests</strong> have already funded a borehole repair and school fees for several orphaned children in the group's care.</p>` }
};

const countryStoriesData = {
    kenya: [
        { key: "story-drought", title: "Women building trench dams to store water for irrigation", category: "Responsible Citizenship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/Women-building-dams-768x1066.jpg", excerpt: "Kwale is one of the counties in Kenya that experiences severe droughts. Whenever this happens, the communities..." },
        { key: "story-owino", title: "Pastor Owino: the children mentorship champion", category: "Mentoring the Next Generation", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/children3-768x384.jpg", excerpt: "Malindi CIFA is within Kilifi County, one of the poorest counties in Kenya. Pastor Owino answered a call to..." },
        { key: "story-rachuonyo", title: "Rachuonyo: a community's story of transformation", category: "Responsible Citizenship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/rachuonyo6-1024x878.jpg", excerpt: "A journey that Possibilities Africa began in October 2020 with 35 pastors from 21 denominations..." },
        { key: "story-webuye", title: "Webuye CIFA groups embrace table banking", category: "Economic Productivity", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2018/12/pst-festus-ngare-during-the-sacco-training.jpg", excerpt: "In Webuye Constituency, where PA's journey began in 2005, pastor leaders continue deepening the holistic model..." },
        { key: "story-bungoma-school", title: "A church-run school changing Bungoma's future", category: "Mentoring the Next Generation", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/Participation-in-training.jpg", excerpt: "A rural congregation converted an underused church hall into a community primary school now serving 150 children..." },
        { key: "story-kilifi-youth", title: "Kilifi's young people trade idleness for enterprise", category: "Responsible Citizenship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/7.jpg", excerpt: "Along Kenya's coast, youth-focused Shalom groups are teaching bookkeeping, saving discipline and small trade skills..." }
    ],
    ethiopia: [
        { key: "story-pastor", title: "Pastor Abdisa: A man caught between ongoing rebel conflicts", category: "Transformational Leadership", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/Abdisa-2.png", excerpt: "Inchini, a town in Ethiopia, is plagued by ongoing conflicts that frequently disrupt and sometimes completely..." },
        { key: "story-fikre", title: "Making decisions around the ministry and money", category: "Economic Productivity", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/Fekri-768x1024.jpg", excerpt: "\u201cA pastor cannot mix ministry work with money. This is unspiritual!\u201d Pastor Fikre found another way..." },
        { key: "story-koka", title: "Pastors planting churches and vegetables in Koka", category: "Spiritual Discipleship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/gettyimages-1177018352-640x640-1.jpg", excerpt: "From a small kiosk in Koka, 20 churches have been planted with cell groups for prayer and Bible reading..." }
    ],
    tanzania: [
        { key: "story-tanzania", title: "Extending the ripple across East Africa", category: "Transformational Leadership", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/Arsi-M1-2023-1-1-scaled.jpg", excerpt: "Every new Tanzanian ministry site begins the same way: recruit a rural pastor, equip them for holistic ministry..." }
    ],
    rwanda: [
        { key: "story-rwanda", title: "Pastor leaders championing holistic transformation", category: "Transformational Leadership", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2020/07/Land.jpeg", excerpt: "Rwandan pastors in CIFA groups are recording growth of churches and improved living standards..." }
    ],
    burundi: [
        { key: "story-burundi", title: "Equipping pastors on new ground", category: "Transformational Leadership", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/rachuonyo5-1024x652.jpg", excerpt: "In each new Burundian community, PA begins by training rural pastors so the local church can lead its village..." }
    ],
    zambia: [
        { key: "story-farming", title: "A young man growing his church and crops", category: "Spiritual Discipleship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/pexels-cristian-rojas-10041330-768x513.jpg", excerpt: "Pastor Chaambwa Siachilwena, a young pastor in Zambia, once relied solely on church contributions and..." }
    ],
    malawi: [
        { key: "story-baking", title: "Mary Mvilera's decision to make a living out of selling scones", category: "Economic Productivity", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2024/09/pexels-zain-abba-116752359-17450212-768x512.jpg", excerpt: "At 35 years old, Mary Mvilera is married with 4 children. Before PA programs were introduced in her community,..." },
        { key: "story-jeremiah", title: "Pastor Jeremiah Haleke's story", category: "Mentoring the Next Generation", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/IMG-20210205-WA0018-1024x576.jpg", excerpt: "Pastor Jeremiah Haleke is the leader of the Ntchisi group, pastoring 72 adults and 57 children..." },
        { key: "story-liwedi", title: "Liwedi impact highlights", category: "Economic Productivity", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/Divorced-lady-in-her-broom-making-business-1024x768.jpg", excerpt: "As a stable group that has journeyed with PA, the pastor leaders in Liwedi are championing holistic..." },
        { key: "story-lilongwe-savings", title: "Lilongwe's Shalom groups build a savings culture", category: "Economic Productivity", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/IMG-20210205-WA0017.jpg", excerpt: "Across Lilongwe's rural outskirts, Shalom savings groups meet weekly alongside Bible study, pooling small..." },
        { key: "story-ntchisi-health", title: "Ntchisi pastors champion family health and hygiene", category: "Responsible Citizenship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/Liwedi-small-group-of-40-in-veg-production-training.jpg", excerpt: "Pastor leaders in Ntchisi have taken up public health education, teaching hygiene and nutrition alongside sermons..." },
        { key: "story-mzimba-cooperative", title: "Mzimba's pastor-led farming cooperative", category: "Spiritual Discipleship", image: "https://africa.possibilitiesafrica.org/wp-content/uploads/2021/08/Malawi-video1.png", excerpt: "Pastors who trained together through PA's Module 1 programme formed a joint farming cooperative..." }
    ]
};

storyData["story-tanzania"] = { title: "Extending the ripple across East Africa", body: `<p><em>Tanzania — Transformational Leadership</em></p><p>Every new Tanzanian ministry site begins the same way: recruit a rural pastor, equip them for holistic ministry, and watch the church become a growth centre for its village.</p><p>As PA's newest footprint in East Africa, Tanzania is being built one CIFA group at a time — pastors trained in spiritual discipleship, economic productivity and responsible citizenship, replicating the model proven in Kenya and Ethiopia.</p><p><strong>The ripple effect</strong> is only beginning, with early groups already forming savings circles and Bible study cells in their communities.</p>` };
storyData["story-rwanda"] = { title: "Pastor leaders championing holistic transformation", body: `<p><em>Rwanda — Transformational Leadership</em></p><p>Rwandan pastors in CIFA groups are recording growth of churches and improved living standards inspired by the truth of the whole Gospel.</p><p>Since joining the PA network, these pastor leaders have begun integrating spiritual discipleship with practical economic activities, following the same holistic model that has transformed communities in Kenya, Ethiopia, Malawi and Zambia.</p><p><strong>Early fruit</strong> is visible as congregations grow and families report improved living standards.</p>` };
storyData["story-burundi"] = { title: "Equipping pastors on new ground", body: `<p><em>Burundi — Transformational Leadership</em></p><p>In each new Burundian community, PA begins by training rural pastors so the local church can lead its village into lasting transformation.</p><p>Pastor leaders newly recruited into the CIFA model are undergoing the first stages of PA's holistic journey — spiritual discipleship, community needs assessment, and the formation of Shalom groups for economic empowerment.</p><p><strong>A new chapter</strong> of the PA ripple effect is beginning to take root in Burundi's rural churches.</p>` };

function renderCountryStories() {
    const grid = document.querySelector('.country-stories-grid');
    if (!grid) return;
    const country = grid.dataset.country;
    const allStories = countryStoriesData[country];
    if (!allStories || !allStories.length) return;
    const limit = parseInt(grid.dataset.limit, 10);
    const stories = limit ? allStories.slice(0, limit) : allStories;

    grid.innerHTML = stories.map((s, i) => `
        <article class="country-story-card fresh-reveal" style="--fs-delay:${i * 120}ms">
            <div class="country-story-img">
                <img src="${s.image}" alt="${s.title}" loading="lazy" onerror="this.onerror=null;this.src=(window.__PA_ASSETS&&window.__PA_ASSETS.heroCommunity)||'assets/hero-community.jpg'">
            </div>
            <div class="country-story-body">
                <span class="country-story-category">${s.category}</span>
                <h3 class="country-story-title">${s.title}</h3>
                <p class="country-story-excerpt">${s.excerpt}</p>
                <a href="#" class="story-link" data-modal-target="${s.key}">Read Story <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </article>
    `).join('');
}

function initModals() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');
    if (!modalOverlay || !closeBtn) return;

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-target]');
        if (trigger) {
            e.preventDefault();
            const data = storyData[trigger.dataset.modalTarget];
            if (data) openModal(data.title, data.body);
        }
    });

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
}

function openModal(titleText, bodyHtml) {
    const modalOverlay = document.querySelector('.modal-overlay');
    document.querySelector('.modal-content-title').textContent = titleText;
    document.querySelector('.modal-content-body').innerHTML = bodyHtml;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* Field Stories carousel: slides one card at a time, showing 3 cards on
   desktop, 2 on tablet, 1 on mobile. Arrows disable at the ends. */
function initStoriesCarousel() {
    const track = document.getElementById('stories-track');
    const prevBtn = document.getElementById('stories-prev');
    const nextBtn = document.getElementById('stories-next');
    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.children);
    let index = 0;

    function cardsPerView() {
        const w = window.innerWidth;
        if (w <= 700) return 1;
        if (w <= 1100) return 2;
        return 3;
    }



    function maxIndex() {
        return Math.max(0, cards.length - cardsPerView());
    }

    function update() {
        const max = maxIndex();
        if (index > max) index = max;
        if (index < 0) index = 0;

        const card = cards[0];
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
        const cardWidth = card.getBoundingClientRect().width + gap;

        track.style.transform = `translateX(-${index * cardWidth}px)`;
        prevBtn.disabled = index <= 0;
        nextBtn.disabled = index >= max;
    }

    prevBtn.addEventListener('click', () => { index -= 1; update(); });
    nextBtn.addEventListener('click', () => { index += 1; update(); });
    window.addEventListener('resize', update);

    update();
}

/* Generic scroll-reveal: fades/slides in section blocks and cards as they
   enter the viewport, with a slight stagger for siblings in the same grid.
   Works site-wide without needing to touch every page's markup. */
function initScrollReveal() {
    const selector = [
        '.result-card', '.story-card-mini', '.testimonial-card', '.value-card',
        '.content-block-grid', '.founder-mini-card', '.ow-program',
        '.footprint-stat-box', '.impact-cell', '.donation-method',
        '.support-impact-item', '.career-role', '.donation-amount',
        '.section-header', '.newsletter-grid', '.donation-grid',
        '.ripple-info-card', '.pin-cluster-card', '.footprint-stats',
        '.world-map-card', '.footprint-country-panel',
        '.about-mission-banner', '.about-cta-banner', '.vm-card',
        '.gi-mission-photo', '.gi-video-card', '.gi-contact-card', '.gi-video-label',
        '.gi-mission-quote', '.gi-mission-text', '.gi-timeline-item',
        '.reveal-text', '.reveal-image', '.pav-row', '.pab-card',
        '.slide-in-left', '.slide-in-right', '.slide-in-right-delay'
    ].join(',');

    const items = Array.from(document.querySelectorAll(selector)).filter(el => {
        if (document.body.classList.contains('country-page') && (el.classList.contains('content-block-grid') || el.classList.contains('footprint-stat-box'))) return false;
        return true;
    });
    if (!items.length) return;

    const siblingCount = new Map();
    items.forEach(el => {
        el.classList.add('reveal');
        const parent = el.parentElement;
        const count = siblingCount.get(parent) || 0;
        el.style.transitionDelay = Math.min(count * 90, 450) + 'ms';
        siblingCount.set(parent, count + 1);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
}

/* Fresh, distinct entrance style for country pages: diagonal wipe + skew
   settle, applied to content blocks, video, initiatives and story cards.
   Number/icon stat counters are untouched (separate observer). */
function initCountryFreshReveal() {
    if (!document.body.classList.contains('country-page')) return;
    const selector = '.content-block-grid, .country-video, .initiative-item, .country-story-card, .country-stories-grid .section-header, .footprint-country-panel';
    const items = document.querySelectorAll(selector);
    if (!items.length) return;

    items.forEach((el, i) => {
        if (!el.classList.contains('fresh-reveal')) {
            el.classList.add('fresh-reveal');
            if (!el.style.getPropertyValue('--fs-delay')) {
                el.style.setProperty('--fs-delay', Math.min(i * 70, 350) + 'ms');
            }
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fresh-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    items.forEach(el => observer.observe(el));
}

function initFounderToggle() {
    const btn = document.getElementById('founder-toggle-btn');
    const msg = document.getElementById('founder-full-message');
    if (!btn || !msg) return;
    btn.addEventListener('click', () => {
        msg.classList.toggle('open');
        btn.textContent = msg.classList.contains('open') ? 'Show Less' : 'Read Full Message';
    });
}

/* Result card click-to-select: single-select with smooth animated title color change */
(function initResultCardSelect(){
    const cards = document.querySelectorAll('.result-card');
    if(!cards.length) return;
    cards.forEach(card => {
        card.setAttribute('role','button');
        card.setAttribute('tabindex','0');
        const toggle = () => {
            const wasSelected = card.classList.contains('selected');
            cards.forEach(c => c.classList.remove('selected'));
            if(!wasSelected) card.classList.add('selected');
        };
        card.addEventListener('click', toggle);
        card.addEventListener('keydown', e => {
            if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); }
        });
    });
})();


/* Result card mouse-tracked radial shine ("come-out" light) */
(function initResultCardShine(){
    const cards = document.querySelectorAll('.result-card');
    if(!cards.length) return;
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });
})();

/* Pastor testimonials: windowed carousel showing 3 cards per page, with
   prev/next arrows, dot pagination, and a custom glow-highlight animation
   applied to newly revealed cards on navigation. */
function initTestimonialsCarousel(){
    const viewport = document.querySelector('.testimonials-viewport');
    const track = document.getElementById('testi-track');
    const prev = document.getElementById('testi-prev');
    const next = document.getElementById('testi-next');
    const dotsWrap = document.getElementById('testi-dots');
    if (!viewport || !track || !prev || !next) return;
    const cards = Array.from(track.children);
    if (!cards.length) return;

    const VISIBLE = 3;
    const maxIdx = Math.max(0, cards.length - VISIBLE);
    let idx = 0;

    // Build one dot per page (page count = maxIdx + 1)
    if (dotsWrap){
        dotsWrap.innerHTML = '';
        for (let i = 0; i <= maxIdx; i++){
            const b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('aria-label', `Go to page ${i+1}`);
            b.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(b);
        }
    }

    function cardStep(){
        if (cards.length < 2) return 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left + 0 || (cards[0].offsetWidth + gap);
    }

    function glowRevealed(prevIdx, newIdx){
        // Determine which visible cards are "new" for this step and glow them.
        const visibleNow = cards.slice(newIdx, newIdx + VISIBLE);
        const visibleBefore = cards.slice(prevIdx, prevIdx + VISIBLE);
        visibleNow.forEach(card => {
            if (!visibleBefore.includes(card)){
                card.classList.remove('is-glowing');
                // restart animation
                void card.offsetWidth;
                card.classList.add('is-glowing');
                card.addEventListener('animationend', () => card.classList.remove('is-glowing'), { once: true });
            }
        });
    }

    function update(prevIdx){
        const step = cardStep();
        track.style.transform = `translateX(-${idx * step}px)`;
        prev.disabled = idx <= 0;
        prev.classList.toggle('is-hidden', idx <= 0);
        next.disabled = idx >= maxIdx;
        if (dotsWrap){
            Array.from(dotsWrap.children).forEach((d, i) => {
                d.classList.toggle('active', i === idx);
            });
        }
        if (typeof prevIdx === 'number' && prevIdx !== idx){
            glowRevealed(prevIdx, idx);
        }
    }

    function goTo(i){
        const prevIdx = idx;
        idx = Math.min(Math.max(i, 0), maxIdx);
        if (idx !== prevIdx) update(prevIdx);
    }

    prev.addEventListener('click', () => goTo(idx - 1));
    next.addEventListener('click', () => goTo(idx + 1));

    window.addEventListener('resize', () => update());

    update();
}

/* ============ Impact marquee: gold when item crosses viewport centre ============
   Keeps the CSS animation running always (never pauses on click/hover) and just
   toggles a `.at-center` class on items whose horizontal midpoint is within a
   small band around the viewport centre. Colour transition is handled in CSS. */
(function initImpactMarqueeCenterHighlight() {
    const section = document.querySelector('.impact-marquee-section');
    if (!section) return;

    // Never let a click/tap pause the animation.
    ['mousedown', 'pointerdown', 'touchstart', 'click'].forEach((evt) => {
        section.addEventListener(evt, (e) => {
            // Do not preventDefault (keeps text selectable / focusable) but ensure
            // no code path pauses the CSS animation.
            const track = section.querySelector('.impact-marquee-track');
            if (track) track.style.animationPlayState = 'running';
        }, { passive: true });
    });

    const items = Array.from(section.querySelectorAll('.impact-marquee-item'));
    if (!items.length) return;

    // Band around the viewport centre where an item is considered "at centre".
    const BAND = 90; // px on each side of centre

    let rafId = 0;
    function tick() {
        const centerX = window.innerWidth / 2;
        for (let i = 0; i < items.length; i++) {
            const el = items[i];
            const rect = el.getBoundingClientRect();
            const mid = rect.left + rect.width / 2;
            const atCenter = Math.abs(mid - centerX) <= BAND;
            if (atCenter) {
                if (!el.classList.contains('at-center')) el.classList.add('at-center');
            } else if (el.classList.contains('at-center')) {
                el.classList.remove('at-center');
            }
        }
        rafId = requestAnimationFrame(tick);
    }

    // Pause the rAF loop when section is off-screen for perf, resume when visible.
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!rafId) rafId = requestAnimationFrame(tick);
                } else {
                    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
                    items.forEach((el) => el.classList.remove('at-center'));
                }
            });
        }, { threshold: 0 });
        io.observe(section);
    } else {
        rafId = requestAnimationFrame(tick);
    }
})();

// Video wrap reveal
(function(){
  const el = document.querySelector('.video-wrap');
  if (!el) return;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target);} });
    },{threshold:.2});
    io.observe(el);
  } else { el.classList.add('revealed'); }
})();

// Country stat counter animation
(function(){
  const nums = document.querySelectorAll('.country-stat .footprint-stat-num[data-count]');
  if(!nums.length) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count,10);
    const suffix = el.dataset.suffix || '';
    if(isNaN(target)) return;
    const dur = 1400; const start = performance.now();
    const step = (t) => {
      const p = Math.min(1,(t-start)/dur);
      const eased = 1 - Math.pow(1-p,3);
      el.textContent = Math.round(target*eased) + suffix;
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{ if(e.isIntersecting){ animate(e.target); io.unobserve(e.target); }});
    },{threshold:.4});
    nums.forEach(n=>io.observe(n));
  } else { nums.forEach(animate); }
})();
