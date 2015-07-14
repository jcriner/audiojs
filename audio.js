// Simple Noisemaker object for producing a 440HZ 'A' note. This sound
// is mutable, and stoppable. It can currently only be started once,
// so mute should be used to start and stop the noise.

function Noisemaker() {
    this.context = new AudioContext();
    this.gainNode = this.context.createGain();
    this.oscillator = this.context.createOscillator();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.lastVolumeSetting = 1;
}

Noisemaker.prototype.start = function() {
    this.oscillator.start(0);
}

Noisemaker.prototype.stop = function() {
    this.oscillator.stop();
}

Noisemaker.prototype.setFrequency = function(frequency) {
    var now = this.context.currentTime;
    this.oscillator.frequency.setValueAtTime(frequency, now);
}


// |volume| arg can be between 0 and 1.
Noisemaker.prototype.setVolume = function(vol) {
    // Do nothing if vol setting is out of range.
    if (vol < 0 || vol > 1) {
        return;
    }
    this.gainNode.gain.value = vol;
    this.lastVolumeSetting = this.gainNode.gain.value;
}


Noisemaker.prototype.isMuted = function() {
    return this.isMuted;
}

Noisemaker.prototype.mute = function() {
    this.lastVolumeSetting = this.gainNode.gain.value;
    this.gainNode.gain.value = 0;
}

Noisemaker.prototype.unmute = function() {
    this.gainNode.gain.value = this.lastVolumeSetting;
    this.isMuted = false;
}


// All these things are pluggable. If you want to control the volume,
// you create a GainNode, and 'connect' the oscillator into the
// GainNode. The GainNode can then be hooked up to the context
// destination (e.g. speakers).

// TODO:
//   * vary frequency over time
//   * connect sound volume to a simple API, connected to a slider
//   * connect pitch to some kind of discrete keyboard entity
