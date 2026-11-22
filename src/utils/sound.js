class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playFlip() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Synthesize realistic whoosh/page-swish sound
      const bufferSize = this.ctx.sampleRate * 0.18; // 180ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Page turn white noise burst with soft envelope
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (this.ctx.sampleRate * 0.05));
        data[i] = (Math.random() * 2 - 1) * decay;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.15);
      filter.Q.value = 1.2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseNode.start();
    } catch {
      // Audio playback fails silently if browser policy blocks autoplay
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

export const soundManager = new SoundEffects();
