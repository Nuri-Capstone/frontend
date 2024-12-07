import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Button
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const selectedImage = response.assets[0];
                    setProfileImage(selectedImage.uri); // 선택한 이미지 URI 저장
                }
            }
        );
    };

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword || !name) {
            Alert.alert('오류', '모든 필드를 입력해주세요.');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('오류', '유효한 이메일 주소를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const formData = new FormData();
            
            // Append form fields
            formData.append('email', email);
            formData.append('name', name);
            formData.append('password', password);
            // formData.append('userImg', {
            //     uri: profileImage,
            //     type: 'image/*',
            //     name: 'profile-image.jpg', // name of the file to be sent
            // });
    
            // Send the request to the backend
            const response = await fetch('http://10.0.2.2:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                // Successfully signed up
                Alert.alert('성공', '회원가입이 완료되었습니다!');
                navigation.replace('Login');
            } else {
                // Handle any errors returned from the server
                Alert.alert('오류', data.message || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            Alert.alert('오류', '서버와 연결할 수 없습니다.');
        }
        navigation.replace('Login');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    {/* <Image
                        source={
                            profileImage
                                ? { uri: profileImage }
                                : require('../../assets/images/default-profile.png')
                        }
                        style={styles.profileImage}
                    />
                    <Button title="이미지 추가" onPress={selectImage} style={styles.addImage}></Button> */}

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>이메일 주소</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="예) nuri@nuri.co.kr"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>비밀번호</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>비밀번호 확인</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>이름</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.signUpButtonText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 194,
        height: 186,
        borderRadius: 100,
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 2,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        padding: 10,
    },
    signUpButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    addImage:{
        backgroundColor: '#333',
    }
});

export default SignUp;
