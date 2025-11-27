import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { router } from 'expo-router';
import * as React from 'react';
import { Alert, Image, Pressable, ScrollView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, X } from 'lucide-react-native';
// import { createBookListing } from '@/actions/book';
import { CONDICAO_LIVRO, GENERO, TIPO_ANUNCIO } from '@/types/enum';
import {
  AD_TYPE_LABELS,
  CONDITION_LABELS,
  GENRE_LABELS,
  getAdTypeString,
  getConditionString,
  getGenreString,
} from '@/utils/book';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createListingSchema, type CreateListingFormData } from '@/lib/validations/listing';
import { useBooks } from '@/hooks/useBooks';

export function CreateListingForm() {
  const [showGenreMenu, setShowGenreMenu] = React.useState(false);
  const [showConditionMenu, setShowConditionMenu] = React.useState(false);
  const [showListingTypeMenu, setShowListingTypeMenu] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateListingFormData>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      titulo: '',
      autor: '',
      editora: '',
      isbn: '',
      preco: '',
      descricao: '',
      imageUri: null,
    },
  });

  const { createBook } = useBooks();

  const listingType = watch('tipo');
  const imageUri = watch('imageUri');

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setValue('imageUri', result.assets[0].uri);
    }
  }

  function removeImage() {
    setValue('imageUri', null);
  }

  async function onSubmit(data: CreateListingFormData) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('autor', data.autor);
      formData.append('editora', data.editora || '');
      formData.append('isbn', data.isbn || '');
      formData.append('preco', data.preco || '0');
      formData.append('genero', getGenreString(data.genero));
      formData.append('condicao', getConditionString(data.condicao));
      formData.append('tipo', getAdTypeString(data.tipo));
      formData.append('descricao', data.descricao);

      if (data.imageUri) {
        const filename = data.imageUri.split('/').pop() || 'book-image.jpg';
        const fileType = filename.split('.').pop() || 'jpg';

        formData.append('file', {
          uri: data.imageUri,
          name: filename,
          type: `image/${fileType}`,
        } as any);
      }

      await createBook(formData);
  
      Alert.alert('Sucesso', 'Anúncio criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o anúncio. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card className="border-border/0 shadow-sm shadow-black/5">
        <CardHeader>
          <CardDescription>
            Preencha as informações do livro que você deseja anunciar.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Tipo de Anúncio */}
            <View className="gap-1.5">
              <Label>
                Tipo de Anúncio <Text className="text-destructive">*</Text>
              </Label>
              <Controller
                control={control}
                name="tipo"
                render={({ field: { value } }) => (
                  <>
                    <Pressable
                      onPress={() => setShowListingTypeMenu(!showListingTypeMenu)}
                      className={`flex h-10 w-full rounded-md border px-3 py-2 ${
                        errors.tipo ? 'border-destructive' : 'border-input'
                      } bg-background`}>
                      <Text
                        className={
                          value !== undefined ? 'text-foreground' : 'text-muted-foreground'
                        }>
                        {value !== undefined
                          ? AD_TYPE_LABELS[value]
                          : 'Selecione o tipo de anúncio'}
                      </Text>
                    </Pressable>
                    {showListingTypeMenu && (
                      <View className="rounded-md border border-input bg-background">
                        {Object.entries(AD_TYPE_LABELS).map(([key, label]) => (
                          <Pressable
                            key={key}
                            onPress={() => {
                              setValue('tipo', parseInt(key) as TIPO_ANUNCIO);
                              setShowListingTypeMenu(false);
                            }}
                            className="border-b border-border px-3 py-3 last:border-b-0">
                            <Text
                              className={
                                value === parseInt(key)
                                  ? 'font-medium text-primary'
                                  : 'text-foreground'
                              }>
                              {label}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </>
                )}
              />
              {errors.tipo && (
                <Text className="text-sm text-destructive">{errors.tipo.message}</Text>
              )}
            </View>

            {/* Título */}
            <View className="gap-1.5">
              <Label htmlFor="titulo">
                Título <Text className="text-destructive">*</Text>
              </Label>
              <Controller
                control={control}
                name="titulo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="titulo"
                    placeholder="Ex: Harry Potter e a Pedra Filosofal"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    className={errors.titulo ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.titulo && (
                <Text className="text-sm text-destructive">{errors.titulo.message}</Text>
              )}
            </View>

            {/* Descrição */}
            <View className="gap-1.5">
              <Label htmlFor="descricao">
                Descrição <Text className="text-destructive">*</Text>
              </Label>
              <Controller
                control={control}
                name="descricao"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea
                    id="descricao"
                    placeholder="Descreva o estado do livro, se há marcações, páginas danificadas, etc."
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    numberOfLines={6}
                    className={errors.descricao ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.descricao && (
                <Text className="text-sm text-destructive">{errors.descricao.message}</Text>
              )}
            </View>

            {/* Autor */}
            <View className="gap-1.5">
              <Label htmlFor="autor">
                Autor <Text className="text-destructive">*</Text>
              </Label>
              <Controller
                control={control}
                name="autor"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="autor"
                    placeholder="Ex: J.K. Rowling"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                    className={errors.autor ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.autor && (
                <Text className="text-sm text-destructive">{errors.autor.message}</Text>
              )}
            </View>

            {/* Editora */}
            <View className="gap-1.5">
              <Label htmlFor="editora">Editora (opcional)</Label>
              <Controller
                control={control}
                name="editora"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="editora"
                    placeholder="Ex: Editora Rocco"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                  />
                )}
              />
            </View>

            {/* ISBN */}
            <View className="gap-1.5">
              <Label htmlFor="isbn">ISBN (opcional)</Label>
              <Controller
                control={control}
                name="isbn"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="isbn"
                    placeholder="Ex: 978-8532530787"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="next"
                  />
                )}
              />
            </View>

            {/* Gênero */}
            <View className="gap-1.5">
              <Label>
                Gênero <Text className="text-destructive">*</Text>
              </Label>
              <Controller
                control={control}
                name="genero"
                render={({ field: { value } }) => (
                  <>
                    <Pressable
                      onPress={() => setShowGenreMenu(!showGenreMenu)}
                      className={`flex h-10 w-full rounded-md border px-3 py-2 ${
                        errors.genero ? 'border-destructive' : 'border-input'
                      } bg-background`}>
                      <Text
                        className={
                          value !== undefined ? 'text-foreground' : 'text-muted-foreground'
                        }>
                        {value !== undefined ? GENRE_LABELS[value] : 'Selecione o gênero'}
                      </Text>
                    </Pressable>
                    {showGenreMenu && (
                      <ScrollView className="max-h-48 rounded-md border border-input bg-background">
                        {Object.entries(GENRE_LABELS).map(([key, label]) => (
                          <Pressable
                            key={key}
                            onPress={() => {
                              setValue('genero', parseInt(key) as GENERO);
                              setShowGenreMenu(false);
                            }}
                            className="border-b border-border px-3 py-3">
                            <Text
                              className={
                                value === parseInt(key)
                                  ? 'font-medium text-primary'
                                  : 'text-foreground'
                              }>
                              {label}
                            </Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    )}
                  </>
                )}
              />
              {errors.genero && (
                <Text className="text-sm text-destructive">{errors.genero.message}</Text>
              )}
            </View>

            {/* Condição */}
            <View className="gap-1.5">
              <Label>
                Condição do Livro <Text className="text-destructive">*</Text>
              </Label>
              <Controller
                control={control}
                name="condicao"
                render={({ field: { value } }) => (
                  <>
                    <Pressable
                      onPress={() => setShowConditionMenu(!showConditionMenu)}
                      className={`flex h-10 w-full rounded-md border px-3 py-2 ${
                        errors.condicao ? 'border-destructive' : 'border-input'
                      } bg-background`}>
                      <Text
                        className={
                          value !== undefined ? 'text-foreground' : 'text-muted-foreground'
                        }>
                        {value !== undefined ? CONDITION_LABELS[value] : 'Selecione a condição'}
                      </Text>
                    </Pressable>
                    {showConditionMenu && (
                      <View className="rounded-md border border-input bg-background">
                        {Object.entries(CONDITION_LABELS).map(([key, label]) => (
                          <Pressable
                            key={key}
                            onPress={() => {
                              setValue('condicao', parseInt(key) as CONDICAO_LIVRO);
                              setShowConditionMenu(false);
                            }}
                            className="border-b border-border px-3 py-3 last:border-b-0">
                            <Text
                              className={
                                value === parseInt(key)
                                  ? 'font-medium text-primary'
                                  : 'text-foreground'
                              }>
                              {label}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </>
                )}
              />
              {errors.condicao && (
                <Text className="text-sm text-destructive">{errors.condicao.message}</Text>
              )}
            </View>

            {/* Preço - Condicional para Venda */}
            {listingType === TIPO_ANUNCIO.VENDA && (
              <View className="gap-1.5">
                <Label htmlFor="preco">
                  Preço (R$) <Text className="text-destructive">*</Text>
                </Label>
                <Controller
                  control={control}
                  name="preco"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="preco"
                      placeholder="Ex: 25.00"
                      keyboardType="decimal-pad"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      className={errors.preco ? 'border-destructive' : ''}
                    />
                  )}
                />
                {errors.preco && (
                  <Text className="text-sm text-destructive">{errors.preco.message}</Text>
                )}
              </View>
            )}

            {/* Upload de Imagem */}
            <View className="gap-1.5">
              <Label>Imagem do Livro</Label>
              {imageUri ? (
                <View className="relative">
                  <Image
                    source={{ uri: imageUri }}
                    className="h-48 w-full rounded-md"
                    resizeMode="cover"
                  />
                  <Pressable
                    onPress={removeImage}
                    className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-destructive">
                    <X size={16} className="text-destructive-foreground" />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={pickImage}
                  className="h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-input bg-background">
                  <Camera size={32} className="mb-2 text-muted-foreground" />
                  <Text className="text-muted-foreground">Toque para adicionar uma foto</Text>
                </Pressable>
              )}
            </View>

            {/* Botões */}
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onPress={() => router.back()}
                disabled={isSubmitting}>
                <Text>Cancelar</Text>
              </Button>
              <Button className="flex-1" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
                <Text>{isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
