export default function decorate(block) {
  // Collect all content from all rows/cols
  const pic = block.querySelector('picture');
  const allElements = [];

  block.querySelectorAll(':scope > div > div').forEach((col) => {
    [...col.children].forEach((el) => {
      // Skip the paragraph that wraps only a picture
      if (el.tagName === 'P' && el.querySelector('picture') && el.children.length === 1) return;
      if (el.tagName === 'PICTURE') return;
      allElements.push(el);
    });
  });

  // Clear block
  block.textContent = '';

  // Build left column (text)
  const textCol = document.createElement('div');
  textCol.classList.add('hero-text');

  let foundHeading = false;
  allElements.forEach((el) => {
    const clone = el.cloneNode(true);

    if (/^H[1-6]$/.test(clone.tagName)) foundHeading = true;

    // Tag short paragraph before the first heading as badge/eyebrow
    if (!foundHeading && clone.tagName === 'P' && !clone.querySelector('a') && !clone.querySelector('picture')) {
      const text = clone.textContent.trim();
      if (text.length > 0 && text.length < 50) {
        clone.classList.add('hero-badge');
      }
    }

    // Detect CTA link paragraphs
    if (clone.tagName === 'P' && clone.querySelectorAll('a').length === 1
      && clone.children.length <= 2) {
      const link = clone.querySelector('a');
      if (link) link.classList.add('button');
    }

    textCol.append(clone);
  });

  // Wrap buttons in a container
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

  // Build right column (image)
  const imageCol = document.createElement('div');
  imageCol.classList.add('hero-image');
  if (pic) imageCol.append(pic);

  block.append(textCol);
  block.append(imageCol);
}
