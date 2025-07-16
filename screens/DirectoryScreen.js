import { FlatList,View, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useState } from "react";
import { CAMPSITES } from "../shared/campsites";

const DirectoryScreen = ({navigation}) => {

    const [campsites, setCampsites] = useState(CAMPSITES)
    const renderDirectoryItem=({item:campsite}) =>{
        return(
            <ListItem onPress={() => navigation.navigate('CampsiteInfo' , {campsite})}>
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }
    return (
        <View>
            <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
        </View>
        
    )
}

export default DirectoryScreen;