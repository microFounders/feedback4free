# React Feedback Component - Quick Start Guide

Get up and running with the React Feedback Component in minutes.

## Installation

```bash
npm install free-feedback
# or
yarn add free-feedback
```

## Basic Setup

Add the component to your React application:

```tsx
import { FeedbackComponent } from "free-feedback";

function App() {
  return (
    <div className="app">
      {/* Your app content */}

      <FeedbackComponent slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" />
    </div>
  );
}
```

## Slack Webhook Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app (or select an existing one)
3. Navigate to "Incoming Webhooks" and activate them
4. Click "Add New Webhook to Workspace"
5. Select the channel where you want to receive feedback
6. Copy the webhook URL and use it as the `slackWebhookUrl` prop

## Customization Examples

### Custom Position and Color

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  position="top-right"
  color="secondary"
/>
```

### Custom Icon and Animation

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  icon="help"
  animate={true}
/>
```

### With Text Label

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  label="Help & Feedback"
  showLabel={true}
/>
```

### Using a Custom Webhook

```tsx
<FeedbackComponent
  webhookUrl="https://your-api.example.com/feedback"
  integrationType="webhook"
/>
```

## Pre-filling User Email

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  userEmail={user.email} // From your auth system
/>
```

## Next Steps

For more detailed information, check out:

- [README.md](README.md) - Overview and basic usage
- [INSTALLATION.md](INSTALLATION.md) - Detailed installation and configuration guide
- [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - Visual examples of different configurations

## Need Help?

If you encounter any issues or have questions, please open an issue on our [GitHub repository](https://github.com/microFounders/free-feedback/issues).
