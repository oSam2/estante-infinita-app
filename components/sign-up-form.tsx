import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { Pressable, TextInput, View, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const nomeInputRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { signUp } = useAuth();

  function onNomeSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onEmailSubmitEditing() {
    nomeInputRef.current?.focus();
  }

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, nome);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Crie sua conta</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Bem vindo! Por favor, preencha os detalhes para começar.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@exemplo.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="nome">Nome (opcional)</Label>
              <Input
                ref={nomeInputRef}
                id="nome"
                placeholder="Seu nome"
                autoCapitalize="words"
                onSubmitEditing={onNomeSubmitEditing}
                returnKeyType="next"
                value={nome}
                onChangeText={setNome}
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Senha</Label>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Button className="w-full" onPress={onSubmit} disabled={loading}>
              <Text>{loading ? 'Criando conta...' : 'Continuar'}</Text>
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <Text className="text-center text-sm">Já possuí uma conta? </Text>
            <Pressable
              onPress={() => {
                router.push('/(auth)/sign-in');
              }}>
              <Text className="text-sm underline underline-offset-4">Efetuar login</Text>
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
