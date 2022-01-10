import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import {
  CardList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export interface NavigationProps {
  navigate: (screen: string, options?: unknown) => void;
  goBack: () => void;
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");

        setCars(response.data);
      } catch (err) {
        console.log(err);
        Alert.alert("Não foi possivel carregar os dados");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading ? (
            <TotalCars>Total de {cars.length} carros</TotalCars>
          ) : null}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
