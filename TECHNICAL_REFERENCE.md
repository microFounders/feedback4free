# React Feedback Component - Technical Reference

This document provides a detailed technical overview of the React Feedback Component's architecture, internal structure, and implementation details.

## Component Architecture

The React Feedback Component is built with a modular architecture consisting of several key components:

```
FeedbackComponent
├── ThemeProvider
├── Toaster
└── FeedbackButton
    └── FeedbackForm (rendered when button is clicked)
        ├── FeedbackFormContent
        │   ├── FeedbackTypeSelector
        │   ├── FormField (Email)
        │   ├── FormField (Subject)
        │   ├── FormField (Message)
        │   ├── ScreenshotUpload
        │   └── SubmitButton
        └── Services
            ├── feedback-service
            └── slack-formatter
```

## Key Components

### FeedbackComponent

The main entry point that wraps the FeedbackButton with ThemeProvider and Toaster components.

**File**: `src/FeedbackComponent.tsx`

```tsx
export const FeedbackComponent: React.FC<{
  slackWebhookUrl: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  color?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  icon?: "message" | "help" | "flag" | "alert" | "info";
  animate?: boolean;
}> = ({ slackWebhookUrl, position, color, icon, animate }) => {
  return (
    <ThemeProvider defaultTheme="system">
      <Toaster />
      <FeedbackButton
        slackWebhookUrl={slackWebhookUrl}
        position={position}
        color={color}
        icon={icon}
        animate={animate}
      />
    </ThemeProvider>
  );
};
```

### FeedbackButton

Renders the button that triggers the feedback form. Handles positioning, styling, and animation.

**File**: `src/components/FeedbackButton.tsx`

Key features:

- Renders a button with configurable position, color, icon, and animation
- Manages the open/closed state of the feedback form
- Uses the ButtonContent component to render the icon and label

### FeedbackForm

A modal form that appears when the button is clicked. Handles form submission and feedback sending.

**File**: `src/components/FeedbackForm.tsx`

Key features:

- Uses React Hook Form for form state management
- Handles form submission to either Slack or a custom webhook
- Supports screenshot uploads
- Shows toast notifications for success/error states

### ButtonContent

Renders the content of the button (icon and optional label).

**File**: `src/components/feedback-button/ButtonContent.tsx`

### IconSelector

Selects the appropriate icon based on the icon prop.

**File**: `src/components/feedback-button/IconSelector.tsx`

### PositionClasses

Provides CSS classes for positioning the button.

**File**: `src/components/feedback-button/PositionClasses.tsx`

## Services

### feedback-service

Handles sending feedback data to either Slack or a custom webhook.

**File**: `src/services/feedback-service.ts`

Key functions:

- `sendFeedbackToSlack`: Formats and sends feedback data to a Slack webhook
- `sendFeedbackToWebhook`: Sends feedback data to a custom webhook endpoint

### slack-formatter

Formats feedback data for Slack's message format.

**File**: `src/utils/slack-formatter.ts`

## Types

### FeedbackButtonProps

Defines the props for the FeedbackButton component.

**File**: `src/components/feedback-button/FeedbackButtonProps.ts`

```typescript
export interface FeedbackButtonProps {
  slackWebhookUrl?: string;
  webhookUrl?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  color?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  icon?: "message" | "help" | "flag" | "alert" | "info";
  animate?: boolean;
  size?: "sm" | "default" | "lg";
  label?: string;
  showLabel?: boolean;
  rounded?: "full" | "md";
  userEmail?: string;
  integrationType?: "slack" | "webhook";
}
```

### FeedbackFormData

Defines the structure of the feedback form data.

**File**: `src/types/feedback.ts`

```typescript
export interface FeedbackFormData {
  type: "issue" | "idea" | "other";
  email: string;
  subject: string;
  message: string;
  screenshot?: File | null;
}
```

## UI Components

The component uses a set of reusable UI components built with Radix UI and styled with Tailwind CSS:

- `Button`: A customizable button component
- `Card`: A container component for the feedback form
- `Input`: Text input fields
- `Label`: Form labels
- `RadioGroup`: Used for the feedback type selector
- `ScrollArea`: Provides scrolling for the feedback form
- `Textarea`: Multiline text input for the feedback message
- `Toast` and `Toaster`: Notification components

## Styling

The component uses Tailwind CSS for styling with the following key features:

- Responsive design that works on all screen sizes
- Dark mode support via the ThemeProvider
- Customizable colors and styles
- Animation support

## Form Submission Flow

1. User clicks the feedback button
2. Feedback form modal appears
3. User fills out the form and optionally uploads a screenshot
4. User submits the form
5. The form data is validated
6. Based on the `integrationType` prop:
   - If "slack", the data is formatted for Slack and sent to the Slack webhook
   - If "webhook", the data is sent as JSON to the custom webhook URL
7. A success or error toast notification is shown
8. On success, the form is reset and closed

## Screenshot Upload

The component supports screenshot uploads with the following features:

- File selection via file input
- Preview of the selected image
- Option to remove the selected image
- The image is converted to base64 before sending

## Error Handling

The component includes error handling for:

- Form validation errors
- Network errors when sending feedback
- File upload errors

## Dependencies

The component relies on the following key dependencies:

- React and React DOM
- React Hook Form for form state management
- Radix UI for accessible UI components
- Lucide React for icons
- Tailwind CSS for styling
- next-themes for theme management

## Build and Packaging

The component is built with Vite and TypeScript, with the following configuration:

- TypeScript for type safety
- Vite for fast development and optimized builds
- ESLint for code quality
- Jest for testing

The package is published to npm with the following structure:

```
dist/
├── react-feedback-component.es.js    # ES module
├── react-feedback-component.umd.js   # UMD module
└── types/                            # TypeScript type definitions
    └── FeedbackComponent.d.ts
```

## Performance Considerations

The component is designed with performance in mind:

- The feedback form is only rendered when the button is clicked
- The modal uses React's portal to avoid layout issues
- The form uses controlled components for better performance
- The screenshot is only processed when the form is submitted

## Accessibility

The component follows accessibility best practices:

- Keyboard navigation support
- ARIA attributes for screen readers
- Focus management for the modal
- Color contrast that meets WCAG guidelines
- Responsive design for all screen sizes
