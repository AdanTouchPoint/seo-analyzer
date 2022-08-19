module.exports = {
    apps : [{
      name        : "Server",
      script      : "./index.js",
      
      exec_mode : "cluster",
      env_production: {
        NODE_ENV: "production"
     },
     env_development: {
        NODE_ENV: "development"
     }
    },
    {
      name: "Worker",
      script: "./src/controllers/worker.js",
      exec_mode : "cluster",
      env_production: {
        NODE_ENV: "production"
     },
     env_development: {
        NODE_ENV: "development"
     }
      }]
  }
