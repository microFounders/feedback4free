# Installing and Using the React Feedback Component

This guide provides detailed instructions on how to install and integrate the React Feedback Component into your application.

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Configuration Options](#configuration-options)
4. [Integration Types](#integration-types)
   - [Slack Integration](#slack-integration)
   - [Custom Webhook Integration](#custom-webhook-integration)
5. [Advanced Usage](#advanced-usage)
   - [Customizing Appearance](#customizing-appearance)
   - [Pre-filling User Data](#pre-filling-user-data)
   - [Using Individual Components](#using-individual-components)
6. [Troubleshooting](#troubleshooting)

## Installation

You can install the React Feedback Component using npm or yarn:

```bash
# Using npm
npm install react-feedback-component

# Using yarn
yarn add react-feedback-component
```

## Basic Setup

After installation, you can import and use the component in your React application:

```tsx
import React from "react";
import { FeedbackComponent } from "react-feedback-component";

function App() {
  return (
    <div className="app">
      {/* Your app content */}

      {/* Add the feedback component */}
      <FeedbackComponent slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" />
    </div>
  );
}

export default App;
```

### Required Props

The only required prop is either:

- `slackWebhookUrl` - If you're using Slack integration
- `webhookUrl` - If you're using a custom webhook integration with `integrationType="webhook"`

## Configuration Options

The React Feedback Component is highly customizable. Here are all the available props:

| Prop              | Type                                                                                    | Default          | Description                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `slackWebhookUrl` | `string`                                                                                | `""`             | Your Slack webhook URL to receive feedback                                                        |
| `webhookUrl`      | `string`                                                                                | `""`             | Alternative webhook URL for receiving feedback in other platforms                                 |
| `position`        | `"bottom-right"` \| `"bottom-left"` \| `"top-right"` \| `"top-left"`                    | `"bottom-right"` | Position of the feedback button                                                                   |
| `color`           | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `"link"` | `"default"`      | Color variant of the button                                                                       |
| `icon`            | `"message"` \| `"help"` \| `"flag"` \| `"alert"` \| `"info"`                            | `"message"`      | Icon to display in the button                                                                     |
| `animate`         | `boolean`                                                                               | `false`          | Whether to animate the button with a pulse effect                                                 |
| `size`            | `"sm"` \| `"default"` \| `"lg"`                                                         | `"default"`      | Size of the button                                                                                |
| `label`           | `string`                                                                                | `"Feedback"`     | Text label for the button                                                                         |
| `showLabel`       | `boolean`                                                                               | `false`          | Whether to display the text label on the button                                                   |
| `rounded`         | `"full"` \| `"md"`                                                                      | `"full"`         | Corner rounding of the button                                                                     |
| `userEmail`       | `string`                                                                                | `undefined`      | Email address of the user to pre-fill the email field in the feedback form                        |
| `integrationType` | `"slack"` \| `"webhook"`                                                                | `"slack"`        | Type of integration to use. Use "slack" for Slack webhooks and "webhook" for custom API endpoints |

## Integration Types

### Slack Integration

To set up Slack integration:

1. Create a Slack app in your workspace
2. Enable Incoming Webhooks
3. Create a new webhook URL for your workspace
4. Copy the webhook URL and use it as the `slackWebhookUrl` prop

```tsx
<FeedbackComponent
  slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
  integrationType="slack" // This is the default, so you can omit it
/>
```

When a user submits feedback, it will be formatted and sent to your Slack channel with the following information:

- Feedback type (Issue, Idea, Other)
- User's email
- Subject
- Message
- Screenshot (if provided)

### Custom Webhook Integration

If you want to receive feedback through your own API endpoint:

1. Set up an API endpoint that can receive POST requests with JSON data
2. Use the `webhookUrl` prop with your API endpoint
3. Set `integrationType` to `"webhook"`

```tsx
<FeedbackComponent
  webhookUrl="https://your-api.example.com/feedback"
  integrationType="webhook"
/>
```

Your API endpoint will receive a POST request with the following JSON structure:

```json
{
  "type": "issue", // or "idea" or "other"
  "email": "user@example.com",
  "subject": "Feedback subject",
  "message": "Detailed feedback message...",
  "screenshot": "[Base64 encoded image if provided]"
}
```

## Advanced Usage

### Customizing Appearance

You can customize the appearance of the feedback button:

```tsx
<FeedbackComponent
  slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
  position="top-left"
  color="secondary"
  icon="help"
  animate={true}
  size="lg"
  label="Help & Support"
  showLabel={true}
  rounded="md"
/>
```

#### Button Positions

The `position` prop determines where the button appears on the screen:

- `"bottom-right"` (default): Fixed in the bottom right corner
- `"bottom-left"`: Fixed in the bottom left corner
- `"top-right"`: Fixed in the top right corner
- `"top-left"`: Fixed in the top left corner

#### Button Colors

The `color` prop changes the button's color scheme:

- `"default"` (default): Primary color (usually blue)
- `"secondary"`: Secondary color (usually gray)
- `"destructive"`: Destructive color (usually red)
- `"outline"`: Outlined style with transparent background
- `"ghost"`: Minimal style with transparent background
- `"link"`: Appears as a link

#### Icons

The `icon` prop changes the icon displayed on the button:

- `"message"` (default): Chat/message icon
- `"help"`: Question mark icon
- `"flag"`: Flag icon
- `"alert"`: Alert/warning icon
- `"info"`: Information icon

### Pre-filling User Data

If you have user information available (e.g., from authentication), you can pre-fill the email field:

```tsx
import { FeedbackComponent } from "react-feedback-component";
import { useAuth } from "./your-auth-provider";

function App() {
  const { user } = useAuth();

  return (
    <FeedbackComponent
      slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
      userEmail={user?.email}
    />
  );
}
```

### Using Individual Components

For more control, you can use the individual components:

```tsx
import { FeedbackButton } from "react-feedback-component";
import { ThemeProvider } from "react-feedback-component/ThemeProvider";
import { Toaster } from "react-feedback-component/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Toaster />
      <FeedbackButton
        slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
        position="bottom-right"
        color="default"
        // Additional props...
      />
    </ThemeProvider>
  );
}
```

## Troubleshooting

### The feedback button is not appearing

Check that:

- The component is properly imported
- You've provided either `slackWebhookUrl` or `webhookUrl` with `integrationType="webhook"`
- There are no CSS conflicts that might be hiding the button

### Feedback is not being sent to Slack

Check that:

- Your Slack webhook URL is correct and active
- Your application has internet access
- There are no CORS issues preventing the request

### Custom webhook is not receiving data

Check that:

- Your webhook URL is correct
- You've set `integrationType="webhook"`
- Your API endpoint is properly configured to receive POST requests
- Your API endpoint is handling the JSON payload correctly
- There are no CORS issues preventing the request

### The feedback form is not displaying correctly

Check that:

- You're using a compatible React version (16.8+ required for hooks)
- All dependencies are correctly installed
- There are no CSS conflicts with your application's styling
