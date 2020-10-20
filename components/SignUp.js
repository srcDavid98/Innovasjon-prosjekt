import * as React from 'react';
import firebase from "firebase";
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    container
} from 'react-native';
import LoginForm from './LogIn';


const styles = StyleSheet.create({
    error: {
        color: 'red',
    }, container: {
        alignContent:'center',
        paddingTop: 100,
        
    },

    //Simpel 
    inputField: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        padding: 10,
        textAlign: 'center',
        alignContent: 'center'
},


});

export default class SignUpForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    //Nedenstående kode  kan anvendes til en realtime database konfigutrationen i Firebase.
    //Ikke anvendt grunent problemer før innlevering
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



    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            //Dataen sendes til firebase (firebase cmd) hvorav vi avventer respons (confirmation)
            const output =  await firebase.auth().createUserWithEmailAndPassword(email, password);
            //Utskiver outputet i consollen, lar oss følge evnt fejl gjennom visual 
            console.log(output);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.essage);
            this.endLoading();
        }
    };


    //
    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            //IsCompleted jf. Vellykket signup, sender oss tilbake til Login (brukeren skal naturligvis logge ind)
            return <Text>You are now signed up</Text>,
            <LoginForm></LoginForm>;
        }
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: 'red'}}>
        </View>
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
            </View>
        );
    };

    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Create user" />;
    };
}
