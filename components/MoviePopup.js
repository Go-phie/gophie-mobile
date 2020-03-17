import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { closeMovie } from '../reducers';
import Modal from "react-native-modal";
import { defaultStyles } from '../styles';

const { width, height } = Dimensions.get('window');
// const re = new RegExp(/\d+.?\d+/)
class MoviePopup extends Component {

    render() {
        const { movie, navigation, engine, popupIsOpen, closeMovie } = this.props

        if (movie !== undefined) {
            // extract movie size
            //regular expression to match size
            // let size = parseFloat(re.exec(String(movie.Size))[0])
            let description = movie.Description !== " " ?
                "Could not retrieve descriptions from " + engine :
                movie.Description
            return ( 
            < Modal isVisible ={popupIsOpen} onBackdropPress = {() => closeMovie()} >
                <View style={styles.modal} >
                    <View style={styles.imageContainer } >
                        <Image source={{ uri: movie.CoverPhotoLink }} style={styles.image}/> 
                    <View style={styles.descriptionSize}>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>{description}</Text> 
                    </View > 
                    <View style={styles.size} > 
                    < Text style={styles.sizeString} >{movie.Size}</Text>
                    </View >
                    </View> 
                </View > 
                <Text style={styles.title} >{movie.Title}</Text> 
                <View style={styles.footer}>
                <TouchableHighlight underlayColor="#9575CD"
                style={[styles.buttonContainer, defaultStyles.themecolor]}
                //   onPress={onBook}
                >
                <Text style={styles.button}> Download </Text> 
                </TouchableHighlight > 
                <TouchableHighlight underlayColor="#9575CD"
                style={[styles.buttonContainer, {backgroundColor: '#ff1a1a'}]}
                onPress={() => {closeMovie();return navigation.navigate('Stream')}} >
                <Text style={styles.button}> Stream </Text> 
                </TouchableHighlight > 
                </View> 
                </View> 
            </Modal>
            );
        }
        return null;
    }

}

const styles = StyleSheet.create({
    // Popup
    modal: {
        height: height / 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignContent: 'flex-end',
    },
    imageContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
    image: {
        borderRadius: 10,
        width: width / 3,
        maxHeight: 200,
    },
    descriptionSize: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "column",
        flex: 1,
    },
    description: {
        flex: 0.5,
        paddingBottom: 10,
        backgroundColor: "#d3d3d3",
        borderRadius: 7,
    },
    descriptionText: {
        ...defaultStyles.text,
        fontSize: 10,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    size: {
        flexShrink: 20,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: "#ffff33",
    },
    sizeString: {
        color: "#000000",
    },
    title: {
        ...defaultStyles.text,
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 10,
    },
    buttonContainer: {
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    button: {
        ...defaultStyles.text,
        color: '#FFFFFF',
        fontSize: 15,
    },
    footer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});


const mapStateToProps = state => {
    return {
        popupIsOpen: state.popupIsOpen,
        movie: state.movie,
        engine: state.engine,
    };
};

const mapDispatchToProps = {
    closeMovie,
};

function MPopup(props) {
    const navigation = useNavigation();

    return <MoviePopup {...props }
    navigation = { navigation }
    />;
}
export default connect(mapStateToProps, mapDispatchToProps)(MPopup);