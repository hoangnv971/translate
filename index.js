const translateService = require('./services/translateService');

async function run() {
    const translate = await translateService(
        'Manage your API spend by configuring monthly spend limits. Notification emails will be sent to members of your organization with the "Owner" role. Note that there may be a delay in enforcing limits, and you are still responsible for any overage incurred. View usage details', 
        'vi'
    );
    console.log(translate);
}

run();
