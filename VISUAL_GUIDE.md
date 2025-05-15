# React Feedback Component Visual Guide

This guide provides visual examples of the React Feedback Component with different configurations to help you choose the right settings for your application.

## Button Positions

The `position` prop determines where the feedback button appears on the screen.

### Bottom Right (Default)

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" position="bottom-right" />
```

```
+---------------------------+
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                       [F] |
+---------------------------+
```

### Bottom Left

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" position="bottom-left" />
```

```
+---------------------------+
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
| [F]                       |
+---------------------------+
```

### Top Right

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" position="top-right" />
```

```
+---------------------------+
|                       [F] |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
+---------------------------+
```

### Top Left

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" position="top-left" />
```

```
+---------------------------+
| [F]                       |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
+---------------------------+
```

## Button Colors

The `color` prop changes the button's color scheme.

### Default

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" color="default" />
```

Primary color (usually blue)

### Secondary

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" color="secondary" />
```

Secondary color (usually gray)

### Destructive

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" color="destructive" />
```

Destructive color (usually red)

### Outline

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" color="outline" />
```

Outlined style with transparent background

### Ghost

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" color="ghost" />
```

Minimal style with transparent background

### Link

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" color="link" />
```

Appears as a link

## Icons

The `icon` prop changes the icon displayed on the button.

### Message (Default)

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" icon="message" />
```

Chat/message icon

### Help

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" icon="help" />
```

Question mark icon

### Flag

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" icon="flag" />
```

Flag icon

### Alert

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" icon="alert" />
```

Alert/warning icon

### Info

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" icon="info" />
```

Information icon

## Button Sizes

The `size` prop changes the size of the button.

### Small

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" size="sm" />
```

Small button

### Default

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" size="default" />
```

Default size

### Large

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" size="lg" />
```

Large button

## Button Rounding

The `rounded` prop changes the corner rounding of the button.

### Full (Default)

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" rounded="full" />
```

Fully rounded (circular)

### Medium

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" rounded="md" />
```

Medium rounded corners (rounded rectangle)

## Button Label

The `label` and `showLabel` props control the text displayed on the button.

### Icon Only (Default)

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  label="Feedback"
  showLabel={false}
/>
```

Shows only the icon

### With Label

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  label="Send Feedback"
  showLabel={true}
/>
```

Shows both the icon and label text

## Animation

The `animate` prop adds a subtle pulse animation to draw attention to the button.

### Without Animation (Default)

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" animate={false} />
```

Static button without animation

### With Animation

```tsx
<FeedbackComponent slackWebhookUrl="YOUR_WEBHOOK_URL" animate={true} />
```

Button with pulse animation

## Common Combinations

### Help Button

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  position="bottom-right"
  color="secondary"
  icon="help"
  rounded="full"
/>
```

A help button in the bottom right corner

### Feedback Tab

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  position="right"
  color="default"
  icon="message"
  label="Feedback"
  showLabel={true}
  rounded="md"
/>
```

A feedback tab on the right side with text

### Alert Button

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  position="bottom-left"
  color="destructive"
  icon="alert"
  animate={true}
/>
```

An animated alert button in the bottom left corner

### Minimal Button

```tsx
<FeedbackComponent
  slackWebhookUrl="YOUR_WEBHOOK_URL"
  position="top-right"
  color="ghost"
  icon="flag"
  size="sm"
/>
```

A small, minimal button in the top right corner

## Feedback Form

When the button is clicked, a modal form appears with the following fields:

1. **Feedback Type**: Radio buttons to select the type of feedback (Issue, Idea, Other)
2. **Email**: Text field for the user's email (pre-filled if `userEmail` prop is provided)
3. **Subject**: Text field for the feedback subject
4. **Message**: Textarea for the detailed feedback message
5. **Screenshot**: File upload field for attaching a screenshot
6. **Submit Button**: Button to submit the feedback

The form is responsive and will adapt to different screen sizes.
