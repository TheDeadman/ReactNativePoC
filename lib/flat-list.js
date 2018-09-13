import React from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import { ListItem } from 'react-native-material-ui'

class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const itemStyle = this.props.selected ? { primaryText: styles.primaryText } : { primaryText: styles.primaryText };
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <ListItem 
                style={itemStyle}
              primaryText={this.props.title}
            />
          </View>
        </TouchableOpacity>
      );
    }
  }
  
  export default class MultiSelectList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>)};
  
    _keyExtractor = (item, index) => item.id;
  
    _onPressItem = (id: string) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
      });
    };
  
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={() => {
            this._onPressItem
            item.handler()
        }}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
        style={styles.item}
      />
    );
  
    render() {
      return (
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={styles.list}
        />
      );
    }
  }

  
const styles = StyleSheet.create({
    list: {
      // height: 40,
    //   backgroundColor: '#cf0',
    //   color: '#000'
    },
    item: {
        color: '#f00'
    },
    itemSelected: {
        color: "#00f"
    }
  });
  