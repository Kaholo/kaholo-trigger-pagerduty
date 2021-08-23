# kaholo-trigger-pagerduty
Kaholo Trigger for PagerDuty incidents webhook v3.

## How to use:
After installing the trigger on Kaholo, follow the steps described [here](https://support.pagerduty.com/docs/webhooks) to link the webhook to your PagerDuty account.

## PagerDuty Event
This triggers whenever there is a new incident in PagerDuty sent to the webhook.

### Webhook URL:
**{KAHOLO_URL}/webhook/pagerduty/incident**

### Parameters:
1) Event type - If specified, only trigger when the event matches the event type provided. If not specified, accept any event type.
  You can see all eventTypes [here](https://developer.pagerduty.com/docs/webhooks/v3-overview/#event-types)
3) Urgency - If specified, only trigger when the incident is with the urgency level specified(Low/High)
  If not specified, accept any event severity.
