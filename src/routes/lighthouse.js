const {Router} = require('express');
const router = Router();
let Queue = require('bull');
// Connect to a local redis intance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
let workQueue = new Queue('work', REDIS_URL);

router.get('/', async (req, res) => {

    try {
        console.log(req.body.url)
        const page = req.body.url
        let job = await workQueue.add({url: `${page}`});
       workQueue.on('global:completed', (jobId, result) => {
            console.log(`Job ${jobId} completed`);
        });
          res.status(206)
          res.json({
            success: true,
            message: `El proceso esta en cola`,
        })
} catch (error) {
        res.status(400)
        res.json({
            success: false,
            message: error.message
        })
    }
})





router.get('/job/:id', async (req, res) => {
    let id = req.params.id;
    let job = await workQueue.getJob(id);
    console.log(job.returnvalue)
    let returnData =  job.returnvalue
    if (job === null) {
      res.status(404).end();
    } else {
      /*let state = await job.getState();
      let progress = job._progress;
      let reason = job.failedReason;*/
      res.status(200)
          res.json({
            success: true,
            message: 'Proccess has been finished',
            data: returnData
        })
    }
  });

module.exports = router;

