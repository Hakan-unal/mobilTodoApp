import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
  ScrollView,
} from 'react-native';
export default class HotelTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageisLoad: false,
      isListPage: false,
      warningModal: false,
      title: '',
      content: '',
      count: '',
      list: [],
    };
  }

  onChange = (name, event) => {
    this.setState({[name]: event});
  };

  loadData = () => {
    this.setState({pageisLoad: true});
  };

  handleRemove = index => {
    const tempArr = this.state.list;
    tempArr.splice(index, 1);
    this.setState({list: tempArr});
  };
  handleSave = () => {
    if (
      this.state.title !== '' &&
      this.state.content !== '' &&
      this.state.count !== ''
    ) {
      this.setState({pageisLoad: false});
      setTimeout(() => {
        const obj = {
          title: this.state.title,
          content: this.state.content,
          count: this.state.count,
        };
        const tempArr = this.state.list;
        tempArr.push(obj);
        this.setState({
          list: tempArr,
          title: '',
          content: '',
          count: '',
          pageisLoad: true,
        });
      }, 500);
    } else {
      this.setState({warningModal: !this.state.warningModal});
    }
  };
  async componentDidMount() {
    setTimeout(() => {
      this.loadData();
    }, 1000);
  }

  render() {
    const listCards = this.state.list.map((obj, index) => {
      return (
        <View key={index} style={styles.card}>
          <Text>Başlık: {obj.title}</Text>
          <Text>Adet: {obj.count}</Text>
          <Text>İçerik: {obj.content}</Text>
          <Button
            onPress={() => this.handleRemove(index)}
            title="Sil"
            color="red"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      );
    });
    return this.state.pageisLoad ? (
      <>
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>TODO APP</Text>
        </View>

        <SafeAreaView>
          <Text style={styles.label}>Başlık</Text>
          <TextInput
            style={styles.input}
            onChangeText={event => this.onChange('title', event)}
            value={this.state.title}
          />
          <Text style={styles.label}>Adet</Text>
          <TextInput
            style={styles.input}
            onChangeText={event => this.onChange('count', event)}
            value={this.state.count}
            keyboardType="numeric"
          />
          <Text style={styles.label}>İçerik</Text>
          <TextInput
            style={{...styles.input, height: 125}}
            onChangeText={event => this.onChange('content', event)}
            value={this.state.content}
          />
          <Button
            onPress={() => this.handleSave()}
            title="Ekle"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <View style={{marginTop: 20}}></View>
          <Button
            onPress={() => this.setState({isListPage: !this.state.isListPage})}
            title={'Listele (' + this.state.list.length + ' İçerik mevcut)'}
            color="blue"
            accessibilityLabel="Learn more about this purple button"
          />
        </SafeAreaView>

        {/**List modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isListPage}
          onRequestClose={() => {
            this.setState({isListPage: !this.state.isListPage});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView style={{marginBottom: 20}}>
                {this.state.list.length !== 0 ? (
                  listCards
                ) : (
                  <Text>Görüntülenebilecek içerik bulunmamakta</Text>
                )}
              </ScrollView>
              <Button
                onPress={() =>
                  this.setState({isListPage: !this.state.isListPage})
                }
                title="Kapat"
                color="red"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </Modal>

        {/**Warning modal */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.warningModal}
          onRequestClose={() => {
            this.setState({warningModal: !this.state.warningModal});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Lütfen tüm alanları doldurunuz
              </Text>
              <Button
                onPress={() =>
                  this.setState({warningModal: !this.state.warningModal})
                }
                title="Kapat"
                color="red"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </Modal>
      </>
    ) : (
      <View style={styles.emptyPage}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    margin: 15,
  },
  emptyPage: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
  },
  card: {
    width: 225,
    height: 150,
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderColor: '#00000040',
    padding: 10,
    borderRadius: 15,
  },
  label: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    width: 100,
    borderRadius: 20,
    backgroundColor: 'red',
  },
});
