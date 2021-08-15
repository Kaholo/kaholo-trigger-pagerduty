function alertWebhook(req, res, settings, triggerControllers) {
    try { 
        const messages = req.body.messages;
        messages.forEach(eventBody => {
            const eventType = eventBody.event; // Get event type
            const eventTitle = eventBody.incident.title; // Get event title
            const urgency = eventBody.incident.urgency; // Get event severity 
            if (!eventType || !eventTitle || !urgency){
                res.status(422).send("bad pagerduty alert format");
                throw "bad pagerduty alert format"; // throw to end loop
            }
            triggerControllers.forEach(trigger => {
                const trigEventType = trigger.params.EVENT || "any";
                const trigUrgency = trigger.params.urgency || "any";
                if (trigEventType !== "any" && trigEventType !== eventType) return;
                if (trigUrgency !== "any" && trigUrgency !== urgency) return;
                trigger.execute(eventTitle, eventBody);
            });
        });
        res.status(200).send("OK");
    }
    catch (err){
        res.status(422).send(err.message);
    }
}

module.exports = {
    INCIDENT_WEBHOOK: alertWebhook
}
