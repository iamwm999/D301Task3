  const pages = ['home','page1','page2','page3','page4','page5','page6'];
  let completedPages = new Set();
  let currentPage = 'home';

  function showPage(pageId, navEl) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (navEl) navEl.classList.add('active');
    else {
      const found = document.querySelector('[data-page=' + pageId + ']');
      if (found) found.classList.add('active');
    }

    currentPage = pageId;
    if (pageId !== 'home') completedPages.add(pageId);
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
  }

  function updateProgress() {
    const total = 5;
    const done = completedPages.size;
    const pct = Math.round((done / total) * 100);
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressText').textContent = done + ' of ' + total + ' modules complete';
  }

  function checkScenario() {
    const allCorrect = ['b1','b2','b3','b4','b5','b6'];
    const checked = allCorrect.filter(id => document.getElementById(id).checked);
    const fb = document.getElementById('scenarioFeedback');
    fb.classList.add('show');
    if (checked.length === 6) {
      fb.className = 'feedback-msg show correct';
      fb.textContent = '✓ Excellent! You correctly identified all six accessibility barriers in the scenario. This assessment has significant equity issues that would prevent many learners from demonstrating their true knowledge.';
    } else if (checked.length >= 3) {
      fb.className = 'feedback-msg show partial';
      fb.textContent = '⚠ Good effort! You identified ' + checked.length + ' of 6 barriers. Review the ones you missed — all six represent real equity concerns: font/contrast issues, missing alt-text, mouse-only interaction, cognitive overload from instructions, missing captions, and inflexible timing.';
    } else {
      fb.className = 'feedback-msg show partial';
      fb.textContent = '↩ Take another look — this assessment has at least 6 distinct accessibility barriers. Re-read the scenario and consider each type of learner who might be taking it: a Deaf student, a keyboard user, an ELL student, a student with ADHD.';
    }
  }

  function saveReflection() {
    const txt = document.getElementById('reflectionText').value.trim();
    if (txt.length > 20) {
      document.getElementById('reflectionSaved').style.display = 'block';
    } else {
      alert('Please write a more detailed reflection before saving.');
    }
  }

  function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    sb.classList.toggle('open');
    ov.classList.toggle('show');
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  }

  // FORMS
  let currentFormUrl = 'https://forms.google.com';

  const formData = {
    fa1: {
      badge: '✏ Formative Assessment #1',
      title: 'Opening Reflection',
      subtitle: 'Module 1 · Introduction to Inclusive Assessment',
      prompt: '"What challenges have you experienced when designing digital assessments for diverse learners?"',
      instructions: 'Reflect on your own instructional context. There are no right or wrong answers — this is your opportunity to connect the content to your real experience. Click below to open the Google Form in a new tab.',
      url: 'https://forms.gle/e63xPcoAdL5ygJDa8'
    },
    fa2: {
      badge: '✏ Formative Assessment #2',
      title: 'UDL Reflection Poll',
      subtitle: 'Module 2 · Universal Design for Learning',
      prompt: '"Which UDL principle do you believe is most important for inclusive digital assessments and why?"',
      instructions: 'Consider the three UDL principles you just reviewed. Share your thinking in a short-response form. Your response should be at least 2–3 sentences and include a specific example from your practice.',
      url: 'https://forms.gle/RiDoGj7zDjhshas57'
    },
    fa4: {
      badge: '✏ Formative Assessment #4',
      title: 'Assessment Redesign Activity',
      subtitle: 'Module 4 · Designing Inclusive Assessments',
      prompt: 'Describe one assessment you currently use, identify at least two accessibility barriers it contains, and explain the specific redesign changes you would make using the strategies from this module.',
      instructions: 'Think of a real assessment from your practice. Be specific about the barriers and your proposed solutions. Reference at least one strategy from Module 4 in your response.',
      url: 'https://forms.gle/VzZKiTCAmbPDsyNT8'
    },
    summative: {
      badge: '🎓 Summative Assessment',
      title: 'Final Module Assessment',
      subtitle: 'Module 5 · Final Reflection & Assessment',
      prompt: 'Complete all sections: 5–10 multiple-choice questions, a short reflection response, and an implementation planning question.',
      instructions: 'This is your final assessment. Make sure you have completed the written reflection above before beginning. The form will open in a new tab — take your time and draw on everything you have learned across all five modules.',
      url: 'https://forms.gle/PTANXzDTQFxB81E4A'
    }
  };

  function openFormModal(formKey) {
    const d = formData[formKey];
    if (!d) return;
    currentFormUrl = d.url;
    document.getElementById('modalBadge').textContent = d.badge;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalSubtitle').textContent = d.subtitle;
    document.getElementById('modalPrompt').textContent = d.prompt;
    document.getElementById('modalInstructions').textContent = d.instructions;

    // Color OF BADGES
    const badge = document.getElementById('modalBadge');
    badge.style.background = formKey === 'summative' ? 'var(--mint-dark)' : 'var(--amber)';

    document.getElementById('formModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeFormModal(e) {
    if (e && e.target !== document.getElementById('formModal')) return;
    document.getElementById('formModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function openFormUrl() {
    window.open(currentFormUrl, '_blank');
   
    setTimeout(() => {
      document.getElementById('formModal').classList.remove('open');
      document.body.style.overflow = '';
    }, 300);
  }

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('formModal').classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Download LINKS
function forceDownload(url, filename) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobURL);
    })
    .catch(() => window.open(url, '_blank')); 
}
