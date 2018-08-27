import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, ViewPropTypes, TouchableWithoutFeedback } from 'react-native';

class DefaultTabBar extends Component {

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    underlineStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    activeTextColor: "#fe564c",
    inactiveTextColor: '#232323',
    backgroundColor: null,
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;

    return <TouchableWithoutFeedback
      delayPressIn={0}
      style={{ flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle,]}>
        <Text style={[{ color: textColor }, textStyle,]}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs / 2,
      height: 2,
      backgroundColor: '#fe564c',
      bottom: 0,
      left: containerWidth / numberOfTabs / 4,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          return this.renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, { transform: [{ translateX }] }, this.props.underlineStyle]} />
      </View>
    );
  }
}

export default DefaultTabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});