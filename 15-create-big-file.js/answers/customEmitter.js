const EventEmitter = require("events");
const emitter = new EventEmitter();

setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);

emitter.on("timer", (msg) => {
  console.log(`Timer event received: ${msg}`);
});


const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is:", msg);
};


doWait();


setTimeout(() => {
  emitter.emit("happens", "Hello World!");
}, 3000);

emitter.on("start", () => {
  console.log("Starting the process...");
  setTimeout(() => {
    emitter.emit("middle", "Process is halfway done.");
  }, 2000);
});

emitter.on("middle", (msg) => {
  console.log(`Middle event received: ${msg}`);
  setTimeout(() => {
    emitter.emit("end", "Process completed successfully.");
  }, 3000);
});

emitter.on("end", (msg) => {
  console.log(`End event received: ${msg}`);
});

emitter.emit("start");
