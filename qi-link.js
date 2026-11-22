/* Ajoute « Rapport d'installation (QI) » aux types de rapport du formulaire principal. */
(()=>{const k=document.getElementById('kindSel');if(!k||k.querySelector('[data-qi]'))return;const a=document.createElement('a');a.className='typecard';a.href='qi.html';a.dataset.qi='1';a.style.textDecoration='none';
a.innerHTML="<b>Rapport d'installation (QI)</b><span>Qualification d'installation d'une machine (défilement, impulsion, autre)</span>";k.append(a)})();
