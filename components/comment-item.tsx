import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import type { Comment } from '@/types/interfaces';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="mb-3 border-border/50 p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-foreground">{comment.usuario.nome}</Text>
            {/* {comment.isOwner && (
              <View className="rounded-full bg-primary/10 px-2 py-0.5">
                <Text className="text-xs font-medium text-primary">Anunciante</Text>
              </View>
            )} */}
          </View>
          <Text className="mt-2 text-muted-foreground">{comment.texto}</Text>
        </View>
      </View>
      <Text className="mt-3 text-xs text-muted-foreground">{formatDate(comment.criadoEm)}</Text>
    </Card>
  );
}
