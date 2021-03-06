import React, { Component, PropTypes } from 'react';
import MapView from 'react-native-maps';
import { Image, View, Dimensions, Platform, Text } from 'react-native';
import ImgMarkerEvent from '../resources/marker/event_big.png';
import ImgMarkerFacility from '../resources/marker/facility_big.png';
import ImgMarkerWarning from '../resources/marker/warning_big.png';

const styles = {
  marker: {
    width: 58,
    height: 82.4,
    zIndex: 2,
    position: 'absolute',
    top: 18,
    left: Dimensions.get('window').width / 2 - 58 / 2
  },
  fontRobotoMedium: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  }
};

class DetailLitemap extends Component {
  constructor(props) {
    super(props);
    this.renderImgMarker = this.renderImgMarker.bind(this);
  }

  renderImgMarker() {
    if (this.props.category === 'event') {
      return ImgMarkerEvent;
    } else if (this.props.category === 'facility') {
      return ImgMarkerFacility;
    }
    return ImgMarkerWarning;
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <MapView
          style ={{height: 100, width: 333, borderRadius: 5}}
          region={this.props.currentLocation}
          litemode={true}
          scrollEnabled = {false}
          zoomEnabled = {false}
        />
        <Image source={this.renderImgMarker()} style={styles.marker}/>
        <Text style={[{
          alignSelf: 'center',
          position: 'absolute',
          top: 37,
          fontSize: 14,
          color: '#ffffff',
          height: 15, width: 15,
          left: Dimensions.get('window').width / 2 - 58 / 2 + 22,
          zIndex: 50,
          textAlign: 'center'
        }, styles.fontRobotoMedium]}>
          {this.props.numOfEvent}
        </Text>
      </View>
    );
  }
}

DetailLitemap.propTypes = {
  currentLocation: PropTypes.any.isRequired,
  category: PropTypes.string,
  numOfEvent: PropTypes.number
};

export default DetailLitemap;
