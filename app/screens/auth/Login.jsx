import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            Alert.alert('유효하지 않은 이메일', '정상적인 이메일 주소를 입력해주세요.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('비밀번호 오류', '비밀번호는 최소 6글자 이상이어야 합니다.');
            return;
        }

        
        try {
            // 서버로 로그인 요청 보내기
            const response = await fetch('http://10.0.2.2:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            // 서버 응답 처리
            if (response.status == 200) {
                const data = await response.json();
                const token = data.accessToken; // JWT 토큰을 받아온다고 가정
                // JWT 토큰을 AsyncStorage에 저장
                await AsyncStorage.setItem('userToken', token);

                // 성공적으로 로그인 후 MainTab으로 이동
                navigation.navigate('MainTab', {
                    screen: 'Home',
                });
            } else {
                // 로그인 실패 처리
                const errorData = await response.json();
                Alert.alert('로그인 실패', errorData.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            Alert.alert('오류', '서버와 연결할 수 없습니다.');
            console.error(error);
        }
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>이메일 주소</Text>
            <TextInput
                style={styles.input}
                placeholder="예) nuri@nuri.co.kr"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
                style={styles.input}
                placeholder=""
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>회원가입</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    link: {
        fontSize: 14,
        color: '#007BFF',
    },
    separator: {
        fontSize: 14,
        color: '#333',
    },
});

export default Login;
