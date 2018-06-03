/*
Embeded Page Link:
https://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/chromevox_embed.html
*/


if (!($ = window.jQuery)) {
    script = document.createElement('script');
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=launch;
    document.body.appendChild(script);
}
else {
    launch();
}

function launch() {
  cvox = document.createElement('script');
  cvox.src  = 'https://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/chromeandroidvox.js';
  document.body.appendChild(cvox);

  let iframeEmbed =`
  <iframe id="cvoxembed" class="cvoxembed" aria-hidden="true" src="https://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/chromevox_embed.html"></iframe>
  `

  document.body.appendChild(iframeEmbed);
}
