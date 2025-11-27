import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react-native';
import { useState } from 'react';

interface AddCommentProps {
  onSubmit: (comment: string) => void;
  isSubmitting: boolean;
}

export function AddComment({ onSubmit, isSubmitting }: AddCommentProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit(comment.trim());
    setComment('');
  };

  return (
    <View className="border-t border-border bg-background p-4">
      <View className="flex-row items-end gap-3">
        <View className="flex-1">
          <Textarea
            placeholder="Escreva seu comentário..."
            value={comment}
            onChangeText={setComment}
            numberOfLines={3}
            className="min-h-[80px]"
          />
        </View>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting || !comment.trim()}
          size="icon" 
          className="h-12 w-12">
          <Send size={20} className="text-primary-foreground" />
        </Button>
      </View>
    </View>
  );
}
