(function () {
  const video      = document.getElementById('mainVideo');
  const overlay    = document.getElementById('videoOverlay');
  const bigPlayBtn = document.getElementById('bigPlayBtn');
  const controls   = document.getElementById('videoControls');
  const player     = document.getElementById('videoPlayer');

  const playPauseBtn  = document.getElementById('playPauseBtn');
  const iconPlay      = playPauseBtn.querySelector('.icon-play');
  const iconPause     = playPauseBtn.querySelector('.icon-pause');

  const muteBtn    = document.getElementById('muteBtn');
  const iconVolOn  = muteBtn.querySelector('.icon-vol-on');
  const iconVolOff = muteBtn.querySelector('.icon-vol-off');

  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const iconFsEnter   = fullscreenBtn.querySelector('.icon-fs-enter');
  const iconFsExit    = fullscreenBtn.querySelector('.icon-fs-exit');

  const timeDisplay   = document.getElementById('timeDisplay');
  const progressBar   = document.getElementById('progressBar');
  const progressFill  = document.getElementById('progressFill');
  const progressThumb = document.getElementById('progressThumb');
  const volumeBar     = document.getElementById('volumeBar');
  const volumeFill    = document.getElementById('volumeFill');

  function formatTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, '0');
    return `${m}:${sec}`;
  }

  function updatePlayIcons(playing) {
    iconPlay.style.display  = playing ? 'none'  : 'block';
    iconPause.style.display = playing ? 'block' : 'none';
    player.classList.toggle('video-player--paused', !playing);
  }

  function togglePlay() {
    if (video.paused) {
      video.play();
      overlay.classList.add('video-player__overlay--hidden');
    } else {
      video.pause();
    }
  }

  bigPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
  playPauseBtn.addEventListener('click', togglePlay);
  // Clic en el vídeo también pausa/reproduce
  video.addEventListener('click', togglePlay);

  video.addEventListener('play',  () => updatePlayIcons(true));
  video.addEventListener('pause', () => updatePlayIcons(false));
  video.addEventListener('ended', () => {
    updatePlayIcons(false);
    overlay.classList.remove('video-player__overlay--hidden');
    progressFill.style.width = '0%';
    progressThumb.style.left = '0%';
  });

  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    progressFill.style.width  = pct + '%';
    progressThumb.style.left  = pct + '%';
    timeDisplay.textContent   = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  });

  function seekTo(e) {
    const rect = progressBar.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pct * video.duration;
  }

  let dragging = false;
  progressBar.addEventListener('mousedown', (e) => { dragging = true; seekTo(e); });
  document.addEventListener('mousemove',   (e) => { if (dragging) seekTo(e); });
  document.addEventListener('mouseup',     ()  => { dragging = false; });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    iconVolOn.style.display  = video.muted ? 'none'  : 'block';
    iconVolOff.style.display = video.muted ? 'block' : 'none';
    volumeFill.style.width   = video.muted ? '0%' : (video.volume * 100) + '%';
  });

  function setVolume(e) {
    const rect = volumeBar.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.volume = pct;
    video.muted  = pct === 0;
    volumeFill.style.width   = (pct * 100) + '%';
    iconVolOn.style.display  = pct > 0 ? 'block' : 'none';
    iconVolOff.style.display = pct > 0 ? 'none'  : 'block';
  }

  let volDragging = false;
  volumeBar.addEventListener('mousedown', (e) => { volDragging = true; setVolume(e); });
  document.addEventListener('mousemove',  (e) => { if (volDragging) setVolume(e); });
  document.addEventListener('mouseup',    ()  => { volDragging = false; });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      player.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    iconFsEnter.style.display = isFs ? 'none'  : 'block';
    iconFsExit.style.display  = isFs ? 'block' : 'none';
  });

  const trailerSection = document.getElementById('trailerSection');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && video.paused) {
          video.muted = true;
          iconVolOn.style.display  = 'none';
          iconVolOff.style.display = 'block';
          volumeFill.style.width   = '0%';
          video.play().catch(() => {});
          overlay.classList.add('video-player__overlay--hidden');
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    },
    { threshold: 0.55 }
  );

  observer.observe(trailerSection);

})();