function alertWebhook(req, res, settings, triggerControllers) {
    try { 
        const event = req.body.event;
        const eventType = event.event_type; // Get event type
        const {title, urgency} = event.data;
        if (!eventType || !title || !urgency){
            res.status(422).send("bad pagerduty alert format");
        }
        triggerControllers.forEach(trigger => {
            const trigEventType = trigger.params.EVENT || "any";
            const trigUrgency = trigger.params.urgency || "any";
            if (trigEventType !== "any" && trigEventType !== eventType) return;
            if (trigUrgency !== "any" && trigUrgency !== urgency) return;
            trigger.execute(title, event);
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
