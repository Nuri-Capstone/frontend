import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직을 여기에 추가하세요
    Alert.alert('로그인 시도', `이메일: ${email}\n비밀번호: ${password}`);
  };

  const handleSignUp = () => {
    Alert.alert('이메일 가입 페이지로 이동');
  };

  const handleFindEmail = () => {
    Alert.alert('이메일 찾기 페이지로 이동');
  };

  const handleFindPassword = () => {
    Alert.alert('비밀번호 찾기 페이지로 이동');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이메일 주소</Text>
      <TextInput
        style={styles.input}
        placeholder="예) nuri@nuri.co.kr"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.footerText}>이메일 가입</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}> | </Text>
        <TouchableOpacity onPress={handleFindEmail}>
          <Text style={styles.footerText}>이메일 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}> | </Text>
        <TouchableOpacity onPress={handleFindPassword}>
          <Text style={styles.footerText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#A9A9A9',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#333333',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#000000',
    fontSize: 14,
  },
  footerDivider: {
    color: '#000000',
    fontSize: 14,
    marginHorizontal: 5,
  },
});

export default LoginScreen;