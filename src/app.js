const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

function alertWebhook(req,res) {
    let body = req.body
    Trigger.find({ plugin: config.name }).then((triggers) => {
        console.log(`Found ${triggers.length} triggers`);
        res.send('OK');
        triggers.forEach(trigger=>execTrigger(trigger,body,req.io))
    }).catch((error) => res.send(error))
}

function execTrigger (trigger, body,io) {
    new Promise ((resolve,reject) => {
        const messages = body.messages;
        for (x in messages) {
            const triggerEvent = trigger.params.find(o => o.name === 'EVENT');
            if (messages[x].event != triggerEvent.value) {
                console.log(alertID, triggerState.value)
                return reject("Not matching alert ID")
            } else {
                return resolve()
            }
        }
    }).then(() => {
        console.log(trigger.map);
        let message = trigger.name + ' started by Dynatrace trigger'
        mapExecutionService.execute(trigger.map,null,io,{config: trigger.configuration},message,body);
    }).catch(err=>{
        console.error(err);
    })
}
module.exports = {
    INCIDENT_WEBHOOK: alertWebhook
}
