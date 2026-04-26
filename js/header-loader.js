(async function(){
  try {
    const res = await fetch('includes/header.html');
    if (res && res.ok) {
      const html = await res.text();
      const el = document.getElementById('site-header-placeholder');
      if (el) el.innerHTML = html;
    }
  } catch(e){ /* ignore */ }
  try { if (typeof attachMag === 'function') attachMag(document); } catch(e){}
  try { if (typeof reattachEdgar === 'function') reattachEdgar(); } catch(e){}
  try {
    if (typeof init === 'function') {
      init();
      setInterval(init, 15 * 60 * 1000);
    }
  } catch(e){}
})();
