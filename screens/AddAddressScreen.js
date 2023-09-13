import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    console.log("Add Address Userid", userId);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };
    console.log("ADDRESSES", addresses);

    //refresh the addresses when the component comes to the focus ie basically when we navigate back
    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );


    return (
        <ScrollView style={{ marginTop: 50 }} showsVerticalScrollIndicator={false}>
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

            {/* Add Address */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Add")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                    }}>
                    <Text>Add a new Address</Text>
                    <EvilIcons name="arrow-right" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                    {/* All the added Address */}
                    {addresses.map((item, index) => (
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "#D0D0D0",
                                padding: 10,
                                flexDirection: "column",
                                gap: 5,
                                marginVertical: 10,
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                    {item?.name}
                                </Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.landmark}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.street}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                India, Pune {item?.postalCode}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                phone No : {item?.mobileNo}
                            </Text>


                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginTop: 7,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 1.9,
                                        borderColor: "#ffc300",
                                    }}
                                >
                                    <Text>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 1.9,
                                        borderColor: "#c1121f",
                                    }}
                                >
                                    <Text>Remove</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#023e8a",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#ffffff",
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: '600' }}>Set as Default</Text>
                                </TouchableOpacity>
                            </View>



                        </TouchableOpacity>
                    ))}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
