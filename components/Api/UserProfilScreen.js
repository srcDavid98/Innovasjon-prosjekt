import React,{Component} from 'react';
import {Text, View, ScrollView,StyleSheet,Image } from 'react-native';

export default class UserProfilScreen extends Component{
    render() {
        // Her henter vi user Id fra navigationens parametre
        const user = this.props.navigation.getParam('user');
        // Og viser en fejlbesked hvis user ikke er defineret
        if (!user) {
            return <Text>No user specified in navigation params</Text>;
        }

        //Henter bilde,mobil,lokasjon,navn og andre attributter fra URL'en definert i Userprofilee. Vi henter ved å anvende vårt userobjekt 
        //Tekst og Scrollview for å skape en "Instagram" liknende scrollfuncksjon for fremvisning av bilder.
        //
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: user.picture.large }} />
                <Text style={styles.header}>
                    {user.name.first} {user.name.last}{' '}
                </Text>
                <Text>Phone: {user.phone}</Text>
                <Text>
                    Location: {user.location.city}, {user.location.country}
                </Text>
                <Text>
                    High Score: 150 000.
                    Rank: 24
                    </Text>
                    <Text>
                    Most populpar Sponsor: Red Bull
                </Text>
                <Text></Text>
                <Text>
                
                Taken pictures across the globe! Favorite picture is taken with the Red Bull filter outside my local mall! Huge fan of filters creating alternative landscapes and giving me the feeling og entering fantasy worlds.
                Having had several top rankings #CheckMyScore i hope to one day get sponsored!!
                </Text>
                <ScrollView style={{height:400, width:400}} horizontal={true}> 
                <Image style={styles.tinyLogo} source={{uri: 'https://images.pushsquare.com/332e53e0ed3ee/marvels-spider-man-patch-1-06-ps4-playstation-4.original.jpg',}}/>
              <Image style={styles.tinyLogo} source={{uri: 'http://www.xtremespots.com/wp-content/uploads/2015/11/Red_Bull_Crashed_Ice_2014_Saint_Paul_marketwiredotcom.jpg',}}/>

              <Image style={styles.tinyLogo} source={{uri: 'http://ichef.bbci.co.uk/news/1024/media/images/74823000/jpg/_74823947_gangs3.jpg',}}/> 
                 </ScrollView>
            </View>
        )
    }
}

//Definerer bildedimensjoner (både profilbilde og de tilfeldige)
//Simpel styling og definering av header, 
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        marginRight: 10,
    },
    container: {
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
    },  ScrollView:{
        flex:1,
        width:300
    },
    tinyLogo: {
      width:390,
      height:250,
      flex:1
    },
    
});