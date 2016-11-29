/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Picker
} from 'react-native';
import Speech from 'react-native-speech';

const Item = Picker.Item;

export default class reactNativeSpeech extends Component {
  state = {
    language: 'en-US',
    languages: [],
    text: 'Hi, my name is Chris.',
    inputHeight: 0,
  };

  constructor(props) {
    super(props);

    Speech.supportedVoices()
      .then(locales => {
        this.setState({languages: locales.filter(lang => lang.indexOf('en') > -1)});
      });
  }

  _startHandler() {
    Speech.speak({
      text: this.state.text,
      voice: this.state.language
    });
  }

  _pauseHandler() {
    Speech.pause();
  }

  _resumeHandler() {
    Speech.resume();
  }

  _stopHandler() {
    Speech.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, {height: Math.max(35, this.state.inputHeight)}]}
          onChangeText={(text) => this.setState({text})}
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height});
          }}
          autoCorrect={false}
          multiline={true}
          value={this.state.text}
        />

        <Picker
          style={styles.picker}
          selectedValue={this.state.language}
          onValueChange={(language) => this.setState({language})}>
          {this.state.languages.map((lang, i) => {
            return <Picker.Item value={lang} label={lang} key={i} />
          })}
        </Picker>

        <Button onPress={this._startHandler.bind(this)} title="Speak" />
        <Button onPress={this._pauseHandler.bind(this)} title="Pause" />
        <Button onPress={this._resumeHandler.bind(this)} title="Resume" />
        <Button onPress={this._stopHandler.bind(this)} title="Stop" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  picker: {
    alignSelf: 'stretch',
  },
  input: {
    textAlign: 'center',
    marginBottom: 35,
  },
});

AppRegistry.registerComponent('reactNativeSpeech', () => reactNativeSpeech);
