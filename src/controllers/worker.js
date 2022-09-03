
let Queue = require("bull");
let check = require('./lighthouse')
const throng = require('throng');
// Connect to a local redis instance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 1;


// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network 
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 10;

  function start() {
    // Connect to the named work queue
    let workQueue = new Queue('work', REDIS_URL);
  
    workQueue.process(maxJobsPerWorker, async (job) => {
  
      console.log(job.data.url)
      let page = job.data.url
      const result = await check.Check(page)
      console.log(result.lhr.categories )
      
      return result.lhr.categories;
    });
  }
  
  // Initialize the clustered worker process
  // See: https://devcenter.heroku.com/articles/node-concurrency for more info
  throng({ workers, start});


