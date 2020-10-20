import * as React from 'react';
import firebase from "firebase";
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import UserListScreen from './UserListScreen';
import Maps from './Local/Maps';

const styles = StyleSheet.create({
    error: {
        color: 'red',
    }, container: {
        paddingTop: 100,
        alignContent: 'center'  
        
       // alignItems: "center"      
    },
    inputField: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        color:"black",
        padding: 10,
        fontSize:10,
        textAlign: 'center',
        height:30,
        width:"100%",
        alignContent: 'center'
       
       
    },
});

export default class LoginForm extends React.Component {
    //Definerer en state for Login, hvorav vi tilskriver noen "attributter" der definerer login
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    //Nedenstående kode  kan anvendes til en realtime database konfigutrationen i Firebase.
    //Koden er dog ikke relevant for denne øvelse, men dog anvedelig, hvis der skal bruges adgang til realtime database
    /*insertUser = async (user) => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            // Here the data is passed to the service and we wait for the result
            await firebase.database().ref('users/002').set({
                email:email ,
                password: password
            });
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.essage);
            this.endLoading();
        }
    };*/

    //Metoder for å oppdatere de forskjellige states.
    //False/True lar oss indikere om hvorvidt prosesser er igangsatte eller ikk. Avhengig av default state definert vs state satt
    //Handlechange email & pwd lar oss hente innhold fra hhv. Textboksene 
    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => {this.setState({ password })
    
    };

    //LogInfunkjson som foretar asynkront kall til vår database. Sjekker username og pwd opp mot firebase
    //Innlemmet i try catch for å fange evnt fejl og fremvise fejl
    loginUser = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            // Here the data is passed to the service and we wait for the result
            const output =  await firebase.auth().signInWithEmailAndPassword(email, password);
            //Consologe.log utskriver i konsollen og lar os tjekek om funkjsonen "virker"
            console.log(output);
            this.endLoading();
            //isCompleted true anvendes i render og flytter oss in Maps viewet (når Login er satt til første view i StackNavigator)
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.essage);
            this.endLoading();
        }
    };
    

    
    render = () => {
        //
        const { errorMessage, email, password, isCompleted } = this.state;
        //IsCompleted => LoginSucsess, loader maps som first view (omgår login=>google kart mappingen via stacknavigator atm for innleverings skyld) 
        if (isCompleted) {
            return <Maps/>;
        }
        return (
            <View style={styles.container}>
                <View></View>
                <Text>
                                To login, please fill in the inputfields.
                </Text>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.inputField}
                />
                
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                {this.renderButton()}
                <Button title="Create User" onPress={this.handlePageSwitch}
                color="green"/>
                
            </View>
            
        );
    };
    handlePageSwitch = () => {
        // Vi navigerer til Signup skærmen og sender den modtagne user med som argument
        this.props.navigation.navigate('SignUp');
    }

   

    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.loginUser} title="Press to login" />;
    };
}