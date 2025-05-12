
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

import { sendFeedbackToSlack } from '@/services/feedback-service';
import { FeedbackFormData } from '@/types/feedback';

interface FeedbackFormProps {
  onClose: () => void;
  slackWebhookUrl: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose, slackWebhookUrl }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors },
    reset
  } = useForm<FeedbackFormData>({
    defaultValues: {
      type: 'issue',
      email: '',
      subject: '',
      message: ''
    }
  });
  
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  
  const currentType = watch('type') || 'issue';
  
  const handleScreenshotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setScreenshot(file);
  };
  
  const removeScreenshot = () => {
    setScreenshot(null);
  };
  
  const onSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true);
      
      const feedbackData: FeedbackFormData = {
        type: data.type || 'issue',
        email: data.email || '',
        subject: data.subject || '',
        message: data.message || '',
        screenshot
      };
      
      await sendFeedbackToSlack(feedbackData, slackWebhookUrl);
      
      toast({
        title: "Feedback Sent",
        description: "Thank you for your feedback!",
        duration: 5000,
      });
      
      reset();
      setScreenshot(null);
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const feedbackTypes = [
    { 
      value: 'issue', 
      label: 'Issue', 
      description: 'Report a bug or problem'
    },
    { 
      value: 'suggestion', 
      label: 'Suggestion', 
      description: 'Share your ideas'
    },
    { 
      value: 'question', 
      label: 'Question', 
      description: 'Ask about something'
    },
    { 
      value: 'other', 
      label: 'Other', 
      description: 'Something else'
    }
  ];
  
  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Card className="w-full max-w-md relative overflow-hidden animate-scale-in shadow-xl">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 h-6 w-6 z-10" 
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </Button>
        
        <ScrollArea className="h-[85vh] max-h-[600px]">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Send Feedback</h2>
            <p className="text-muted-foreground text-sm mb-4">We'd love to hear from you</p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">What kind of feedback do you have?</Label>
                <RadioGroup 
                  defaultValue="issue" 
                  className="grid grid-cols-2 gap-2"
                  {...register('type')}
                >
                  {feedbackTypes.map((type) => (
                    <Label
                      key={type.value}
                      htmlFor={`type-${type.value}`}
                      className={`flex flex-col items-start p-3 border rounded-md cursor-pointer transition-all text-sm
                        ${currentType === type.value 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                          : 'hover:bg-muted'
                        }`}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={type.value} 
                          id={`type-${type.value}`} 
                          className="h-4 w-4 data-[state=checked]:border-primary data-[state=checked]:text-primary" 
                        />
                        <span className="font-medium">{type.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 ml-6">
                        {type.description}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Your email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    } 
                  })}
                  className={`h-10 text-sm ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`h-10 text-sm ${errors.subject ? 'border-destructive' : ''}`}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details..."
                  rows={4}
                  {...register('message', { required: 'Message is required' })}
                  className={`text-sm min-h-[100px] ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="screenshot" className="text-sm">Screenshot (optional)</Label>
                {!screenshot ? (
                  <div className="flex items-center justify-center w-full">
                    <label 
                      htmlFor="screenshot" 
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-3 pb-3">
                        <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input 
                        id="screenshot" 
                        type="file" 
                        className="hidden"
                        accept="image/*"
                        onChange={handleScreenshotChange} 
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative border rounded-md p-3 flex items-center">
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium">{screenshot.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(screenshot.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeScreenshot}
                      className="h-8 w-8 p-0 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-10 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Feedback
                  </>
                )}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default FeedbackForm;
