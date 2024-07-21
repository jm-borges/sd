const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const CHECK_INTERVAL = 10000;
const MAX_RETRIES = 12;

async function checkTablesExist() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT to_regclass('public."Prize"') IS NOT NULL AS prize_exists,
                   to_regclass('public."Laureate"') IS NOT NULL AS laureate_exists
        `);
        const { prize_exists, laureate_exists } = result.rows[0];
        return prize_exists && laureate_exists;
    } catch (err) {
        console.error(`Error checking tables: ${err}`);
        return false;
    } finally {
        client.release();
    }
}

async function waitForTables() {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        if (await checkTablesExist()) {
            console.log('Tables are available, proceeding with import.');
            return;
        }
        console.log(`Tables not yet available, retrying in ${CHECK_INTERVAL / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
    }
    console.error('Tables not available after maximum retries. Exiting.');
    process.exit(1);
}

// JSONObserver module
const JSONObserver = {
    processedFiles: new Set(),

    list: async function () {
        console.log("Listing all available JSON files!");
        try {
            const files = fs.readdirSync("/data");
            files.filter(file => file.endsWith(".json")).forEach(fileName => {
                if (!this.processedFiles.has(fileName)) {
                    this.processFile(fileName);
                }
            });
        } catch (error) {
            console.log(`Error accessing /data: ${error}`);
        }
    },

    processFile: async function (fileName) {
        console.log(`Processing file: ${fileName}`);
        const filePath = path.join("/data", fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        await this.parseAndInsert(content);
        this.processedFiles.add(fileName);
    },

    parseAndInsert: async function (content) {
        try {
            const data = JSON.parse(content);
            if (!data.prizes) {
                console.error('Invalid JSON format: Missing "prizes" key');
                return;
            }

            for (const prize of data.prizes) {
                const { year, category, laureates } = prize;

                const result = await pool.query(
                    'INSERT INTO public."Prize" (year, category) VALUES ($1, $2) RETURNING "id"',
                    [year, category]
                );
                const prizeId = result.rows[0].id;

                for (const laureate of laureates) {
                    const { firstname, surname, motivation, share } = laureate;
                    await pool.query(
                        'INSERT INTO public."Laureate" (firstname, surname, motivation, share, "prizeId") VALUES ($1, $2, $3, $4, $5)',
                        [firstname, surname, motivation, share, prizeId]
                    );
                }
            }
            console.log('Data inserted successfully');
        } catch (err) {
            console.error(`Error parsing JSON or inserting into DB: ${err}`);
        }
    }
};

// Watcher module
const Watcher = {
    start: async function () {
        console.log("Starting directory watcher...");
        const watcher = chokidar.watch('/data', { persistent: true });

        watcher
            .on('add', filePath => {
                if (filePath.endsWith('.json')) {
                    const fileName = path.basename(filePath);
                    if (!JSONObserver.processedFiles.has(fileName)) {
                        console.log(`New JSON file detected: ${filePath}`);
                        JSONObserver.processFile(fileName);
                    }
                }
            })
            .on('error', error => console.error(`Watcher error: ${error}`));
    }
};

// Application Module
const ImporterApplication = {
    start: async function () {
        console.log("Importer service initializing");
        await waitForTables();
        await Watcher.start();
        console.log("Application started");
    }
};

// Start the application
ImporterApplication.start();
