import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import { useState } from 'react';

const ProductInfoScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log("ProducItem Cart", cart);

  return (
    <ScrollView style={{ marginTop: 50, flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name="search-outline"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </TouchableOpacity>
        <Ionicons name="mic-outline" size={24} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground key={index} style={{ width, height, marginTop: 25, resizeMode: "contain" }} source={{ uri: item }}>

            <View style={{
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>

            </View>

            {/* Heart */}
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: "auto",
              marginLeft: 20,
              marginBottom: 20,
            }}>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ₹{route?.params?.price}
        </Text>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <Text>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.color}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.size}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total : ₹{route.params.price}
          </Text>
          <Text style={{ color: "#0077b6" }}>
            FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="black" />

            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver To Sujan - Bangalore 560019
            </Text>
          </View>
        </View>

        <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
          IN Stock
        </Text>

        <TouchableOpacity
          onPress={() => addItemToCart(route?.params?.item)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          {addedToCart ? (
            <View>
              <Text>Added to Cart</Text>
            </View>
          ) : (
            <Text>Add to Cart</Text>
          )}
        </TouchableOpacity>


        <TouchableOpacity style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
          <Text>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})