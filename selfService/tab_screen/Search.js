import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { product } from '../Services';
import FastImage from 'react-native-fast-image';
import { Input } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';

export default class Search extends Component {

  static navigationOptions = {
    header:null,
  };

  constructor(props) {
    super(props);
    this.state = {
      jdt: [],
      jdtz: [], //yedel jdt
      search: '',
    };
  }

  componentDidMount() {
    data = {
      start: "0",
    }

    product(data).then(res => {
      this.setState({ jdt: res.Products[0].bilgiler, jdtz: res.Products[0].bilgiler })
    })

  }

  fncDetail = (item) => {
    this.props.navigation.navigate("productDetail", { pushItem: item})
  }

  updateSearch = (search) => {
    this.setState({ search:search})
    arr=[]
    this.state.jdtz.forEach(item => {
      if(item.productName.toLowerCase().includes(search.toLowerCase()))
      arr.push(item)
    })
    this.setState({jdt:arr})
  };

  render() {
    return (
      <ScrollView>
        <SearchBar
        placeholder="Ürün yazınız.."
        onChangeText={this.updateSearch}
        value={this.state.search}
      />
        <FlatList
          style={{ flex: 1, }}
          data={this.state.jdt}
          keyExtractor={(item, index) => index.toString}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={ () => this.fncDetail(item)}>
              <View style={styles.row}>

                <FastImage
                  style={styles.thumb}
                  source={{ uri: item.images[0].normal }}
                />

                <View style={styles.txtRow}>
                  <Text style={styles.title}>{item.productName}</Text>
                  <Text style={styles.price}>{item.price} ₺</Text>
                </View>

              </View>
            </TouchableOpacity>
          }
        />


      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({

  row: {
    margin: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 5,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  txtRow: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    textAlign: 'left',
    height: 70,
  },
  price: {
    fontSize: 10,
    textAlign: 'right',
    color: "#4287f5"
  }
})