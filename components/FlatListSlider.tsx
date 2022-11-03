import React, { Component, createRef } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Platform,
    UIManager,
    Dimensions,
    ViewStyle,
} from 'react-native';
import { keyExtractHandler } from '../utils/miscUtils';
import Indicator from './Indicator';
import ChildItem from './ProductSliderImage';

type FlatListSliderProps = {
    data: any[]
    width: number
    separatorWidth: number
    contentContainerStyle: ViewStyle
    component: React.ReactElement
    imageKey: string
    onPress: () => void
    local: any
    height: number
    indicatorStyle: ViewStyle
    indicator: boolean
    loop: boolean
    currentIndexCallback?: (index: number) => any
    indicatorContainerStyle: ViewStyle
    indicatorActiveColor: string
    indicatorInActiveColor: string
    indicatorActiveWidth: number
}

type FlatListSliderStateProps = {
    data: any[]
    index: number
}

export default class FlatListSlider extends Component<FlatListSliderProps, FlatListSliderStateProps> {
    slider = createRef<FlatList>();

    static defaultProps = {
        data: [],
        imageKey: 'image',
        local: false,
        width: Math.round(Dimensions.get('window').width),
        height: 230,
        separatorWidth: 0,
        loop: true,
        indicator: true,
        indicatorStyle: {},
        indicatorContainerStyle: {},
        indicatorActiveColor: '#3498db',
        indicatorInActiveColor: '#bdc3c7',
        indicatorActiveWidth: 6,
        // animation: true,
        // autoscroll: true,
        // timer: 3000,
        onPress: {},
        contentContainerStyle: {},
        component: <ChildItem />,
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            data: this.props.data,
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.renderSliderItemHandler = this.renderSliderItemHandler.bind(this)
        this.getItemLayoutHandler = this.getItemLayoutHandler.bind(this)
        this.renderItemSeparatorComp = this.renderItemSeparatorComp.bind(this)
    }

    renderItemSeparatorComp() {
        return <View style={{ width: this.props.separatorWidth }} />
    }

    renderSliderItemHandler({ item, index }) {
        return React.cloneElement(this.props.component, {
            key: item.id,
            style: { width: this.props.width },
            item: item,
            imageKey: this.props.imageKey,
            onPress: this.props.onPress,
            index: this.state.index % this.props.data.length,
            active: index === this.state.index,
            local: this.props.local,
            height: this.props.height,
        })
    }

    getItemLayoutHandler(data, index) {
        const itemWidth = this.props.width;
        const separatorWidth = this.props.separatorWidth;
        const totalItemWidth = itemWidth + separatorWidth;
        return {
            length: totalItemWidth,
            offset: totalItemWidth * index,
            index,
        }
    }

    render() {
        const itemWidth = this.props.width;
        const separatorWidth = this.props.separatorWidth;
        const totalItemWidth = itemWidth + separatorWidth;

        return (
            <View>
                <FlatList
                    ref={this.slider}
                    horizontal
                    pagingEnabled={true}
                    snapToInterval={totalItemWidth}
                    decelerationRate="fast"
                    bounces={false}
                    contentContainerStyle={this.props.contentContainerStyle}
                    data={this.state.data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderSliderItemHandler}
                    ItemSeparatorComponent={this.renderItemSeparatorComp}
                    keyExtractor={keyExtractHandler}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    getItemLayout={this.getItemLayoutHandler}
                    windowSize={1}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    removeClippedSubviews={true}
                />
                {this.props.indicator && (
                    <Indicator
                        itemCount={this.props.data.length}
                        currentIndex={this.state.index % this.props.data.length}
                        indicatorStyle={this.props.indicatorStyle}
                        indicatorContainerStyle={[
                            styles.indicatorContainerStyle,
                            this.props.indicatorContainerStyle,
                        ]}
                        indicatorActiveColor={this.props.indicatorActiveColor}
                        indicatorInActiveColor={this.props.indicatorInActiveColor}
                        indicatorActiveWidth={this.props.indicatorActiveWidth}
                        // style={{ ...styles.indicator, ...this.props.indicatorStyle }}
                        style={this.props.indicatorStyle}
                    />
                )}
            </View>
        );
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % this.props.data.length === this.props.data.length - 1 &&
                this.props.loop
            ) {
                this.setState({
                    index: currentIndex,
                    data: [...this.state.data, ...this.props.data],
                });
            } else {
                this.setState({ index: currentIndex });
            }

            if (this.props.currentIndexCallback) {
                this.props.currentIndexCallback(currentIndex);
            }
        }
    };

    viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };
}

const styles = StyleSheet.create({
    image: {
        height: 230,
        resizeMode: 'stretch',
    },
    indicatorContainerStyle: {
        marginTop: 18,
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});