// calling command line
const { exec } = require('child_process');
const sequelizeMigrationCmd = 'npx sequelize-cli db:migrate';

async function runMigration() {
  exec(sequelizeMigrationCmd, (error, stdout, stderr) => {
    if (error) {
      console.error('Error running migration:', error);
    } else {
      console.log('Migration output:', stdout);
    }
  })

}


module.exports = runMigration