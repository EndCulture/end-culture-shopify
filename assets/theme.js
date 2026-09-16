document.addEventListener('DOMContentLoaded',()=>{
  const b=document.querySelector('.menu-toggle'),n=document.querySelector('.nav');
  if(b&&n)b.addEventListener('click',()=>n.classList.toggle('open'));

  // Shopify draft-theme previews are identified by preview_theme_id in the URL.
  // Carry that parameter across every internal storefront link so navigation
  // stays on this GitHub-connected draft theme instead of falling back to the
  // published theme.
  const current=new URL(window.location.href);
  const previewThemeId=current.searchParams.get('preview_theme_id');
  if(!previewThemeId)return;

  document.querySelectorAll('a[href]').forEach(link=>{
    const raw=link.getAttribute('href');
    if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:')||raw.startsWith('javascript:'))return;
    try{
      const target=new URL(raw,window.location.origin);
      if(target.origin!==window.location.origin)return;
      target.searchParams.set('preview_theme_id',previewThemeId);
      link.href=target.pathname+target.search+target.hash;
    }catch(e){}
  });
});
