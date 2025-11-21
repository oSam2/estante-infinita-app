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
import { signIn } from '@/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  async function handleSubmit() {
    if (!email.trim() || !password) {
      Alert.alert('Erro', 'Preencha email e senha.');
      return;
    }

    setLoading(true);
    try {
      const res = await signIn({ email: email.trim(), password });
      if (res.status === 200) {
        console.log('Login sucesso:', res.data);
        // Armazena token e usuário
        try {
          if (res.data?.token) {
            await AsyncStorage.setItem('@estante:token', res.data.token);
          }
          if (res.data?.userWithoutPassword) {
            await AsyncStorage.setItem('@estante:user', JSON.stringify(res.data.userWithoutPassword));
          }
        } catch (e) {
          console.warn('Não foi possível salvar token no storage', e);
        }

        router.replace('/');
        return;
      }
      Alert.alert('Erro', res.data?.error || res.data?.message || 'Credenciais inválidas');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
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
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Pressable
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
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
                onSubmitEditing={handleSubmit}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Button className="w-full" onPress={handleSubmit} disabled={loading}>
              <Text>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <Text className="text-center text-sm">Não tem uma conta? </Text>
            <Pressable
              onPress={() => {
                router.push('/sign-up');
              }}>
              <Text className="text-sm underline underline-offset-4">Criar conta</Text>
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">ou</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
