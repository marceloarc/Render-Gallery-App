import {React,useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useThemedStyles } from "./useThemedStyles";
import { AuthContext } from '../../context/AuthContext';
const ChatList = ({ chats, onPressChatItem }) => {
    const { user} = useContext(AuthContext);
    const styles = useThemedStyles(); 
    const renderChatItem = ({ item }) => {
 
        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => onPressChatItem(item)}
                >
                <Image
                    source={{ uri: item.user_chat.pic }}
                    style={styles.userPic}
                />
                <View style={styles.chatDetails}>
                    <Text style={styles.userName}>{item.user_chat.name}</Text>
                    <Text style={styles.lastMessage}>{item.messages[item.messages.length - 1].user_id_from == user.id ? "Você: " : (item.messages[item.messages.length - 1].visu_status == 1 ? "" : <View
                  style={{
                    width: 12,
                    height: 12,
                    top: 30,
                    left: 30,
                    backgroundColor: "#385898",
                    borderRadius: 50,
                    position: "absolute",
                  }}
                >
   
                </View>)} {item.messages.length > 0 ? item.messages[item.messages.length - 1].msg_content : 'No messages'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.chat_id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default ChatList;