import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {

            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    navigation.replace("Main")
                }
            } catch (error) {
                console.log("Error Message", err);
            }
        }
        checkLoginStatus();
    }, [])

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }
        axios.post("http://192.168.1.6:8000/login", user).then(response => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            navigation.replace("Main");
        }).catch(err => {
            Alert.alert("Login Error")
            console.log(err);
        })
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginTop: 12,
                            color: "#041E42",
                        }}>
                        Login into your Account
                    </Text>
                </View>

                {/* Email Field */}

                <View style={{ marginTop: 70 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 12,
                        }}>
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="grey"
                        />
                        <TextInput
                            style={{
                                color: "grey",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                {/* Password Field */}

                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 12,
                        }}>
                        <Ionicons
                            style={{ marginLeft: 8 }}
                            name="lock-open"
                            size={24}
                            color="grey"
                        />
                        <TextInput
                            style={{
                                color: "grey",
                                marginVertical: 10,
                                width: 300,
                                textDecorationLine: "none",
                                fontSize: password ? 16 : 16,
                            }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholder="Enter your password"
                        />
                    </View>
                </View>


                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: '#0077FF', fontWeight: '500' }}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: 'auto', marginRight: 'auto', padding: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
                </Pressable>

                <Pressable style={{ marginTop: 15 }} onPress={() => { navigation.navigate("Register") }}>
                    <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>
                        Dont have an account? SignUp.
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
