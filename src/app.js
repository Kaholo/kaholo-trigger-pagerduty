function alertWebhook(req, res, settings, triggerControllers) {
    try { 
        const msgs = req.body.messages;
        const finishedTrigs = [];
        msgs.forEach(msg => {
            const eventType = msg.event;
            const title = msg.incident.title;
            const urgency = msg.incident.service.incident_urgency_rule.urgency;
            if (!eventType || !title || !urgency){
                throw res.status(400).send("bad pagerduty alert format");
            }
            triggerControllers.forEach(trigger => {
                const trigEventType = trigger.params.EVENT || "any";
                const trigUrgency = trigger.params.urgency || "any";
                if (trigEventType !== "any" && trigEventType !== eventType) return addTrigger(finishedTrigs, trigger, "Event Type");
                if (trigUrgency !== "any" && trigUrgency !== urgency) return addTrigger(finishedTrigs, trigger, "Urgency");
                trigger.execute(`PagerDuty Incident: ${title}`, msg);
                addTrigger(finishedTrigs, trigger);
            });
        });
        res.status(200).send(finishedTrigs);
    }
    catch (err){
        res.status(500).send(err.message);
    }
}

function addTrigger(arr, trigger, error){
    if (error) trigger.error = error;
    arr.push(trigger);
}

module.exports = {
    INCIDENT_WEBHOOK: alertWebhook
}
