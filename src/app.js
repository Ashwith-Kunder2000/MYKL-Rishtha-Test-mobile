const cluster = require('cluster');

if (cluster.isPrimary) {
  require('dotenv').config();
}

const CPUS = Number(process.env.WEB_CONCURRENCY || 1);

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} running`);
  console.log(`Starting ${CPUS} workers`);

  for (let i = 0; i < CPUS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {
  require('./server');
  console.log(`Worker ${process.pid} started`);
}
