import { View, Alert } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Trash2, Check, X } from 'lucide-react-native';
import { useState } from 'react';
import type { Comment } from '@/types/interfaces';
import { useAuth } from '@/contexts/AuthContext';

interface CommentItemProps {
  comment: Comment;
  ownerId?: number;
  onUpdate?: (commentId: number, content: string) => Promise<void>;
  onDelete?: (commentId: number) => Promise<void>;
}

export function CommentItem({ comment, ownerId, onUpdate, onDelete }: CommentItemProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.texto);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = user?.id === comment.usuarioId;
  const isAnnouncementOwner = comment.usuarioId === ownerId;

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

  const handleEdit = async () => {
    if (!editContent.trim() || !onUpdate) return;

    setIsLoading(true);
    try {
      await onUpdate(comment.id, editContent.trim());
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o comentário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (!onDelete) return;

    Alert.alert(
      'Excluir comentário',
      'Tem certeza que deseja excluir este comentário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await onDelete(comment.id);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o comentário');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.texto);
  };

  return (
    <Card className="mb-3 border-border/50 p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-foreground">{comment.usuario.nome}</Text>
            {isAnnouncementOwner && (
              <View className="rounded-full bg-primary/10 px-2 py-0.5">
                <Text className="text-xs font-medium text-primary">Anunciante</Text>
              </View>
            )}
          </View>

          {isEditing ? (
            <View className="mt-2">
              <Textarea
                value={editContent}
                onChangeText={setEditContent}
                numberOfLines={3}
                className="min-h-[60px]"
                placeholder="Edite seu comentário..."
              />
              <View className="flex-row justify-end gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onPress={handleCancelEdit}
                  disabled={isLoading}>
                  <X size={16} className="mr-1" />
                  <Text>Cancelar</Text>
                </Button>
                <Button
                  size="sm"
                  onPress={handleEdit}
                  disabled={isLoading || !editContent.trim()}>
                  <Check size={16} className="mr-1" />
                  <Text>Salvar</Text>
                </Button>
              </View>
            </View>
          ) : (
            <Text className="mt-2 text-muted-foreground">{comment.texto}</Text>
          )}
        </View>

        {isOwner && !isEditing && (
          <View className="flex-row gap-1 ml-2">
            <Button
              size="icon"
              variant="ghost"
              onPress={() => setIsEditing(true)}
              disabled={isLoading}
              className="h-8 w-8">
              <Edit2 size={14} className="text-muted-foreground" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onPress={handleDelete}
              disabled={isLoading}
              className="h-8 w-8">
              <Trash2 size={14} className="text-destructive" />
            </Button>
          </View>
        )}
      </View>

      <Text className="mt-3 text-xs text-muted-foreground">
        {formatDate(comment.criadoEm)}
        {comment.atualizadoEm && comment.atualizadoEm !== comment.criadoEm && ' (editado)'}
      </Text>
    </Card>
  );
}
