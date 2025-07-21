import RenderCampsite from "../features/campsites/RenderCampsites";
import { Text, View, StyleSheet, Button, Modal, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlices";
import { useState } from "react";
import { Rating, AirbnbRating, Input  } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { postComment } from "../features/comments/commentsSlice";


const CampsiteInfoScreen = ({route}) => {
    const { campsite} = route.params;

   
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const comments = useSelector((state) =>state.comments);

    const favorites = useSelector((state) => state.favorites);
    const dispatch= useDispatch();

    const handleSubmit =() => {
        const newComment = {
           author,
           rating,
           text,
           campsiteId: campsite.id 
            }
        
            dispatch(postComment(newComment));

            resetForm();
        }

    const resetForm = () => {
        setAuthor('')
        setRating(5)
        setText('')
        setShowModal(false)
    }
        


    const renderCommentItem = ({item}) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{fontSize:14}}>
                    {item.text}
                </Text>
                <Rating
                    startingValue={item.rating}
                    imageSize='10'
                    readonly
                    style= {{alignItems:'flex-start' , paddingVertical:'5%'}}               
                
                />
                <Text style={{fontSize:12}}>{`-- ${item.author} , ${item.date}`}</Text>
            </View>
        )

    }

    return (
    <FlatList 
        data={comments.commentsArray.filter(
            (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item)=> item.id.toString()} 
        contentContainerStyle={{
            marginHorizontal:20,
            paddingVertical:20
        }}
        ListHeaderComponent={
            <>
            <RenderCampsite 
            campsite={campsite}
            isFavorite={favorites.includes(campsite.id)}
            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
            onShowModal={() => setShowModal(true)}
            />
            <Text style={styles.commentsTitle}>Comments</Text>
            <Modal
                animationType = 'slide'
                transparent={false}
                visible= {showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style = {styles.modal}>
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={40}
                            showRating
                            onFinishRating={(rating)=> setRating(rating)} 
                            style={{paddingVertical: 10}}
                            startingValue={5}
                            >
                            <Input>
                                
                                <Button/>
                            </Input>
                        </Rating>
                        <Input 
                        placeholder = 'Author'
                        leftIcon = {{ type: 'font-awesome', name: 'user-o' }}
                        lefticonContainerStyle={{paddingRight:10}}
                        onChangeText={(author)=> setAuthor(author)} 
                        value={author}
                        
                        />
                        <Input 
                        placeholder = "Comment"
                        leftIcon= {{ type: 'font-awesome', name: 'comment-o' }}
                        lefticonContainerStyle={{paddingRight:10}}
                        onChangeText ={(text)=> setText(text)} 
                        value={text}
                        
                        />
                    <View style={{margin:10}}>
                        <Button 
                        title="Submit"
                        color='#5637DD'
                        onPress={() => handleSubmit() }

                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                        onPress={() => resetForm()}
                        color= '#808080'
                        title= 'Cancel'
                        />
                    </View>
                </View>
            </Modal>
            </>

        }   
    />)
}

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: 'fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#434484',
        padding:10,
        paddingTop:30
    },
    commentItem: {
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor: '#fff'
    },
    modal:{
        justifyContent: 'center',
        margin: 20
    }

})
export default CampsiteInfoScreen;