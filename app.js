(() => {
  'use strict';

  const VERSION = '20260903-2';
  const PARTS = ['00', '01', '02', '03'];

  async function loadApplication() {
    if (typeof DecompressionStream !== 'function') {
      throw new Error('This browser does not support the secure application bundle. Please update the browser.');
    }

    const encoded = (await Promise.all(PARTS.map(async (part) => {
      const response = await fetch(`/app-payload/${part}.txt?v=${VERSION}`, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Application bundle part ${part} returned ${response.status}`);
      return response.text();
    }))).join('').trim();

    const binary = atob(encoded);
    const compressed = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
    const source = await new Response(stream).text();
    const script = document.createElement('script');
    script.textContent = `${source}\n//# sourceURL=aule-cre-map-v2.js`;
    document.body.appendChild(script);
  }

  loadApplication().catch((error) => {
    console.error(error);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.innerHTML = `<div><b>Application could not be loaded</b><small>${String(error.message || error)} Refresh the page or update the browser.</small></div>`;
    }
  });
})();
