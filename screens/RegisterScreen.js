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
    TouchableOpacity,

} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";




const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = { name: name, email: email, password: password };

        // send a post request to the backend API
        axios.post("https://reactnative-be.onrender.com/register", user).then((response) => {
            console.log(response);
            Alert.alert("Registeration successful", "You have registered successfully");

            setName = ("");
            setEmail = ("");
            setPassword = ("");
            navigation.replace("Login");
        }).catch((error) => {
            Alert.alert("Registeration Failed", "An error occurred while registering");
            console.log("Registeration Failed", error);
        });
    };


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
                        Register your Account
                    </Text>
                </View>

                {/* Name Field */}

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
                        <FontAwesome5 style={{ marginLeft: 8 }} name="user-alt" size={20} color="grey" />
                        <TextInput
                            style={{
                                color: "grey",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="Enter your Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                </View>

                {/* Email Field */}


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
                            placeholder="Enter your Email"
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
                            placeholder="Enter your Password"
                        />
                    </View>
                </View>


                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: '#0077FF', fontWeight: '500' }}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                {/* <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: 'auto', marginRight: 'auto', padding: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Register</Text>
                </Pressable> */}

                <TouchableOpacity onPress={handleRegister} style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: 'auto', marginRight: 'auto', padding: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Register</Text>
                </TouchableOpacity>

                <Pressable style={{ marginTop: 15 }} onPress={() => { navigation.goBack() }}>
                    <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>
                        Already Have account? SignIn.
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})