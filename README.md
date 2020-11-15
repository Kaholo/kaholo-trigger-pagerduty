# kaholo-trigger-pagerduty
Kaholo Trigger for pager duty

This trigger exposes POST route:  ```<KAHOLO_URL>/webhook/pagerduty/incident```

### Parameters:
1. Event: The event is filtered by: ```incident.trigger``` or ```incident.resolve```
view here for more [incident types](https://developer.pagerduty.com/docs/webhooks/v2-overview/)

