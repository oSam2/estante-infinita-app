import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { Pressable, TextInput, View, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';

export function SignInForm() {
  const passwordInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  async function onSubmit() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)/home');
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.status === 401
          ? Alert.alert('Erro', 'Credenciais inválidas')
          : Alert.alert('Erro', 'Erro ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Bem vindo de volta</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Entre com suas credenciais para continuar.
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
              <View className="flex-row items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Pressable onPress={() => {}}>
                  <Text className="text-sm text-primary underline underline-offset-4">
                    Esqueceu a senha?
                  </Text>
                </Pressable>
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
              <Text>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <Text className="text-center text-sm">Não tem uma conta? </Text>
            <Pressable
              onPress={() => {
                router.push('/(auth)/sign-up');
              }}>
              <Text className="text-sm underline underline-offset-4">Criar conta</Text>
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
