import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";

const deviceHeight = Dimensions.get("screen").height;

class BottomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
  }

  show = () => {
    this.setState({ showing: true });
  };

  close = () => {
    this.setState({ showing: false });
  };

  renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: "100%" }} />;

    if (!onTouch) return view;

    return (
      <TouchableOpacity onPress={onTouch} style={{ flex: 1, width: "100%" }}>
        {view}
      </TouchableOpacity>
    );
  };

  render() {
    let { title, onTouch, options } = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent
        visible={this.state.showing}
        onRequestClose={this.close}
      >
        <View style={styles.overlay}>
          {this.renderOutsideTouchable(onTouch)}
          <View style={styles.container}>
            <Text style={styles.containerTitle}>{title}</Text>
            <View style={styles.optionContainer}>
              {options.map((item, id) => {
                return (
                  <TouchableOpacity
                    style={styles.optionBtn}
                    key={id}
                    onPress={this.close}
                  >
                    <Text style={styles.optionTxt}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 15,
    maxHeight: deviceHeight * 0.4,
    width: "100%",
  },
  containerTitle: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 10,
  },
  optionContainer: {
    marginVertical: 15,
    justifyContent: "space-between",
  },
  optionBtn: {
    margin: 10,
  },
  optionTxt: {
    fontSize: 20,
  },
});

export default BottomModal;
