import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {

    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };


    return (
        <TouchableOpacity style={{ marginVertical: 25, marginHorizontal: 10 }}>
            <Image
                style={{ width: 160, height: 140, resizeMode: "contain" }}
                source={{ uri: item?.image }}
            />
            <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
                {item?.title}
            </Text>

            <View
                style={{
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    ₹ {item?.price}
                </Text>
                <Text style={{ fontSize: 14, color: "#ffc72c", fontWeight: "bold" }}>
                    {item?.rating.rate}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => addItemToCart(item)}
                style={{
                    backgroundColor: "#ffc72c",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                }}>
                {addedToCart ? (
                    <View>
                        <Text style={{ fontSize: 10, fontWeight: '500' }}>Added to Cart</Text>
                    </View>
                ) : (
                    <Text style={{ fontSize: 10, fontWeight: '500' }}>Add to Cart</Text>
                )}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default ProductItem;

const styles = StyleSheet.create({});
