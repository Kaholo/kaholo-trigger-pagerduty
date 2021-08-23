function alertWebhook(req, res, settings, triggerControllers) {
    try { 
        const event = req.body.event;
        const eventType = event.event_type; // Get event type
        const {title, urgency} = event.data;
        if (!eventType || !title || !urgency){
            res.status(400).send("bad pagerduty alert format");
        }
        const msg = `Pager Duty Incident: ${title}`;
        const finishedTrigs = filterTriggers(triggerControllers, eventType, urgency, msg, event);
        res.status(200).send(finishedTrigs);
    }
    catch (err){
        res.status(500).send(err.message);
    }
}

function filterTriggers(triggers, eventType, urgency, msg, body){
    const finishedTrigs = [];
    triggers.forEach(trigger => {
        const trigEventType = trigger.params.EVENT || "any";
        const trigUrgency = trigger.params.urgency || "any";
        if (trigEventType !== "any" && trigEventType !== eventType) return addTrigger(finishedTrigs, trigger, "Event Type");
        if (trigUrgency !== "any" && trigUrgency !== urgency) return addTrigger(finishedTrigs, trigger, "Urgency");
        trigger.execute(msg, body);
        addTrigger(finishedTrigs, trigger);
    });
    return finishedTrigs;
}

function addTrigger(arr, trigger, error){
    if (error) trigger.error = error;
    arr.push(trigger);
}

module.exports = {
    INCIDENT_WEBHOOK: alertWebhook
}