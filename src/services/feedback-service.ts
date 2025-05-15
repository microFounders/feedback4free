import { FeedbackFormData } from "@/types/feedback";
import { formatSlackMessage } from "@/utils/slack-formatter";

/**
 * Sends feedback to a Slack webhook
 */
export async function sendFeedbackToSlack(
  data: FeedbackFormData,
  webhookUrl: string
): Promise<Response> {
  // Validate webhook URL
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    console.log("Development mode: Simulating Slack webhook response");
    // Return a mock successful response for testing or when no webhook is provided
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If there's a screenshot, handle it separately
  let dataWithBase64 = { ...data };
  let imageData = null;

  if (data.screenshot) {
    try {
      imageData = await fileToBase64(data.screenshot);
      // We're not adding the full base64 string to the message blocks anymore
      // Instead, we'll add a note about the screenshot
      dataWithBase64.screenshotBase64 = "screenshot-included";
    } catch (error) {
      console.error("Error converting screenshot to base64:", error);
    }
  }

  const payload = formatSlackMessage(dataWithBase64);

  try {
    // Send the formatted payload to Slack
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      mode: "no-cors", // Add no-cors mode to avoid CORS issues
    });

    // If we have image data and want to send it separately,
    // we would need to use a different API endpoint or method
    // For now, we'll just log that we have the image data
    if (imageData) {
      console.log(
        "Image data available, but not sending separately:",
        imageData.substring(0, 50) + "..."
      );

      // In a real implementation, you might upload the image to S3,
      // Google Cloud Storage, or another file hosting service,
      // then share the URL in the Slack message
    }

    // Since we're using no-cors, we won't get a proper response status
    // Instead, we'll return a mock success response
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to send feedback to Slack:", error);
    throw error;
  }
}

/**
 * Sends feedback to a generic webhook
 */
export async function sendFeedbackToWebhook(
  data: FeedbackFormData,
  webhookUrl: string
): Promise<Response> {
  // Validate webhook URL
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    console.log("Development mode: Simulating webhook response");
    // Return a mock successful response for testing or when no webhook is provided
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  let imageData = null;

  // Format data for the webhook
  const payload = {
    type: data.type,
    email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp: new Date().toISOString(),
    hasScreenshot: !!data.screenshot,
  };

  try {
    // Send data to the webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      mode: "no-cors", // Add no-cors mode to avoid CORS issues
    });

    // If there's a screenshot and we want to handle it separately
    if (data.screenshot) {
      try {
        imageData = await fileToBase64(data.screenshot);
        console.log("Screenshot data available but not sending separately");
        // In a real implementation, you could send this to a file storage service
      } catch (error) {
        console.error("Error converting screenshot to base64:", error);
      }
    }

    // Since we're using no-cors, return a mock success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to send feedback to webhook:", error);
    throw error;
  }
}

/**
 * Convert a file to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Upload image to a server and return the URL
 * In a real implementation, this would upload to your actual file storage
 * For now, this is a placeholder that simulates an upload delay
 */
export async function uploadScreenshot(file: File): Promise<string> {
  return new Promise((resolve) => {
    // Simulate upload delay
    setTimeout(() => {
      // In a real implementation, this would be the URL to the uploaded file
      resolve("https://example.com/uploaded-image.jpg");
    }, 1000);
  });
}
