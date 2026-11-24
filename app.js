const covers = [
 ['images/newspaper.jpg','The morning edition','A café reader holding a newspaper that asks Are you ready?'],
 ['images/reading.jpg','Between the pages','A fashion editorial with a reader in sunglasses looking over a magazine'],
 ['images/city.jpg','City of dreams','A monochrome New York skyline under a blush fashion masthead']
];
let page = 0;
function turnPage(step) {
 page = (page + step + covers.length) % covers.length;
 const [src, title, alt] = covers[page];
 const photo = document.querySelector('#cover-image');
 photo.src = src;
 photo.alt = alt;
 document.querySelector('#legend').textContent = '0' + (page + 1) + ' / 03　' + title;
 if (!matchMedia('(prefers-reduced-motion: reduce)').matches) photo.animate([{opacity:.55},{opacity:1}],{duration:360});
}
document.querySelector('#prev').addEventListener('click', () => turnPage(-1));
document.querySelector('#next').addEventListener('click', () => turnPage(1));
const skills = {
 'Languages':'Python, Java, C++, SQL',
 'Machine learning':'Machine learning, deep learning, feature engineering, model evaluation, large language models',
 'AI & NLP':'Natural language processing, generative AI, variational autoencoders, text processing',
 'Cloud & DevOps':'AWS EC2, MySQL RDS, GitHub Actions, CI/CD pipelines, REST APIs',
 'Engineering':'Object-oriented design, data structures and algorithms, database management systems, software engineering and project management',
 'Libraries':'PyTorch, TensorFlow, scikit-learn, pandas, NumPy'
};
const examples = {
 'Languages':'I used Python for CareerPilot AI and Java for the résumé screener.',
 'Machine learning':'Evaluating the résumé screener meant measuring keyword matches across more than 200 profiles.',
 'AI & NLP':'CareerPilot uses semantic search to retrieve jobs that fit a candidate’s experience and preferences.',
 'Cloud & DevOps':'GitHub Actions handled deployment of my résumé screener to AWS EC2.',
 'Engineering':'I separated PDF parsing and skill matching behind modular REST APIs.',
 'Libraries':'My research interests include deep learning, text processing and handwriting generation.'
};
const toolkit = document.querySelector('#skills');
for (const [title, items] of Object.entries(skills)) {
 const panel = document.createElement('article');
 panel.dataset.name = title;
 const heading = document.createElement('h3');
 heading.textContent = title;
 const list = document.createElement('ul');
 for (const skill of items.split(', ')) {
  const item = document.createElement('li');
  item.textContent = skill;
  list.append(item);
 }
 const note = document.createElement('p');
 note.textContent = examples[title];
 panel.append(heading, list, note);
 toolkit.append(panel);
}

for (const [index, reader] of [...document.querySelectorAll('.reader')].entries()) {
 const pages = [...reader.children];
 const menu = document.createElement('div');
 menu.className = 'reader-menu';
 menu.setAttribute('role', 'tablist');
 menu.setAttribute('aria-label', reader.dataset.label);
 reader.prepend(menu);
 function select(pageIndex) {
  pages.forEach((page, i) => {
   const active = i === pageIndex;
   page.hidden = !active;
   menu.children[i].setAttribute('aria-selected', String(active));
   menu.children[i].tabIndex = active ? 0 : -1;
  });
 }
 pages.forEach((page, i) => {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.textContent = page.dataset.name || page.querySelector('h3').textContent;
  tab.id = 'reader-' + index + '-tab-' + i;
  page.id = tab.id + '-panel';
  page.setAttribute('role','tabpanel');
  page.setAttribute('aria-labelledby',tab.id);
  page.tabIndex = 0;
  tab.setAttribute('role','tab');
  tab.setAttribute('aria-controls',page.id);
  tab.addEventListener('click', () => select(i));
  tab.addEventListener('focus', () => select(i));
  tab.addEventListener('pointerenter', e => {
   if (e.pointerType === 'mouse') select(i);
  });
  tab.addEventListener('keydown', e => {
   const keys = {ArrowLeft:(i+pages.length-1)%pages.length, ArrowRight:(i+1)%pages.length, Home:0, End:pages.length-1};
   if (e.key in keys) {
    e.preventDefault();
    menu.children[keys[e.key]].focus();
   }
  });
  menu.append(tab);
 });
 select(0);
}
for (const control of document.querySelectorAll('[data-copy]')) {
 const label = control.textContent;
 let reset;
 control.addEventListener('click', async () => {
  clearTimeout(reset);
  try {
   await navigator.clipboard.writeText(control.dataset.copy);
   control.textContent = 'Copied';
  } catch {
   window.prompt('Copy this text',control.dataset.copy);
  }
  reset = setTimeout(() => {control.textContent = label;},1800);
 });
}
for (const button of document.querySelectorAll('.case-open')) {
 const dialog = document.getElementById(button.getAttribute('aria-controls'));
 button.addEventListener('click', () => dialog.showModal());
 dialog.querySelector('.case-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('close', () => button.focus({preventScroll:true}));
}
