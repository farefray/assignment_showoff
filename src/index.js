const store = require('./store');
const app = require('./app');

// Server Initialization
main();

async function main() {
  console.log('Initializing connection to the database');
  try {
    await store.connect();
  } catch (error) {
    console.log("Error establishing MongoDB access", error);
    // Should be logged, emitted to some resolution holder
    process.exit(1);
  }

  // Start up the server on the port specified
  app.listen(process.env.SERVERPORT);
  console.log('Web API Server - listening on port: ' + process.env.SERVERPORT);
}

