// Import necessary modules
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

// HelloWorld module
const HelloWorld = {
    say: function() {
        console.log("Hello, World!!");
    }
};

// XML module
const XML = {
    list: function() {
        console.log("Listing all available XML files!");
        try {
            const files = fs.readdirSync("/data");
            files.filter(file => file.endsWith(".xml")).forEach(this.processFile);
        } catch (error) {
            console.log(`Error accessing /data: ${error}`);
        }
    },

    processFile: function(fileName) {
        console.log(`Processing file: ${fileName}`);
        const filePath = path.join("/data", fileName);
        const xmlContent = fs.readFileSync(filePath, 'utf8');
        XML.parseXml(xmlContent);
    },

    parseXml: function(xmlContent) {
        console.log(`XML Content of the file: \n${xmlContent}`);
        parser.parseString(xmlContent, (err, result) => {
            if (err) {
                console.error(`Error parsing XML: ${err}`);
                return;
            }
            const items = result.root.item.map(item => ({
                name: item.name[0],
                description: item.description[0]
            }));
            console.log(items);
        });
    }
};

// Application Module
const ImporterApplication = {
    start: function() {
        HelloWorld.say();
        XML.list();

        // Start a minimal supervision tree (Simulated as there's no real equivalent in Node.js)
        console.log("Application started");
    }
};

// Start the application
ImporterApplication.start();
