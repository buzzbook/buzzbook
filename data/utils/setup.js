const { exec } = require('child_process');
const dbConfig = require('./config.js');
const path = './data/ratingsdb.sql.gz';

var cmd;
if (path.slice(-3) === ".gz"){
      cmd = `gunzip < ${path} | mysql -u${dbConfig.user} -p${dbConfig.password} -h${dbConfig.host} ${dbConfig.database}`
      console.log("Importing zipped file...")
} else {
      cmd = `mysql -u${dbConfig.user} -p${dbConfig.password} -h${dbConfig.host} ${dbConfig.database} < ${path}`
      console.log("Importing sql file...")
}

exec(cmd, (err, stdout, stderr) => {
      if (err) { console.error(`exec error: ${err}`); return; }
      console.log(`The import has finished.`);
});

// mysql-import authentication is broken, directly executing thru command line, pwd security concerns tho

// const Importer = require('mysql-import');
// const importer = new Importer({host, user, password, database});
//
// importer.onProgress(progress=>{
//   var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
//   console.log(`${percent}% Completed`);
// });
//
// importer.import('../../../buzzbook-directresources/cios/ratingsdb.sql').then(()=>{
//   var files_imported = importer.getImported();
//   console.log(`${files_imported.length} SQL file(s) imported.`);
// }).catch(err=>{
//   console.error(err);
// });
