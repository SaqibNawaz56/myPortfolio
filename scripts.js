    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href=a.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          const el=document.querySelector(href);
          if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });

    // Project modal behavior
    const modal=document.getElementById('projectModal');
    const modalTitle=document.getElementById('modalTitle');
    const modalDesc=document.getElementById('modalDesc');
    const modalTech=document.getElementById('modalTech');
    const modalDemo=document.getElementById('modalDemo');
    const modalGithub=document.getElementById('modalGithub');
    const closeModal=document.getElementById('closeModal');

    document.querySelectorAll('.open-project').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const card = e.target.closest('.project');
        if(!card) return;
        const title = card.dataset.title || 'Project';
        const desc = card.dataset.desc || '';
        const tech = card.dataset.tech || '';
        const demo = card.dataset.demo || '#';
        const github = card.dataset.github || '#';

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalTech.innerHTML = '';
        tech.split(',').map(t=>t.trim()).forEach(t=>{
          const span = document.createElement('span');
          span.className = 'chip';
          span.textContent = t;
          modalTech.appendChild(span);
        });
        modalDemo.href = demo;
        modalGithub.href = github;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
      });
    });

    closeModal.addEventListener('click', ()=>{
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
    });

    modal.addEventListener('click', (e)=>{
      if(e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
    });

    // Simple contact form handler -> opens mailto with message
    document.getElementById('contactForm').addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      console.log(name, email,message);
      if(!name || !email || !message){
        alert('Please fill all fields.');
        return;
      }
      const subject = encodeURIComponent(message);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:saqibn336@gmail.com?subject=' + subject + '&body=' + body;
    });

    // Accessibility: close with escape
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && modal.classList.contains('open')){
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden','true');
      }
    });