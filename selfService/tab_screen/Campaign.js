import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { announcement } from '../Services';
import FastImage from 'react-native-fast-image'


export default class Campaign extends Component {
  static navigationOptions = {
    title: 'Kampanyalar',
    headerTitleStyle: {
      color: "#ffffff"
    },
    headerStyle: {
      backgroundColor: "#1e355c"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      jdt: []
    };
  }

  componentDidMount() {
    data = {
      start: "0",
      count: "2"
    }
    announcement(data).then(res => {
      this.setState({ jdt: res.News[0].Haber_Bilgileri })
    })
  }

  fncDetail = (item) => {
    this.props.navigation.navigate("announceDetail", { pushItem: item })
  }

  render() {
    return (
      <View style={{ backgroundColor: "#e0e0e0", overflow: 'hidden' }}>
        <StatusBar
          backgroundColor="#4066a8"
          barStyle="light-content"
        />
        <ScrollView>
          <FlatList
            data={this.state.jdt}
            keyExtractor={(item, index) => index.toString}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => { this.fncDetail(item) }}>
                <View style={styles.row}>
                  <FastImage
                    style={styles.thumb}
                    source={{ uri: item.picture }}
                  />
                  <View style={styles.textRow}>

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.detail}>{item.s_description}</Text>

                  </View>
                </View>
              </TouchableOpacity>}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    margin: 5,
    fontSize: 20,
    textAlign: 'left',
    color: "#000000",
  },
  detail: {
    margin: 5,
    fontSize: 20,
    textAlign: 'left',
    color: "#000000",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  row: {
    margin: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: "#4066a8",
    borderRadius: 10
  },
  textRow: {
    flex: 1,
  },
  title: {
    margin: 5,
    fontSize: 20,
    textAlign: 'left',
    color: "#ffffff",
  }
})