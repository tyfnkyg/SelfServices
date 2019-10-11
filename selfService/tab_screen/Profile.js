import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class Profile extends Component {
  static navigationOptions = {
    title: 'Giriş',

  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  fncSendData = () => {
    const mail = this.state.mail;
    const pass = this.state.password;

    // url
    const url = 'https://www.jsonbulut.com/json/userLogin.php';
    const data = {
      ref: '5380f5dbcc3b1021f93ab24c3a1aac24',
      userEmail: mail,
      userPass: pass,
      face: 'no',
    };
  }

  render() {
    const { navigation } = this.props;
    const prKey = navigation.getParam('prKey', '');
    return (
      <View style={styles.container}>

        <TextInput
          onChangeText={val => this.setState({ mail: val })}
          style={styles.txt}

          placeholder="E-Mail Adresi"
          keyboardType="email-address"
        />

        <TextInput
          onChangeText={val => this.setState({ password: val })}
          style={styles.txt}
          placeholder="Şifre"

          secureTextEntry
        />

        <TouchableOpacity onPress={this.fncSendData}>
          <Text
            style={[
              styles.txt,
              { textAlign: 'center', backgroundColor: '#96bcfa' },
            ]}>
            {' '}Giriş Yap{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.props.navigation.navigate("register") }}>
          <Text
            style={[
              styles.txt,
              { textAlign: 'center', backgroundColor: '#96bcfa' },
            ]}>
            {' '}Üye Ol{' '}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  txt: {
    borderColor: '#4287f5',
    borderWidth: 1,
    fontSize: 20,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});