const connection = require('./database/connect.js');

connection.query(`CREATE TABLE IF NOT EXISTS table_name (
    user_name VARCHAR(255),
    user_id VARCHAR(255),
    auth_token VARCHAR(255),
    country_code VARCHAR(255),
    kpsdkct VARCHAR(255) DEFAULT NULL,
    kpsdkcd VARCHAR(255) DEFAULT NULL
  )`, function (err, results, fields) {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Таблица создана успешно');
    }
});