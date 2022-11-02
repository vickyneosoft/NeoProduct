import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'

const ProductSliderImage = ({
    item,
    style,
    onPress,
    index,
    imageKey,
    local,
    height
}) => {
    return (
        <FastImage
            style={[styles.image, style, { height: height }]}
            source={local ? item[imageKey] : { uri: item[imageKey] }}
            resizeMode={"stretch"}
        />
    );
};

const styles = StyleSheet.create({
    container: {},
    image: {
        height: 230,
        resizeMode: 'stretch',
    },
});

export default ProductSliderImage
