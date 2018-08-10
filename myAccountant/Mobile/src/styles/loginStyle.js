import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40,
    },
    header: {
        fontSize: 24,
        marginTop: 30,
        marginBottom: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
        
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        backgroundColor: '#fff',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,        
    },
    error : {
        borderWidth: 3,
        borderColor: 'red'
    }
})

export default styles