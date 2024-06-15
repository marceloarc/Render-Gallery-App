import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

    const scrollViewRef = useRef();

    useEffect(() => {
        // Scroll para a última mensagem ao carregar
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(() => {
        // Adiciona mensagem de exemplo
        const exampleMessage = { id: 0, text: 'Olá, tudo bem?', sender: 'other', senderName: 'Maria Alberto', timestamp: new Date() };
        setMessages([exampleMessage]);
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsOpen(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleMessageSend = () => {
        if (message.trim() === '') return;
        const newMessage = { id: messages.length, text: message, sender: 'user', timestamp: new Date() };
        setMessages([...messages, newMessage]);
        setMessage('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name='chevron-back' size={25} color="#00406A" />
                <Image
                    source={{ uri: "http://192.168.0.10:5000/images/2/6307a0f69ce861064cc219e7e3900ffd.jpeg" }}
                    style={{ width: 40, height: 40, borderRadius: 25, marginLeft: 10}}
                />                
                <View style={{ alignItems: "flex-start", height: "100%"}}>
                    <Text style={styles.title}>Maria Alberto</Text>
                    <Text style={styles.title2}>Online</Text>
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map((msg, index) => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} senderName={msg.senderName} timestamp={msg.timestamp} index={index} />
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "position" : undefined}
                style={[styles.inputContainer, { paddingBottom: 5 }]}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={handleMessageSend}
                />
                <View style={styles.circleContainer}>
                    <Ionicons name="send" size={24} color="#fff" onPress={handleMessageSend} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const Message = ({ text, sender, senderName, timestamp, index }) => {
    const isUser = sender === 'user';
    const messageStyle = isUser ? styles.userMessage : styles.otherMessage;
    const timeStyle = isUser ? styles.userMessage : styles.otherMessage;
    const messageTextColor = isUser ? 'white' : 'black';
    const showSenderName = !isUser && (index === 0 || messages[index - 1]?.sender !== 'other');

    const formattedTime = timestamp ? formatTime(timestamp) : '';

    return (
        <View>
            {showSenderName && <Text style={styles.senderName}>{senderName}</Text>}
            <View style={[styles.messageContainer, messageStyle]}>
                <Text style={[styles.messageText, { color: messageTextColor }]}>{text}</Text>
                <Text style={[styles.timestamp, { color: messageTextColor }]}>{formattedTime}</Text>
            </View>
        </View>
    );
};

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        marginTop: 0,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        height: 100,
        paddingHorizontal: 15,
        marginBottom: 20,
        flexDirection: 'row',
        // alignItems: 'flex-end',
        alignItems: 'center', 
        paddingTop: 50,
    },
    title: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: "center",
    },
    title2: {
        marginLeft: 10,
        fontSize: 14,
        color: '#000000',
        textAlign: "center",
    },
    messagesContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    messageContainer: {
        maxWidth: '80%',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#00406A',
        marginTop: 0, // Removendo espaço acima do balão do usuário
        borderTopRightRadius: 0,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
        borderTopLeftRadius: 0,
    },
    messageText: {
        fontSize: 16,
    },
    senderName: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 10,
        color: '#888',
        alignSelf: 'flex-end',
        marginTop: 3,
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginRight: 10,
    },
    circleContainer: {
        backgroundColor: "#00406A",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
