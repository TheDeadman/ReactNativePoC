import React from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import { ListItem } from 'react-native-material-ui'

import { dismissNotification } from './data'

export class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const itemStyle = this.props.selected ? styles.item : styles.itemSelected;
    //   const itemStyle = this.props.selected ? { primaryText: styles.item } : { primaryText: styles.itemSelected };
    const item = this.props.data
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View>
            <ListItem 
                divider={true}
                leftElement="notifications"
                centerElement={{
                    primaryText: item.title,
                    secondaryText: item.shortText
                  }}
                //   centerElement={{
                //     primaryText: 'Center element as an object (dense)',
                //     secondaryText: 'Pellentesque commodo ultrices diam. Praesent in ipsum',
                // }}
          
                style={{primaryText: itemStyle, secondaryText: itemStyle}}
              
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
        data={item}
        onPressItem={() => {
            this._onPressItem
            dismissNotification(item.id)
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
        flex: 1,
      // height: 40,
      backgroundColor: '#fff',
    //   color: '#000'
    },
    item: {
        color: '#f00'
    },
    itemSelected: {
        color: "#00f"
    }
  });
  