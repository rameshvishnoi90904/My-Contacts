import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
/**
 * Component for showing fullscreen loading spinner.
 *
 * @component
 * @example
 * return (
 *   <View>
 *      ...other elements
 *      <LoadingSpinner/>
 *   </View>
 * )
 */
function LoadingSpinner(props){
	const bgColor = props.backgroundColor ? props.backgroundColor : 'rgba(52, 52, 52, 0.4)';
	const style = props.style ? props.style : {};

	const spinnerColor = props.spinnerColor ? props.spinnerColor :"#00ff00"
	return (
		<View style={[{backgroundColor:bgColor, position:'absolute', width: width, height: height, justifyContent: 'center', alignItems:'center'}, style]}>
			<ActivityIndicator size="large" color={spinnerColor} />
		</View>
	);
}

export default LoadingSpinner;
