const { findTriggers } = require('./helpers')

function alertWebhook(req,res) {
    const messages = req.body.messages;

    messages.forEach(eventBody => {
        const eventType = eventBody.event; // Get event type
        const eventTitle = eventBody.incident.title; // Get event title
        const urgency = eventBody.incident.urgency; // Get event severity 
        if (!eventType || !eventTitle || !urgency){
            throw "bad pagerduty alert format";
        }

        findTriggers(
            validateTrigger, { eventType, urgency },
            res, 
            "INCIDENT_WEBHOOK",
            `${eventTitle}-${urgency} urgency`, // event description for kaholo
            eventBody, 
            req.io
        );
    });
    res.send("OK");
}

async function validateTrigger(trigger, { eventType, urgency }) {
    const triggerEventType = trigger.params.find((o) => o.name === "EVENT").value || "any";
    const triggerUrgency = trigger.params.find((o) => o.name === "urgency").value || "any";
    /**
     * if event type was provided check it matches event type in post request
     */
    if (triggerEventType !== "any" && eventType !== triggerEventType) {
      throw "Not same event type";
    }
    /**
     * if urgency was provided check it matches urgency in post request
     */
    if (triggerUrgency !== "any" && urgency !== triggerUrgency){
      throw "Not same event urgency";
    }
    return true;
}
module.exports = {
    INCIDENT_WEBHOOK: alertWebhook
}
