import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    Button,
    TextInput, ActivityIndicator, ScrollView, StatusBar, FlatList
} from 'react-native';
import Icon from 'react-native-ionicons';
import nextId from "react-id-generator";

import OptionsMenu from "react-native-options-menu";

import * as firebase from "firebase";
import FastImage from "react-native-fast-image"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class Pin extends React.Component {

    state = {
        title: '',
        description: '',
        categoria: '',
        errorMessage: null,
        url: "",
        idCreator: "",
        candelete: null,
        idPin: "",
        likes: [],
        like: null,
        notlike: true,
        userId: "",
        keyPass: null,
        comments: [],
        message: null,
        avatarSource: null,
        nameUser: null

    };
    comprobation_delete = (id) => {
        if (id == this.state.idCreator) {
            this.setState({
                candelete: true
            })
        }
    }
    dictToarray = (dict) => {
        for (key in dict) {
            this.setState({
                likes: [
                    ...this.state.likes,
                    dict[key]
                ]
            });
        }
    }

    dictToarray2 = (dict) => {
        for (key in dict) {
            this.setState({
                comments: [
                    ...this.state.comments,
                    dict[key]
                ]
            });
        }
        console.log(this.state.comments, "asdsada")
    }

    comprobation_like = (id) => {
        if (this.state.likes.length == 0) {
            this.setState({
                like: null,
                notlike: true
            })
        }
        else {
            this.state.likes.map((element) => {
                if (element == id) {
                    this.setState({
                        keyPass: true
                    })
                    return
                }

            })
            if (this.state.keyPass) {
                this.setState({
                    like: true,
                    notlike: null
                })
            } else {
                this.setState({
                    like: null,
                    notlike: true
                })
            }
        }

    }
    deletePost = async () => {
        if (this.state.candelete) {
            const esperar = await firebase.database().ref('Pins/' + this.state.idPin).remove()
            const esperar2 = await firebase.storage().ref("Pins").child(this.state.idPin + "/Image").delete()
            this.props.navigation.navigate("Mapa")
            Alert.alert("Eliminado Con Éxito")
            return
        }
        Alert.alert("Solo el creador del evento puede eliminarlo.")
    }
    cancel = () => {

    }

    handleBack = () => {
        firebase.database().ref("Pins").child(id + "/comments").off()
        this.props.navigation.navigate("Mapa")
    }
    handleSend = async () => {
        if (this.state.message) {
            await firebase.database().ref("users").child(this.state.userId).once("value", async (data) => {
                json = data.toJSON()
                url = json["profileImage"]
                name = json["username"]

                this.setState({
                    avatarSource: url,
                    nameUser: name,

                });


            })
            id = nextId()
            firebase.database().ref('Pins/' + this.state.idPin).update({
                comments:[
                    ...this.state.comments,
                    {id: id,
                        UserId: this.state.userId,
                        text: this.state.message,
                        name: this.state.nameUser,
                        profileImage: this.state.avatarSource} 
                ]
 
                        

            })
            this.textInput.clear()
            this.setState({
                message: ""
            })

        }
    }

    handleImage = () => {

    }

    hanldeLike = async () => {
        if (this.state.notlike) {
            firebase.database().ref('Pins/' + this.state.idPin).update({
                likes: [
                    ...this.state.likes,
                    this.state.userId
                ],
            })
        }
        else {
            var index = await this.state.likes.indexOf(this.state.userId)
            if (index >= 0) {
                this.setState({
                    keyPass: null
                })
                this.state.likes.splice(index, 1)
                firebase.database().ref('Pins/' + this.state.idPin).update({
                    likes: this.state.likes,
                })
            }

        }



    }

    async componentDidMount() {
        const userId = firebase.auth().currentUser.uid;
        const id = this.props.navigation.getParam('id', 'NO-ID');
        firebase.database().ref("Pins").child(id).once("value", async (data) => {
            json = data.toJSON()
            url = json["photoUrl"]
            title = json["nombre"]
            description = json["descripcion"]
            categoria = json["categoria"]
            idcreator = json["userId"]
            likes = json["likes"]
            comments = json["comments"]


            await this.setState({
                url: { uri: url, priority: FastImage.priority.high, },
                title: title,
                description: description,
                categoria: categoria,
                idCreator: idcreator,
                idPin: id,
                userId: userId,
                likes: [],
                comments: []

            });
            this.comprobation_delete(userId);
            likestoArray = await this.dictToarray(likes)
            likestoArray2 = await this.dictToarray2(comments)
            this.comprobation_like(userId);

        }
        )

        firebase.database().ref("Pins").child(id + "/comments").on("child_added", async (data) => {
            json = data.toJSON()
            this.setState({
                comments: [
                    ...this.state.comments,
                    json
                ]
            });
        })
        firebase.database().ref("Pins").child(id + "/likes").on("value", async (data) => {
            json = data.toJSON()
            likestoArray = await this.dictToarray(json)
            this.comprobation_like(userId);
        })
    }

    renderPost = (post) => {
        return (
            <View style={styles.feedItem}>
                <FastImage
                    style={styles.avatar}
                    source={{uri: post.profileImage}}
                />
                <View style={{flex:1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style = {styles.name}>{post.name}</Text>
                        </View>

                    </View>
                <Text style={styles.post}>{post.text}</Text>
                </View>
            </View>
        )
    }

    onChangeMessage = message => this.setState({ message });

    render() {

        return (
            <View style={styles.Pagina}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.titulo_space}>

                    <TouchableOpacity style={styles.image} onPress={this.handleChooseImage}>
                        <FastImage
                            style={{ width: WIDTH, height: HEIGHT / 3.5, }}
                            source={this.state.url}
                            onLoadStart={() => { this.setState({ loading: true }) }}
                            onLoadEnd={() => { this.setState({ loading: false }) }}
                        >
                            <ActivityIndicator style={{ top: HEIGHT / 10 }} size="large" animating={this.state.loading} />
                        </FastImage>
                    </TouchableOpacity>

                </View>


                <ScrollView style={styles.MainContainer}>
                    <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "center" }}>
                        <Text style={styles.inputTitle}>{this.state.title}</Text>
                        <Icon name="checkmark-circle" size={30} color={"turquoise"} style={{ top: HEIGHT / 150, left: WIDTH / 50 }} />

                    </View>
                    <View>
                        <Text style={styles.inputTitle2}>{this.state.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row", borderTopColor: "black", borderBottomWidth: 1, top: HEIGHT / 20 }}>
                        <TouchableOpacity onPress={this.hanldeLike}>
                            {this.state.like && <Icon name="heart" size={40} color={"red"} style={{ top: 0 }} />}
                            {this.state.notlike && <Icon name="heart-empty" size={40} color={"red"} style={{ top: 0 }} />}

                        </TouchableOpacity>
                        <Text style={{ fontSize: 35, top: 0, left: 10 }}>{this.state.likes.length}</Text>
                    </View>
                    <FlatList style={styles.feed} data={this.state.comments}
                        renderItem={({ item }) => this.renderPost(item)}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}>

                    </FlatList>



                </ScrollView>
                <View style={{
                    backgroundColor: "black", height: HEIGHT / 13, flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={{
                        width: WIDTH / 1.4, height: HEIGHT / 20, backgroundColor: "white", borderRadius: 50, flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={this.handleImage}>
                            <Icon name="images" size={40} color={"turquoise"} style={{ right: WIDTH / 12 }} />

                        </TouchableOpacity>
                        <TextInput style={{ width: WIDTH / 1.6, height: HEIGHT / 21, backgroundColor: "white", borderRadius: 50, fontSize: 18, color: "#161F3D" }}
                            placeholder={"Escribe tu comentario..."}
                            onChangeText={this.onChangeMessage}
                            value={this.state.message}
                            ref={input => { this.textInput = input }}
                        />

                        <TouchableOpacity onPress={this.handleSend}>
                            <Icon name="send" size={40} color={"turquoise"} style={{ left: WIDTH / 15 }} />

                        </TouchableOpacity>
                    </View>



                </View>




                <TouchableOpacity style={styles.back} onPress={this.handleBack}>
                    <Image source={require('AwesomeProject/assets/back.png')}

                        style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tools} onPress={this.handleBack}>
                    <OptionsMenu
                        button={require('AwesomeProject/assets/tools.png')}
                        buttonStyle={{ width: 50, height: 50, }}
                        destructiveIndex={0}
                        options={["Delete", "Cancel"]}
                        actions={[this.deletePost, this.cancel]} />
                </TouchableOpacity>

            </View>
        );

    }
}

const styles = StyleSheet.create({
    MainContainer: {
        top: HEIGHT / 20,
        backgroundColor: "white",
        marginHorizontal: WIDTH / 100,
    },

    Pagina: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: "white",

    },
    titulo_space: {
        alignItems: "center",
        backgroundColor: 'white',
    },

    titulo: {
        color: "white",
        fontWeight: "700",
        marginTop: HEIGHT / 22,
        marginBottom: 0,
        fontSize: 25
    },
    inputTitle: {
        top: HEIGHT / 100,
        color: "#8A8F9E",
        fontSize: 20,


    },
    inputTitle2: {
        top: HEIGHT / 30,
        color: "#8A8F9E",
        fontSize: 16,
    },
    button: {
        bottom: HEIGHT / 30,
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 50,
        height: 50,
        top: HEIGHT / 25,
        left: WIDTH / 20,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
    tools: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 50,
        height: 50,
        top: HEIGHT / 25,
        right: WIDTH / 20,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
    image: {
        top: HEIGHT / 30,
        marginLeft: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    spin: {
        top: HEIGHT / 25,
        width: WIDTH,
        height: 200,

    },
    feed: {
        top: HEIGHT / 20,
        marginBottom: HEIGHT / 10,
    },
    feedItem:{
        backgroundColor : "turquoise",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
    },
    avatar: {
        width:36,
        height: 36,
        borderRadius:18,
        marginRight:WIDTH/30

    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65",
    },
    post: {
        marginTop: HEIGHT/40,
        fontSize: 14,
        color: "#838899"
    }
});