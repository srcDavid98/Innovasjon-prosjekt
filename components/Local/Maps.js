import * as React from 'react';
//Importerer de props vi kommer til å anvede 
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Dimensions, Animated, Image} from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';



export default class Maps extends React.Component {

//Lager en refferance
  mapViewRef = React.createRef();


  state = {
    //Undersøker om det er tillatelse for lokasjonen
    hasLocationPermission: null,
    //Sjekker brukerens lokasjon (null fordi default er at vi ikke ved før godkent og anvendt)
    currentLocation: null,
    //Array som ser på våre fastsatte markers
    userMarkerCoordinates: [],
    //Ser på kordinatene til den valgte markør
    selectedCoordinate: null,
    //Finner addressen på den valgte markør
    selectedAddress: null,
    
  };

  //Funksjon der navigerer til userliste view
  GoToProfile = () =>{
    console.log("hejsa");
    this.props.navigation.navigate('UserList');
  }

//Eventhandler der anvender pe
//getloCation funksjon med Asynkront call der forespør om å anvende lokationen. Tar status som parameter. Setter haslocation til true/false avhengig av svar
  getLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    //Responsen fra kallet blir lagt inn i haslocationpermission (true/false)
    this.setState({ hasLocationPermission: status });
  };

  componentDidMount = async () => {
    await this.getLocationPermission();
  };


  updateLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    this.setState({ currentLocation: coords });
    const { latitude, longitude } = coords;
    this.mapViewRef &&
      this.mapViewRef.current.animateCamera({
        camera: { center: { latitude, longitude }, zoom: 12, altitude: 100 },
        duration: 10,
      });
  };

  handleLongPress = event => {
    const { coordinate } = event.nativeEvent;
    this.setState(prevState => {
      return {
        userMarkerCoordinates: [...prevState.userMarkerCoordinates, coordinate],
      };
    });
  };

  handleSelectMarker = coordinate => {
    this.setState({ selectedCoordinate: coordinate });
    this.findAddress(coordinate); 
    
  };

  findAddress = async coordinate => {
    const [selectedAddress] = await Location.reverseGeocodeAsync(coordinate);
    this.setState({ selectedAddress });
  };

  closeInfoBox = () =>
    this.setState({ selectedCoordinate: null, selectedAddress: null });

  renderCurrentLocation = () => {
    const { hasLocationPermission, currentLocation } = this.state;
    //Har vi ikke tatt stilling til lokasjon tilgang settes den til null
    if (hasLocationPermission === null) {
      return null;
    }
    //Er tilgang til lokasjon AVSLÅTT setter vi den til false (typ at brukere sier nei til stedstjenester)
    if (hasLocationPermission === false) {
      //Utskirver en simpel tekskomponent
      return <Text>No location access. Go to settings to change</Text>;
    }
    //Implicitt else statement der oppdaterer lokasjonen da den er godkjent på følgende tidspunkt
    //Opprettes en knapp der onPress anvender funksjonen updatelocation.
    return (
      <View>
        <Button title="update location" onPress={this.updateLocation} />
        {currentLocation && (
          <Text>
            {`${currentLocation.latitude}, ${
              currentLocation.longitude
            } accuracy:${currentLocation.accuracy}`}
          </Text>
        )}
      </View>
    );
  };
  
  render() {
    const { userMarkerCoordinates, selectedCoordinate,selectedUser,} = this.state;
    
    return (
      //SafeAreaView sørger for at vår content tilpasses det fysiske device sin skjerm (Iphone 11 med spesielle kanter)
      //HandleLongpress reff til metode lenger opp (markør popper opp ved hold)
      <SafeAreaView style={styles.container}>
       {this.renderCurrentLocation()}
        <MapView
          provider="google"
          style={styles.map}
          ref={this.mapViewRef}

          showsUserLocation
          onLongPress={this.handleLongPress}>
            
          <Marker
            coordinate={{ latitude: 55.676195, longitude: 12.569419 }}
            title="Rådhuspladsen"
            description="Most popular venue!"
           
          />
          <Marker
            coordinate={{ latitude: 55.673035, longitude: 12.568756 }}
            title="Tivoli"
            description="Can you beat the high-score?"
          />
          <Marker
            coordinate={{ latitude: 55.674082, longitude: 12.598108 }}
            title="Christiania"
            description="Watch out!"
            image source='https://reactnative.dev/img/tiny_logo.png'
          />
          {userMarkerCoordinates.map((coordinate, index) => (
            <Marker
              coordinate={coordinate}
              key={index.toString()}
              onPress={() => this.handleSelectMarker(coordinate)}
            />
          ))}
          
        
        </MapView>
        {selectedCoordinate && (<View style={styles.infoBox}>
            <Text style={styles.infoText}>{selectedCoordinate.latitude}, {selectedCoordinate.longitude}</Text>
            <Text style={{fontSize:20, color:'grey' }}>These are the top pictures at your location!</Text>
              <ScrollView style={{height:10}} >
               
              <Image style={styles.tinyLogo} source={{uri: 'https://i.imgur.com/Ka8kNST.jpg',}}/>
              <Image style={styles.tinyLogo} source={{uri: 'https://i.imgur.com/sNam9iJ.jpg',}}/>

              <Image style={styles.tinyLogo} source={{uri: 'https://i.imgur.com/UDrH0wm.jpg',}}/> 
             

             <TouchableOpacity onPress={this.GoToProfile}>
             <Image style={styles.tinyLogo} source={{uri: 'https://i.imgur.com/N7rlQYt.jpg',}}/>
             </TouchableOpacity>
        
      
</ScrollView>
             
           <Button title="close" onPress={this.closeInfoBox} />
          </View>
        )}
      </SafeAreaView>
    ); // Det at bildet er touchable skal gi muligheten for at trykke inn på personens profil
  }
}
//Stylesheet for header,map,infobox(popup) og bilde dimensjoner(skal defineres for bilder fra nett)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 50,
  },
  map: { flex: 1, justifyContent: 'flex-end' },
  infoBox: {
    height: 350,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 15,
 
  },
  tinyLogo: {
    width:400,
    height:300,
    flex:1
  },
  tinyLogo1: {
    width:280,
    height:280,
    flex:1
  }
});