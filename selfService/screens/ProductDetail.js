import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';


const height = Dimensions.get("window").height;

class ProductDetail extends Component {
    imgUrls = []

    constructor(props) {
        super(props);
        // pushItem 
        pushItem = this.props.navigation.getParam("pushItem", null);
        imgArr = []
        pushItem.images.map((itm, index) => {
            imgArr.push(itm.normal)
            const objUrl = { url: itm.normal }
            this.imgUrls.push(objUrl)
        })

        this.state = {
            item: pushItem,
            images: imgArr,
            imageStatu: false,
        };
    }

    hightPrice = (price) => {
        const prt = parseFloat(price * 1.05);
        return (<Text style={styles.hightPrice}> {prt} </Text>)
    }

    render() {
        return (
            <View>                
                <View style={{ position: 'absolute', width: '100%', height: 50, marginTop: height - 175,  }}></View>
                <ScrollView>
                    <Modal visible={this.state.imageStatu} transparent={true}>
                        <ImageViewer
                            enableSwipeDown={true}
                            onSwipeDown={() => this.setState({ imageStatu: false })}
                            imageUrls={this.imgUrls} />
                    </Modal>
                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={200}
                        onCurrentImagePressed={index => {
                            this.setState({ imageStatu: true })
                        }
                        }
                    />
                    <Text style={styles.title}> {this.state.item.productName} </Text>
                    {this.hightPrice(this.state.item.price)}
                    <Text style={styles.price}> {parseFloat(this.state.item.price)} </Text>
                    <Text style={styles.detail}> {this.state.item.description} </Text>
                    <View style={{ flex: 1, height: 50, }}></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        height: 150,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        margin: 5,
    },
    price: {
        textAlign: 'right',
        fontSize: 17,
        color: '#2f7d5d',
        margin: 5,
    },
    hightPrice: {
        textAlign: 'right',
        fontSize: 13,
        color: 'red',
        textDecorationLine: 'line-through',
        marginRight: 5,
        marginBottom: -3,
    },
    detail: {
        margin: 5,
    }
});
export default ProductDetail;

