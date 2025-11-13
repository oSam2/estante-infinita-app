import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { router } from 'expo-router';
import * as React from 'react';
import { Alert, Dimensions, Image, Pressable, ScrollView, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, X } from 'lucide-react-native';
import { createBookListing } from '@/actions/book';
import { CONDICAO_LIVRO, GENERO, TIPO_ANUNCIO } from '@/types/enum';
import {
  AD_TYPE_LABELS,
  CONDITION_LABELS,
  GENRE_LABELS,
  getAdTypeString,
  getConditionString,
  getGenreString,
} from '@/utils/book';

export function CreateListingForm() {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publisher, setPublisher] = React.useState('');
  const [isbn, setIsbn] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [genre, setGenre] = React.useState<GENERO | null>(null);
  const [condition, setCondition] = React.useState<CONDICAO_LIVRO | null>(null);
  const [listingType, setListingType] = React.useState<TIPO_ANUNCIO | null>(null);
  const [description, setDescription] = React.useState('');
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [showGenreMenu, setShowGenreMenu] = React.useState(false);
  const [showConditionMenu, setShowConditionMenu] = React.useState(false);
  const [showListingTypeMenu, setShowListingTypeMenu] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const authorInputRef = React.useRef<TextInput>(null);
  const publisherInputRef = React.useRef<TextInput>(null);
  const isbnInputRef = React.useRef<TextInput>(null);
  const priceInputRef = React.useRef<TextInput>(null);
  const descriptionInputRef = React.useRef<TextInput>(null);

  function onTitleSubmitEditing() {
    authorInputRef.current?.focus();
  }

  function onAuthorSubmitEditing() {
    publisherInputRef.current?.focus();
  }

  function onPublisherSubmitEditing() {
    isbnInputRef.current?.focus();
  }

  function onIsbnSubmitEditing() {
    priceInputRef.current?.focus();
  }

  function onPriceSubmitEditing() {
    descriptionInputRef.current?.focus();
  }

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
      setImageUri(result.assets[0].uri);
    }
  }

  function removeImage() {
    setImageUri(null);
  }

  async function onSubmit() {
    if (
      !title ||
      !author ||
      genre === null ||
      condition === null ||
      listingType === null ||
      !description
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (listingType === TIPO_ANUNCIO.VENDA && !price) {
      Alert.alert('Erro', 'Por favor, informe o preço para venda.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('titulo', title);
      formData.append('autor', author);
      formData.append('editora', publisher || '');
      formData.append('isbn', isbn || '');
      formData.append('preco', price || '0');
      formData.append('genero', getGenreString(genre));
      formData.append('condicao', getConditionString(condition));
      formData.append('tipo', getAdTypeString(listingType));
      formData.append('descricao', description);

      if (imageUri) {
        const filename = imageUri.split('/').pop() || 'book-image.jpg';
        const fileType = filename.split('.').pop() || 'jpg';

        formData.append('file', {
          uri: imageUri,
          name: filename,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await createBookListing(formData);

      if (response) {
        Alert.alert('Sucesso', 'Anúncio criado com sucesso!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível criar o anúncio. Tente novamente.');
      }
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
              <Pressable
                onPress={() => setShowListingTypeMenu(!showListingTypeMenu)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                <Text
                  className={listingType !== null ? 'text-foreground' : 'text-muted-foreground'}>
                  {listingType !== null
                    ? AD_TYPE_LABELS[listingType]
                    : 'Selecione o tipo de anúncio'}
                </Text>
              </Pressable>
              {showListingTypeMenu && (
                <View className="rounded-md border border-input bg-background">
                  {Object.entries(AD_TYPE_LABELS).map(([key, label]) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setListingType(parseInt(key) as TIPO_ANUNCIO);
                        setShowListingTypeMenu(false);
                      }}
                      className="border-b border-border px-3 py-3 last:border-b-0">
                      <Text
                        className={
                          listingType === parseInt(key)
                            ? 'font-medium text-primary'
                            : 'text-foreground'
                        }>
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Título */}
            <View className="gap-1.5">
              <Label htmlFor="title">
                Título <Text className="text-destructive">*</Text>
              </Label>
              <Input
                id="title"
                placeholder="Ex: Harry Potter e a Pedra Filosofal"
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={onTitleSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            {/* Descrição */}
            <View className="gap-1.5">
              <Label htmlFor="description">
                Descrição <Text className="text-destructive">*</Text>
              </Label>
              <Textarea
                ref={descriptionInputRef}
                id="description"
                placeholder="Descreva o estado do livro, se há marcações, páginas danificadas, etc."
                value={description}
                onChangeText={setDescription}
                numberOfLines={6}
              />
            </View>

            {/* Autor */}
            <View className="gap-1.5">
              <Label htmlFor="author">
                Autor <Text className="text-destructive">*</Text>
              </Label>
              <Input
                ref={authorInputRef}
                id="author"
                placeholder="Ex: J.K. Rowling"
                value={author}
                onChangeText={setAuthor}
                onSubmitEditing={onAuthorSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>

            {/* Editora */}
            <View className="gap-1.5">
              <Label htmlFor="publisher">Editora (opcional)</Label>
              <Input
                ref={publisherInputRef}
                id="publisher"
                placeholder="Ex: Editora Rocco"
                value={publisher}
                onChangeText={setPublisher}
                onSubmitEditing={onPublisherSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>

            {/* ISBN */}
            <View className="gap-1.5">
              <Label htmlFor="isbn">ISBN (opcional)</Label>
              <Input
                ref={isbnInputRef}
                id="isbn"
                placeholder="Ex: 978-8532530787"
                value={isbn}
                onChangeText={setIsbn}
                onSubmitEditing={onIsbnSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>

            {/* Gênero */}
            <View className="gap-1.5">
              <Label>
                Gênero <Text className="text-destructive">*</Text>
              </Label>
              <Pressable
                onPress={() => setShowGenreMenu(!showGenreMenu)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                <Text className={genre !== null ? 'text-foreground' : 'text-muted-foreground'}>
                  {genre !== null ? GENRE_LABELS[genre] : 'Selecione o gênero'}
                </Text>
              </Pressable>
              {showGenreMenu && (
                <ScrollView className="max-h-48 rounded-md border border-input bg-background">
                  {Object.entries(GENRE_LABELS).map(([key, label]) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setGenre(parseInt(key) as GENERO);
                        setShowGenreMenu(false);
                      }}
                      className="border-b border-border px-3 py-3">
                      <Text
                        className={
                          genre === parseInt(key) ? 'font-medium text-primary' : 'text-foreground'
                        }>
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Condição */}
            <View className="gap-1.5">
              <Label>
                Condição do Livro <Text className="text-destructive">*</Text>
              </Label>
              <Pressable
                onPress={() => setShowConditionMenu(!showConditionMenu)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                <Text className={condition !== null ? 'text-foreground' : 'text-muted-foreground'}>
                  {condition !== null ? CONDITION_LABELS[condition] : 'Selecione a condição'}
                </Text>
              </Pressable>
              {showConditionMenu && (
                <View className="rounded-md border border-input bg-background">
                  {Object.entries(CONDITION_LABELS).map(([key, label]) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setCondition(parseInt(key) as CONDICAO_LIVRO);
                        setShowConditionMenu(false);
                      }}
                      className="border-b border-border px-3 py-3 last:border-b-0">
                      <Text
                        className={
                          condition === parseInt(key)
                            ? 'font-medium text-primary'
                            : 'text-foreground'
                        }>
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Preço - Condicional para Venda */}
            {listingType === TIPO_ANUNCIO.VENDA && (
              <View className="gap-1.5">
                <Label htmlFor="price">
                  Preço (R$) <Text className="text-destructive">*</Text>
                </Label>
                <Input
                  ref={priceInputRef}
                  id="price"
                  placeholder="Ex: 25.00"
                  keyboardType="decimal-pad"
                  value={price}
                  onChangeText={setPrice}
                  onSubmitEditing={onPriceSubmitEditing}
                  returnKeyType="next"
                  submitBehavior="submit"
                />
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
              <Button className="flex-1" onPress={onSubmit} disabled={isSubmitting}>
                <Text>{isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
