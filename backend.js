const https = require('https');
const fs = require('fs');

//tenant name
const  tenant = 'oem-tenant.eu.qlikcloud.com';
// Api Key
const apiKey = fs.readFileSync('src/api_key.txt');
console.log(apiKey);



var customers= ['customer_A', 'customer_B', 'customer_C'];


//function to create 1 space for customer
function createCustomerSpace(customer){
        const data = JSON.stringify({
        name: customer,
        type: "managed"
        })

        const options = {
        hostname: tenant,
        port: 443,
        path: '/api/v1/spaces',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+apiKey,
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
        }

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
        })

        req.on('error', error => {
        console.error(error)
        })

        req.write(data)
        req.end()
    };



    
// Create 1 space for each customer
for(let customer of customers){
    console.log("Customer :", customer);
    createCustomerSpace(customer)
}
