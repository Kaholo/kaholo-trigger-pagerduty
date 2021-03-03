# kaholo-trigger-pagerduty
Kaholo Trigger for pager duty

<<<<<<< HEAD
## Method
Invoke kaholo on incident event

### Parameters:
1) Event type (select):
  - incident.trigger
  - incident.acknowledge
  - incident.unacknowledge
  - incident.resolve
  - incident.assign
  - incident.escalate
  - incident.delegate
  - incident.annotate
=======
This trigger exposes POST route:  ```<KAHOLO_URL>/webhook/pagerduty/incident```

### Parameters:
1. Event: The event is filtered by: ```incident.trigger``` or ```incident.resolve```
view here for more [incident types](https://developer.pagerduty.com/docs/webhooks/v2-overview/)

>>>>>>> origin/main
