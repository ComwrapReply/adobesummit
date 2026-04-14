/**
 * Wraps each character of an h1 in a <span class="hero-char"> so the
 * zooming-wave CSS animation can stagger per letter.
 * Spaces become <span class="hero-char hero-char--space"> for layout.
 * @param {HTMLHeadingElement} h1
 */
function wrapChars(h1) {
  const text = h1.textContent;
  h1.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.classList.add('hero-char');
    if (char === ' ') {
      span.classList.add('hero-char-space');
      span.textContent = '\u00a0';
    } else {
      span.textContent = char;
    }
    // 80 ms stagger per character. The total stagger across 20 chars
    // (1.6 s) is close to the 1.8 s cycle, so the wave flows through
    // the title almost continuously with no dead pause.
    span.style.animationDelay = `${(i % 20) * 0.08}s`;
    h1.append(span);
  });
}

/**
 * Hero block – full-bleed image with text overlay at the bottom.
 *
 * DOM output:
 *   .hero
 *     .hero-image        ← full-bleed background layer (picture/img)
 *     .hero-content      ← overlay container (gradient + text)
 *       .hero-text       ← badge, heading, description, buttons
 *         h1 > .hero-char  ← one span per character for wave animation
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const pic = block.querySelector('picture');

  // Collect all non-image content elements
  const contentEls = [];
  block.querySelectorAll(':scope > div > div').forEach((col) => {
    [...col.children].forEach((el) => {
      if (el.tagName === 'P' && el.querySelector('picture') && el.children.length === 1) return;
      if (el.tagName === 'PICTURE') return;
      contentEls.push(el);
    });
  });

  block.textContent = '';

  // ── Image layer ──────────────────────────────────────────────
  const imageLayer = document.createElement('div');
  imageLayer.classList.add('hero-image');
  if (pic) {
    // Ensure the img inside fills the container
    const img = pic.querySelector('img');
    if (img) {
      img.removeAttribute('width');
      img.removeAttribute('height');
      img.setAttribute('loading', 'eager');
    }
    imageLayer.append(pic);
  }

  // ── Content overlay ──────────────────────────────────────────
  const contentLayer = document.createElement('div');
  contentLayer.classList.add('hero-content');

  const textCol = document.createElement('div');
  textCol.classList.add('hero-text');

  let foundHeading = false;
  contentEls.forEach((el) => {
    const clone = el.cloneNode(true);

    if (/^H[1-6]$/.test(clone.tagName)) foundHeading = true;

    // Tag short paragraph before the first heading as badge/eyebrow
    if (
      !foundHeading
      && clone.tagName === 'P'
      && !clone.querySelector('a')
      && !clone.querySelector('picture')
    ) {
      const text = clone.textContent.trim();
      if (text.length > 0 && text.length < 50) {
        clone.classList.add('hero-badge');
      }
    }

    // Detect single-link CTA paragraphs
    if (clone.tagName === 'P' && clone.querySelectorAll('a').length === 1 && clone.children.length <= 2) {
      const link = clone.querySelector('a');
      if (link) link.classList.add('button');
    }

    textCol.append(clone);
  });

  // Wrap CTA buttons
  const buttonParas = textCol.querySelectorAll('p:has(a.button)');
  if (buttonParas.length) {
    const btnWrap = document.createElement('div');
    btnWrap.classList.add('hero-buttons');
    buttonParas.forEach((p, i) => {
      const link = p.querySelector('a.button');
      if (i === 0) link.classList.add('button-primary');
      else link.classList.add('button-secondary');
      btnWrap.append(p);
    });
    textCol.append(btnWrap);
  }

  contentLayer.append(textCol);

  block.append(imageLayer);
  block.append(contentLayer);

  // Wrap h1 characters for the wave animation after DOM is built
  const h1 = block.querySelector('h1');
  if (h1) wrapChars(h1);
}
