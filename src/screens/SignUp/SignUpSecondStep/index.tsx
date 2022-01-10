import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

interface NavigationProps {
  navigate: (screen: string, options?: unknown) => void;
  goBack: () => void;
}

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute();

  const { user } = route.params as Params;

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (password != passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta criada",
          message: `Agora é só fazer login\ne aproveitar`,
        });
      })
      .catch(() => {
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>

          <Subtitle>Faça seu cadastro de{"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
