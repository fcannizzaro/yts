window.sync = (API_KEY, DATABASE_URL) => {

  var video = null;
  var synced = false;

  const app = firebase.initializeApp({
    apiKey: API_KEY,
    databaseURL: DATABASE_URL
  });

  const status = app.database().ref('/status');
  const progress = app.database().ref('/progress');
  const rate = app.database().ref('/rate');

  const header = document.getElementById('info');
  const button = document.createElement('button');

  const interval = setInterval(() => {

    const header = document.getElementById('info');
    const button = document.createElement('button');
    if (header) clearInterval(interval);

    const buttonChange = () => {
      const first = synced ? "STOP" : "SHARE";
      const second = synced ? "SHARING" : "PLAYBACK";
      button.innerHTML = `<span id='span-share'>${first}</span> ${second}`;
      button.style.background = synced ? "#363636" : "#FF0000";
      const span = document.getElementById('span-share');
      span.style.fontWeight = 'bold';
      span.style.color = '#FFF';
    };

    button.id = 'share';
    button.style.color = 'rgba(255,255,255,0.8)';
    button.style.borderRadius = '2px';
    button.style.marginTop = '16px';
    button.style.outline = 'none';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.padding = '10px 16px';
    header.appendChild(button);
    buttonChange();

    const listener = () => {
      status.set(video.paused);
      progress.set(video.currentTime);
      rate.set(video.playbackRate);
    };

    button.addEventListener('click', () => {
      if (synced) {
        video.removeEventListener("pause", listener, true);
        video.removeEventListener("play", listener, true);
        status.off();
      } else {
        video = document.getElementsByClassName('video-stream')[0];
        status.on('value', async(data) => {
          snapshotProgress = await progress.once('value')
          snapshotRate = await rate.once('value')
          video.currentTime = snapshotProgress.val();
          video.playbackRate = snapshotRate.val();
          if (!data.val()) video.play();
          else video.pause();
        });
        video.pause();
        status.set(video.paused);
        progress.set(video.currentTime);
        rate.set(video.playbackRate);
        video.addEventListener("pause", listener, true);
        video.addEventListener("play", listener, true);
      }
      synced = !synced;
      buttonChange();
    });
  }, 500);

}