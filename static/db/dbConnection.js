var pg = require('pg');

module.exports = {
	getConnection: () => {

		var dbUrl;

		if(process.env.DATABASE_URL){
			dbUrl = process.env.DATABASE_URL
		} else {
			dbUrl = {
				user: process.argv.POSTGRES_USER,
				password: process.argv.POSTGRES_PASSWORD,
				database: 'captain_calamari',
				host: 'localhost',
				port: 5432
			};
		}

		return new pg.Client(dbUrl);
	}
}