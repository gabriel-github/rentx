import React from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

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
  About,
  Accessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Home";

export function CarDetails() {
  const navigation = useNavigation<NavigationProps>();

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} color="#000" />
      </Header>

      <CardImages>
        <ImageSlider
          imagesUrl={[
            "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
          ]}
        />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>RS 5 Coupé</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <About>
          skajdjoasjdojoaisjdalksjdlkaaaaaaaaaaaasdjiaoisdisjidj
          sdbskjabdjbabdjkkkkkkkkkkkkkkkkdbjdbjakkAPOSKOjspojOJOSPASJJAOPJSOJAPjksdjdjskhdhjadkjasd
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
