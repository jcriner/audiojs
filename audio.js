// Currently, this thing is so stupid it just plays 440HZ on load.

// Dumb script:
var context = new AudioContext();
var osc = context.createOscillator();
osc.connect(context.destination);
osc.start(0);  // 0 is the number of seconds before sound plays

// TODO:
//   * vary frequency over time
//   * connect sound volume to a simple API, connected to a slider
//   * connect pitch to some kind of discrete keyboard entity
