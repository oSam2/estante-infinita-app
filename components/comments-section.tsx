import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { CommentItem } from './comment-item';
import { AddComment } from './add-comment';
import { MessageCircle } from 'lucide-react-native';
import Loading from '@/app/loading';
import { useComments } from '@/hooks/useComments';
import { useState } from 'react';

interface CommentsSectionProps {
  listingId: number;
  ownerId?: number;
}

export function CommentsSection({ listingId, ownerId }: CommentsSectionProps) {
  const {
    comments,
    isLoading: commentsLoading,
    error: commentsError,
    createComment,
    updateComment,
    deleteComment,
  } = useComments(listingId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (commentsLoading) {
    return <Loading />;
  }

  if (commentsError || !comments) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Erro ao carregar comentários</Text>
      </View>
    );
  }

  const handleAddComment = async (content: string) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment(listingId, content);
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    await updateComment(commentId, content);
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
  };

  return (
    <View className="border-t border-border bg-background">
      <View className="flex-row items-center gap-2 p-4">
        <MessageCircle size={20} className="text-muted-foreground" />
        <Text className="text-lg font-semibold">Comentários ({comments.length})</Text>
      </View>

      <AddComment onSubmit={handleAddComment} isSubmitting={isSubmitting} />

      <View className="px-4">
        {comments.length === 0 ? (
          <View className="items-center py-8">
            <MessageCircle size={48} className="mb-4 text-muted-foreground/50" />
            <Text className="text-center text-muted-foreground">
              Nenhum comentário ainda.{'\n'}Seja o primeiro a comentar!
            </Text>
          </View>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              ownerId={ownerId}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))
        )}
      </View>
    </View>
  );
}
