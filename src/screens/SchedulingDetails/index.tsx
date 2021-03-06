import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Header,
  CardImages,
  Content,
  Details,
  Brand,
  Description,
  Rent,
  Name,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  DateTitle,
  DateValue,
  DateInfo,
  CalendarIcon,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps } from "../Home";
import { CarDTO } from "../../dtos/CarDTO";
import { format } from "date-fns";
import { getPlatFormDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentalTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);
    const { data } = await api.get(`/schedules_bycars/${car.id}`);
    const schedulesByCar = data.unavailable_dates;

    const unavailable_dates = [...schedulesByCar, ...dates];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlatFormDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlatFormDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "Home",
          title: "Carro alugado",
          message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar seu autom??vel.`,
        });
      })
      .catch(() => {
        Alert.alert("N??o foi possivel concluir o agendamento");
        setLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatFormDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatFormDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} color="#000" />
      </Header>

      <CardImages>
        <ImageSlider imagesUrl={car.photos} />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
