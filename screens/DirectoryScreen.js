import { FlatList,View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const DirectoryScreen = ({navigation}) => {

    const campsites = useSelector((state) => state.campsites);

    const renderDirectoryItem=({item:campsite}) =>{
        return(
            <Tile 
                title = {campsite.name}
                caption = {campsite.decription}
                featured
                onPress={() => navigation.navigate('CampsiteInfo' , {campsite})}
                imageSrc = {{uri:baseUrl + campsite.image}}
                />
                
        )
    }
    return (
        <View>
            <FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
        </View>
        
    )
}

export default DirectoryScreen;