import React,{Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, Linking, Button,} from 'react-native';


export default class UserItem extends Component {

    //Starter med funksjonene øverst, deretter allokerer/refererer vi til funksjonene vi har generert lenger oppe
    //Funksjon der lar oss clicke på bruker og låse oss til et user objekt
    handleClick = () => {
        const { user, onSelect } = this.props;
        onSelect(user);
    };
    render() {
        const { user } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this.handleClick}>
                <Image style={styles.image} source={{ uri: user.picture.thumbnail }} />
                <Text>{user.name.first} {user.name.last}</Text>
               
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    container: {
        flexDirection: 'column',
        margin: 10,
        alignItems: 'center',
    },
});