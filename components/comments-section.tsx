import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { CommentItem } from './comment-item';
import { AddComment } from './add-comment';
import { MessageCircle } from 'lucide-react-native';
import type { Comment } from '@/types/interfaces';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/app/loading';

interface CommentsSectionProps {
  listingId: number;
  onAddComment: (comment: string) => void;
  isSubmitting?: boolean;
}

export function CommentsSection({ listingId, onAddComment, isSubmitting }: CommentsSectionProps) {
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useFetch<Comment[]>(`/comentarios/listByAnuncio/${listingId}`);

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

  return (
    <View className="border-t border-border bg-background">
      <View className="flex-row items-center gap-2 p-4">
        <MessageCircle size={20} className="text-muted-foreground" />
        <Text className="text-lg font-semibold">Comentários ({comments.length})</Text>
      </View>
      {/* Formulário para adicionar comentário */}
      <AddComment onSubmit={onAddComment} isSubmitting={isSubmitting} />
      {/* Lista de comentários */}
      <View className="px-4">
        {comments.length === 0 ? (
          <View className="items-center py-8">
            <MessageCircle size={48} className="mb-4 text-muted-foreground/50" />
            <Text className="text-center text-muted-foreground">
              Nenhum comentário ainda.{'\n'}Seja o primeiro a comentar!
            </Text>
          </View>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
        )}
      </View>
    </View>
  );
}
