import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";

export default class mainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      options: [
        { label: "Todos", value: "Todos" },
        { label: "Completos", value: "Completed" },
        { label: "Incompletos", value: "Incompleted" },
      ],
      Todo: [
        {
          id: 0,
          text: "Ir a comer",
          completed: true,
        },
      ],
      Todo_option: "Todos",
      id_control: 1,
      status: null,
      isRegistered: false,
      location: null,
    };
  }
  componentDidMount() {}

  addTareaL = (text) => {
    const todo = {};
    todo.id = this.state.id_control;
    todo.text = text;
    todo.completed = false;
    let copia = [...this.state.Todo];
    copia.push(todo);

    this.setState({
      text: "",
      id_control: this.state.id_control + 1,
      Todo: copia,
    });
  };

  _onPressL = (id) => {
    const Data = [...this.state.Todo];
    if (Data[id]) {
      Data[id].completed = !Data[id].completed;
    }
    this.setState({ Todo: Data });

    console.log(this.state.Todo);
  };
  deleteTodoL = (id) => {
    let copia = [...this.state.Todo];
    console.log(copia);
    copia = copia.filter(function (obj) {
      return obj.id !== id;
    });
    this.setState({
      Todo: copia,
    });
  };

  _renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        position: "relative",
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: "#8E8E96",
        borderRadius: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          this._onPressL(item.id);
        }}
      >
        <View style={styles.ViewT}>
          <Text style={styles.TareaText}>Tarea #{item.id + 1}</Text>
          <Text
            style={
              item.completed
                ? {
                    fontSize: 22,
                    color: "#0BB2F0",
                    fontWeight: "bold",
                    textDecorationLine: "line-through",
                  }
                : {
                    fontSize: 22,
                    color: "#0BB2F0",
                    fontWeight: "bold",
                    textDecorationLine: "none",
                  }
            }
          >
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          borderRadius: 25,
          position: "absolute",
          top: 4,
          right: 10,
        }}
        onPress={() => {
          this.deleteTodoL(item.id);
        }}
      >
        <Icon
          name={"trash-can-outline"}
          size={25}
          color="#EB5757"
          type="material-community"
        />
      </TouchableOpacity>
    </View>
  );
  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text
          style={{
            fontSize: 30,
            color: "#0BB2F0",
            fontWeight: "bold",
            marginTop: 30,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Lista de Tareas
        </Text>

        <View style={{ marginTop: 30 }}>
          <FlatList
            data={this.state.Todo}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              width: 280,
              height: 60,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 20,
              padding: 5,
            }}
            onChangeText={(text) => this.setState({ text })}
            placeholder="Agregar tarea nueva"
            value={this.state.text}
          />
          <Button
            title="+"
            titleStyle={{
              fontSize: 30,
            }}
            buttonStyle={{
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
            }}
            onPress={() => {
              this.addTareaL(this.state.text);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewT: {
    height: 55,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  TareaText: {
    fontSize: 18,

    color: "#14144B",
  },
});
