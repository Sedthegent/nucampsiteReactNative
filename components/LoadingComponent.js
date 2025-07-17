import { ActivityIndicator, StyleSheet,Text, View } from "react-native";

function Loading () {
    return(
        <View style= {styles.loadingView}>
            <ActivityIndicator size='large' color= '#5637DD'/>
            <Text style={styles.loadtingText}>Loading . . .</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
    },
    loadtingText: ({
        colore: '#5637DD',
        fontSize:14,
        fontWeight: 'bold'
    })
})

export default Loading